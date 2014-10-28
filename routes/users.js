var express = require('express');
var router = express.Router();


// on a get request to /users/userlist, we will get a json object of all the users in the database
router.get('/userlist', function(req, res){
  var db = req.db; // pulling up our db
  db.collection('userlist').find().toArray(function(err, items){
    // taking all items from the collection and turning into an array
    res.json(items);
    // sends the response as all of the collection items in json format
  });
});


// 
router.post('/adduser', function(req, res){
  var db = req.db;
  // writing into the database the body of the request
  db.collection('userlist').insert(req.body, function(err, result){
    console.log(result)
    res.send(
        (err === null) ? { msg: '' } : { msg: err }
    );
  });
});

module.exports = router;
