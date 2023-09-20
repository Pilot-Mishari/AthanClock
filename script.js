const date = new Date();

var city = "Riyadh"
var country = "Saudi Arabia"
var fajr = document.getElementById('athan-fajr');
var athan = document.getElementById('athan');
let year = date.getFullYear();
let month = date.getMonth()+1;
let day = date.getDate();
let time = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false});
console.log(year, month, day, time);

fetch('https://api.aladhan.com/v1/timingsByCity/${day}-${month}-${year}?city=${city}&country=Saudi+Arabia&method=4')
 .then(response => {return response.json()})
 .then (data  => {
     console.log(data);
     console.log(data.data.meta.method.name);

     document.getElementById('body').innerHTML=`
        <h1>Prayer Times</h1>
        <h2>${city}, ${country}</h2>
        <h2 class="time"><span class="name-prayer">Fajr </span>${data?.data.timings.Fajr}</h2>
        <h2 class="time"><span class="name-prayer">Sunrise </span>${data?.data.timings.Sunrise}</h2>
        <h2 class="time"><span class="name-prayer">Dhuhr </span>${data?.data.timings.Dhuhr}</h2>
        <h2 class="time"><span class="name-prayer">Asr </span>${data?.data.timings.Asr}</h2>
        <h2 class="time"><span class="name-prayer">Maghrib </span>${data?.data.timings.Maghrib}</h2>
        <h2 class="time"><span class="name-prayer">Isha </span>${data?.data.timings.Isha}</h2>
        <h2 class="time"><span class="name-prayer">Last Third </span>${data?.data.timings.Lastthird}</h2>

        <h2 class="taqweem"><span class="name-prayer">Calculation Method </span>${data.data.meta.method.name}</h2>
        
        
`
    
 function check_prayer(){
    if(time == data?.data.timings.Fajr){
        console.log(true)
        fajr.play();
    }

    else if(time == data?.data.timings.Dhuhr){
        athan.play();
    }
    else if(time == data?.data.timings.Asr){
        athan.play();
    }
    else if(time == data?.data.timings.Maghrib){
        athan.play();
    }
    else if(time == data?.data.timings.Isha){
        athan.play();
    }
    else if(time == data?.data.timings.Lastthird){
        athan.play();
    }
    else{
        console.log(false)
        
    }
 }

 check_prayer();
 });

