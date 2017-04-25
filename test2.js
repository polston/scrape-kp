//http://stackoverflow.com/questions/26874444/limit-number-of-parallel-http-requests-in-node-js

//let async = require('async')
let request = require('request')
let makeUrls = require('./makeUrls')

// let urls = makeUrls
let urls = [
  'http://kcna.kp/kcna.user.article.retrieveArticleInfoFromArticleCode.kcmsf?article_code=AR0030000&kwContent&lang=kor',
  'http://kcna.kp/kcna.user.article.retrieveArticleInfoFromArticleCode.kcmsf?article_code=AR0035392&kwContent&lang=eng',
  'http://kcna.kp/kcna.user.article.retrieveArticleInfoFromArticleCode.kcmsf?article_code=AR0035392&kwContent&lang=chn'
]


function makeRequest(reqUrl){ //){
  request({
    method: 'GET',
    url: reqUrl,
    gzip: true,
    timeout: 3000,
    headers: {
      'Accept':	'*/*',
      'Host': 'kcna.kp',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Connection': 'keep-alive',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:51.0) Gecko/20100101 Firefox/51.0'
    }
    }, 
    function(err, res, body) {
      if(err) { console.log(err) }
      console.log('the decoded data is: ' + body)
    }).on('data', function(data) {
      // decompressed data as it is received
      console.log('decoded chunk: ' + data)
    }).on('res', function(res) {
      // unmodified http.IncomingMessage object
      console.log('the complete response')
      console.log(res)
      res.on('data', function(data) {
        // compressed data as it is received
        console.log('received ' + data.length + ' bytes of compressed data')
      })
    })
    //callback()
}

makeRequest(urls[1])
