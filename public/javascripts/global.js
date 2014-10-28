var userListData = [];

$(document).ready(function(){

  populateTable();

  $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);

  $('#btnAddUser').on('click', addUser);


});

function populateTable(){
  var tableContent = '';
  // jQuery AJAX call for JSON
  $.getJSON('/users/userlist', function(data){
    // set a global variable with all the database elements so we can call it more easily
    userListData = data;
    // use JSON to grab data from the 'api' and incorporate the values into a table element
    $.each(data, function(){
      tableContent += '<tr>';
      tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '" title="Show Details">' + this.username + '</a></td>'
      tableContent += '<td>' + this.email + '</td>';
      tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this.id + '">delete</a></td>';
      tableContent += '</tr>'
    });

    // Inject the whole content string into our existing HTML table
    $('#userList table tbody').html(tableContent);

  });
};

function showUserInfo(event) {
  // prevent link from firing in case the browser wants to
  event.preventDefault();
  // JSON-grabbing the username
  var thisUserName = $(this).attr('rel');
  // JSON-grabbing index of object
  var arrayPosition = userListData.map(function(arrayItem){ // userListData is a big chunk of JSON data
    return arrayItem.username; // using an anonymous function to get the attribute 'username' out of every data item
  }).indexOf(thisUserName); // chaining the indexOf JS method to grab the position of the username and therefore give us a pseudo user_id !
 // we now have the power to grab any user in the database on the client side
  var thisUserObject = userListData[arrayPosition];

  $('#userInfoName').text(thisUserObject.fullname);
  $('#userInfoAge').text(thisUserObject.age);
  $('#userInfoGender').text(thisUserObject.gender);
  $('#userInfoLocation').text(thisUserObject.location);
  // jQuery all those new variables into that HTML!

};

// Adding users
function addUser(event) {
  event.preventDefault();

  // VALIDATION! making an error counter for fields left blank
  var errorCount = 0;
  $('#addUser input').each(function(index, val){
    if($(this).val() === '') { 
      errorCount++;
    }
  });

  // will only post to the database if no errors
  if(errorCount === 0){
    var newUser = {
      // grabbing data from our HTML field elements
      'username': $('#addUser fieldset input#inputUserName').val(),
      'email': $('#addUser fieldset input#inputUserEmail').val(),
      'fullname': $('#addUser fieldset input#inputUserFullname').val(),
      'age': $('#addUser fieldset input#inputUserAge').val(),
      'location': $('#addUser fieldset input#inputUserLocation').val(),
      'gender': $('#addUser fieldset input#inputUserGender').val()
    };

    // saving the new user data so the api can see it
    $.ajax({
      type: 'POST',
      data: newUser,
      url: '/users/adduser',
      dataType: 'JSON'
    }).done(function(response) {
      // because successful ajax responses are blank
      if (response.msg === '') {
        $('#addUser fieldset input').val('');
        populateTable();
      }
      else {
        alert('Error: ' + response.msg);
      }
    });
  }
  else {
    // in the event that not all fields have been filled in 
    alert('Fill in all the fields ya n00b');
    return false;
  }


};





