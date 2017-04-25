let crawler = require('crawler')
let url = require('url')
let fs = require('fs')

let c = new crawler({
  maxConnections: 10,
  //rateLimit: 5000,
  retryTimeout: 1000,
  debug: true,
  gzip: true,
  headers: {
    'Accept':	'*/*',
    'Host': 'kcna.kp',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Connection': 'keep-alive',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:51.0) Gecko/20100101 Firefox/51.0'
  },
  // This will be called for each crawled page
  callback: function(err, res, done) {
    if(err) {
      console.log(err)
    }
    else {
      // $ is Cheerio by default
      //a lean implementation of core jQuery designed specifically for the server
      //let $ = res.$
      //console.log(res.body);
      //console.log(res.body)
      //console.log($('onclick').text())
      fs.writeFile('test.xml', res.body, function(err) {
        if(err) { return err }
      })
    }
    done()
  }
})

let artList = () => {
  for(let i = 0; i < 99999; i++) {
    
  }
}

for(let i = 0)

c.queue('http://kcna.kp/kcna.user.article.retrieveArticleInfoFromArticleCode.kcmsf?article_code=AR0035392&kwContent&lang=eng')
//c.queue('http://kcna.kp/kcna.user.article.retrieveArticleInfoFromArticleCode.kcmsf?article_code=AR0030000&kwContent&lang=eng')
//c.queue('http://kcna.kp/kcna.user.article.retrieveNewsViewInfoList.kcmsf#this')
//c.queue('http://kcna.kp/')