const fs = require('fs');
const axios = require('axios');
const Discord = require('discord.js')
const chalk = require('chalk');
const client = new Discord.Client();

locations = [
    "Uppuguda UPHC 2",
    "Uphc Malakpet 2",
    "Malakpet Area Hopsital -2",
    "King Koti DH -2"
]

client.on("ready", () => {
    console.log(`logged in as ${client.user.tag}`)
})

var j = 0;
async function fetch(){
  await axios.get('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=581&date=02-06-2021')
    .then(res => {
        const centers = res.data.centers;
        const freeCenters = centers.filter(center => center.fee_type === "Free" && center.sessions[0].vaccine === "COVAXIN");
        fs.writeFileSync('a.json',JSON.stringify(freeCenters))
        console.log(j++);
    })
}
var k=0;

async function notify(){
  let dataBuffer = fs.readFileSync('a.json');
    let dataJSON = dataBuffer.toString();
    let data = JSON.parse(dataJSON);
    for(let i=0;i<data.length;i++){
        if(data[i].sessions[0].available_capacity_dose1 > 0){
            client.channels.cache.get('849535195249115139').send(`${i}--> ${data[i].name} : ${data[i].sessions[0].available_capacity_dose1}`);
            // console.log("...")
        }
    }
}

async function x(fun1,callback){
  await fun1();
  await callback();
}

setInterval(() => {
  x(fetch,notify)
},20000);

client.login('ODQ5NTM2Mjc5Nzg3MDc3NjUz.YLcmUA.2BECYFxzMgkYkUCdhHUX0WssVDA')

