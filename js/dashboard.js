/* ========= DATA ========= */

let bookings=[];
let customers=[];
let salary=[];
let purchase=[];

function getData(){

bookings=
JSON.parse(
localStorage.getItem(
"bookings"
)
)||[];

customers=
JSON.parse(
localStorage.getItem(
"customers"
)
)||[];

salary=
JSON.parse(
localStorage.getItem(
"salary"
)
)||[];

purchase=
JSON.parse(
localStorage.getItem(
"purchase"
)
)||[];

}


/* ========= FORMAT ========= */

function money(x){

return "₹"+

Number(
x||0
)

.toLocaleString(
"en-IN"
);

}


/* ========= BOOKING ========= */

function bookingReceived(x){

return(

Number(x.advance||0)+
Number(x.paid1||0)+
Number(x.paid2||0)+
Number(x.paid3||0)

);

}


function bookingPending(x){

return Math.max(

0,

Number(x.total||0)

-

bookingReceived(x)

);

}


/* ========= CUSTOMER ========= */

function customerReceived(x){

return(

Number(x.paid||0)+
Number(x.s1Amt||0)+
Number(x.s2Amt||0)

);

}


function customerPending(x){

return Math.max(

0,

Number(x.total||0)

-

customerReceived(x)

);

}


/* ========= USER ========= */

function showUser(){

let box=

document.getElementById(
"loginUser"
);

if(!box)
return;


box.innerHTML=

"👤 "+(

localStorage.getItem(
"loggedEmployee"
)

||

localStorage.getItem(
"adminUser"
)

||

"Admin"

);

}


/* ========= LOGOUT ========= */

function logout(){

localStorage.removeItem(
"loggedEmployee"
);

localStorage.removeItem(
"loggedRole"
);

location.replace(
"login.html"
);

}

window.logout=
logout;


/* ========= DASHBOARD ========= */

function loadDashboard(){

getData();

showUser();


let revenue=0;
let received=0;
let pending=0;
let expense=0;

let pendingList=[];


/* BOOKINGS */

bookings.forEach(x=>{

revenue+=
Number(
x.total||0
);

received+=
bookingReceived(
x
);

let p=

bookingPending(
x
);

pending+=p;

if(p>0){

pendingList.push({

name:
x.client,

amount:
p

});

}

});


/* CUSTOMERS ONLY */

customers.forEach(x=>{

revenue+=
Number(
x.total||0
);

received+=
customerReceived(
x
);

let p=

customerPending(
x
);

pending+=p;

if(p>0){

pendingList.push({

name:
x.client,

amount:
p

});

}

});


/* EXPENSE */

salary.forEach(

x=>

expense+=
Number(
x.amount||0
)

);

purchase.forEach(

x=>

expense+=
Number(
x.cost||0
)

);


let profit=

received-
expense;


/* UI */

totalRevenue.innerText=
money(
revenue
);

totalReceived.innerText=
money(
received
);

netProfit.innerText=
money(
profit
);

totalPending.innerText=
money(
pending
);

todayBooking.innerText=
bookings.length;

customerCount.innerText=
customers.length;


/* PENDING */

pendingRows.innerHTML="";


if(
pendingList.length===0
){

pendingRows.innerHTML=

`

<tr>

<td>No Data</td>

<td>₹0</td>

</tr>

`;

}

else{

pendingList.forEach(x=>{

pendingRows.innerHTML+=

`

<tr>

<td>${x.name}</td>

<td>${money(x.amount)}</td>

</tr>

`;

});

}


/* PROFIT */

profitChart.innerHTML=

`

<div style="

width:240px;
height:120px;

display:flex;

justify-content:center;

align-items:center;

border-radius:28px;

background:
linear-gradient(
145deg,
#FFD700,
#ffbe00
);

font-size:56px;

font-weight:900;

color:black;

">

${money(
profit
)}

</div>

`;


/* EXPENSE */

let total=

received+
expense;

let percent=

total===0

?

0

:

Math.round(

expense/
total*
100

);


expenseChart.innerHTML=

`

<div
class="center">

<h1>

${percent}%

</h1>

<p>

Expenses

</p>

</div>

`;

}


window.onload=
loadDashboard;

window.addEventListener(
"focus",
loadDashboard
);

window.addEventListener(
"storage",
loadDashboard
);