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
router.get('/:userId', function(req, res, next) {
 axios.all([
            axios.get("https://api.github.com/users/"+req.params.userId),
            axios.get("https://api.github.com/users/"+req.params.userId+"/repos")
            ])
 .then(function(response){
        var resp = {userInfo:formatData(response[0].data),userRepos:response[1].data};
        res.render('user', resp);
        }
    )
  .catch(function(error){
      res.render('error',error.response)
 });


});

module.exports = router;
