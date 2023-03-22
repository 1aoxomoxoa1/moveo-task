CREATE DATABASE codeblocks; 

USE codeblocks; 

CREATE TABLE code (
	ID INT NOT NULL AUTO_INCREMENT, 
	name VARCHAR(60),
    code VARCHAR(10000),
    PRIMARY KEY (ID)
); 


INSERT INTO code (name, code) 
VALUES ('sum array function' , 'function sum_array(arr){
	let sum = 0;
    for(let i = 0 ; i < arr.length; i++){
		sum += arr[i];
    }
    return sum; 
}');

INSERT INTO code (name, code) 
VALUES ('max in array function' , 'function max_arr(arr){
	let max = -Infinity;
    for(let i = 0 ; i < arr.length; i++){
		if(arr[i] > max){ 
			max = arr[i];
        }
    }
    return max; 
}');

INSERT INTO code (name, code) 
VALUES ('fn returning promises for email validation' , 'function checkEmailInDb(email){
    return new Promise((resolve, reject) => {
            //check if an account with the email exists already
            pool.query("SELECT * FROM customers WHERE email = ?",
            [email],
            (err, result) => {          
                if(err){
                    reject(err);
                }
                
                resolve(result);
            }
        )
    })   
}');


INSERT INTO code (name, code) 
VALUES ('is_palindrome recursive' , 'var isPalindrome = function(str) {
    var strLen = str.length;
    if (strLen === 0 || strLen === 1) {
        return true;
    }
    
    if (str[0] === str[strLen - 1]) {
        return isPalindrome( str.slice(1, strLen - 1) );
    }
    
    return false;
};');


