var express = require('express');
var router = express.Router();
var pool = require('../public/javascripts/connection');
let axios = require('axios');


//** This takes care of retrieving the Seatable Auth code that we use for each user's session
// */
router.get('/', async (req, res) => {
    console.log('in the second request')

    const options = { 
        headers: {
            'Authorization': process.env.SEATABLE_AUTH
        }
    }

    let seatableInfo = await axios.get(`https://cloud.seatable.io/api/v2.1/dtable/app-access-token/`, options)
    
    console.log(seatableInfo.data)

    req.session.seatableAuth = {'access_token': `Token ${seatableInfo.data.access_token}`} 
    console.log(req.session);
    console.log('where i set the session')
    req.session.save(() => {
        res.send({'success': true})
    })

})


module.exports = router