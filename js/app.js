function logout(){

sessionStorage.clear();

location.href="index.html";

}

async function saveCustomer(){

let name =
document
.getElementById("name")
?.value
.trim();

let phone =
document
.getElementById("phone")
?.value
.trim();

if(

!name ||

!phone

){

alert(
"Please fill all fields"
);

return;

}

const customer={

name,

phone,

createdAt:
new Date()
.toISOString()

};

try{

/*
Future API
await callAPI(
"saveCustomer",
customer
);
*/

alert(

"Customer Saved ✅\n\n"

*

"Name: "

*

name

*

"\nPhone: "

*

phone

);

document
.getElementById("name")
.value="";

document
.getElementById("phone")
.value="";

}

catch(e){

console.log(e);

alert(
"Save failed"
);

}

}
