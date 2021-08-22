const value = require('./Var');
// require('./Var') : 지정된 파일을 실행하는 명령이며, 실행된 결과 exports된
// 자료가 전달되어 져 오고 지정한 변수(value)에 저장됩니다
// 변수 저장없이 require('./Var') 만 쓰여지면 파일이 실행되고, 그파일에
// 변수가 exports  될뿐 현재 파일에 영향을 주지는 않습니다.
console.log(value);