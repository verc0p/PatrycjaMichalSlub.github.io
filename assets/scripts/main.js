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

const targetTime = "2026-07-04T14:00";

fetch("https://api.open-meteo.com/v1/forecast?latitude=50.5073&longitude=19.1917&hourly=temperature_2m,precipitation_probability&start_date=2026-07-04&end_date=2026-07-04")
  .then(res => res.json())
  .then(data => {
    const index = data.hourly.time.indexOf(targetTime);

    if (index !== -1) {
      const temp = data.hourly.temperature_2m[index];
      const rain = data.hourly.precipitation_probability[index];

      document.getElementById("weather-widget").innerHTML =
        `<p>Pogoda przewidywana</p> 🕑 14:00 ☀️ ${temp}°C 💧 ${rain}%`;
    } else {
      document.getElementById("weather-widget").textContent = "Brak prognozy";
    }
  })
  .catch(() => {
    document.getElementById("weather-widget").textContent = "Błąd";
  });