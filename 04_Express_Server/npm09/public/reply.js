getReply();
async function getReply(){
    const boardnum = document.getElementById("boardnum").value;
    try{
        // 해당 게시물의 댓글을 얻어 옵니다
        const res = await axios.post('/boards/getReply', {boardnum} );
        const reply = res.data;
        let tbody = document.querySelector('#reply-list tbody');
        tbody.innerHTML = '';
        // 댓글의 갯수만큼 작업할 함수를 실행합니다
        reply.map( function(rep) {
            let row = document.createElement('tr');  //tr 생성
            let td = document.createElement('td');   //td 생성
            td.textContent 
                = String(rep.created_at).substr(2,2) + "/"
                + String(rep.created_at).substr(5,2) + "/"
                + String(rep.created_at).substr(8,2) + " "
                + String(rep.created_at).substr(11,5);
            td.id = "subject";
            row.appendChild(td); 
            td = document.createElement('td'); 
            td.id = "subject"; 
            td.textContent = rep.writer; 
            row.appendChild(td);
            td = document.createElement('td');  
            td.textContent = rep.reply; 
            row.appendChild(td);

            const edit = document.createElement('button');
            edit.textContent = '삭제';
            edit.addEventListener('click', async () => {
                
            });
            td = document.createElement('td');
            td.id = "subject"; 
            td.appendChild(edit);
            row.appendChild(td);

            tbody.appendChild(row); 

        });
    }catch(err){
        console.log(err);
    }
}

async function writeReply(){
    const reply = document.getElementById("reply").value;
    const boardnum = document.getElementById("boardnum").value;
    if(reply=='' || !reply){ return alert('댓글을 입력하세요'); }
    try{
        await axios.post('/boards/writeReply', {boardnum, reply});
    }catch(err){
        console.log(err);
    }
    document.getElementById("reply").value = '';
    getReply();
}