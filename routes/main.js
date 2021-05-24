__path = process.cwd()

var express = require('express');
var router = express.Router();
var fetch = require('node-fetch')
const latest = require('./otaku')
const fs = require('fs')
const axios = require('axios')

router.get('/sstik', async (req, res, next) => {
    var apikeyInput = 'FreeApi',
        url = req.query.url

if (!url) return res.send({ status: false, info: 'Masukkan Parameter url'})
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'FreeApi') return res.sendFile(__path + '/routes/invalidkey.html')
     if (!url) return res.json(loghandler.noturl)
 getVideo(url)

         .then(vid => {
             console.log(vid)
             res.json(vid)
         }) 
})
					const puppeteer = require("puppeteer");

				
				async function getVideo(URL) {
					    const browser = await puppeteer.launch({
						            headless: true,
						            args: ['--no-sandbox', '--disable-setuid-sandbox']
					    });
					    const page = await browser.newPage();
					    await page.goto('https://snaptik.app/');
					
					    await page.type('#url', `${URL}`);
					    await page.click('#send', { delay: 300 });
					
					    await page.waitForSelector('#download-block > div > a:nth-child(3)', {delay: 300});
					    let mp4direct = await page.$eval("#download-block > div > a:nth-child(3)", (element) => {
						            return element.getAttribute("href");
					    });
					    let image = await page.$eval("#div_download > section > div > div > div > article > div.zhay-left.left > img", (element) => {
						            return element.getAttribute("src");
					    });
						let textInfo = await page.$eval('#div_download > section > div > div > div > article > div.zhay-middle.center > p:nth-child(2) > span', el => el.innerText);
						let nameInfo = await page.$eval('#div_download > section > div > div > div > article > div.zhay-middle.center > h1 > a', el => el.innerText);
						let timeInfo = await page.$eval('#div_download > section > div > div > div > article > div.zhay-middle.center > p:nth-child(3) > b', el => el.innerText);
						browser.close();
					    return { mp4direct, image, textInfo, nameInfo, timeInfo }
				}
router.all('/*', async (req, res, next) => {
res.send({ error: 'Not Found Files' })
console.log(req)
})
module.exports = router
