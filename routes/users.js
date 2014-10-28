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

router.delete('/deleteuser/:id', function(req, res){
  var db = req.db;
  var userToDelete = req.params.id;
  db.collection('userlist').removeById(userToDelete, function(err, result){
    // because we should only be sending one user at once, should throw an error if client somehow tries to delete more than one
    // a successful deletion will return '1'
    res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
  });
});

module.exports = router;
