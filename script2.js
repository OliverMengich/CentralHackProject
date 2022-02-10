const address = "0:b9dc9b7df2eb6cc005fd7cd693dc567ea4be7a0b1c429853bf38aa2992cb988d";
const { abiContract, signerKeys, TonClient } = require('@tonclient/core');
const { libNode } = require("@tonclient/lib-node");
TonClient.useBinaryLibrary(libNode);

async function logEvents(params, response_type) {
    console.log(`params = ${JSON.stringify(params, null, 2)}`);
    console.log(`response_type = ${JSON.stringify(response_type, null, 2)}`);
}

async function requestLoan() {

    //import { contractPackage } from "./contractPackage.js";
    const { contractPackage } = require("./controllers/contractPackage");
    //import fs from "fs";
    const fs = require('fs');
    const keypair = JSON.parse(fs.readFileSync('./ContractKeys.keys.json', 'utf8'));
    console.log(keypair);
    const client = new TonClient({
        network: {
            endpoints: ['https://net.ton.dev/']
        }
    });
    const submitTransactionParams = {
        description: '',
        value: 3430000,
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
        },
    };
    try {
        console.log('The parameters are '+params);
        const encode_touch_result = await client.abi.encode_message(params);

        console.log('Encoded successfully');
        let shard_block_id;
        shard_block_id = (await client.processing.send_message({
            message: encode_touch_result.message,
            send_events: true,
        }, logEvents, )).shard_block_id;
        console.log(`Touch message was sent.`);
        const touch_processing_result = await client.processing.wait_for_transaction({
                abi: abiContract(contractPackage.abi),
                message: encode_touch_result.message,
                shard_block_id: shard_block_id,
                send_events: true
            },
            logEvents
        );
        console.log('The results are');
        console.log(touch_processing_result.decoded);
    } catch (error) {
        console.log("There is an error");
        console.log(error);
    }
}
requestLoan();
