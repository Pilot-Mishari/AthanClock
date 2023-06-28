fetch('https://api.aladhan.com/v1/timingsByCity/28-06-2023?city=Abha&country=Saudi+Arabia&method=4')
 .then(response => {return response.json()})
 .then (data  => {
     console.log(data);
 });

 