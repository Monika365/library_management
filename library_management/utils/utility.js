const Constant = require('../utils/constant');
const Utils = {
    getId: (idCode, length) => {
        // let roleID = role == 'ADMIN' ? 'AD' : 'ST';
        return (idCode + '-' + Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)));
    },
    getReturnDate:(date, days)=>{

        const tomorrow = new Date(date);
        tomorrow.setDate(date.getDate() + days);
        return tomorrow;
        
    },
    getPenalty:(retDate, currentDate)=>{

var actualReturnDate = new Date(retDate);// returnd date
var returnDate = new Date(currentDate);// person return in this date ; 
console.log('dates---', returnDate, actualReturnDate);
var diffDays = parseInt((actualReturnDate - returnDate) / (1000 * 60 * 60 * 24), 10); 
console.log('diffeencr--',diffDays);
if(diffDays<=0){
    return -(Constant.PENALTY*diffDays)
}else{
    return 0;
}
    }
}
module.exports = Utils

//getID('BK', 4);