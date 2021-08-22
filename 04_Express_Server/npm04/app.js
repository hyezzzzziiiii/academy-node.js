const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(cookieParser());
app.use(session({
  resave:false,
  saveUninitialized:false,
  secret:"rkdgmlwns",
}));
app.use(express.json());  
app.use(express.urlencoded({extended:true}));  

app.get('/', (req, res) => {
    console.log(req.cookies);
    console.log(req.cookies.test);
    res.cookie( 'test' , 'cookietest' , {
        httpOnly : true,
        path : '/'
    });
    //  name 이라는 이름의 쿠키가 있으면  OOO  님 반갑습니다 send
    if(req.cookies.id){ 
        res.send(`${req.cookies.id} 님 안녕하세요` + 
                            '<br><a href="/logout">로그아웃</a>');
    }
    // 쿠키가 없으면 아래 index.html send
    else { res.sendFile(path.join(__dirname, '/index.html')); }
});

app.post('/login', (req, res) => {
    // 폼데이터가 전송되어져서 사용되기 위한 방법
    // 전송된 데이터를 특정 변수에 저장
    console.log(req.body.name);
    const name = req.body.name;
    // 전송된 name 값을 쿠키에  저장 
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 1);
    res.cookie( 'id' , name , {
        expires : expires,
        httpOnly : true,
        path : '/'
    });
    // redirect('/'); 특정 리퀘스트로 이동합니다
    res.redirect('/');
});

app.get('/logout', (req, res) => {
    res.clearCookie( 'id' , req.cookies.name , {
      httpOnly:true,
      path:'/'
    });
    res.redirect('/');
});



app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});