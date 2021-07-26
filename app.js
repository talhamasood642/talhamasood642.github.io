//QUESTION 1

// var itemsArray = [
//     {name:"juice", price:"50", quantity:"30"},
//     {name:"cookie", price:"30", quantity:"9"},
//     {name:"shirt", price:"880", quantity:"1"},
//     {name:"pen", price:"100", quantity:"2"},
// ]

// var item1 = (itemsArray[0].name + " " + itemsArray[0].price * itemsArray[0].quantity);
// console.log(item1);

// var item2 = (itemsArray[1].name + " " + itemsArray[1].price * itemsArray[1].quantity);
// console.log(item2);

// var item3 = (itemsArray[2].name + " " + itemsArray[2].price * itemsArray[2].quantity);
// console.log(item3);

// var item4 = (itemsArray[3].name + " " + itemsArray[3].price * itemsArray[3].quantity);
// console.log(item4);

// var total1 = (itemsArray[0].price * itemsArray[0].quantity);
// var total2 = (itemsArray[1].price * itemsArray[1].quantity);
// var total3 = (itemsArray[2].price * itemsArray[2].quantity);
// var total4 = (itemsArray[3].price * itemsArray[3].quantity);

// var total = (total1 + total2 + total3 + total4);
// console.log("The total price of items is" + " " + total);



//QUESTION 2


// var obj = {
//     name: "talha",
//     lastname: "masood",
//     email: "t@t.com",
//     password: 1234,
//     age: 17,
//     gender:"male",
//     city:"karachi",
//     country:"pakistan"
// }
// var check1 = prompt("checking firstName").toLowerCase();
// var check2 = prompt("checking lastName").toLowerCase();
// var check3 = +prompt("checking age");
// var check4 = prompt("checking country").toLowerCase();

// if (check1 === obj.name && check2 === obj.lastname && check3 === obj.age && check4 === obj.country) {
//     console.log("yes");
// }
// else{
//     console.log("no");
// }



// QUESTION 3


// function Plan1(name,price,quantity,design)
// {
//     this.name = name;
//     this.price = price;
//     this.quantity = quantity;
//     this.design = design;
// }

// var obj = new Plan1("Tshirt", 880, 50, 154);
// console.log(obj);


//QUESTION 4


//  function get() {
//     var name = document.getElementById("name").value;
//     var address = document.getElementById("address").value;
//     var education = document.getElementById("education").value;
//     var profession = document.getElementById("profession").value;
//     var gender = document.getElementById("gender").value;
//     console.log(name);
    
//     var result = new Info(name, address, education, profession, gender);
//     function Info(name, address, education, profession, gender) {
//       this.user_name = name;
//       this.user_address = address;
//       this.user_education = education;
//       this.user_profession = profession;
//       this.user_gender = gender;
//     }
  
//    console.log(result);
//     console.log(name);
// }
 