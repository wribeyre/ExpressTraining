var express = require('express');
var router = express.Router();
var axios = require("axios");
var moment = require("moment");

function formatData(data){
    var formated = Object.assign({},data);

    formated.created_at = moment(data.created_at).format("YYYY/MM/DD");
    
    return formated;

}

/* GET users listing. */
router.get('/', function(req, res, next) {
 axios.get("https://api.github.com/users/wribeyre")
     .then(function(response){
           res.render('user', formatData(response.data));
     })
     .catch(function(error){
         res.render('error',error.response)

     })
 
  
});

module.exports = router;
