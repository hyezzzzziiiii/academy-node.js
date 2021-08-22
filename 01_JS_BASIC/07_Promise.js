// Promise : 내용이 실행되었지만 결과를 아직 반환하지 않은 객체
// 결과를 사용하고자하는 위치에서 then 키워드와 함께 리턴된 결과를 활용하고
// 객체 사용을 마무리 
// - Resolve(성공리턴 값) -> then 으로 연결
// - Reject(실패리턴 값) -> catch 로 연결
// - finally -> 성공과 실패 리턴값에 상관없이 무조건 실행되는 영역

const condition = true; 

const pm = new Promise( (resolve, reject) => {
  if (condition) {
    resolve('성공');
  } else {
    reject('실패');
  }
} );

// const promise = new Promise();  생성자에의해 Promise객체 생성
// func = (resolve, reject) => {   }  와 같이 함수가 생성되어야 하는데,
// 위 형태의 화살표 함수가 함수이름(func) 생략하고 ,
// 함수의 몸체를 new Promise() 생성자 함수에 전달인수로 전달된 형태
// new Promise(  (resolve, reject) => {  }  )
// new 에 의 해 새로 만들어진 객체 이름 : promise

/*
const func = (resolve, reject) => {
    if (condition) resolve('성공');
    else reject('실패');
} 
const pm = new Promise( func ); */

// 함수안에서 반드시 resolve() 또는 reject() 가 호출 됩니다
// if 문이나 선택 실행에 적용하여 둘중 하나만 실행하여도 되고,
// 무조건 resolve()나 reject()  하나만 실행하기도 합니다.
// resolve() 또는 reject()  호출실 전달인수로 간단한 내용을 전달할수
// 있습니다
// resolve('성공')   reject('실패')


// then 과 함께 실행할 처리 이전에 다른 코드가 작성될수 잇습니다
console.log('딴짓');
console.log('딴짓');
console.log('딴짓');
console.log('딴짓');
console.log('딴짓');
console.log('딴짓');

// 이제 결과를 이용한 작업을 시작합니다
// then과 catch와 finally 에 익명함수가 전달인수로 전달되어 실행되게 합니다
// .then( (message)=>{  } )
// 매개 변수의 이름은 자유롭게 정할수 있습니다
pm
    .then( ( message )=>{ 
        console.log( message ); // 성공(resolve)한 경우 실행
     } )
    .catch( ( error )=>{ 
        console.error( error ); // 실패(reject)한 경우 실행
     } )
    .finally( ()=>{ 
        console.log('무조건 실행');  // 성공실패중하나와 함께 반드시 실행
     } );



// promise 사용의 또다른 예
    // promise  를 사용하지 않았을때
    const printString = (string, callback) => {
        // setTimeout : 지정된 시간뒤에 첫번째 요소(익명 함수)를 실행
        var k = Math.floor(Math.random() * 10000) + 1
        setTimeout(() => {   
          console.log(string + ' ' + k);
          // 반드시 console.log가 실행완료된 다음에 callback() 실행
          // callback();   //  전달된 함수의 실행
        } , k);
        // setTimeout() 랜덤시간이후 실행이 끝나기 전에  callback() 실행
        callback();  
    }
    const printAll = () => {
        printString ("A", () => {
          printString ("B", () => {
            printString ("C", () => {})
          })
        })
    }
    printAll();  // ABC


// promise 를 사용한 예
const printString = (string) => {
    return new Promise ( (resolve, reject) => {
        var k = Math.floor(Math.random() * 100) + 1;
        setTimeout(() => {
            console.log(string);
            resolve();
        }, k);
    })
}
// printString함수가 호출되면  자연스럽게 new Promise () 생성자 함수가 
// 호출 되며, 리턴된 Promise객체로 .then() 또는  .catch() 실행
const printAll = () => {
    printString("A")
    .then(() => {
      return printString("B")
    })
    .then(() => {
      return printString("C")
    })
}
printAll();
// 최종 호출은 printAll()함수 입니다.
// 함수의 첫번째 실행은 printString() 함수의 호출이고,
// 그 함수의 리턴값은  new Promise() 에 의 해 만들어진 새 객체이며,
// 객체 안에 setTimeout() 안에서 실행된  resolve()호출결과가 대기하고 
// 있습니다
// 따라서 printString("A").then( () => { } ) 으로 바로 활용 가능 합니다





// 연속 Promise()의 then 과 resolve 사용
const pm = new Promise((resolve, reject) => {
    resolve("첫번째 리졸브");
});
// anther code

pm
    .then( (msg1) => {
        console.log(msg1);
        return new Promise( (resolve, reject) => {   // Promise 객체 리턴
            resolve("두번째 리졸브");
        } ); 
    } )   // 첫번째 then 에서 새로운 Promise 를 리턴하면 그안의  resolve 는 다음 then에서
    // 처리 합니다
    .then( (msg2) => {
        console.log(msg2);
        return new Promise((resolve, reject) => {
            resolve("세번째 리졸브");
        });
    })
    .then((msg3) => {
        console.log(msg3);
    })
    .catch((error) => {
        console.error(error);
     });