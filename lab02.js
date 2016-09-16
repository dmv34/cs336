/* Lab02
 * Encapsulation implementation project in JS
 * @author: Drew Vande Lune
 * @date:   09/14/16
 */


function Person (name, birthday, friends_list){
    this.name = name;
    this.birthday = birthday;
    this.friends_list = friends_list;
}
//greeting for a person. Overwritten by children
Person.prototype.greeting = function(){
  console.log("I'm a person and my name is " + this.name);
}
Person.prototype.change_name = function(new_name){
  this.name = new_name;
}
//function modified slightly from Naveen Jose
Person.prototype.age = function(){
  var today = new Date();
  var birth_date = new Date(this.birthday);
  var age = today.getFullYear() - birth_date.getFullYear();
  var month = today.getMonth() - birth_date.getMonth();
  if (month< 0 || (month == 0 && today.getDate() < birth_date.getDate())){
    age--;
  }
  return age;
}
Person.prototype.add_friend = function(new_friend){
  this.friends_list.push(new_friend);
}
Person.prototype.print_friends = function (){
  console.log(this.friends_list);
}

//Testing
let p1 = new Person("Drew", "1996/01/18", ["Logan", "Christiaan"]);
p1.greeting();
console.log("All below should be true")
console.log(p1.name == "Drew");
console.log(p1.age() == 20);
p1.change_name("Bob")
console.log(p1.name == "Bob");
console.log(p1.friends_list);
p1.add_friend("Chase");
console.log("Add friend Chase");
console.log(p1.friends_list);



function Student(name, birthday, friends_list, major) {
  Person.call(this, name, birthday, friends_list);
  this.major = major;
}

Student.prototype = Object.create(Person.prototype)
Student.prototype.greeting = function(){
  console.log("I'm a student!")
}

let s1 = new Student("Drew", "1996/01/18", ["Logan", "Christiaan"], "CS");
s1.greeting();
console.log(s1.age());
