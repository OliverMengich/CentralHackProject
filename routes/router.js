const express = require('express');
const Person = require('../models/database');
const router = express.Router();
const funcs = require('../models/functions');

router.get('/',(req,res,next)=>{
    res.render('test',{
        pageTitle: 'Home',
        btnTitle: 'signUp'
    });
});
const proj = {
    name:'Cake',
    description: 'Sweet cake',
    amount: 55,
    votes: 0
};
router.get('/projects',(req,res,next)=>{
    res.render('project',{
        pageTitle: 'Projects',
        btnTitle: 'INITIATE PROJECT',
        proj: proj
    });
});
router.get('/join-us',(req,res,next)=>{
    res.render('join-us',{
        pageTitle: 'Join Us',
        btnTitle: 'signUp'
    });
});
router.get('/microInsurance',(req,res,next)=>{
    res.render('microInsurance',{
        pageTitle: 'Funding',
        btnTitle: 'REQUEST LOAN'
    });
});
router.post('/finance',(req,res)=>{
    const fullname = req.body.fullName;
    const amount = req.body.amount;
    const reason = req.body.reason;
    const date = req.body.date;
    const person = new Person();
    person.loansave(fullname,amount,reason,date);
    res.redirect('/');
});
router.post('/join-us',(req,res,next)=>{
    const fullName = req.body.fullname;
    const age = req.body.age;
    const idnumber = req.body.idnumber;
    const phonenumber = req.body.phonenumber;
    const password = req.body.password;
    const confirmPassword = req.body.confirmpassword
    const occupation = req.body.occupation;
    if(password == confirmPassword){
        //1. Add the details to the database
        const person = new Person(fullName,age,idnumber,phonenumber,password,occupation);
        person.save();
        //2. redirect to mainpage
        res.render('test', {
            btnTitle: 'signUp',
            pageTitle: 'Home'
        });
    }else{
        res.render('join-us',{
        btnTitle: 'Sign Up'
        });
    }
})
router.post('/request-loan', async(req,res,next)=>{
    //1. Receive result from the user in the frontEnd
    const description = req.body.description;
    const amount = req.body.amount; 
    //2. Call the requestLoan function with the passed parameters
    const results = await funcs.requestLoan(description, amount);
    // . render the results return to the HTML page
    res.render('test',{
        results:results
    });
});
router.get('/approve-Loan/:loanId',(req,res,next)=>{
    // gets the id of the Loan request
    const id = req.params.loanId;
    // 2. all the approve loan function
    let ans = funcs.approveLoan();
    //3. render the loan Id details to the HTML page
    const  results = approveLoan(id);
    res.render('test',{
        results:results
    });
});
router.get('/microInsurance',(req,res,next)=>{
    res.redirect('/microInsurance');
});
router.post('/microInsurance',(req,res,next)=>{
    // 1. get the input parameters from the user
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const fullName = firstName + lastName;
    //2. call the microInsurance function. pass the params
    const results = funcs.microInsurace(fullName);
    // 3/. render the results to the pages
    res.render('microInsurance',{
        results: results
    });
});
router.post('/approveProject/:projectId',(req,res,next)=>{
    // 1.  get the input parameters from the USer
    const projectId = req.body.projectId;
    // 2. call the approveProject function
    const approveProject = funcs.approveProject(projectId);
    //3. render the results to the HTML page
    if(approveProject.length > 0){
        res.render('projects',{
            results: approveProject
        });
    }
});
router.post('/passProjectFunds/:projectId',(req,res,next)=>{
    
});
router.post('/sendMonthlyContribution',(req,res,next)=>{
    //1. receive the amount user wants to send 
    const amount = req.body.amount;
    //. 2. call the send money functioon
    funcs.sendMonthlyContribution(amount,false);
});
module.exports = router;
