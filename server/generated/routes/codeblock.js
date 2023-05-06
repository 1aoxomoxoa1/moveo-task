var express = require('express');
var router = express.Router();
var pool = require('../public/javascripts/connection');
let axios = require('axios');

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

//when we first join the page we perform a get for the codeblock 
router.get('/', async (req, res) => {
    const id = String(req.query.id);

    const options = { 
        headers: { 
            "Authorization": process.env.SEATABLE_ACCESS_CODE
        }
    }

    const body = { 
        "sql": `SELECT * FROM codeblocks WHERE ID = '${id}'`
    }

    const data = await axios.post(`https://cloud.seatable.io/dtable-db/api/v1/query/${process.env.SEATABLE_TABLE_ID}/`, body, options) 

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


//Posting for updating the code block
router.post('/', (req, res) => {

    //get the name of the block of code and the body of code text
    const name = req.name; 
    const codeBody = req.code; 

    //I want to understand how I will write database query
    
});

module.exports = router;
