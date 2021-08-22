const http = require('http');

// create 서버 함수로 서버기능을 실행시킵니다.
http.createServer( (req, res)=>{ 
    // 서버요청시 응답내용이 쓰여집니다 
    res.write('<h1>Hello Node Server!!</h1>');
    res.write('<p>Wellcome to My Node Server!!</p>');
}).listen( 8081 , ()=>{
    console.log('8081 포트에서 서버가 대기중입니다');
});