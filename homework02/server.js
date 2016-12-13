/* Homework01
 * Person class with values and functions
 * @author: Drew VandeLune
 * @date:   10/06/16
 */

//set up local host on port 3000
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
idCounter = 4;


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.listen(3000, function () {
  console.log('Listening on port 3000!');
});


//JSON formated people variable
//ID value is up front because it acts a key to the rest of the info
var people = [
  { firstName: "Aaron", lastName: "VanMaanen", ID: "avm12", startDate: "2007/11/11" },
  { firstName: "Nathan", lastName: "Clayberg", ID: "njc43", startDate: "2009/07/27" },
  { firstName: "Blake", lastName: "VanVark", ID: "bmv12", startDate: "2012/02/13" },
  { firstName: "Josh", lastName: "DeWaard", ID: "jsd15", startDate: "2015/01/18" }
];

// "/people" address shows a list of people created in variable people"
app.get('/people', function (req, res){
  res.json(people);
});

// function finds a person's information based off of given loginID
// if loginID is not valid, 404 error will be thrown
app.get('/person/:loginID', function (req, res){

  var person;
  for(var i = 0; i<people.length; i++){
    if(people[i].ID == req.params.loginID){
      person = people[i];
    }
  }
  //if no person has given login
  if (person == null){
    res.sendStatus(404);
  }
  //valid ID... send user information
  else{
    res.json(person);
  }
});

//function finds person's name from loginID
app.get('/person/:loginID/name', function (req, res){
  var first, last;
  //itterate through dataset for loginID
  for(var i = 0; i < people.length; i++) {
    //if valid id is found store the names
		if(people[i].ID == req.params.loginID) {
			first = people[i].firstName;
			last = people[i].lastName;
		}
	}

  //checking to see if names are valid
  if(first == null || last == null) {
  		res.sendStatus(404);
  	} else {
  		//Send the name
  		res.send(first + " " + last);
  	}
});

//function gives the number a years a person has been working
//    based off of loginID

app.get('/person/:loginID/years', function (req, res){
  var person;
  for(var i = 0; i < people.length; i++) {
		//If the login ID equals the one passed...
		if(people[i].ID == req.params.loginID) {
			//Store the start date of the person
			person = people[i];
		}
  }
  if(person == null || person.startDate == null){
    res.sendStatus(404);
  }else{

    //Below is code from lab02 slightly modified.
    var today = new Date();
    var start_date = new Date(person.startDate);
    var years = today.getFullYear() - start_date.getFullYear();
    var month = today.getMonth() - start_date.getMonth();
    if (month< 0 || (month == 0 && today.getDate() < start_date.getDate())){
      years--;
    }
    res.json(person.firstName + " has worked " + years + " years.");
  }

});

//Start of homework 2

//an address for adding a new person to the database
app.get('/add', function(req, res) {
  res.sendFile(__dirname+'/public/newPerson.html');
});

//an address to a webpage that allows for someone to find a person
app.get('/find', function(req, res) {
  res.sendFile(__dirname+'/public/getPerson.html');
});

//post operation that allows for a new person to be added to the database
app.post('/person/', function(req, res) {
  //grabs information from webpage and creates a new person
  var newPerson = {firstName: req.body.firstName, lastName: req.body.lastName,
      ID: req.body.userName, startDate: req.body.startDate};
  people.push(newPerson);
  res.json(people);
});

//put operation that can update a person's information based off of of their ID
app.put('/person/:id', function(req, res) {
  for (var i = 0; i < people.length; i++) {
    if (people[i].ID == req.params.id) {
        people[i].firstName = req.body.firstName;
        people[i].lastName  = req.body.lastName;
        people[i].startDate  = req.body.startDate;
    }
	}
  res.sendStatus(404);
});

//Delete operation that deletes the person with given ID
app.delete('/person/:id', function(req, res) {
  for (var i = 0; i < people.length; i++) {
    if (people[i].ID == req.params.id) {
        delete peopleObjects[i];
    }
	}
  res.sendStatus(404);
});
