function getTimeString (times){
    
    const days = parseInt (times / 86400);
    const remindSecondByDay = days % 86400;
    const hours = parseInt(remindSecondByDay / 3600);
    const remindSecondByHours = (hours % 3600);
    const minute = parseInt(remindSecondByHours / 60);
    const second = minute % 60;

    return `${days} days ${hours} Hours ${minute} Minute ${second} Second ago`
};

const findTime = getTimeString(7265000);
console.log(findTime);