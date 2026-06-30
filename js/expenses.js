/* ========= LOAD ========= */

let salary =
JSON.parse(
localStorage.getItem(
"salary"
)
)||[];


let purchase =
JSON.parse(
localStorage.getItem(
"purchase"
)
)||[];



/* ========= SAVE ========= */

function save(){

localStorage.setItem(
"salary",
JSON.stringify(
salary
)
);

localStorage.setItem(
"purchase",
JSON.stringify(
purchase
)
);

}



/* ========= ADD SALARY ========= */

function addSalary(){

if(
!sDate.value||
!sStaff.value||
!sAmount.value
){

alert(
"Fill Salary Details"
);

return;

}



salary.push({

date:
sDate.value,

month:
sMonth.value||

new Date()
.toLocaleString(
"default",
{
month:
"long"
}
),

staff:
sStaff.value,

amount:
Number(
sAmount.value
),

mode:
sMode.value,

notes:
sNotes.value

});


save();

clearSalary();

render();

}




/* ========= ADD PURCHASE ========= */

function addPurchase(){

if(
!pDate.value||
!pItem.value||
!pCost.value
){

alert(
"Fill Purchase Details"
);

return;

}



purchase.push({

date:
pDate.value,

item:
pItem.value,

cost:
Number(
pCost.value
),

supplier:
pSupplier.value,

qty:
pQty.value,

notes:
pNotes.value

});


save();

clearPurchase();

render();

}




/* ========= DELETE ========= */

function deleteSalary(i){

if(
confirm(
"Delete Salary?"
)
){

salary.splice(
i,
1
);

save();

render();

}

}



function deletePurchase(i){

if(
confirm(
"Delete Purchase?"
)
){

purchase.splice(
i,
1
);

save();

render();

}

}




/* ========= RENDER ========= */

function render(){

salaryList.innerHTML="";

purchaseList.innerHTML="";

historyList.innerHTML="";


let totalSalary=0;

let totalPurchase=0;



salary.forEach(

(
x,
i
)=>{


totalSalary+=
Number(
x.amount
);



salaryList.innerHTML+=`

<div class="entry">

<div>${x.date}</div>

<div>${x.month}</div>

<div>${x.staff}</div>

<div>₹${x.amount}</div>

<div>${x.mode||"-"}</div>

<div class="action">

<button
onclick=
"deleteSalary(${i})">

🗑

</button>

</div>

</div>

`;



historyList.innerHTML+=`

<div class="history-row">

<div class="history-item">

${x.date}

</div>

<div class="history-item">

Salary

</div>

<div class="history-item">

${x.staff}

</div>

<div class="history-item">

₹${x.amount}

</div>

</div>

`;



}

);





purchase.forEach(

(
x,
i
)=>{


totalPurchase+=
Number(
x.cost
);



purchaseList.innerHTML+=`

<div class="entry">

<div>${x.date}</div>

<div>${x.item}</div>

<div>₹${x.cost}</div>

<div>${x.supplier||"-"}</div>

<div>${x.qty||"-"}</div>

<div class="action">

<button
onclick=
"deletePurchase(${i})">

🗑

</button>

</div>

</div>

`;



historyList.innerHTML+=`

<div class="history-row">

<div class="history-item">

${x.date}

</div>

<div class="history-item">

Purchase

</div>

<div class="history-item">

${x.item}

</div>

<div class="history-item">

₹${x.cost}

</div>

</div>

`;



}

);




salaryValue.innerText=

`₹${totalSalary.toLocaleString()}`;


purchaseValue.innerText=

`₹${totalPurchase.toLocaleString()}`;


grandValue.innerText=

`₹${(
totalSalary+
totalPurchase
).toLocaleString()}`;



updateMonthReport();

}




/* ========= REPORT ========= */

function updateMonthReport(){

let s=0;

let p=0;


salary.forEach(
x=>
s+=
Number(
x.amount
)
);


purchase.forEach(
x=>
p+=
Number(
x.cost
)
);


if(
monthReport
){

monthReport.innerHTML=`

Salary:
₹${s.toLocaleString()}

<br><br>

Purchase:
₹${p.toLocaleString()}

<br><br>

Expense:
₹${(
s+p
).toLocaleString()}

`;

}

}




/* ========= EXPORT ========= */

function downloadCSV(){

let csv=

"Date,Type,Name,Amount\n";


salary.forEach(x=>{

csv+=

`${x.date},Salary,${x.staff},${x.amount}\n`;

});


purchase.forEach(x=>{

csv+=

`${x.date},Purchase,${x.item},${x.cost}\n`;

});



let blob=

new Blob(
[
csv
],
{
type:
"text/csv"
}
);


let url=

URL.createObjectURL(
blob
);


let a=

document.createElement(
"a"
);

a.href=
url;

a.download=

"expenses-report.csv";

a.click();

}




/* ========= SEARCH ========= */

if(search){

search.addEventListener(

"input",

function(){


let v=

this.value

.toLowerCase();


document

.querySelectorAll(
"#historyList .history-row"
)

.forEach(x=>{

x.style.display=

x.innerText

.toLowerCase()

.includes(v)

?

"grid"

:

"none";

});


}

);

}




/* ========= CLEAR ========= */

function clearSalary(){

sDate.value="";
sMonth.value="";
sStaff.value="";
sAmount.value="";
sMode.value="";
sNotes.value="";

}


function clearPurchase(){

pDate.value="";
pItem.value="";
pCost.value="";
pSupplier.value="";
pQty.value="";
pNotes.value="";

}




/* ========= START ========= */

render();