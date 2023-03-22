import axios from "axios";


//**
//  * 
//  */
async function getCodeblocksLobby(){

    try {
        console.log(process.env.REACT_APP_SERVER_ROUTE);
        let lobbyCodeblocks = await axios.get(process.env.REACT_APP_SERVER_ROUTE);
        console.log(lobbyCodeblocks);
        return lobbyCodeblocks;
    } catch (error) {
        console.error(error);
    }

}


export async function lobbyUseEffectFn(setCodeblocksList){
    console.log('calling lobbyUseEffectFn');
    let codeblocks = await getCodeblocksLobby(); 
    console.log(codeblocks.data);
    setCodeblocksList(codeblocks.data);
}


