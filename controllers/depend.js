const {contractPackage} = require('./contractPackage');
const fs = require('fs');

const {abiContract, TonClient } = require('@tonclient/core');

const keypair = JSON.parse(fs.readFileSync('./ContractKeys.keys.json', 'utf8'));
const client = new TonClient({
    network: {
        endpoints: ['https://net.ton.dev/']
    }
});
module.exports = {
    contractPackage,
    keypair,
    client,
    abiContract
};