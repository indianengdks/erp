/* =========================
LOAD
========================= */

let bookings =
JSON.parse(
localStorage.getItem(
"bookings"
)
)||[];


let customers =
JSON.parse(
localStorage.getItem(
"customers"
)
)||[];



/* =========================
RECOVER
========================= */

if(
bookings.length===0
&&
customers.length>0
){

bookings=

customers.map(
(
x,
i
)=>({

id:
Date.now()+i,

date:
x.date||

new Date()
.toISOString()
.slice(
0,
10
),

time:
x.time||
"12:00",

client:
x.client||
"-",

mobile:
x.mobile||
"",

service:
x.service||
"-",

staff:
x.staff||
"-",

status:
"Booked"

})

);

}



/* =========================
SAVE
========================= */

function save(){

localStorage.setItem(
"bookings",
JSON.stringify(
bookings
)
);

localStorage.setItem(
"customers",
JSON.stringify(
customers
)
);

}




/* =========================
ADD BOOKING
========================= */

function saveBooking(){

if(
!bDate.value
||
!bCustomer.value
){

alert(
"Fill required fields"
);

return;

}



bookings.unshift({

id:
Date.now(),

date:
bDate.value,

time:
bTime.value||
"12:00",

client:
bCustomer.value,

mobile:
bMobile.value,

service:
bService.value||
"-",

staff:
bStaff.value||
"-",

status:
"Booked"

});


save();

clearForm();

render();

alert(
"Booking Saved"
);

}




/* =========================
RENDER
========================= */

function render(){

bookingList.innerHTML="";


let today=
new Date()
.toISOString()
.slice(
0,
10
);


let t=0;

let u=0;

let d=0;



bookings.forEach(
x=>{


if(
x.date===today
)
t++;


if(
x.status==="Booked"
||
x.status==="Running"
)
u++;


if(
x.status==="Done"
)
d++;



bookingList.innerHTML+=`

<div class="booking">

<div class="bookingTop">

<div>

<div class="bookingName">

${x.client}

</div>

<div class="bookingMobile">

📞 ${x.mobile||"-"}

</div>

</div>


<div>

${x.status}

</div>

</div>



<div class="bookingGrid">

<div class="box">

<h4>Date</h4>

<div>

${x.date}

</div>

</div>



<div class="box">

<h4>Time</h4>

<div>

${x.time}

</div>

</div>



<div class="box">

<h4>Service</h4>

<div>

${x.service}

</div>

</div>



<div class="box">

<h4>Staff</h4>

<div>

${x.staff}

</div>

</div>

</div>




<div class="action">

<button

class="start"

onclick=

"startBooking(${x.id})"

>

Start

</button>



<button

class="done"

onclick=

"completeBooking(${x.id})"

>

Done

</button>



<button

class="cancel"

onclick=

"deleteBooking(${x.id})"

>

Delete

</button>

</div>

</div>

`;

});



todayCount.innerText=t;

upcoming.innerText=u;

completed.innerText=d;

}




/* =========================
START
========================= */

function startBooking(id){

bookings.forEach(
x=>{

if(
x.id===id
){

x.status=
"Running";

}

});

save();

render();

}




/* =========================
DONE
========================= */

function completeBooking(id){

let row=

bookings.find(
x=>
x.id===id
);


if(
!row
)
return;



row.status=
"Done";



let exist=

customers.find(

x=>

x.bookingId===id

);



if(
!exist
){

customers.push({

bookingId:
id,

date:
row.date,

client:
row.client,

mobile:
row.mobile,

service:
row.service,

staff:
row.staff,

total:0,

paid:0,

notes:"",

employee:false

});

}



save();

render();

alert(
"Moved To Customer Profile"
);

}




/* =========================
DELETE
========================= */

function deleteBooking(id){

if(
!confirm(
"Delete?"
)
)
return;


bookings=

bookings.filter(
x=>
x.id!==id
);


save();

render();

}




/* =========================
CLEAR
========================= */

function clearForm(){

bDate.value="";

bTime.value="";

bCustomer.value="";

bMobile.value="";

bService.value="";

bStaff.value="";

}




/* =========================
START
========================= */

render();