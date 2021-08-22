// 필요에 의해 처가 설치된 모듈들 require
const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const { sequelize } = require('./models');
const cookieParser = require('cookie-parser');
const session = require('express-session');  // 익스프레스 세션 require
// 라우터들 require
const indexRouter = require('./routes');
const membersRouter = require('./routes/members');
const boardsRouter = require('./routes/boards');
const dateFilter = require('nunjucks-date-filter');

// app 과 nunjucks 등 설정
const app = express();
app.set('port', process.env.PORT || 3003);
app.set('view engine', 'html');
let env = nunjucks.configure('views', { express: app,   watch: true });
env.addFilter('date', dateFilter);

app.use(cookieParser('kangheejoon'));
//세션 설정
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret:'kangheejoon',
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: 'session-cookie',
}));

// 데이터 베이스 연결
sequelize.sync({ force:false })
.then(() => { console.log('데이터베이스 연결 성공'); })
.catch((err) => { console.error(err); });
// forcd : true -> 기존 테이블 지우고 새 테이블 생성(기존 레코드 모두 삭제)
// alter : true -> 레코드는 살리고 테이블만 수정(수정된 테이블 자료형과
//               기존 레코드의 자료형이 안맏을경우 에러를 발생합니다)
// force : false -> 이미 테이블이 존재하면 건드리지 않습니다(없을때만 생성) 

// 기타 앱 설정
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 라우터 설정
app.use('/', indexRouter);
app.use('/members', membersRouter);
app.use('/boards', boardsRouter);

// 에러처리 미들웨어
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});
//수신대기 미들웨어
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});