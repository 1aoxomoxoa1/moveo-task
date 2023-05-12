let axios = require('axios')

async function getSeatableAuth(){
    const options = { 
        headers: {
            'Authorization': process.env.SEATABLE_AUTH
        }
    }

    let seatableInfo = await axios.get(`https://cloud.seatable.io/api/v2.1/dtable/app-access-token/`, options);

    return seatableInfo.data
}



module.exports = {getSeatableAuth};
