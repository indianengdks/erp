/* ========= LOAD ========= */

let customers=

JSON.parse(
localStorage.getItem(
"customers"
)
)

||[];

let editIndex=null;


/* ========= INPUT ========= */

function v(id){

return document.getElementById(id);

}


/* ========= DATE ========= */

function formatDate(x){

if(!x)
return "";

if(
x.includes("-")
&&
x.length===10
)
return x;


let d=
new Date(x);

if(isNaN(d))
return x;

return d
.toLocaleDateString(
"en-GB"
)
.replaceAll(
"/",
"-"
);

}


/* ========= SAVE ========= */

function saveCustomer(){

customers=

JSON.parse(
localStorage.getItem(
"customers"
)
)

||[];


let data={

id:

editIndex!==null

?

customers[editIndex].id

:

Date.now(),


date:

formatDate(
v("date").value
),

client:
v("client").value.trim(),

mobile:
v("mobile").value.trim()||"",

service:
v("service").value.trim(),

staff:
v("staff").value.trim(),

total:
Number(
v("total").value
)||0,

paid:
Number(
v("paid").value
)||0,


s1Date:
editIndex!==null
?
customers[editIndex].s1Date||""
:
"",

s1Amt:
editIndex!==null
?
customers[editIndex].s1Amt||0
:
0,


s2Date:
editIndex!==null
?
customers[editIndex].s2Date||""
:
"",

s2Amt:
editIndex!==null
?
customers[editIndex].s2Amt||0
:
0

};



if(

!data.date||

!data.client||

!data.service||

!data.staff||

data.total<=0

){

alert(
"Fill required fields"
);

return;

}



/* SAVE */

if(editIndex===null){

customers.push(
data
);

}

else{

customers[editIndex]=
data;

editIndex=null;

}


localStorage.setItem(

"customers",

JSON.stringify(
customers)

);


clearForm();

render();

alert(
"Customer Saved"
);

}



/* ========= PENDING ========= */

function pending(x){

return Math.max(

0,

Number(
x.total||0
)

-

(

Number(
x.paid||0
)

+

Number(
x.s1Amt||0
)

+

Number(
x.s2Amt||0
)

)

);

}



/* ========= STATUS ========= */

function status(x){

return pending(x)<=0

?

"FULL PAID"

:

"PENDING";

}



/* ========= UPDATE ========= */

function update(i){

customers[i].s1Date=
formatDate(
v("s1d"+i).value
);

customers[i].s1Amt=
Number(
v("s1a"+i).value
)||0;


customers[i].s2Date=
formatDate(
v("s2d"+i).value
);

customers[i].s2Amt=
Number(
v("s2a"+i).value
)||0;


localStorage.setItem(

"customers",

JSON.stringify(
customers)

);

render();

}



/* ========= EDIT ========= */

function editCustomer(i){

editIndex=i;

let x=
customers[i];


v("date").value=
x.date;

v("client").value=
x.client;

v("mobile").value=
x.mobile||"";

v("service").value=
x.service;

v("staff").value=
x.staff;

v("total").value=
x.total;

v("paid").value=
x.paid;


window.scrollTo({

top:0,

behavior:"smooth"

});

}



/* ========= DELETE ========= */

function deleteCustomer(i){

if(
!confirm(
"Delete Customer?"
)
)
return;


let deleted=
customers[i];


customers.splice(
i,
1
);


localStorage.setItem(

"customers",

JSON.stringify(
customers)

);


/* DELETE EMPLOYEE */

let emp=

JSON.parse(

localStorage.getItem(
"employeeEntries"
)

)

||[];


emp=

emp.filter(

x=>

x.id!==deleted.id

);


localStorage.setItem(

"employeeEntries",

JSON.stringify(
emp)

);


render();

alert(
"Deleted"
);

}



/* ========= TABLE ========= */

function render(){

customers=

JSON.parse(

localStorage.getItem(
"customers"
)

)

||[];


let rows=
v("rows");

rows.innerHTML="";


customers.forEach((x,i)=>{

rows.innerHTML+=`

<tr>

<td>${x.date||"-"}</td>

<td>${x.client||"-"}</td>

<td>${x.mobile||"-"}</td>

<td>${x.service||"-"}</td>

<td>${x.staff||"-"}</td>

<td>₹${x.total||0}</td>

<td>₹${x.paid||0}</td>

<td>

<input
type="date"
id="s1d${i}"
value=""
onchange="update(${i})">

</td>

<td>

<input
type="number"
id="s1a${i}"
value="${x.s1Amt||""}"
onchange="update(${i})">

</td>

<td>

<input
type="date"
id="s2d${i}"
value=""
onchange="update(${i})">

</td>

<td>

<input
type="number"
id="s2a${i}"
value="${x.s2Amt||""}"
onchange="update(${i})">

</td>

<td>

₹${pending(x)}

</td>

<td>

${status(x)}

</td>

<td>

<button onclick="editCustomer(${i})">

✏

</button>

</td>

<td>

<button onclick="deleteCustomer(${i})">

🗑

</button>

</td>

</tr>

`;

});

}



/* ========= CLEAR ========= */

function clearForm(){

document

.querySelectorAll(
".form-box input"
)

.forEach(

x=>x.value=""

);

}



/* ========= AUTO ========= */

window.addEventListener(
"focus",
render
);

window.addEventListener(
"storage",
render
);


render();