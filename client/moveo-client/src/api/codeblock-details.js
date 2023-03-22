

export function sendToCodeblock(id, navigate, socket){
    
    // socketJoinEmission(id, navigate, socket);
    
}

// export function socketJoinEmission(id, socket, setIsMentor){
//     console.log('calling socketJoinEmission');
//     socket.emit('join-room', {id: id});

//     socket.on('join-room-resp', (data) => {
//         console.log('within join-room-resp');

//         //setting if the user is the first in the room or not
//         console.log(`isMentor ? : ${data.isMentor}`);
//         let isMentor = data.isMentor;
//         setIsMentor(isMentor);

//     });

//     console.log('here we are')
// }