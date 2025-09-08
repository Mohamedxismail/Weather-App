let details = [];
let userInput = document.getElementById("userInput")
let btn = document.getElementById("btn")
async function getData(type) {
    let res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${type}&appid=0f0d6955843c45977884143f75865078&units=metric&lang=en`)
    let finalRes = await res.json();
    details = finalRes.list;
    console.log(details);
    console.log(finalRes);
    if (res.status == 404) {
        window.alert("City Not Found , Please write the correct name of the city")
    }
    displayState(finalRes.city.name)
}


function displayState(city) {

    let cartona = ``;
    for (let i = 0; i < details.length; i++) {
        let currentDate = new Date(details[i].dt_txt)
        let dayName = currentDate.toLocaleDateString("en-US", { weekday: "long" });

        let icon = details[i].weather[0].main;
        let iconUrl = "";
        if (icon == "Clear") {
            iconUrl = '<i class="fa-solid fa-sun fa-2xl" style="color: #FFD43B;"></i>'


        } else if (icon == "Clouds") {
            iconUrl = '<i class="fa-solid fa-cloud fa-2xl"></i>'
        } else if (icon == "Rain") {
            iconUrl = '<i class="fa-solid fa-cloud-rain fa-2xl mb-3"></i>'
        } else if (icon == "Drizzple") {
            iconUrl = '<i class="fa-solid fa-cloud-sun-rain"></i>'
        } else if (icon == "Mist") {
            iconUrl = `<i class="fa-solid fa-smog fa-2xl"></i>`
        }

        if (i === 0) {
            cartona += `<div class="col-lg-3 child text-center p-3 d-flex flex-column justify-content-between align-items-center" data-aos="zoom-in"  data-aos-duration="800" >
                <h1 id="city" class="pb-4 fs-1 text-white">${city} </h1>
                <h2 class="fw-bolder pb-3">Now / ${dayName}</h2>
                <h2 id="degree" class="fs-1 text-white">${Math.round(details[i].main.temp)}°C</h2>
                <h4 id="degree" class="pb-4">feels like ${details[i].main.feels_like}°</h4>
                <p class="icon mb-2 pb-2">${iconUrl}</p>
                <h2 id="state" class="text-white">${details[i].weather[0].main}</h2>
            </div>`
        } if (details[i].dt_txt.includes("12:00:00")) {
            cartona += `<div class="col-lg-2 child2 text-center  p-3 d-flex flex-column justify-content-between align-items-center" data-aos="fade-up" data-aos-delay="450" data-aos-duration="700">
                <h2 class="pb-4 fw-bolder">${dayName}</h2>
                <h2 id="degree" class="fs-1 pb-4 mb-2 text-white">${Math.round(details[i].main.temp)}°C</h2>
                <p class="icon mb-2 pb-2">${iconUrl}</p>
                <h3 id="state" class="text-white">${details[i].weather[0].main}</p>
            </div>`
        }
    }
    document.getElementById("myData").innerHTML = cartona
    document.body.style.backgroundImage = 'url("images/277fba7bc86484d9f6cf37c87ee44de2.jpg")'
    document.body.style.height = "auto";

}

userInput.addEventListener("change", function (e) {
    getData(e.target.value)
})

btn.addEventListener("click", function (e) {
    getData(e.target.value)
})



