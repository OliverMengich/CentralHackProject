const {abiContract, client} = require('../controllers/depend');
const  { contractPackage } = require('../controllers/contractPackage');
async function logEvents(params, response_type) {
    console.log(`params = ${JSON.stringify(params, null, 2)}`);
    console.log(`response_type = ${JSON.stringify(response_type, null, 2)}`);
}

async function ProcessMessage(params){
    try {
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
        }, logEvents);
        let results = touch_processing_result.decoded.output
        return results
    } catch (error) {
        return error.message;
    }
    
}
module.exports = { ProcessMessage };