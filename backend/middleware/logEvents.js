const {format} = require("date-fns");
const {v4:uuid} = require("uuid");
var events = require('events');
var eventEmitter = new events.EventEmitter();
const fs = require("fs");
const path = require("path");


async function logEvents(msg,logName){
    const dateEvent = `${format(new Date,"yyyyMMdd\tHH:mm:ss")}`;
    const logEvent = `${dateEvent}\t${uuid()}\t${msg}\n`;

    if(!fs.existsSync(path.join(__dirname,"..","logs"))){
        fs.mkdirSync(path.join(__dirname,"..","logs"));
    }

    fs.appendFileSync(path.join(__dirname,"..","logs",logName),logEvent);
}

async function Logger(req,res,next){
    eventEmitter.on("log",(msg,logName)=>{
        logEvents(msg,logName)
    });

    try{
        eventEmitter.emit("log",`${req.url}\t${req.method}\t${req.headers.origin}`,"workingLogs.txt")
    }catch(error){
        eventEmitter.emit("log",`${error.name}\t${error.message}`,"errorLogs.txt")
    }
    next();
}

module.exports = {Logger};