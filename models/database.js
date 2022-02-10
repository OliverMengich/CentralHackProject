
const { paramsOfAppDebotBrowserApprove } = require('@tonclient/core');
const path = require('path');
const p = path.join(path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const funcs = require('./functions');
module.exports = class Person{
    constructor(fullname,age,idnumber,phonenumber,password,occupation){
        this.fullname = fullname;
        this.age = age;
        this.idnumber = idnumber;
        this.phonenumber = phonenumber;
        this.password = password;
        this.occupation = occupation; 
    }
    save(){
        const sqlite3 = require('sqlite3').verbose();
        const db = new sqlite3.Database('./db.sqlite3');
        db.run('INSERT INTO User(fullname,age,idnumber,phonenumber,password,occupation) VALUES(?,?,?,?,?,?)',[this.fullname,this.age,this.idnumber,this.phonenumber,this.password,this.occupation],
            (err)=>{
                if(err){
                    console.log('error encountered ' + err);
                }else{
                    console.log('data succesfully inserted'); 
                }
        });
        db.close((err)=>{
            if(err){
                console.log(err);
            }
            console.log('COnnection Closed');
        });
    }
    loansave(fullname,amount,reason,date){
        const sqlite3 = require('sqlite3').verbose();
        const db = new sqlite3.Database('./loan.sqlite3');
        
        db.run('INSERT INTO LOAN(fullname,amount, reason, date) VALUES(?,?,?,?)',[fullname,amount,reason,date],(err)=>{
            if(err){
                console.log(err);
            }else{
                console.log('inserted');
            }
        });
        db.close((err)=>{
            if(err){
                console.log(err);
            }
            console.log('COnnection Closed');
        });
    }
}