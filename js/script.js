let woeid;
// delhi 28743736
// london 44418 
//san fransisco 2487956
// chicago 2379574

function dayAfterTomorrow(){  // to get the date of dayAfterTomorrow

        let dayAfterTomorrow = new Date(new Date().getTime() + (24 * 60 * 60 * 1000)*2);
        let dd = dayAfterTomorrow.getDate();
        let mm = dayAfterTomorrow.getMonth()+1; //January is 0!

        let yyyy = dayAfterTomorrow.getFullYear();
        if(dd<10){
            dd='0'+dd;
        } 
        if(mm<10){
            mm='0'+mm;
        } 
          dayAfterTomorrow = dd+'/'+mm+'/'+yyyy;
            // console.log(dayAfterTomorrow);
        document.querySelector('.dayAfterTomorrow h1').textContent = dayAfterTomorrow;
}  

dayAfterTomorrow();



 function getEmoji(abbr){
    // console.log(abbr);
    
    switch(abbr){
        case "c": return `🔆`;
                  break;
        case "hr": return `☔️`;
                  break;
        case "lr": return `🌧`;
                  break;
        case "s": return `🌦`;
                  break;
        case "hc": return `☁️`;
                  break;
        case "lc": return `⛅️`;
                  break;
        case "t": return `⚡️`;
                  break;
        case "sn": return `❄️`;
                  break;
        case "sl": return `🌨`;
                  break;
        case "h": return `☔️`;
                  break;
    }

 }


async function getWoeid(latitude,longitude) {  // to get 'woeid' from 'latitude' and 'longitude'
            try {
                const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?lattlong=${latitude},${longitude}`);
                const data = await result.json();
                return data;
            } catch(error) {
                //alert(error);
            }
    }


 async function getWeatherAW(woeid) {    // to get weather data from 'woeid'
            try {
                const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`);
                const data = await result.json();
                return data;
            } catch(error) {
                //alert(error);
            }
        }


function w(latitude,longitude){

    getWoeid(latitude,longitude).then(data => {
           woeid =  parseInt(data[0].woeid);
           return woeid;
       })
      .then(woeid => {
          // console.log(woeid);
         getWeatherAW(woeid).then(data => {
            const tod = document.querySelector('.today h2');
            const tom = document.querySelector('.tomorrow h2');
            const dat = document.querySelector('.dayAfterTomorrow h2');

            const todEmojiEl = document.querySelector('.today h3');
            const tomEmojiEl = document.querySelector('.tomorrow h3');
            const datEmojiEl = document.querySelector('.dayAfterTomorrow h3');

            const t = document.querySelector('.t');


            // console.log(data);
            const sunrise =  Array.from(data.sun_rise).slice(11,19).join('');
            const sunset =  Array.from(data.sun_set).slice(11,19).join('');
            // console.log(sunrise);

            const today = data.consolidated_weather[0];
            const tomorrow = data.consolidated_weather[1];
            const dayAfterTomorrow = data.consolidated_weather[2];

            const todEmoji = getEmoji(today.weather_state_abbr);
            const tomEmoji = getEmoji(tomorrow.weather_state_abbr);
            const datEmoji = getEmoji(dayAfterTomorrow.weather_state_abbr);
             t.classList.remove("r")
             t.classList.add("animate-tada");

             const newline = "\r\n";
             // const nbsp = "\u00a0";
            
            document.querySelector('#tertiary .location').textContent =`${data.title}`;
            tod.textContent = `Min Temp: ${today.min_temp.toFixed(2)}°C ${newline} Max Temp: ${today.max_temp.toFixed(2)}°C ${newline} ${today.weather_state_name}`;
            todEmojiEl.textContent = todEmoji;
            tom.textContent = `Min Temp: ${tomorrow.min_temp.toFixed(2)}°C ${newline} Max Temp: ${tomorrow.max_temp.toFixed(2)}°C ${newline} ${tomorrow.weather_state_name}`;
            tomEmojiEl.textContent = tomEmoji;
            dat.textContent = `Min Temp: ${dayAfterTomorrow.min_temp.toFixed(2)}°C ${newline} Max Temp: ${dayAfterTomorrow.max_temp.toFixed(2)}°C ${newline} ${dayAfterTomorrow.weather_state_name}`;
            datEmojiEl.textContent = datEmoji;
            document.querySelector('.sunrise span').textContent = sunrise ;
            document.querySelector('.sunset span').textContent = sunset;

               // console.log(`Temperatures today in ${data.title} stay between ${today.min_temp} and ${today.max_temp}.weather conditions ${today.weather_state_name} `);
        });


    })
    
}


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert( "Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    w(latitude,longitude);
 }
getLocation();