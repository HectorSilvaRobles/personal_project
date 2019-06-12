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
           size = size.splice(1)
           size = sizes.splice(1)
           size = size.sort((a,b) => {return a-b})
        } else {
            size = size.split(' ')
            size = size.slice(1, size.length -1)
            for(let i =0; i < size.length; i++){
                size[i] = parseFloat(size[i])
        }
    }
    } else {
        console.log('sorry there are no sizes available')
    }
    console.log(size)

    const image = cheerio('#detail-display-img-wrapper > img' , html).attr('data-zoom-image')

    let description = cheerio('.detail-description', html).text().replace(/\s\s+/g, '')
    description = description.split(' ')
    const indx = []
    description.map((val, index, arr) => {
        
        if(val.charAt(val.length -1) === '.'){
            indx.push(index)
        }
        
    })
    const index = Math.min(...indx)
    description = description.slice(0, index + 1).join(' ')
    console.log(description)


    return {
        name: name,
        price: price,
        size: size,
        image: image,
        description: description
    }
})
.catch((err) => {
    console.log(err)
})
}

module.exports = productsScrape