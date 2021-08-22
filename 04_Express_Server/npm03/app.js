const express = require('express');
const path = require('path');
// 추가 설치 모듈 require -------------------------------------
    // 각각의 요청과 응답에 대한 필요정보를 보기 위한 모듈
const morgan = require('morgan');
    // 쿠키 사용을 http 서버때보다 간결하게 사용하기 위한 모듈
const cookieParser = require('cookie-parser');
    // 세션 사용을 http 서버때보다 간결하게 사용하기 위한 모듈
const session = require('express-session');
const bodyParser = require('body-parser');
//------------------------------------------------------------


// express 설정 ----------------------------------------------
const app = express();
app.set('port', process.env.PORT || 3000);
//------------------------------------------------------------


// 공통 미들 웨어 설정-----------------------------------------
// app.use(morgan('dev'));
    // 실행결과 : GET / 200  5.316 ms - 165  
    // method 방식, 응답 결과 코드, 요청과 실행에 걸린 시간 등등 
    // app.use(morgan('combined')); 더 자세한 내용을 볼수도 있습니다
app.use(cookieParser());
app.use(express.json());  // 바디파서 json : json 사용을 위한 모듈
app.use(express.urlencoded({extended:true}));  // 바디파서 폼데이터 모듈
//app.use(body-Parser.json());
//app.use(body-Parser.urlencoded({ extended: false }));
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:"rkdgmlwns",  
}));  //세션 활용을 위한 미들웨어
//------------------------------------------------------------

app.get('/', (req, res) => {
    //1. 저장된 쿠키를 불러와서 활용할 변수 req.cookies
    console.log(req.cookies);
    //2. 새로운 쿠키의 저장
    const name = 'HongGildong';
    res.cookie( 'name' , encodeURIComponent(name), {
      expires:new Date(),
      httpOnly:true,
      path:'/'
    });
    //3. 쿠키의 삭제
    /*
    res.clearCookie( 'name' , encodeURIComponent(name), {
        httpOnly:true,
        path:'/'
    });
    */
   

    // 4. 세션의 저장
    req.session.id='hello';
    req.session.data = 'afdafd';
    // 다른미들 웨어에서 req.session.data 라는 이름으로 사용가능
    // (영구적 저장)

    res.sendFile(path.join(__dirname, '/index.html'));
    //res.send("<h1>Hello Express Server~!!</h1>")
});




app.get('/login', (req, res) => {
    console.log(req.body.name);
});

// express 설정 ----------------------------------------------
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
//------------------------------------------------------------