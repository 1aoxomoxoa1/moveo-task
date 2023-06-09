var express = require('express');
var router = express.Router();
var pool = require('../public/javascripts/connection');
let axios = require('axios');
const { getSeatableAuth } = require('../public/javascripts/utils/seatable-handlers');


// //when we first join the page we perform a get for the codeblock 
// router.get('/', (req, res) => {
//     const id = req.query.id;

//     //get the data from the id
//     pool.query(  `SELECT * FROM code WHERE id = ${id}`,
//         function(err, results) {
//             if(err){
//                 console.error(err);
//             }else{
//                 res.send(results);
//             }
//         }
//     );

// });

//when we first join the page for specific codeblock we perform a get for the codeblock 
router.get('/', async (req, res) => {
    const id = String(req.query.id);

    console.log('codeblock.js route')
    let seatableAuthInfo = await getSeatableAuth();

    const options = { 
        headers: { 
            "Authorization": `Token ${seatableAuthInfo.access_token}`
        }
    }
    
    const body = { 
        "sql": `SELECT * FROM codeblocks WHERE ID = '${id}'`
    }

    const data = await axios.post(`https://cloud.seatable.io/dtable-db/api/v1/query/${seatableAuthInfo.dtable_uuid}/`, body, options) 

    const seatableData = data.data;
    let tableDict = {};

    for(const metadata of seatableData.metadata){
        tableDict[metadata.key] = metadata.name;
    }

    for(let object of data.data.results){
        for(let property in object){
            object[tableDict[property]] = object[property];
            delete object[property];
        }
        console.log(object)
    }

    res.send(data.data.results);

});


module.exports = router;
