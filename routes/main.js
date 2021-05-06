__path = process.cwd()

var express = require('express');
var router = express.Router();
var fetch = require('node-fetch')
const latest = require('./otaku')
const fs = require('fs')
const axios = require('axios')
const getBuffer = async (url, options) => {
console.log({hasil: url})
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (e) {
		console.log(`Error : ${e}`)
	}
}

router.get('/ocr', async (req, res, next) => {
if (!req.query.url) return res.json({ status: null, error: 'Masukkan Parameter url'})
b = await fetch('http://192.53.115.44/ocr?url='+req.query.url).then(v => v.json())
res.send(b)
})
router.get('/nulis', async (req, res, next) => {
	
	if (!req.query.teks) return res.json({status: null, error: 'Masukkan Parameter teks' })
	
	teks = req.query.teks
	
	      split = teks.replace(/(\S+\s*){1,10}/g, "$&\n")
	
	      fixedHeight = split.split("\n").slice(0, 25).join("\\n")
	
	      console.log(split)
	
	      spawn("convert", [
		      
		                  "src/kertas/magernulis2.jpg",
		      
		                  "-font",
		      
		                  "src/font/212BabyGirl.otf",
		      
		                  "-size",
		      
		                  "958x1280",
		      
		                  "-pointsize",
		      
		                  "18",
		      
		                  "-interline-spacing",
		      
		                  "3",
		      
		                  "-annotate",
		      
		                  "+170+222",
		      
		                  fixedHeight,
		      
		                  "media/magernulis2.jpg"
		      
		               ])
	
	         .on("error", () => {
		      
		               console.log("error")
		      
		               res.send('Error')
		      
	      })
	
	         .on("exit", () =>
		     
		     {
		      
		               res.sendFile(__path + '/media/magernulis2.jpg')
		      
	      })
	
})
router.get('/brainly', async (req, res, next) => {
if (!req.query.q) return res.json({ status: 'error', error: 'Masukkan Parameter q'})
res.json(await require('brainly-scraper')(req.query.q))
})
router.get('/hartatahta', async (req, res, next) => {
if (!req.query.text) return res.json({ status: 'error', error: 'Masukkan Parameter text'})
res.type('png')
res.send(await require('../lib/tahta').ht(req.query.text))
})

router.get('/otaku-latest', async (req, res, next) => {
try {
res.json(await latest())
console.log(await latest())
} catch {
res.send('Error Not Responding, Please Chat Owner!!')
}
})

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
async function getVideo(URL) {
b = await fetch('http://192.53.115.44/sstik?url='+URL).then(v => v.json())
return b
}
router.all('/*', async (req, res, next) => {
res.send(fs.readFileSync('./error.html', 'utf-8'))
console.log(req)
})
module.exports = router
