const pool = require('../connection.js');
let axios = require('axios');

// //** FN Will cause 
//  * 
//  * @param {*} io 
//  * @param {*} socket 
//  * @param {*} room -- room number for socket operations
//  * @param {*} code -- this code we want to save and update db {undefined if user leaves without btn}
//  */
function endRoom(io, socket, room, code, codeblockTeachers, teachersSet){
    //mentor leaves the room then
    console.log('in endRoom');
    // socket.to(room).emit("room-end", {});
    console.log(room);
    console.log(io.sockets.adapter.rooms.get(room));
    console.log(io.sockets.adapter.rooms.get(room));
    
    
    
    
    //will send a message to all of themm
    io.to(room).emit("room-end", {room: room});
    socket.leave(room);
    codeblockTeachers.delete(socket.id);
    teachersSet.delete(socket.id);

    if(code){ 
        saveCode(room, code);
    }
}

//**
//  * 
//  * @param {*} room -- room number for query
//  * @param {*} code -- code to save
//  */
async function saveCode(room, code){
    const roomId = String(room.slice(-1));
    console.log(roomId);
    console.log(code);

    const options = { 
        headers: { 
            "Authorization": process.env.SEATABLE_ACCESS_CODE
        }
    }

    const body = { 
        "sql" : `UPDATE codeblocks SET code='${code}' WHERE ID='${roomId}'`
    }

    const data = await axios.post(`https://cloud.seatable.io/dtable-db/api/v1/query/${process.env.SEATABLE_TABLE_ID}/`, body, options) 

    console.log(data);

    // ----- CODE BEFORE MOVE TO SEATABLE ----- 
    // pool.query('UPDATE code SET code = ? WHERE ID = ?', 
    //     [code, roomId],
    //     function(err, results) {
    //         if(err){
    //             console.error(err);
    //         }else{
    //             console.log('updated code')
    //             console.log(results);
    //         }
    //     }
    // )
}


module.exports = {endRoom}