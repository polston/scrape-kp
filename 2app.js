let request = require('request')
let cheerio = require('cheerio')
let fs = require('fs')

let options = {
  url: 'http://kcna.kp/kcna.user.article.retrieveNewsViewInfoList.kcmsf',
  gzip: true,
  headers: {
    'Accept':	'*/*',
    'Host': 'kcna.kp',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Connection': 'keep-alive',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:51.0) Gecko/20100101 Firefox/51.0'
  }
}

request.get(options, function(err, res, body){
  if(err) {
    console.log('Error: ' + err)
  }

  console.log('Status code: ' + res.statusCode)


  let $ = cheerio.load(body)
  //match returns an array of things from the regex, [1] is the article string without quotes
  let test = $('div.left_articles > ul > li > div > a').attr('onclick').match(/"(.*?)"/)[1];
  $('div.left_articles > ul > li').each(function(i, elm){
    console.log($(this).find('div > a').attr('onclick').match(/"(.*?)"/)[1])
  })
  console.log(test)
})