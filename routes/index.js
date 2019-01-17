/**
 * 
 */

 var express = require('express');
 //var proxysrv = require('../service/witserviceproxy');

 const router = express.Router();

 let Wit = null;
 let log = null;
 try {
   // if running from repo
   Wit = require('../').Wit;
   log = require('../').log;
 } catch (e) {
   Wit = require('node-wit').Wit;
   log = require('node-wit').log;
 }
 
 // Setting up our bot
const wit = new Wit({
    accessToken: 'FUPT7DGZEVHMF3Y4U32XVXHFCLPENGYX',//WIT_TOKEN,
    logger: new log.Logger(log.INFO)
  });

  
 var get = router.get('/:text', (req,res)=>{
    //var id = req.query.id; // si like $_GET["id"]
    var text = req.params.text;
    if(text == null)
        text = 'N/A';
    //var all = req.query;
    
//     $.ajax({
//         url: 'https://api.wit.ai/message',
//         data: {
//           'q': text,
//           'access_token' : 'FUPT7DGZEVHMF3Y4U32XVXHFCLPENGYX'
//         },
//         dataType: 'jsonp',
//         method: 'GET',
//         success: function(response) {
//             console.log("success!", response);
//         }
//   });
  
    wit.message(text).then(({entities}) => {
    // You can customize your response to these entities
    console.log(entities);
    // For now, let's reply with another automatic message
    //fbMessage(sender, `We've received your message: ${text}.`);
  })
  .catch((err) => {
    console.error('Oops! Got an error from Wit: ', err.stack || err);
  })

    console.log(text);

        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end("usted escribio " + text);
    });

module.exports = get;