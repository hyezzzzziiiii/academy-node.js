function first() {
    second();  // 2  호출스택에 두번째로 저장되는 주소
    console.log('첫 번째');
}
function second() {
    third();  // 3  호출스택에 세번째로 저장되는 주소
    console.log('두 번째');
}
function third() {
    console.log('세 번째');
}
first();  // 1   호출스택에 최초 저장되는 주소

// 결론1 : 호출스택에 함수 호출로 인해 분기되는 지점의 주소가 이동하는 순서로
//           쌓여서 돌아올때 반대의 순서로 돌아오게 합니다
// 결론2 : 프로그램의 실행 순서상 앞에 명령이 끝나지 않으면 뒤에 명령은 
//         실행되지 않습니다




function longRunningTask() {
    // 오래 걸리는 작업
    console.log('작업 끝');
}
console.log('시작');
longRunningTask();
console.log('다음 작업');
// 시작-작업끝-다음작업  의 순서는 절대 바뀌지 않습니다