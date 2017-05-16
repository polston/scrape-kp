let rp = require('request-promise-native')
let cheerio = require('cheerio')
let async = require('async')
let fs = require('fs')
let articleCodes = []

let start_page = 10
let end_page = 31000

let options = {
  // url: 'http://kcna.kp/kcna.user.article.retrieveNewsViewInfoList.kcmsf',
  // url: 'http://kcna.kp/kcna.user.article.retrieveArticleListForPage.kcmsf?page_start=' + articleCodesPage +  '&kwDispTitle=&keyword=&newsTypeCode=NT41&articleTypeList=&photoCount=0&movieCount=0&kwDispTitle=&kwContent=&fromDate=&toDate=',
  url: 'http://kcna.kp/kcna.user.article.retrieveArticleListForPage.kcmsf?page_start=31000&kwDispTitle=&keyword=&newsTypeCode=NT41&articleTypeList=&photoCount=0&movieCount=0&kwDispTitle=&kwContent=&fromDate=&toDate=',
  gzip: true,
  headers: {
    'Accept':	'*/*',
    'Host': 'kcna.kp',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Connection': 'keep-alive',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:51.0) Gecko/20100101 Firefox/51.0'
  },
  // xmlMode: true,
  transform: function(body){
    return cheerio.load(body, {xmlMode: true})
  }
  //timeout: 60000
}

function getArticleCodePage(pageNum){
  let options = {
  // url: 'http://kcna.kp/kcna.user.article.retrieveNewsViewInfoList.kcmsf',
  // url: 'http://kcna.kp/kcna.user.article.retrieveArticleListForPage.kcmsf?page_start=' + pageNum +  '&kwDispTitle=&keyword=&newsTypeCode=NT41&articleTypeList=&photoCount=0&movieCount=0&kwDispTitle=&kwContent=&fromDate=&toDate=',
  url: 'http://kcna.kp/kcna.user.article.retrieveArticleListForPage.kcmsf?page_start='+ pageNum +'&kwDispTitle=&keyword=&newsTypeCode=NT41&articleTypeList=&photoCount=0&movieCount=0&kwDispTitle=&kwContent=&fromDate=&toDate=',
  gzip: true,
  headers: {
    'Accept':	'*/*',
    'Host': 'kcna.kp',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Connection': 'keep-alive',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:51.0) Gecko/20100101 Firefox/51.0'
  },
  // xmlMode: true,
  transform: function(body){
    return cheerio.load(body, {xmlMode: true})
  }
  //timeout: 60000
}
  return rp(options).then(function($){
    if($('articleCode').text() == ''){
      console.log('null?: ' + pageNum)
      return null
    }
    // articleCodes.push($('articleCode').text())
    let tempArr = []
    //console.log($('articleCode').text())
    $('articleCode').each(function(i, elmement){
        // console.log($(this).text())
        //articleCodes.push($(this).text())
        tempArr.push($(this).text())
      })
      console.log('okay: ' + pageNum)
    return tempArr
  }).catch(function(err){
    console.log(err)
    return err
  })
}

async.whilst(
  function(){
    return start_page <= end_page
  },
  function(next){
    //console.log('writing?')
    //fs.writeFileSync('articleCodes.txt',getArticleCodePage(start_page))
    getArticleCodePage(start_page).then(function(res){
      //console.log('why')
      if(res != null){
        //console.log(res)
        articleCodes.push(res)
      }
      //articleCodes.push(res)
      next()
    })
    start_page += 10
    
  },
  function(err, result){
    if(err) { return err }
    //console.log('res: ' + result)
    //console.log('artCodes: ' + articleCodes)
    fs.writeFileSync('articleCodes.txt', articleCodes)
    //return err
})

//let test = getArticleCodePage(options)

console.log('test')
//console.log('thing?: ' + test)