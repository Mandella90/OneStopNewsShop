const PORT = 2323
const express = require('express')
const app = express()
const NewsAPI = require('newsapi')
const newsapi = new NewsAPI('9f942c761cb94629b9308fd9a846055b')
const bodyParser = require('body-parser')
app.use(express.json())
//this allows the index.html to use it's css and js files
app.use(express.static("./"))
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

//   DATES
var now = new Date().toISOString().slice(0,10)
let yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)
yesterday = yesterday.toISOString().slice(0,10)

//use the index.html file
app.get('/', function(req,res){
    res.sendFile(__dirname + "/views/index.html")
  })  

app.post('/api', (req, res) =>{
  //testing the request
    console.log(req.body.searchQ)

    newsapi.v2.everything({
      sources: 'fox-news, cnn, the-washington-post, bloomberg',
      domain: 'foxnews.com, cnn.com, washingtonpost.com, bloomberg.com',
      q: req.body.searchQ,
      language: 'en',
      from: yesterday,
      to: now,
      pagesize: '40'
      }).then(response => {    
        res.json(response.articles)
    })
})
  






