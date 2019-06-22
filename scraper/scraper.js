const request = require('request');
const cheerio = require('cheerio');
const rp = require('request-promise');
const productsScrape = require('./productScrape')
const fs = require('fs')
const writeStream = fs.createWriteStream('post.csv')

/// write headers
writeStream.write(`Product \n`)

const url = 'https://www.sneakerhead.com/nike-running-training-sport-p1.html'

rp(url)
.then((html)=> {
    const products = []

    const listLength = cheerio('.cat-item-name > a', html).length
    for( let i =0; i < listLength; i++){
        products.push(cheerio('.cat-item-name > a', html)[i].attribs.href);
    }
    console.log(products)
    return Promise.all(
        products.map((url) => {
            return JSON.stringify(productsScrape(url))
        })
    )
})
.then((product) => {
    console.log(product)
    writeStream.write(`${product} \n`);
})
.catch((err) => {
    console.log('got an error')
})

/// write headers
