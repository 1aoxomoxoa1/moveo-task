const mySql = require('mysql2');
require("dotenv").config();

let poolObj;
console.log(process.env.USER);
if(process.env.NODE_ENV === undefined){ //when running on local
    poolObj = {
        connectionLimit: 10,
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DB,
    };
}else if (process.env.NODE_ENV === 'production'){ // when running on docker
   
    console.log('making production pool');
    //these ENV variables are from the docker-compose file
    poolObj = {
        connectionLimit: 10,
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB,
    };
}



const pool = mySql.createPool(poolObj);

//** FN RETURNS PROMISE SO YOU CAN QUERY WITH ASYNC/AWAIT
//  * 
//  * @param {str} query -- string specifying your query to the CODE db
//  * @returns -- promise allowing you to use pool with async/await
//  */
function queryPromise(query){
    return new Promise((resolve, reject)=>{
        pool.query(query,  (error, results)=>{
            if(error){
                return reject(error);
            }
            return resolve(results);
        });
    });
}

// async function countCodeblocks(){
    
//     const query = 'SELECT * FROM code';

//     let codeblocks = await queryPromise(query);
//     console.log(codeblocks);
//     return codeblocks.length;
// }



module.exports = pool;

