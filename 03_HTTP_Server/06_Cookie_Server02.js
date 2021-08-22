const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie='') => 
    cookie
        // ';' 로 전달 쿠키를 분리합니다
        .split(';')   
        // 분리된 쿠기들이 v 에 전달되어 다시 '=' 로 분리됩니다
        .map( v => v.split('=') ) 
        // 그렇게 분리된 둘은 k와 v에 전달되어 객체 형태를 이루고
        // acc 저장되어 최종 객체 형태의 데이터로 리턴됩니다
        .reduce( (acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        } , {});

http.createServer(async (req, res)=>{
    // 요청 url 과 쿠키  화면출력
    console.log(req.url, req.headers.cookie);
    const cookies = parseCookies( req.headers.cookie );
    console.log(cookies);

    // 주소가 /login으로 시작하는 경우
    if (req.url.startsWith('/login')) {
        // 처음 로그인 했을때
        // 쿼리스트링 분리
        const { query } = url.parse(req.url);
        console.log(query);
        // 쿼리 스트링에서 실제 데이터('홍길동')만 분리합니다
        const { name } = qs.parse(query);
        console.log(name);
        // 쿠키 유효 시간을 위한 현재 날짜시간 데이터 생성
        const expires = new Date();
        // 쿠키의 유효시간을 현재 시간 +1 분으로 설정
        expires.setMinutes(expires.getMinutes() + 1);
        res.writeHead(302, {
            Location: '/',
            'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
    } else if(cookies.name){// login request가 아닌경우중 name쿠키가 있는경우
        // 현재 누군가 로그인 중....
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`${cookies.name}님 안녕하세요`);
    } else {// login request가 아닌경우중 name쿠키가 없는 경우
        // 현재 아무도 로그인 안한 상태 ...
        try {
            const data = await fs.readFile('./06_Cookie_page.html');
            res.writeHead(200, { 'Set-Cookie': 'mycookie=test' });
            res.end(data);
        }catch{
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(err.message);
        }
    }
    
}).listen(8083, () => {
    console.log('8083번 포트에서 서버 대기 중입니다!');
});