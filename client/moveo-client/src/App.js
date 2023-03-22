import AppRouter from "./components/AppRouter";
import io from "socket.io-client"
import 'bootstrap/dist/css/bootstrap.min.css';
import { SocketClass } from "./api/SocketClass";

// mySocket.socket is socket // mySocket.io is the io
const mySocket = new SocketClass(io);


function App() {

  return (

    <div className="App">
      <AppRouter socket={mySocket.socket}> </AppRouter>
    </div>

  );
}

export default App;
