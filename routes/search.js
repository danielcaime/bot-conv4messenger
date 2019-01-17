/**
 * dcaime
 * search module
 */
 /*libs  */
var express = require('express');

/*styles */
//require('react-weui/lib/react-weui.min.css');

 const router = express.Router();

 var get = router.get('/', (req,res)=>{
    var params = req.query.message;

    console.log(req.query.message);
    
    if(req.query.message == null){
        params = 'S/N';
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end("uster ingresó: "+ params);   
    }else{
            var list = '';
            proxysrv(params).then(data => {
                var temp = JSON.parse(data);
                //console.log(data.lenght);
                
                list = temp.result.productos;
                //helper(list);
    
                res.render('./search', {
                    buscar:params,
                    producList:helper(list)//list
                    });
            });      
        }
    });

var post = router.post('/', (req, res) => {
        res.sendStatus(200);
        const data = req.body;
    });
                
module.exports = get,post;