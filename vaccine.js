// const fs = require('fs');
// const axios = require('axios');

locations = [
    "Uppuguda UPHC 2",
    "Uphc Malakpet 2",
    "Malakpet Area Hopsital -2",
    "King Koti DH -2"
]
var i = 0;
setInterval(() => {
    axios.get('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=581&date=02-06-2021')
    .then(res => {
        const centers = res.data.centers;
        const freeCenters = centers.filter(center => center.fee_type === "Free" && center.sessions[0].vaccine === "COVAXIN");
        // fs.writeFileSync('a.json',JSON.stringify(freeCenters))
        console.log(freeCenters);
   
    })
},5000)

