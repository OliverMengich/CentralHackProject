const address = "0:b9dc9b7df2eb6cc005fd7cd693dc567ea4be7a0b1c429853bf38aa2992cb988d";
const {contractPackage, keypair} = require('../controllers/depend');
console.log(keypair);
const ProcessMessage = require('../models/process')
const {abiContract, TonClient} = require('@tonclient/core');
const {libNode} = require('@tonclient/lib-node');
TonClient.useBinaryLibrary(libNode);


function requestLoan(desc, amount) {
    const submitTransactionParams = {
        description: '',
        value: amount,
    };
    const params = {
        abi: abiContract(contractPackage.abi),
        address,
        call_set: {
            function_name: "requestLoan",
            input: submitTransactionParams
        },
        signer: {
            type: 'Keys',
            keys: keypair
        }
    };
    const result = ProcessMessage.ProcessMessage(params);
    return result;
}

function approveLoan(){
    const submitTransactionParams = {
        index:0
    }
    const params = {
        abi: abiContract(contractPackage.abi),
        address,
        call_set:{
            function_name: "approveLoan",
            input: submitTransactionParams
        },
        signer: {
            type: 'Keys',
            keys: keypair
        },
    }
    ProcessMessage.ProcessMessage(params);
}
function sendMonthlyContribution(){
    const submitTransactionParams = {
        amount: 53545,
        bounce: false
    };
    const params = {

        abi: abiContract(contractPackage.abi),
        address,
        call_set: {
            function_name: "approveLoan",
            input: submitTransactionParams
        },
        signer: {
            type: 'Keys',
            keys: keypair
        },
    };
    ProcessMessage.ProcessMessage(params);
}
function microInsurace(){
    const submitTransactionParams = {
        fullName: ''
    };
    const params = {
        abi: abiContract(contractPackage.abi),
        address,
        call_set: {
            function_name: "approveLoan",
            input: submitTransactionParams
        },
        signer: {
            type: 'Keys',
            keys: keypair
        },
    };
    ProcessMessage.ProcessMessage(params);
}
function triggerInsurance(){
    const submitTransactionParams = {
        insureNumber: 0
    };
    const params = {

        abi: abiContract(contractPackage.abi),
        address,
        call_set: {
            function_name: "triggerInsurance",
            input: submitTransactionParams
        },
        signer: {
            type: 'Keys',
            keys: keypair
        },
    };
    ProcessMessage.ProcessMessage(params);
}
function expireInsurance(){
    const submitTransactionParams = {
        index: 0
    };
    const params = {

        abi: abiContract(contractPackage.abi),
        address,
        call_set: {
            function_name: "expireInsurance",
            input: submitTransactionParams
        },
        signer: {
            type: 'Keys',
            keys: keypair
        },
    };
    ProcessMessage.ProcessMessage(params);
}
function renewInsurance(){
    const submitTransactionParams = {
        index: 0
    };
    const params = {

        abi: abiContract(contractPackage.abi),
        address,
        call_set: {
            function_name: "renewInsurance",
            input: submitTransactionParams
        },
        signer: {
            type: 'Keys',
            keys: keypair
        },
    };
    ProcessMessage.ProcessMessage(params);
}
function initiateProject(){
    const submitTransactionParams = {
        projectName: '',
        description: '',
        amount: 3435445,
    };
    const params = {

        abi: abiContract(contractPackage.abi),
        address,
        call_set: {
            function_name: "initiateProject",
            input: submitTransactionParams
        },
        signer: {
            type: 'Keys',
            keys: keypair
        },
    };
    ProcessMessage.ProcessMessage(params);
}
function passProjectFunds() {
    const submitTransactionParams = {
        index: 0
    };
    const params = {
        abi: abiContract(contractPackage.abi),
        address,
        call_set: {
            function_name: "passProjectFunds",
            input: submitTransactionParams
        },
        signer: {
            type: 'Keys',
            keys: keypair
        },
    };
    ProcessMessage.ProcessMessage(params);
}
function approveProject(){
    const submitTransactionParams = {
        index: 0
    };
    const params = {

        abi: abiContract(contractPackage.abi),
        address,
        call_set: {
            function_name: "approveProject",
            input: submitTransactionParams
        },
        signer: {
            type: 'Keys',
            keys: keypair
        },
    };
    ProcessMessage.ProcessMessage(params);
}
module.exports = { 
    requestLoan, 
    approveLoan, 
    sendMonthlyContribution, 
    microInsurace , 
    triggerInsurance , 
    expireInsurance, 
    renewInsurance,
    initiateProject,
    passProjectFunds,
    approveProject
};