import { useState, useEffect } from "react";
import { getCodeblocksLobby, lobbyUseEffectFn } from "../api/lobby";
import { SocketClass } from "../api/SocketClass";
import '../css/lobby.css'
import CodeBlockDetails from "./CodeBlockDetails";


function Lobby({socket}){ 
    
    const [codeblocksList, setCodeblocksList] = useState([]); 

    //1) on page load get the list of codeblocks
    //2) and check if one of the mentors (by socket.id) pressed back and left the codeblock
    useEffect(() => {
        lobbyUseEffectFn(setCodeblocksList);
        SocketClass.checkIfMentorLeft(socket); 
    }, [])


    return( 
       <div className="lobby-container">
            <h2> Choose code block: </h2> 
            <div className="codeblocks-container"> 
                {codeblocksList.map( (codeblock, index) => 
                    <CodeBlockDetails
                        key={codeblock.ID}
                        id = {codeblock.ID}
                        number={index}
                        name={codeblock.name}
                        socket={socket}
                    /> 
                )

                }
            </div>

       </div>
    )
}

export default Lobby;