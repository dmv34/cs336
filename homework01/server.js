/* Homework01
 * Person class with values and functions
 * @author: Drew VandeLune
 * @date:   10/06/16
 */

//set up local host on port 3000
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.listen(3000, function () {
  console.log('Listening on port 3000!');
});


//JSON formated people variable
//ID value is up front because it acts a key to the rest of the info
var people = {
  "acv07" : { firstName: "Aaron", lastName: "VanMaanen", startDate: "2007/11/11" },
  "njc09" : { firstName: "Nathan", lastName: "Clayberg", startDate: "2009/07/27" },
  "bmv12" : { firstName: "Blake", lastName: "VanVark", startDate: "2012/02/13" },
  "jkd15" : { firstName: "Josh", lastName: "DeWaard", startDate: "2015/01/18" },
  "testing" : {}
};

// "/people" address shows a list of people created in variable people"
app.get('/people', function (req, res){
  res.json(people);
});

// function finds a person's information based off of given loginID
// if loginID is not valid, 404 error will be thrown
app.get('/person/:loginID', function (req, res){
  //if no person has given login
  if (people[req.params.loginID] == null){
    res.sendStatus(404);
  }
  //valid ID... send user information
  else{
    res.json(people[req.params.loginID]);
  }
});

//function finds person's name from loginID
app.get('/person/:loginID/name', function (req, res){
  //if no person has given login
  if (people[req.params.loginID] == null){
    res.sendStatus(404);
  }
  //valid ID... make sure information in list is valid
  else{
    if ( people[req.params.loginID].lastName == null ||
      people[req.params.loginID].firstName == null){
        res.sendStatus(404);
    }
    else {
      res.json(people[req.params.loginID].firstName + " " +
                people[req.params.loginID].lastName);
    }

  }
});

//function gives the number a years a person has been working
//    based off of loginID

app.get('/person/:loginID/years', function (req, res){
  //if no person has given login
  if (people[req.params.loginID] == null){
    res.sendStatus(404);
  }
  //valid ID... calculates the number of years person has been working
  else{
    if (people[req.params.loginID].startDate == null){
      res.sendStatus(404);
    }
    else{
      //Below is code from lab02 slightly modified.
      var today = new Date();
      var start_date = new Date(people[req.params.loginID].startDate);
      var years = today.getFullYear() - start_date.getFullYear();
      var month = today.getMonth() - start_date.getMonth();
      if (month< 0 || (month == 0 && today.getDate() < start_date.getDate())){
        years--;
      }
      res.json(people[req.params.loginID].firstName + " has worked " +
          years + " years.");
    }
  }
});
