import CodeEditor from "@uiw/react-textarea-code-editor";
import { useState, useEffect } from "react";
import { SocketClass } from "../api/SocketClass";

function CodeInsert({codestring, socket, id, setCodeEditor}){
    
    return (
        <CodeEditor
            value={codestring}
            language="js"
            placeholder="Please enter JS code."
            onChange={(evn) => setCodeEditor(evn.target.value)}
            padding={15}
            style={{
                fontSize: 12,
                backgroundColor: "darkgrey",
                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            }}
        >
        </CodeEditor>
    )
};


export default CodeInsert;