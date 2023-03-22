import { useEffect, useState } from "react";
import { codeblockUseEffectFn } from "../api/codeblock";
import '../css/codeblocks.css';
import CodeInsert from "./CodeInsert";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Button } from "react-bootstrap";
import { SocketClass } from "../api/SocketClass";
import {useNavigate} from 'react-router-dom'

function CodeBlock({socket}){ 

    const navigate = useNavigate();

    //state for codeblock that is displayed
    const [codeEditor, setCodeEditor] = useState("");
    const [codeViewer, setCodeViewer] = useState("");
    const [name, setName] = useState("");
    const [id, setId] = useState("");

    // True | False determining if the use is a Mentor or not
    const [isMentor, setIsMentor] = useState(false);
    
     //when mentor's code changes show it to the rest of the rooom
     useEffect(() => {
        SocketClass.emitCodeToRoom(socket, id, codeEditor);
    }, [codeEditor]);

    // this listens for the code update in case where user is NOT mentor
    socket.on('code-update', (data) => {
        console.log('caught code update');
        console.log(data.code);
        setCodeViewer(data.code);
    });

    //case when room ended by mentor
    socket.on('room-end', (data) => {
        console.log(`in room end for room ${data.room}`);
        // SocketClass.leaveRoom(socket, data.room);
        navigate('/');
    });

        socket.on('leave-resp')


   


    //on page load
    useEffect( () => {
        async function within(){
            let id = await codeblockUseEffectFn(setCodeEditor, setCodeViewer, setName);
            setId(id);
            console.log(`id being printed: ${id}`)
            SocketClass.joinSocket(id, socket, setIsMentor);
        };

        within();
    }, []);


    //if codeblock changes

    return( 

       <div className="block-container">
            <h2> {name}  </h2>
            { isMentor === true  //if user isMentor
                ? 
                <div>
                    <CodeInsert  //they can edit
                        codestring={codeEditor}
                        setCodeEditor={setCodeEditor}
                        id={id}
                        socket={socket}> 
                    </CodeInsert> 
                    <Button 
                        variant="outline-success" 
                        style={{marginTop: '2%'}}
                        onClick={() => SocketClass.emitEndRoom(socket, id, codeEditor)}
                        > 
                        Save and Exit Room 
                    </Button>
                    <p style={{marginTop: '10px'}}>  please save to preserve code changes</p>
                </div>
                :<SyntaxHighlighter language="javascript" style={docco}>  
                    {codeViewer}
                </SyntaxHighlighter>
            }
       </div>
    )
}

export default CodeBlock;