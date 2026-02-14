// LOGIN
function login() {
  let email = document.getElementById("email").value;
  let pass = document.getElementById("pass").value;

  let user = JSON.parse(localStorage.getItem("user"));

  if(user && user.email == email && user.pass == pass) {
    window.location.href = "dashboard.html";
  } else {
    notify("Wrong login!");
  }
}

// REGISTER
function register() {
  let name = document.getElementById("rname").value;
  let email = document.getElementById("remail").value;
  let pass = document.getElementById("rpass").value;

  localStorage.setItem("user", JSON.stringify({name,email,pass}));
  notify("Registered Successfully!");
  window.location.href="index.html";
}

// REMINDERS
let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

function addReminder() {
  let med = document.getElementById("med").value;
  let time = document.getElementById("time").value;
  reminders.push({med,time});
  localStorage.setItem("reminders", JSON.stringify(reminders));
  showReminders();
  notify("Reminder Added!");
}

function showReminders() {
  let list = document.getElementById("list");
  if(!list) return;
  list.innerHTML="";
  reminders.forEach(r=>{
    let li=document.createElement("li");
    li.innerHTML="💊 "+r.med+" ⏰ "+r.time;
    list.appendChild(li);
  });
}
showReminders();

// ALARM
setInterval(()=>{
  let now=new Date();
  let t=now.getHours().toString().padStart(2,"0")+":"+now.getMinutes().toString().padStart(2,"0");
  reminders.forEach(r=>{
    if(r.time==t){
      notify("💊 Take Medicine: "+r.med);
    }
  });
},1000);

// AI CHAT (Fake demo AI)
function aiChat() {
  let q=document.getElementById("question").value;
  document.getElementById("answer").innerHTML="Doctor: Drink water, rest, and consult doctor for "+q;
}

// NOTIFICATION POPUP
function notify(msg) {
  if(Notification.permission=="granted") {
    new Notification(msg);
  } else {
    Notification.requestPermission();
  }
}

// DARK MODE
function toggleDark() {
  document.body.classList.toggle("dark");
}