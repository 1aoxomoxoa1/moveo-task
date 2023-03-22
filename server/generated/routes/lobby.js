var express = require('express');
var router = express.Router();
const pool = require('../public/javascripts/connection');


/* GET home page. -- gets all of the codeblocks names and ids */
router.get('/', (req, res) => {
    
    pool.query(  'SELECT ID, name FROM code',
        function(err, results) {
            if(err){
                console.error(err);
            }else{
                console.log('SQL query start');
                console.log(results);
                console.log('SQL query end');
                res.send(results);
            }
        }
    );

});

module.exports = router;
