import React from "react";
import { BrowserRouter, Route, Routes,  } from 'react-router-dom';
import Lobby from "./Lobby";
import CodeBlock from "./CodeBlock";


function AppRouter({socket}){ 

    return( 
        <BrowserRouter>
            <Routes> 
                <Route path='/' element={<Lobby socket={socket} />} /> 
                <Route path='/block' element={<CodeBlock socket={socket} />} /> 
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;