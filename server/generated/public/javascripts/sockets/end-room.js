const pool = require('../connection.js');

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
    const roomId = Number(room.slice(-1));
    console.log(roomId);
    console.log(code);
    pool.query('UPDATE code SET code = ? WHERE ID = ?', 
        [code, roomId],
        function(err, results) {
            if(err){
                console.error(err);
            }else{
                console.log('updated code')
                console.log(results);
            }
        }
    )
}


module.exports = {endRoom}