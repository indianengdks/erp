/* =========================
LOAD
========================= */

let settings=

JSON.parse(

localStorage.getItem(
"settings"
)

)||{

studioName:"",
ownerName:"",
mobile:"",
address:"",
tax:0,
currency:"₹",

dark:true,
backup:false,
employee:true

};

/* =========================
ELEMENTS
========================= */

const studio=
document.getElementById(
"studioName"
);

const owner=
document.getElementById(
"ownerName"
);

const mobile=
document.getElementById(
"mobile"
);

const address=
document.getElementById(
"address"
);

const tax=
document.getElementById(
"tax"
);

const currency=
document.getElementById(
"currency"
);

const dark=
document.getElementById(
"dark"
);

const backup=
document.getElementById(
"backup"
);

const employee=
document.getElementById(
"employee"
);

/* =========================
LOAD
========================= */

function loadSettings(){

studio.value=
settings.studioName;

owner.value=
settings.ownerName;

mobile.value=
settings.mobile;

address.value=
settings.address;

tax.value=
settings.tax;

currency.value=
settings.currency;

dark.checked=
settings.dark;

backup.checked=
settings.backup;

employee.checked=
settings.employee;

}

/* =========================
SAVE
========================= */

function saveSettings(){

settings={

studioName:
studio.value,

ownerName:
owner.value,

mobile:
mobile.value,

address:
address.value,

tax:
Number(
tax.value
)||0,

currency:
currency.value,

dark:
dark.checked,

backup:
backup.checked,

employee:
employee.checked

};

localStorage.setItem(

"settings",

JSON.stringify(
settings
)

);

localStorage.setItem(
"studioName",
studio.value
);

alert(
"Settings Saved"
);

}

/* =========================
ADMIN LOGIN CHANGE
========================= */

function changeLogin(){

let user=

document
.getElementById(
"newLoginUser"
)
.value
.trim();

let pass=

document
.getElementById(
"newLoginPass"
)
.value
.trim();

if(
!user||
!pass
){

alert(
"Fill all fields"
);

return;

}

localStorage.setItem(
"adminUser",
user
);

localStorage.setItem(
"adminPass",
pass
);

alert(
"Admin Updated"
);

}

/* =========================
EMPLOYEE CHANGE
========================= */

function changeEmployee(){

let user=

document
.getElementById(
"empUser"
)
.value
.trim();

let pass=

document
.getElementById(
"empPass"
)
.value
.trim();

if(
!user||
!pass
){

alert(
"Fill fields"
);

return;

}

let employees=

JSON.parse(

localStorage.getItem(
"employees"
)

)||[];

employees.push({

user,
pass

});

localStorage.setItem(

"employees",

JSON.stringify(
employees
)

);

alert(
"Employee Saved"
);

}

/* =========================
RESET
========================= */

function resetERP(){

if(

!confirm(

"Reset ERP?"

)

)

return;

localStorage.clear();

alert(
"ERP Reset"
);

location.reload();

}

/* =========================
AUTO BACKUP
========================= */

function autoBackup(){

if(
!settings.backup
)
return;

localStorage.setItem(

"autoBackup",

JSON.stringify(
localStorage
)

);

}

setInterval(

autoBackup,

30000

);

/* =========================
START
========================= */

loadSettings();
