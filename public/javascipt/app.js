//  CREATING CONTENT OF BODY
const nContent = document.createElement("div")
nContent.classList.add("content")
document.body.appendChild(nContent)

//  THE BONES FUNCTIONS
function createDiv(src) {
    var ulClassName = "ul" + src.replace(/\s/gm, '')
    const nDiv = document.createElement("div")
    nDiv.classList.add("news-source-div")
    const nH2 = document.createElement("h2")
    nH2.classList.add("news-source-name")
    const nUl = document.createElement("ul")
    nUl.classList.add("ul", ulClassName) 
    nContent.append(nDiv)
    nDiv.append(nH2, nUl)
    nH2.innerText = src
}

function addToList(url, des, src) {
  var nUl = document.getElementsByClassName("ul" + src.replace(/\s/gm, ''))[0]  
  const nLi = document.createElement("li")
  nLi.classList.add("li")
  nLi.innerHTML = des
  const nA = document.createElement("a")//.href="google.com" 
  nA.setAttribute("href", url)  
  nA.appendChild(nLi)
  nUl.appendChild(nA)
}

const searchText = document.getElementById("inputText")
const searchButton = document.getElementById("inputButton")

//when clicking search button
searchButton.addEventListener("click", function(){
  getInfo()
})
//when hitting enter
searchText.addEventListener("keydown", function (e) {
  if (e.code === "Enter") {
    getInfo()  
  }
});

function getInfo(){
  //  GET VARIABLE
  var searchQ = searchText.value
  //  PUT IN JSON FORMAT
  var searchData = { searchQ }  
  searchText.select()
  
  //  FETCH METHOD SENT TO SERVER.JS
  const search = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},   
    body: JSON.stringify(searchData)
  }
  fetch('/api', search)
  .then(res => res.json())
  .then(news => {
      tamale(news)
  })
}

function tamale(nts){

for (let i = 0; i < nts.length; i++) {

const nArray = Array.from(document.querySelectorAll('.news-source-name')).map(e=>e.innerHTML)

  if(nArray.includes(nts[i].source.name)){
    addToList(nts[i].url, nts[i].description, nts[i].source.name)
  }else {
    createDiv(nts[i].source.name)
    addToList(nts[i].url, nts[i].description, nts[i].source.name)
  }  
}
}





















