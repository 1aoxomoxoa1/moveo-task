

export class SocketClass{
    constructor(io) {
        const socket = io.connect(process.env.REACT_APP_SERVER_ROUTE);
        console.log(io);
        console.log(socket);
        this.socket = socket;
        this.io = io;
    }

    //** PLAYER JOINS THE SOCKET
    //  * 
    //  * @param {*} id 
    //  * @param {*} socket 
    //  * @param {*} setIsMentor 
    //  */
    static joinSocket(id, socket, setIsMentor){
        console.log('calling socketJoinEmission');
        
        socket.emit('join-room', {id: id});

        socket.on('join-room-resp', (data) => {
            console.log('within join-room-resp');

            //setting if the user is the first in the room or not
            console.log(`isMentor ? : ${data.isMentor}`);
            let isMentor = data.isMentor;
            setIsMentor(isMentor);

        });
    }

    static checkIfMentorLeft(socket){
        console.log('calling checkIfMentorLeft')
        socket.emit('lobby-check', {test: '1'});

        socket.on('check-resp', (data) => {
            
        })
    }

    static emitCodeToRoom(socket, id, code){
        const room = `room-${id}`;
        console.log(`emitting to ${room}`);
        console.log(code);
        socket.emit('upd-mentor', {code: code, room: room});
    }

    //function to make the MENTOR start chain of leaving the room
    static emitEndRoom(socket, id, code){
        const room = `room-${id}`;
        socket.emit('end-room', {code: code, room: room});
    };

    //makes everyone actually leave the socket room instance
    static leaveRoom(socket, room){
        socket.emit('leave-room', {room: room});

        socket.on('leave-resp', () => { 
            console.log('within leave-resp')
        })
    }
}

