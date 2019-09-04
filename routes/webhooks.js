
/**
 * daniel caime
 */


var express = require('express');
var request = require('request');
//import request from 'request';

const router = express.Router();
//take token from enviroment - dcaime
const token = process.env.WEBHOOK_TOKEN || '123456';

var get = router.get('/', (req, res) => {
    console.log('llamada al webhook')
    if (req.query['hub.verify_token'] === token) {
      res.send(req.query['hub.challenge']);
    } else {
        var error = 'Error, token inválido '+ req.query['hub.verify_token'];
      res.send(error);
      console.log(error);
    }
  });
  
  router.post('/', (req, res) => {
    //return satus
    res.sendStatus(200);
    const data = req.body;

    if (data.object === 'page') {
        // Iterate over each entry
        // There may be multiple if batched
        data.entry.forEach((pageEntry) => {
            // let wh_event = messagingEvent[0];
            // let sender = wh_event.sender.id;


            pageEntry.messaging.forEach((messagingEvent) => {
                if (messagingEvent.message) {
                    sendTextMessage(messagingEvent)//text.substring(0, 200))
                }
            });

        });
    }
  });

  function sendTextMessage(event) {
    const message  = event.message;
    const senderid = event.sender.id;
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
        let messageData = { text: message }
    
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: { access_token: token },
            method: 'POST',
            json: {
                recipient: { id: senderid },
                message: messageData,
            }
        }, function (error, response, body) {
            if (error) {
                console.log('Error sending messages: ', error)
            } else if (response.body.error) {
                console.log('Error: ', response.body.error)
            }
        })
    }
    
  module.exports = get;