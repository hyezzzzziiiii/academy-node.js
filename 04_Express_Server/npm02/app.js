const express = require('express');
const { networkInterfaces } = require('os');
const path = require('path');
const app = express();

// app.get() 또는 app.post() 등... 리퀘스트로 키워드를 받아 해당 요청에
// 응답을 보내주는 메서드들을 "라우터(Router)"라고 부릅니다.
// 첫번째 요소 리퀘스트 키워드를 요청받아 익명함수를 실행해서 응답.

// 그리고 그 메서드안에 들어가는 익명함수들 ()=>{} 을 "미들웨어" 라고
// 부릅니다

app.set('port', process.env.PORT || 3000);

// 1. 모든 라이터들 실행전에 실행되는 미들 웨어
app.use((req, res, next)=>{
    console.log('모든 요청에 실행하고 싶어요');
    next();
    // 모든라우터에 next 가 있지만 사용하지 않아서 생략된 상태입니다
    // 필요하면 꺼내서 사용할수 있습니다.
});
// --------------------------------------------------------------

//3. 특정 리퀘스트 키워드 에서만 실행할 미들웨어
app.use('/about', (req, res, next)=>{
    console.log('about 요청에만 실행하고 싶어요');
    next();
});
// get 과 post 등 키워드만 같으면 모든 method 에서 실행됩니다
// 실행후 next() 로 인해 제어권이 아래로 이동하여, 
// 해당 get 이나 post 등이 추가 실행됩니다.
//----------------------------------------------------------



//4. 미들웨어를 여러개 넣어서  연달아 사용도 할수 있습니다
app.use((req, res, next)=>{
    console.log('미들웨어 1회 연속 실행');
    next();  
} , (req, res, next)=>{
    console.log('미들웨어 2회 연속 실행');
    next();  
} , (req, res, next)=>{
    console.log('미들웨어 3회 연속 실행');
    next();  
}  );
//-------------------------------------------------------


// 5.1 에러발생--------------------------------------
app.use((req, res, next)=>{
    // throw new Error("(서버)에러를 발생시켜 주마~!");
    // 파일 하단에  5.2 에러처리라우터가 없으면 브라우져에 에러내역이 
    // 표시되어 모든 서버 구조가 노출됩니다. (500 에러)
    // 에러내역은 서버의 콘솔에만 나오고 브라우져에는 에러처리에 의한
    // 내용만 나오도록 "에러 처리 라우터"를 마지막에 추가해줍니다
    
    //7. 에러 처리의 또다른 형태
    try{
        console.log(정의안된변수사용);
    }catch(error){
        next(error); // 에러처리 미들웨어로 이동하라는  next
        // next에 error 가 인수로 들어가면 에러처리 라우터로 이동합니다
        // erroe 말고 'router' 가 인수이면 다음 미들웨어로 이동하라는
        // 뜻입니다.
    }
} );


app.get('/' , (req, res)=>{
    res.status(200).sendFile( path.join(__dirname, '/index.html') );
});
app.get('/about' , (req, res)=>{
    res.send('<h2>Hello, About</h2>');
    // 8. 미들웨어의 특성
    // 하나의 미들웨어에서 res.send() 또는 res.sendFile() 등을
    // 두번이상 쓸수 없습니다. res.json() 도 예외는 아닙니다.
    // http 서버에서 사용하던 res.writeHeader() + res.end() 가 합쳐져서
    // res.send() 가 된것이므로 위 send 두번이상 쓰는 건 의도치않은
    // 에러를 발생합니다. 

    // res.json() 또한
    // res.writeHeader(200, {'Content-Type':application/json'});
    // res.end(FJSON.stringify({hello:'hong'}));
    // 위 둘이 합쳐져서 res.json({hello:'hong'});로 사용됩니다
    // 역시 다른 메서들과 함께 두번이상 사용하지 않습니다
});
app.get('/users' , (req, res)=>{
    res.send('<h2>Hello, Express Users</h2>');
});



// 2. 리퀘스트 키워드의 와일드 카드 문자
app.get('/category/Boots', (req, res) => {
    res.send('<h2>hello Boots</h2>');
});
app.get('/category/Heel', (req, res) => {
    res.send('<h2>hello Heel</h2>');
});
// 와일드 카드 키워드를 사용한 라우터는 범위가 넓으므로 가능한
// 아래쪽에 위치시켜서, 명확한 구분은 먼저 실행되게 하고,
// 해당 라우터가 없을때 실행되게 하는것이 효과적입니다.
app.get('/category/:name', (req, res) => {
    res.send(`<h2>hello Wild Card Char ${req.params.name}</h2>`);
});
// --------------------------------------------------------
/* 
//404 에러 방지를 위한 와일드 카드 사용 라우터
app.get('*', (req, res) => {
    res.send('hello everybody');
});
*/



//6. 404 에러 처리
app.use((req,res,next)=>{
    res.send('404 에러임~!!');
    //res.status(404).send('404 에러임~!!');  400과 500은 위험
});




// 5.2 에러처리 라우터---------------------------------------
// 에러처리 라우터에 있는 미들웨어는 반드시 매개 변수가
// err, req, res, next  네개가 쓰여져야 에러처리로 인식됩니다
// 넷중에 하나만 빠져도 에러 처리 라우터로 인식되지 못합니다.
app.use((err, req, res, next)=>{
    console.error(err);
    res.status(200).send('에러내용을 브라우져에 알려주지 않으리')
});
//-----------------------------------------------------



app.listen( app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중입니다');
});



