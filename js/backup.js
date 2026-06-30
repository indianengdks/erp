function exportData(){

let data={

customers:

JSON.parse(
localStorage.getItem(
"customers"
)
)||[],

bookings:

JSON.parse(
localStorage.getItem(
"bookings"
)
)||[],

salary:

JSON.parse(
localStorage.getItem(
"salary"
)
)||[],

purchase:

JSON.parse(
localStorage.getItem(
"purchase"
)
)||[],

employees:

JSON.parse(
localStorage.getItem(
"employees"
)
)||[]

};



let blob=

new Blob(

[

JSON.stringify(
data
)

],

{

type:
"application/json"

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

"deepika-erp-backup.json";

a.click();

}



file.onchange=

function(){

let reader=

new FileReader();


reader.onload=

function(){

let data=

JSON.parse(
reader.result
);



Object.keys(
data
)

.forEach(

k=>{

localStorage.setItem(

k,

JSON.stringify(
data[k]
)

);

}

);



alert(
"Backup Restored"
);

location.reload();

};



reader.readAsText(

this.files[0]

);

};



function resetData(){

if(

confirm(
"Delete ERP?"
)

){

localStorage.clear();

alert(
"ERP Reset"
);

location.reload();

}

}