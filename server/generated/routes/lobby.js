var express = require('express');
var router = express.Router();
const pool = require('../public/javascripts/connection');
const axios = require('axios');
require("dotenv").config();


/* GET home page. -- gets all of the codeblocks names and ids */
// router.get('/', (req, res) => {
    
//     pool.query(  'SELECT ID, name FROM code',
//         function(err, results) {
//             if(err){
//                 console.error(err);
//             }else{
//                 console.log('SQL query start');
//                 console.log(results);
//                 console.log('SQL query end');
//                 res.send(results);
//             }
//         }
//     );

// });

router.get('/', async (req, res) => {
    const options = { 
        headers: { 
            "Authorization": process.env.SEATABLE_ACCESS_CODE
        }
    }

    const body = { 
        'sql': "SELECT ID, name FROM codeblocks"
    }

    const data = await axios.post(`https://cloud.seatable.io/dtable-db/api/v1/query/${process.env.SEATABLE_TABLE_ID}/`, body, options) 

    const seatableData = data.data
    let tableDict = {}

    for(const metadata of seatableData.metadata){
        tableDict[metadata.key] = metadata.name;
    }

    for(let object of data.data.results){
        for(let property in object){
            object[tableDict[property]] = object[property]
            delete object[property]
        }
        console.log(object)
    }

    res.send(data.data.results)
});

module.exports = router;
