// 09_promise의 다른 형태 #1
// 실패가능성이 있는 동작을 실행하고 결과를 갖고 있다가,
// 결과가 필요한 순간  객체의 이름을 불러 꺼내쓸수 있는 객체
const condition = true;
const promise = new Promise( (resolve, reject) => {
    if (condition) resolve('성공');
    else reject('실패');
});

async function abcd(){
    // promise  결과값을 꺼내서 result 에 대입
    // await : promise 의 비동기실행을 기다리다가 필요할때 꺼내기 위한 키워드
    // await 를 사용한 명령은 반드시 async 로 만들어진 함수 안에서ㅓ \
    // 사용해야 합니다
    try{
        const result = await promise;  
        console.log(result);
    }catch(error){
        console.error(error);
    } //  try~catch 로 성공과 실패를 구분하여 처리합니다.
}

/*
promise
    .then( ( message )=>{ console.log( message ); } )
    .catch( ( error )=>{ console.error( error ); } )
    .finally( ()=>{ console.log('무조건 실행'); } );
*/




// promise 의 다른형태 #2
const promise = new Promise((resolve, reject) => {
    resolve("첫번째 리졸브");
});
async function thenfunc(){
    try{
        const result = await promise;
        console.log(result);
        // 리턴 = 두번째 리졸브 : 새로운  promise 객체안의 resolve 호출
        return "두번째 리졸브";  
    }catch(error){
        console.error(error);
    }
}
thenfunc()
    .then( (result2)=>{
        console.log(result2); 
    })
    .catch( (error)=>{ 
        console.error(error);
    });