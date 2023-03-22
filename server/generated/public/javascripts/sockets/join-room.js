function socketJoinRoom(io, socket, data, codeblockTeachers, teachersSet){
    const room = `room-${data.id}`
    console.log(`join-room socket on ${room}`)
    console.log(io.sockets.adapter.rooms.get(room));

    
    console.log(`socket id: ${socket.id}`);

    //if the room has not been joined then set the room's teacher as this socket's id
    let isMentor;
    if(io.sockets.adapter.rooms.get(room) === undefined || io.sockets.adapter.rooms.get(room).has(socket.id)){
      codeblockTeachers.set(socket.id, data.id)
      teachersSet.add(socket.id);
      isMentor = true;
    }else{
      isMentor = false; 
    }

    console.log(`isMentor: ${isMentor}`);

    socket.join(`room-${data.id}`);
    socket.emit('join-room-resp', {isMentor: isMentor})
}

module.exports = {socketJoinRoom};