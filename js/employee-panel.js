/* ========= DATE ========= */

function formatDate(){

let d=
new Date();

let day=
String(
d.getDate()
).padStart(2,"0");

let month=
String(
d.getMonth()+1
).padStart(2,"0");

let year=
d.getFullYear();

return `${day}-${month}-${year}`;

}

todayDate.innerText=
formatDate();


/* ========= USER ========= */

let employee=

localStorage.getItem(
"loggedEmployee"
)

||

"Employee";


empName.value=
employee;

empName.readOnly=
true;


/* ========= SAVE ========= */

function saveEntry(){

if(

!client.value.trim()

||

!service.value.trim()

){

alert(
"Fill Customer & Service"
);

return;

}


const id=
Date.now();


let entry={

id:id,

employee:
employee,

client:
client.value.trim(),

mobile:
mobile.value.trim(),

service:
service.value.trim(),

amount:
Number(
amount.value
)||0,

status:
status.value||"Done",

notes:
notes.value||"",

date:
formatDate()

};



/* EMPLOYEE */

let emp=

JSON.parse(

localStorage.getItem(
"employeeEntries"
)

)

||

[];


emp.push(
entry
);


localStorage.setItem(

"employeeEntries",

JSON.stringify(
emp)

);



/* DAILY CUSTOMER */

let customers=

JSON.parse(

localStorage.getItem(
"customers"
)

)

||

[];


customers.push({

id:id,

date:
entry.date,

client:
entry.client,

mobile:
entry.mobile||"",

service:
entry.service,

staff:
employee,

total:
entry.amount,

paid:
0,

s1Date:"",
s1Amt:0,

s2Date:"",
s2Amt:0

});


localStorage.setItem(

"customers",

JSON.stringify(
customers)

);



alert(
"Entry Saved"
);



client.value="";
mobile.value="";
service.value="";
amount.value="";
notes.value="";


loadEntries();

}

window.saveEntry=
saveEntry;



/* ========= DELETE ========= */

function deleteEntry(id){

if(
!confirm(
"Delete Entry?"
)
)
return;


let emp=

JSON.parse(

localStorage.getItem(
"employeeEntries"
)

)

||

[];


emp=

emp.filter(

x=>

x.id!==id

);


localStorage.setItem(

"employeeEntries",

JSON.stringify(
emp)

);



let customers=

JSON.parse(

localStorage.getItem(
"customers"
)

)

||

[];


customers=

customers.filter(

x=>

x.id!==id

);


localStorage.setItem(

"customers",

JSON.stringify(
customers)

);


loadEntries();

}

window.deleteEntry=
deleteEntry;



/* ========= LOGOUT ========= */

function logoutEmployee(){

localStorage.removeItem(
"loggedEmployee"
);

location.href=
"login.html";

}

window.logoutEmployee=
logoutEmployee;



/* ========= LOAD ========= */

function loadEntries(){

let emp=

JSON.parse(

localStorage.getItem(
"employeeEntries"
)

)

||

[];


let my=

emp.filter(

x=>

x.employee===employee

);


entryList.innerHTML="";


let total=0;


if(
my.length===0
){

entryList.innerHTML=

`

<div class="entry">

No Entry

</div>

`;


totalInfo.innerHTML=

`

0 Customers
<br><br>
₹0

`;

return;

}



my.forEach(x=>{

total+=
Number(
x.amount
)||0;


entryList.innerHTML+=

`

<div class="entry">

<h3>${x.client}</h3>

<p>${x.service}</p>

<p>₹${x.amount}</p>

<p>${x.status}</p>

<p>${x.date}</p>

<button onclick="deleteEntry(${x.id})">

Delete

</button>

</div>

`;

});


totalInfo.innerHTML=

`

${my.length}

Customers

<br><br>

₹${total}

`;

}

loadEntries();