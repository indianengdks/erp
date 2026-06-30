async function login(){

const role=
document
.getElementById("role")
.value;

const user=
document
.getElementById("email")
.value
.trim();

const pass=
document
.getElementById("password")
.value
.trim();

if(
!user
||
!pass
){

alert(
"Fill all fields"
);

return;

}

try{

/* TEMP LOGIN */

const adminUser=
"admin";

const adminPass=
"1234";

if(

role==="Admin"

&&

user===adminUser

&&

pass===adminPass

){

sessionStorage.setItem(
"user",
user
);

sessionStorage.setItem(
"role",
"admin"
);

window.location.href=
"dashboard.html";

return;

}

/* TEMP EMPLOYEE */

const employees=[

{

user:"employee",

pass:"1234"

}

];

const found=

employees.find(

x=>

x.user===user

&&

x.pass===pass

);

if(

role==="Employee"

&&

found

){

sessionStorage.setItem(
"user",
user
);

sessionStorage.setItem(
"role",
"employee"
);

window.location.href=
"employee-panel.html";

return;

}

alert(
"Wrong Login"
);

}

catch(e){

console.log(e);

alert(
"Login failed"
);

}

}

window.login=
login;
