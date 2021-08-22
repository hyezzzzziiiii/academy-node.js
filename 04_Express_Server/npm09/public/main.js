getBoard_list();   // 현재 파일 위치에서 getBoard_list 함수 실행

function getBoard(id){
    location.href="/boards/boardView/" + id;
}  // 게시글 내용을 보기 위한 함수

async function getBoard_list(){
    try{
        // 게시물 조회해서 리턴 받습니다
        const res = await axios.get('/boards');
        // 데이터만 추출
        const boards = res.data;
        // 테이블의 tbody 에 포커스를 맞춰서
        const tbody = document.querySelector('#board-list tbody');
        tbody.innerHTML = '';
        // 게시물 하나하나를 tbody 안에 추가합니다
        boards.map( async function(board) {
            const row = document.createElement('tr');
            // 게시물이 클릭되면 getBoard 호출해서 게시상세보기로 이동합니다
            row.addEventListener('click', () => {
                getBoard(board.id); 
            });
            let td = document.createElement('td');  
            td.textContent = board.id; 
            td.id = "subject";
            row.appendChild(td);  

            const bid = board.id;
            td = document.createElement('td');  
            let tContent = board.subject;
            try{
                const result  = await axios.get(`/boards/replycnt/${bid}`);
                const data  = result.data;
                const cnt = data.length;
                if( cnt != 0 ){
                    tContent = tContent  
                    + ' <span style="color:red;font-weight:bold">[' + cnt + ']</span>'; 
                } 
            }catch(err){
                console.error(err);
            }
            td.innerHTML = tContent;
            row.appendChild(td);
            
            
            td = document.createElement('td');  
            td.id = "writer";
            td.textContent = board.writer; 
            row.appendChild(td);

            td = document.createElement('td');  
            td.id = "writer";
            td.textContent = board.readCount; 
            row.appendChild(td);

            tbody.appendChild(row); 
        });
    }catch(err){
        console.log(err);
    }
}