const puppeteer = require('puppeteer');

let browser;
let page;
let url = 'https://www.instagram.com/';
const iPhone = puppeteer.devices['iPhone 8'];


const Instagram = {
    async initialize() {
        browser = await puppeteer.launch({
            headless: false
        });

        page = await browser.newPage();
        await page.emulate(iPhone);
    },
    async login(username, password, image) {
        await page.goto(url);

        await page.waitForSelector('button[type="button"]');
        await page.click('button[type="button"]');

        await page.waitForSelector('input[name="username"]');

        await page.type('input[name="username"]', username, { delay: 100 });
        await page.type('input[name="password"]', password, { delay: 50 });
        await page.click('button[type="submit"]');

        let loginInfoBtn =  await page.$('button[type="button"]');
        
        await page.waitForSelector('.coreSpriteKeyhole');

        if(loginInfoBtn != null) {
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Enter');
        } 

        await page.waitForSelector('div[role="menuitem"]');

        await page.evaluate(() => {
            document.querySelector("[aria-label='New Post']")
                .parentElement.click();
        });

        let fileInputs = await page.$$("input[type='file']");
        let input = fileInputs[fileInputs.length-1];

        await page.evaluate(() => document.querySelector("[aria-label='New Post']").parentElement.click());

        await input.uploadFile(image);

        //all the code below is from https://github.com/jamesgrams, thanks for sharing your repo!
        await page.waitForXPath("//button[contains(text(),'Next')]");

        let next = await page.$x("//button[contains(text(),'Next')]");
        await next[0].click();
    
        await page.waitForXPath("//button[contains(text(),'Share')]");
        let share = await page.$x("//button[contains(text(),'Share')]");    

        await share[0].click();
    },

    async close() {
        await browser.close();
    }
}

module.exports = Instagram;