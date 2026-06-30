/* ========= LOAD ========= */

let employees=
JSON.parse(
localStorage.getItem(
"employees"
)
)||[];

let customers=
JSON.parse(
localStorage.getItem(
"customers"
)
)||[];


/* ========= TODAY ========= */

if(todayDate){

todayDate.innerText=

new Date()

.toLocaleDateString(
"en-IN"
);

}



/* ========= SAVE ========= */

function save(){

localStorage.setItem(

"customers",

JSON.stringify(
customers
)

);

}



/* ========= SAVE ENTRY ========= */

function saveEntry(){


/* ALWAYS RELOAD EMPLOYEE */

employees=

JSON.parse(
localStorage.getItem(
"employees"
)
)||[];


/* INPUT */

let emp=

empName.value
.trim()
.toLowerCase();


/* FIND */

let check=

employees.find(

x=>

x.name
.trim()
.toLowerCase()

===

emp

);



/* BLOCK */

if(

check

&&

check.active===false

){

alert(

"Employee Access Blocked"

);

return;

}



/* VALIDATION */

if(

!empName.value||

!client.value||

!mobile.value||

!service.value||

!amount.value

){

alert(
"Fill all fields"
);

return;

}



/* SAVE */

customers.push({

date:

new Date()

.toISOString()

.slice(
0,
10
),

client:

client.value
.trim(),

mobile:

mobile.value
.trim(),

service:

service.value
.trim(),

staff:

empName.value
.trim(),

total:

Number(
amount.value
),

paid:

status.value==="Done"

?

Number(
amount.value
)

:

0,

s1Date:"",
s1Amt:"",

s2Date:"",
s2Amt:"",

notes:

notes.value
.trim(),

employee:true

});


save();

clearForm();

render();

alert(
"Entry Saved"
);

}



/* ========= RENDER ========= */

function render(){


customers=

JSON.parse(
localStorage.getItem(
"customers"
)
)||[];


entryList.innerHTML="";


let today=

new Date()

.toISOString()

.slice(
0,
10
);



let data=

customers

.filter(

x=>

x.employee===true

&&

x.date===today

)

.reverse();



let total=0;



data.forEach(

x=>{


total+=

Number(
x.total||0
);



entryList.innerHTML+=`

<div class="entry">

<div class="cell">

${x.client}

</div>

<div class="cell">

${x.mobile}

</div>

<div class="cell">

${x.service}

</div>

<div class="cell">

${x.staff}

</div>

<div class="cell">

₹${Number(
x.total
).toLocaleString()}

</div>

<div class="cell">

${

x.paid>0

?

"Done"

:

"Pending"

}

</div>

</div>

`;



});



if(totalInfo){

totalInfo.innerHTML=`

Today's Entries

<br><br>

${data.length}

Customers

<br><br>

₹${total.toLocaleString()}

`;

}

}



/* ========= CLEAR ========= */

function clearForm(){

client.value="";

mobile.value="";

service.value="";

amount.value="";

notes.value="";

}



/* ========= AUTO ========= */

render();



window.addEventListener(

"storage",

()=>{

employees=

JSON.parse(
localStorage.getItem(
"employees"
)
)||[];

render();

}

);