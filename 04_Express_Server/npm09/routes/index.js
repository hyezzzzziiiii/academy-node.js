const express = require('express');
const Member = require('../models/member');
const Board = require('../models/board');
const Reply = require('../models/reply');
const router = express.Router();


router.get('/main', (req, res, next)=>{
    const luser = req.session.loginUser;
    console.log(req.session.loginUser);
    try {
        res.render('main', { luser });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/', (req, res, next)=>{
    try{
        console.log(req.session.loginUser);
        res.render('login');
        //res.sendFile( path.join( __dirname, '../views/login.html') );
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;