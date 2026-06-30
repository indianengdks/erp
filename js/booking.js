let bookings =
JSON.parse(
sessionStorage.getItem("bookings")
) || [];

let editIndex = null;

const g = id =>
document.getElementById(id);

function makeId(pkg){

return "BK"+

String(
bookings.length+1
)

.padStart(
3,
"0"
);

}

function pending(x){

return Math.max(

0,

Number(x.total||0)

*

(

Number(x.advance||0)

*

Number(x.paid1||0)

*

Number(x.paid2||0)

*

Number(x.paid3||0)

)

);

}

function status(x){

return pending(x)===0

?

"FULL PAID"

:

"PENDING";

}

function saveData(){

sessionStorage.setItem(

"bookings",

JSON.stringify(
bookings
)

);

}

async function sendToSheet(data){

try{

const res=

await fetch(

CONFIG.API_URL,

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:

JSON.stringify({

...data,

pending:
pending(data),

status:
status(data)

})

}

);

const json=

await res.json();

console.log(json);

return true;

}

catch(err){

console.log(err);

alert(

"Google Sheet Save Failed"

);

return false;

}

}

async function saveBooking(){

const data={

id:

editIndex===null

?

makeId()

:

bookings[
editIndex
].id,

client:
g("client").value.trim(),

mobile:
g("mobile").value.trim(),

event:
g("event").value,

package:
g("package").value.trim(),

total:
Number(
g("amount").value
)||0,

advance:
Number(
g("advance").value
)||0,

advanceDate:
g("advanceDate").value,

s1Date:"",
s1Service:"",
paid1:0,

s2Date:"",
s2Service:"",
paid2:0,

s3Date:"",
s3Service:"",
paid3:0

};

if(

!data.client||

!data.mobile||

!data.event||

!data.package||

!data.total

){

alert(
"Fill all fields"
);

return;

}

if(

editIndex===null

){

bookings.push(
data
);

await sendToSheet(
data
);

}

else{

bookings[
editIndex
]=data;

editIndex=null;

}

saveData();

clearForm();

render();

}

function autoUpdate(i){

let x=
bookings[i];

x.s1Date=
g("s1d"+i).value;

x.s1Service=
g("s1s"+i).value;

x.paid1=
Number(
g("p1"+i).value
)||0;

x.s2Date=
g("s2d"+i).value;

x.s2Service=
g("s2s"+i).value;

x.paid2=
Number(
g("p2"+i).value
)||0;

x.s3Date=
g("s3d"+i).value;

x.s3Service=
g("s3s"+i).value;

x.paid3=
Number(
g("p3"+i).value
)||0;

saveData();

render();

}

function editBooking(i){

editIndex=i;

const x=
bookings[i];

g("client").value=
x.client;

g("mobile").value=
x.mobile;

g("event").value=
x.event;

g("package").value=
x.package;

g("amount").value=
x.total;

g("advance").value=
x.advance;

g("advanceDate").value=
x.advanceDate;

}

function deleteBooking(i){

if(

confirm(
"Delete?"
)

){

bookings.splice(
i,
1
);

saveData();

render();

}

}

function render(){

rows.innerHTML="";

bookings.forEach((x,i)=>{

rows.innerHTML+=`

<tr>

<td>${x.id}</td>

<td>${x.client}</td>

<td>${x.mobile}</td>

<td>${x.event}</td>

<td>${x.package}</td>

<td>₹${x.total}</td>

<td>₹${x.advance}</td>

<td>
<input type=date id=s1d${i}
value="${x.s1Date||''}"
onchange="autoUpdate(${i})">
</td>

<td>
<input id=s1s${i}
value="${x.s1Service||''}"
onchange="autoUpdate(${i})">
</td>

<td>
<input type=number id=p1${i}
value="${x.paid1||0}"
onchange="autoUpdate(${i})">
</td>

<td>
<input type=date id=s2d${i}
value="${x.s2Date||''}"
onchange="autoUpdate(${i})">
</td>

<td>
<input id=s2s${i}
value="${x.s2Service||''}"
onchange="autoUpdate(${i})">
</td>

<td>
<input type=number id=p2${i}
value="${x.paid2||0}"
onchange="autoUpdate(${i})">
</td>

<td>
<input type=date id=s3d${i}
value="${x.s3Date||''}"
onchange="autoUpdate(${i})">
</td>

<td>
<input id=s3s${i}
value="${x.s3Service||''}"
onchange="autoUpdate(${i})">
</td>

<td>
<input type=number id=p3${i}
value="${x.paid3||0}"
onchange="autoUpdate(${i})">
</td>

<td>
₹${pending(x)}
</td>

<td>
${status(x)}
</td>

<td>
<button onclick="editBooking(${i})">
✏
</button>
</td>

<td>
<button onclick="deleteBooking(${i})">
🗑
</button>
</td>

</tr>

`;

});

}

function clearForm(){

document

.querySelectorAll(
".form-box input"
)

.forEach(

x=>{

if(
!x.disabled
){

x.value="";

}

}

);

}

render();
