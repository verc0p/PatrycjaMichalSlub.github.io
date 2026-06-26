/* COUNTDOWN */
const target = new Date("2026-07-04T14:00:00").getTime();

setInterval(()=>{
  const now = Date.now();
  const diff = target - now;

  document.getElementById("d").innerText = Math.floor(diff/86400000);
  document.getElementById("h").innerText = Math.floor(diff%86400000/3600000);
  document.getElementById("m").innerText = Math.floor(diff%3600000/60000);
  document.getElementById("s").innerText = Math.floor(diff%60000/1000);
},1000);

/* REVEAL */
const items = document.querySelectorAll(".reveal");

const obs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add("show");
  });
},{threshold:0.15});

items.forEach(i=>obs.observe(i));