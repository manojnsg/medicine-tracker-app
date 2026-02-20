// Service Worker
if('serviceWorker' in navigator){
 navigator.serviceWorker.register('service-worker.js');
}

// Register
function register(){
 localStorage.setItem("user",
 document.getElementById("regUser").value);
 localStorage.setItem("pass",
 document.getElementById("regPass").value);
 alert("Registered Successfully");
 window.location="login.html";
}

// Login
function login(){
 let u=document.getElementById("username").value;
 let p=document.getElementById("password").value;

 if(u===localStorage.getItem("user") &&
    p===localStorage.getItem("pass")){
  window.location="dashboard.html";
 }else{
  alert("Invalid Login");
 }
}

// Navigation
function go(page){
 window.location=page;
}

// Save Medicine
function saveMedicine(){
 let name=document.getElementById("medName").value;
 let dose=document.getElementById("dosage").value;

 let meds=JSON.parse(localStorage.getItem("meds"))||[];
 meds.push({name:name,dose:dose});
 localStorage.setItem("meds",JSON.stringify(meds));

 alert("Medicine Saved");
}

// Load History
function loadHistory(){
 let history=JSON.parse(localStorage.getItem("history"))||[];
 let output="";

 history.forEach(item=>{
  output+=`
   <div class="card">
    <b>${item.name}</b><br>
    Dosage: ${item.dose}<br>
    Time: ${item.time}<br>
    Status: ${item.status}
   </div>`;
 });

 document.getElementById("history").innerHTML=output;
}

// Schedule Reminder
function scheduleReminder(){

 Notification.requestPermission();

 let name=document.getElementById("rMedName").value;
 let dose=document.getElementById("rDosage").value;
 let time=document.getElementById("rTime").value;

 let reminder=new Date(time).getTime();
 let now=new Date().getTime();

 let delay=reminder-now;

 if(delay<=0){
  alert("Select future time");
  return;
 }

 setTimeout(()=>{

  new Notification("Medicine Reminder 💊",{
   body:`Take ${name}\nDosage: ${dose}`,
   requireInteraction:true
  });

  let audio=new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg");
  audio.play();

  let history=JSON.parse(localStorage.getItem("history"))||[];

  history.push({
   name:name,
   dose:dose,
   time:new Date().toLocaleString(),
   status:"Not Taken"
  });

  localStorage.setItem("history",JSON.stringify(history));
  localStorage.setItem("lastNotification",
  `${name} reminder triggered`);

 },delay);

 alert("Reminder Scheduled");
}

// AI Doctor
function aiReply(){
 document.getElementById("answer").innerText=
 "Drink water and consult doctor if serious.";
}

// Dark Mode
function toggleDark(){
 document.body.classList.toggle("dark");
}