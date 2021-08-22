// 수정
document.getElementById('update-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    const subject = e.target.subject.value;
    const text = e.target.text.value;
    const image = e.target.image.value;
    if (!subject) {  return alert('제목을 입력하세요');    }
    if (!text) {  return alert('내용을 입력하세요');    }

    const formData = new FormData();
    if(img) { formData.append('iamge', e.target.image.files[0]);}
        formData.append('id', id);
        formData.append('subject', subject);
        formData.append('text', text);
    try {
        await axios.post('/boards/update', formData);
        location.href = `/boards/boardView2/${id}`;
    } catch (err) {
        console.error(err);
    }
});