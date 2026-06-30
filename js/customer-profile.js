/* ========= LOAD ========= */

let customers =

JSON.parse(
localStorage.getItem(
"customers"
)
)||[];



let currentCustomer=null;



/* ========= SUMMARY ========= */

function updateSummary(){

let revenue=0;

let pending=0;


customers.forEach(x=>{

revenue+=
Number(
x.total||0
);

pending+=

Number(
x.total||0
)

-

Number(
x.paid||0
);

});


totalCustomer.innerText=

new Set(

customers.map(
x=>
x.mobile
)

).size;


totalRevenue.innerText=

`₹${revenue.toLocaleString()}`;


totalPending.innerText=

`₹${pending.toLocaleString()}`;

}





/* ========= RENDER ========= */

function renderProfiles(){


profileList.innerHTML="";


let keyword=

search.value

.toLowerCase();


let grouped={};



customers.forEach(x=>{


let key=

x.mobile||

x.client;



if(
!grouped[key]
){

grouped[key]=[];

}



grouped[key].push(x);


});





Object.values(

grouped

)

.forEach(rows=>{


let first=

rows[0];



if(

!

(

first.client

.toLowerCase()

.includes(
keyword
)

||

String(

first.mobile

)

.includes(
keyword
)

)

)

return;




let visits=

rows.length;


let total=0;

let paid=0;



rows.forEach(x=>{

total+=

Number(
x.total||0
);

paid+=

Number(
x.paid||0
);

});



let pending=

total-paid;



let status=

pending===0

?

"Completed"

:

"Pending";



let history=

rows

.map(

x=>`

<div class="row">

<div>

${x.date}

</div>

<div>

${x.service}

</div>

<div>

₹${x.total}

</div>

</div>

`

)

.join("");



profileList.innerHTML+=`

<div class="profile">


<div class="profileHeader">

<div>

<div class="profileName">

${first.client}

</div>

<div class="profileMobile">

📞 ${first.mobile||"-"}

</div>

</div>

</div>




<div class="infoGrid">


<div class="box">

<h4>

Visits

</h4>

<div>

${visits}

</div>

</div>



<div class="box">

<h4>

Total Bill

</h4>

<div>

₹${total}

</div>

</div>



<div class="box">

<h4>

Paid

</h4>

<div>

₹${paid}

</div>

</div>



<div class="box">

<h4>

Pending

</h4>

<div>

₹${pending}

</div>

</div>



<div class="box">

<h4>

Status

</h4>

<div>

${status}

</div>

</div>



<div class="box">

<h4>

Last Visit

</h4>

<div>

${rows.at(-1).date}

</div>

</div>


</div>




<div class="history">

<div class="historyTitle">

Payment History

</div>

${history}

</div>




${
pending>0

?

`

<button

class="payBtn"

onclick='openPay("${first.mobile}")'

>

+ Receive Payment

</button>

`

:

""

}


</div>

`;



});



updateSummary();

}





/* ========= PAYMENT ========= */

function openPay(mobile){

currentCustomer=

mobile;


payBox.style.display=

"flex";



payAmount.value="";

}



function closePay(){

payBox.style.display=

"none";

}



function savePayment(){


let amount=

Number(
payAmount.value
);


if(
!amount
){

alert(
"Enter amount"
);

return;

}



let left=

amount;



customers.forEach(x=>{


if(

x.mobile===

currentCustomer

&&

left>0

){

let due=

Number(
x.total
)

-

Number(
x.paid
);



if(
due>0
){

let add=

Math.min(
due,
left
);


x.paid=

Number(
x.paid||0
)

+

add;


left-=add;

}

}



});



localStorage.setItem(

"customers",

JSON.stringify(
customers
)

);


closePay();

renderProfiles();

alert(
"Payment Saved"
);

}




/* ========= SEARCH ========= */

search.addEventListener(

"input",

renderProfiles

);




/* ========= START ========= */

renderProfiles();