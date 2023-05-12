import axios from "axios";


axios.defaults.withCredentials = true;


//**
//  * 
//  */
async function getCodeblocksLobby(){

    try {
        console.log(process.env.REACT_APP_SERVER_ROUTE);
        let lobbyCodeblocks = await axios.get(process.env.REACT_APP_SERVER_ROUTE, {headers: {credentials: 'include'}});
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

//** this will set the authorization code that we need for seaTable to work when the page loads session storage
//  * 
//  */
export async function setSeatableAuth(){
    const options = { 
        headers: {
            'Authorization': process.env.SEATABLE_AUTH
        }
    }

    let seatableInfo = await axios.get(`${process.env.REACT_APP_SERVER_ROUTE}/auth`, {headers: {credentials: 'include'}});
}
