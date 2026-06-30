/* ==========================
LOAD
========================== */

let customers =

JSON.parse(
localStorage.getItem(
"customers"
)

)||[];


/* ==========================
ELEMENTS
========================== */

const customer =
document.getElementById(
"customer"
);

const mobile =
document.getElementById(
"mobile"
);

const service =
document.getElementById(
"service"
);

const total =
document.getElementById(
"total"
);

const paid =
document.getElementById(
"paid"
);

const pending =
document.getElementById(
"pending"
);


/* ==========================
LOAD CUSTOMER
========================== */

customer.innerHTML=

`<option value="">
Select Customer
</option>`;


customers.forEach(
(
x,
i
)=>{

customer.innerHTML+=`

<option value="${i}">

${
x.client||
x.customer||
x.customerName||
"Customer"
}

</option>

`;

});




/* ==========================
AUTO FILL
========================== */

function loadCustomer(){

const x=

customers[
customer.value
];

if(!x)
return;



mobile.value=

x.mobile||
"";


service.value=

x.service||
"";


total.value=

x.total||
0;


paid.value=

x.paid||
0;



pending.value=

Number(
x.total||0
)

-

Number(
x.paid||0
);

}





/* ==========================
GENERATE
========================== */

function generateInvoice(){


const x=

customers[
customer.value
];


showName.innerText=

x?.client||

x?.customer||

x?.customerName||

"-";



showMobile.innerText=

mobile.value||

"-";



showService.innerText=

service.value||

"-";



showTotal.innerText=

"₹"+(
total.value||0
);



showPaid.innerText=

"₹"+(
paid.value||0
);



showPending.innerText=

"₹"+(
pending.value||0
);



invoiceNo.innerText=

"Invoice: INV"+

Date.now()

.toString()

.slice(
-6
);

}





/* ==========================
PRINT
========================== */

function printInvoice(){

window.print();

}





/* ==========================
WHATSAPP
========================== */

function shareWA(){


let msg=

`
Deepika Makeup Studio

${invoiceNo.innerText}

Customer:
${showName.innerText}

Mobile:
${showMobile.innerText}

Service:
${showService.innerText}

Total:
${showTotal.innerText}

Paid:
${showPaid.innerText}

Pending:
${showPending.innerText}
`;


window.open(

"https://wa.me/?text="+

encodeURIComponent(
msg
)

);

}





/* ==========================
EVENTS
========================== */

customer.addEventListener(

"change",

loadCustomer

);



paid.addEventListener(

"input",

function(){

pending.value=

Number(
total.value||0
)

-

Number(
paid.value||0
);

}

);