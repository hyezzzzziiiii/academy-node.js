function longRunningTask() {
    // 오래 걸리는 작업
    console.log('작업 끝');
}
console.log('시작');
// 두번째 요소로 지정한 시간 뒤에 첫번째 요소로 지정된 함수 호출
setTimeout(longRunningTask, 0);   
console.log('다음 작업');