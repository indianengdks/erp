/* ========= LOAD ========= */

const customers =
JSON.parse(
localStorage.getItem(
"customers"
)
)||[];

const salary =
JSON.parse(
localStorage.getItem(
"salary"
)
)||[];

const purchase =
JSON.parse(
localStorage.getItem(
"purchase"
)
)||[];


/* ========= ELEMENTS ========= */

const monthBox =
document.getElementById(
"month"
);

const staffBox =
document.getElementById(
"staff"
);

const serviceBox =
document.getElementById(
"service"
);

const rows =
document.getElementById(
"rows"
);

const rev =
document.getElementById(
"rev"
);

const rec =
document.getElementById(
"rec"
);

const exp =
document.getElementById(
"exp"
);

const profitBox =
document.getElementById(
"profit"
);

const pendingBox =
document.getElementById(
"pending"
);

const count =
document.getElementById(
"count"
);




/* ========= FILTER ========= */

function fillFilters(){


let months=[];

let staff=[];

let services=[];


customers.forEach(c=>{

if(c.date){

months.push(
c.date.substring(
0,
7
)
);

}

if(c.staff){

staff.push(
c.staff
);

}

if(c.service){

services.push(
c.service
);

}

});


months=[
...new Set(
months
)
];

staff=[
...new Set(
staff
)
];

services=[
...new Set(
services
)
];



months.forEach(x=>{

monthBox.innerHTML+=

`<option value="${x}">
${x}
</option>`;

});


staff.forEach(x=>{

staffBox.innerHTML+=

`<option value="${x}">
${x}
</option>`;

});


services.forEach(x=>{

serviceBox.innerHTML+=

`<option value="${x}">
${x}
</option>`;

});


}




/* ========= REPORT ========= */

function loadReport(){


let data=
[
...customers
];



if(
monthBox.value
){

data=

data.filter(

x=>

x.date

&&

x.date.startsWith(
monthBox.value
)

);

}



if(
staffBox.value
){

data=

data.filter(

x=>

x.staff===

staffBox.value

);

}



if(
serviceBox.value
){

data=

data.filter(

x=>

x.service===

serviceBox.value

);

}



rows.innerHTML="";


let revenue=0;

let received=0;

let pending=0;



data.forEach(x=>{


let total=

Number(
x.total||0
);

let paid=

Number(
x.paid||0
);


revenue+=total;

received+=paid;

pending+=
(
total-paid
);



rows.innerHTML+=`

<tr>

<td>${x.date||"-"}</td>

<td>${x.client||"-"}</td>

<td>${x.mobile||"-"}</td>

<td>${x.service||"-"}</td>

<td>${x.staff||"-"}</td>

<td>₹${total}</td>

<td>₹${paid}</td>

<td>₹${total-paid}</td>

</tr>

`;



});



if(
data.length===0
){

rows.innerHTML=`

<tr>

<td
colspan="8">

No Entries Found

</td>

</tr>

`;

}




let expense=0;


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



rev.innerText=

`₹${revenue.toLocaleString()}`;

rec.innerText=

`₹${received.toLocaleString()}`;

exp.innerText=

`₹${expense.toLocaleString()}`;

profitBox.innerText=

`₹${(
received-
expense
).toLocaleString()}`;

pendingBox.innerText=

`₹${pending.toLocaleString()}`;

count.innerText=

data.length;


}




/* ========= EXPORT ========= */

function exportJSON(){

let blob=

new Blob(

[

JSON.stringify(
customers,
null,
2
)

],

{

type:

"text/json"

}

);


let a=

document.createElement(
"a"
);

a.href=

URL.createObjectURL(
blob
);

a.download=

"monthly-report.json";

a.click();

}




/* ========= START ========= */

fillFilters();

loadReport();