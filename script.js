const date = new Date();

var city = "Riyadh";
var country = "Saudi Arabia";
var region = 12211;
var fajr = document.getElementById('athan-fajr');
var athan = document.getElementById('athan');
var salahfajr = false;
var salahghair = false;
let long, lat;
let year = date.getFullYear();
let month = date.getMonth()+1;
let day = date.getDate();
let time = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false});
console.log(year, month, day, time, salahfajr, salahghair);

getLocation();

fetch('http://api.aladhan.com/v1/calendar/2019?latitude=${lat}&longitude=${long}&method=2')
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
 setInterval(check_prayer, 1000);
 //setInterval(checkCode, 2000);
 setInterval(checkStatus, 1000);

 function check_prayer(){
    if(time >= data?.data.timings.Fajr && time <= data?.data.timings.Sunrise){
        salahfajr = true;
        salahghair = false;
    }

    else if(time >= data?.data.timings.Dhuhr && time <= data?.data.timings.Asr){
        salahfajr = false;
        salahghair = true;
    }
    else if(time >= data?.data.timings.Asr && time <= data?.data.timings.Maghrib){
        salahfajr = false;
        salahghair = true;
    }
    else if(time >= data?.data.timings.Maghrib && time <= data?.data.timings.Isha){
        salahfajr = false;
        salahghair = true;
    }
    else if(time == data?.data.timings.Isha && time <= data?.data.timings.Dhuhr){
        salahfajr = false;
        salahghair = true;
    }
    else if(time == data?.data.timings.Lastthird && time <= data?.data.timings.Dhuhr){
        salahfajr = false;
        salahghair = true;
    }
    else{
        salahfajr = false;
        salahghair = false;
        
    }
 }

 check_prayer();
 checkStatus();
 });

 function showtime(){
    document.getElementById('body').innerHTML = `
        <h1>${time}</h1>
    `
 }

 function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(prinPosition);
    }
    else{
        window.alert('Geolocation permissions are not granter or supported!')
    }
 }
 function prinPosition(position){
    long = position.coords.longitude;
    lat = position.coords.latitude;
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
 }
function checkStatus(){
    if(salahfajr == true && salahghair == false){
        athan-fajr.play();
        athan.pause();
    }

    else if(salahfajr == false && salahghair == true){
        athan.play();
        athan-fajr.pause();
    }

    else{
        athan.pause();
        athan-fajr.pause();
        // That's it!
    }
}

function change_maqam(){
    document.getElementById('body').innerHTML = `
        <div>
            <h2 class="header-main">Select Region</h2>
            <ul class="listarea">
                <li onclick=${region = 54000}>Riyadh, Saudi Arabia</li>
            </ul>
        </div>
    `
}



/*function checkCode(){
    console.log(region);
    if(region == 12211){
        // do nothing
    }

    else if(region == 54000){
        maqamLahore();
    }

    else if(region == 05444){
        maqamKarachi();
    }

    else if(region == 04403){
        maqamIslamabad();
    }

    else{
        console.log(false)
        // That's it!
    }
}*/