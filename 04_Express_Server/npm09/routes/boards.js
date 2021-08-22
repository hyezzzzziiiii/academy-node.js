const express = require('express');
const Member = require('../models/member');
const Board = require('../models/board');
const Reply = require('../models/reply');

const multer = require('multer');
const fs = require('fs');
const path = require('path');

const router = express.Router();

try {
    fs.readdirSync('public/upload');
} catch (error) {
    console.error('upload 폴더가 없어 upload 폴더를 생성합니다.');
    fs.mkdirSync('public/upload');
}

const upload = multer({
    storage: multer.diskStorage({
            destination(req, file, done) {
            done(null, 'public/upload/');
        },
            filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});


router.get('/', async (req, res, next)=>{
    try {
        const boards = await Board.findAll({
            order : [['created_at' , 'DESC']],
        }); 
        res.json(boards);
    } catch (err) {
        console.error(err);
        next(err); 
    }
});

router.get('/writeForm', (req, res, next)=>{
    try {
        const luser = req.session.loginUser;
        res.render('writeform', {luser});
    } catch (err) {
        console.error(err);
        next(err); 
    }
});

router.post('/writeBoard', upload.single('image'), async (req, res, next)=>{
    try {
        const board = await Board.create({
            subject: req.body.subject,
            writer: req.body.writer,
            text: req.body.text,
            filename : req.file.originalname,
            realfilename : req.file.filename,
        });
        console.log(board); 
        res.json(board); 
    } catch (err) {
        console.error(err);
        next(err); 
    }
});


router.get('/boardView/:id', async (req, res, next)=>{
    try {
        const result = await Board.findOne({
            where : { id : req.params.id },
        }); // 1 개 레코드가 있는 테이블
        const result_cnt = await Board.findOne({
            attributes : [ 'readCount' ],
            where : { id : req.params.id },
        }); // 1 개 레코드가 있는 테이블

        let cnt = result.readCount; // result_cnt.readCount
        cnt = cnt + 1;
        
        await Board.update({
            readCount : cnt,
        },{
            where:{id:req.params.id},
        });

        const board = await Board.findOne({
            where : { id : req.params.id },
        }); 
        const luser = req.session.loginUser;
        res.render('boardView', {board , luser});
    } catch (err) {
        console.error(err);
        next(err); 
    }
});


router.get('/UpdateForm/:id', async (req, res, next)=>{
    try {
        const board = await Board.findOne({
            where : { id : req.params.id },
        }); 
        res.render('UpdateForm', {board});
    } catch (err) {
        console.error(err);
        next(err); 
    }
});

// 수정 
router.post('/update' , upload.single('image'), async (req, res, next)=>{
    try {
        if(req.file){
        const board = await Board.update({
            subject : req.body.subject,
            text: req.body.text,
            filename : req.file.originalname,
            realfilename : req.file.filename,
          }, {
            where: { id: req.body.id },
          });
          res.json(board);
        }else{
            const board = await Board.update({
                subject : req.body.subject,
                text : req.body.text,
            },{
                where : { id: req.body.id},
            });
            res.json(board);
        }
        
        // res.redirect('/boards/boardView2/' + req.body.id);
    } catch (err) {
        console.error(err);
        next(err); 
    }
});




router.get('/boardView2/:id', async (req, res, next)=>{
    try {
        const board = await Board.findOne({
            where : { id : req.params.id },
        }); 
        const luser = req.session.loginUser;
        res.render('boardView', {board, luser});
    } catch (err) {
        console.error(err);
        next(err); 
    }
});

router.post('/getReply', async (req, res, next)=>{
    try {
        const board = await Reply.findAll({
            where: { boardnum : req.body.boardnum },
            order : [['created_at' , 'DESC']],
        });
        res.json(board);
    } catch (err) {
        console.error(err);
        next(err); 
    }
});


router.post('/writeReply', async (req, res, next)=>{
    const rep_writer = req.session.loginUser;
    try{
        const result = await Reply.create({
            boardnum : req.body.boardnum,
            writer : rep_writer.userid,
            reply : req.body.reply,
        });
        res.json(result);
    }catch(err){
        console.log(err);
    }
});


router.get('/replycnt/:id', async (req, res, next)=>{
    try{
        const result = await Reply.findAll({
            where : { boardnum:req.params.id},
        });
        console.log(result.length);
        res.json(result);
    }catch(err){
        console.log(err);
    }
});


module.exports = router;