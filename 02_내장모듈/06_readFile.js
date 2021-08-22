// 파일 읽기 쓰기를 위한 모듈
const fs = require('fs');
fs.readFile('./readme.txt' , (err, data)=>{ 
    if(err){
        throw err;
    }
    console.log(data);
    console.log(data.toString());
});
//  err :  파일읽기에 실패했을때 전달되는 값을 받는 매개 변수
// data : 파일읽기에 성공했을때 읽어온 파일 내용 데이터