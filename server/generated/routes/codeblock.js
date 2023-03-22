var express = require('express');
var router = express.Router();
var pool = require('../public/javascripts/connection');


//when we first join the page we perform a get for the codeblock 
router.get('/', (req, res) => {
    const id = req.query.id;

    //get the data from the id
    pool.query(  `SELECT * FROM code WHERE id = ${id}`,
        function(err, results) {
            if(err){
                console.error(err);
            }else{
                res.send(results);
            }
        }
    );

});

//Posting for updating the code block
router.post('/', (req, res) => {

    //get the name of the block of code and the body of code text
    const name = req.name; 
    const codeBody = req.code; 

    //I want to understand how I will write database query
    
});

module.exports = router;
