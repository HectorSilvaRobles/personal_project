const rp = require('request-promise');
const cheerio = require('cheerio')



const productsScrape = function(url){
return rp(url)
.then((html) => {
    const name = cheerio('.detail-title', html).text()
    const price = cheerio('.price', html).text().slice(1)

    /// for shoe sizes
    let size = cheerio('#detail-all-size', html).text().replace(/\s\s+/gm, ' ')
    if(size !== null ){
        if(size.includes('M' && 'W')){
          size = size.replace(/M|W/g, ' ')
          size = size.split(' ')
        
          for(let i = 0; i < size.length; i++){
            size[i] = parseFloat(size[i])
          }
           sizes = [...new Set(size)]
           console.log(sizes.splice(1))
        } else {
            size = size.split(' ')
            size = size.slice(1, size.length -1)
            for(let i =0; i < size.length; i++){
                size[i] = parseFloat(size[i])
                console.log(size[i])
        }
    }
    } else {
        console.log('sorry there are no sizes available')
    }

    const images = cheerio('#detail-display-icon > ul > li > img' , html).attr("src")
    console.log(images)


    return {
        name: name,
        price: price,
        size: size,
        image: images
    }
})
.catch((err) => {
    console.log(err)
})
}
module.exports = productsScrape