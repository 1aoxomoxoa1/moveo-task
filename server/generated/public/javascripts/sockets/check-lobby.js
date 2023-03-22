const {endRoom} = require('./end-room');

async function lobbyCheck(io, socket, codeblockTeachers, teachersSet){
    
    //check if the socketUser is a teacher when in the lobby
    const isTeacher = checkIfTeacher(io, socket, codeblockTeachers, teachersSet)
    console.log(`isTeacher: ${isTeacher}`);

    console.log(codeblockTeachers);
    console.log(teachersSet);

    //if a teacherLeft -- get the room teacher was in and end it
    if(isTeacher){
        roomName = getTeachersRoom(socket, codeblockTeachers);
        endRoom(io, socket, roomName, undefined, codeblockTeachers, teachersSet);
    }else{ 
        //count if student is in >= 2 rooms
        let socketCount = 0; 
        let roomName; 
        
        for(let [rName, roomSet] of io.sockets.adapter.rooms){
            if(roomSet.has(socket.id)){
                socketCount++;
                if(rName !== socket.id){
                    roomName = rName;
                }
            }
        }
    
        if(socketCount >= 2){
            console.log(`${socket.id} in two rooms, remove...`);
            socket.leave(roomName);
        }

    }
}

function checkIfTeacher(io, socket, codeblockTeachers, teachersSet){
    console.log(`checking if teacher socket user: ${socket.id}`);
    console.log(io.sockets.adapter.rooms);
    let roomSets = [...io.sockets.adapter.rooms.values()];
    
    //check if the socketUser is a teacher
    const isTeacher = (teachersSet.has(socket.id));
    return isTeacher;
}

function getTeachersRoom(socket, codeblockTeachers){
    const roomNumber = codeblockTeachers.get(socket.id);
    let roomName = `room-${roomNumber}`;
    return roomName;
}


module.exports = {lobbyCheck, checkIfTeacher, getTeachersRoom}