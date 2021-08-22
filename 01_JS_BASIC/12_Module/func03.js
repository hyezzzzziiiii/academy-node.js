// 그조분해 할당으로 변수 초기화
const { odd, even } = require('./var');
//console.log(odd);
//console.log(even);

// 모듈을 이용하면, 함수도  exports 해서 다른 파일에서 사용이 가능합니다
function checkOddOrEven(number){
    if( number % 2){
        return odd;
    }else{
        return even;
    }
}
module.exports = checkOddOrEven;
