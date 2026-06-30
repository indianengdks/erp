let employees=

JSON.parse(

localStorage.getItem(
"employees"
)

)||[];



function save(){

localStorage.setItem(

"employees",

JSON.stringify(
employees)

);

}



function addEmployee(){

if(
!emp.value
)

return;


employees.push({

name:
emp.value,

active:
true

});


save();

emp.value="";

render();

}



function toggle(i){

employees[i]

.active=

!

employees[i]

.active;


save();

render();

}



function render(){

list.innerHTML="";


employees.forEach(

(
x,
i
)=>{


list.innerHTML+=`

<div class="row">

<div>

${x.name}

</div>

<div>

${

x.active

?

"🟢 Active"

:

"🔴 Blocked"

}

</div>


<div>

<button

class=

"${

x.active

?

"red"

:

"green"

}"

onclick=

"toggle(${i})"

>

${

x.active

?

"Block"

:

"Enable"

}

</button>

</div>

</div>

`;

}

);

}



render();