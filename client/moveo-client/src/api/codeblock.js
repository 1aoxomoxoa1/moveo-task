import axios from "axios";

export async function codeblockUseEffectFn(setCodeEditor, setCodeViewer, setName){
    const id = getUrlParam('id');
    console.log(id);
    let codeblock = await getCodeblock(id);
    setCodeEditor(codeblock.code);
    setCodeViewer(codeblock.code);
    setName(codeblock.name);
    console.log(codeblock);
    return id;
}


//**
//  * 
//  * @param {*} param -- takes urlParam we want the value for
//  * @returns -- value of the param as an integer
//  */
function getUrlParam(param){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const valueParam = urlParams.get(param)
    return Number(valueParam);
}

async function getCodeblock(id){
    try {
        let codeblockServer = await axios.get(`${process.env.REACT_APP_SERVER_ROUTE}/codeblock?id=${id}`);
        console.log(codeblockServer)
        return codeblockServer.data[0]; 
    } catch (error) {
        console.error(error);
    }
}