var express = require('express');
var router = express.Router();
const pool = require('../public/javascripts/connection');
const axios = require('axios');
const { getSeatableAuth } = require('../public/javascripts/utils/seatable-handlers');

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
    
    let seatableAuthInfo = await getSeatableAuth();
        
    const options = { 
        headers: { 
            "Authorization": `Token ${seatableAuthInfo.access_token}`
        }
    }

    const body = { 
        'sql': "SELECT ID, name FROM codeblocks"
    }

    console.log('in the call to lobby.js');
    console.log(req.session);
    req.session.seatableAuth = seatableAuthInfo;
    console.log(req.session);


    console.log('calling lobby data from seatable');
    const data = await axios.post(`https://cloud.seatable.io/dtable-db/api/v1/query/${seatableAuthInfo.dtable_uuid}/`, body, options) 

    const seatableData = data.data
    let tableDict = {}

    //organizing the mass of data that seatable gives us
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
