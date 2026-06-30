let customers=

JSON.parse(
localStorage.getItem(
"customers"
)
)||[];



function render(){


notifyList.innerHTML="";


let pending=0;

let repeat=0;



let map={};



customers.forEach(x=>{

let due=

Number(
x.total||0
)

-

Number(
x.paid||0
);


if(
due>0
)
pending++;



let key=

x.mobile||

x.client;


if(
!map[key])
map[key]=0;


map[key]++;


if(
map[key]>1
)
repeat++;




if(
due>0
){

notifyList.innerHTML+=`

<div class="notice">

<h2>

${x.client}

</h2>

<div>

📞
${x.mobile}

</div>

<br>

<div>

Pending:
₹${due}

</div>

<div>

Service:
${x.service}

</div>


<div class="row">

<button

class="btn done"

onclick="markDone('${x.mobile}')"

>

Done

</button>


<button

class="btn open"

onclick=

"

location.href=

'customer-profile.html'

"

>

Open

</button>

</div>

</div>

`;

}



});




pendingCount.innerText=

pending;


repeatCount.innerText=

repeat;


followCount.innerText=

pending;



}




function markDone(

mobile

){

customers=

customers.map(

x=>{


if(

x.mobile===mobile

){

x.paid=

x.total;

}


return x;

}

);



localStorage.setItem(

"customers",

JSON.stringify(
customers
)

);



render();

}




render();