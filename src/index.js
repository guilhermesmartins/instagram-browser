const Instagram = require('./insta');
const config = require('../config');

const username = config.username;
const password = config.password;
const image = config.imagePath;

(async() => {    
    await Instagram.initialize();
    await Instagram.login(username, password, image);
    //await Instagram.close();
    
})()
