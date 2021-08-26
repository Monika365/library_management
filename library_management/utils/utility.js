const Utils = {
    getID: (idCode, length) => {
        // let roleID = role == 'ADMIN' ? 'AD' : 'ST';
        return (idCode + '-' + Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)));
    }
}
module.exports = Utils

//getID('BK', 4);