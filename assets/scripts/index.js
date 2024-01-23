document.querySelector(".bi-list").addEventListener("click", () => {
  document.querySelector(".menu").style.display = "block";
  document.querySelector(".side").style.right = "0px";
});
document.querySelector(".bi-x").addEventListener("click", () => {
  document.querySelector(".menu").style.display = "none";
  document.querySelector(".side").style.right = "-200px";
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 992) {
    document.querySelector(".menu").style.display = "none";
    document.querySelector(".side").style.right = "-200px";
  }
});




/////CRUD/////

let url = "http://localhost:3000/data/";
let favurl = 'http://localhost:3000/fav/';
let card = document.querySelector(".cards")
let searchInp = document.querySelector("#search")
let sort = document.querySelector("#sort")
let filterInp = []
let coppy = []

async function getAll(){
    let res = await axios.get(url)
    let data = res.data
    coppy = data
    card.innerHTML = ''
    filterInp = filterInp.length || searchInp.value ? filterInp : data

    filterInp.forEach(element => {
        card.innerHTML += `
            <div>
                <img src="${element.img}" alt="">
                <h1>${element.name}</h1>
                <p>${element.text}</p>
                <h2>$ ${element.price}</h2>
                <a href="./details.html?id=${element.id}">Show Info</a>
            </div>
        `
    });
}
getAll()

//Search//

searchInp.addEventListener("input", (e)=>{
    filterInp = coppy
    filterInp =  filterInp.filter((el)=>{
        return el.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
    })
    getAll()
})

//Sort//

sort.addEventListener("change", (e)=>{
    if(e.target.value == "az"){
        filterInp.sort((a,b) => a.name.localeCompare(b.name))
    } else if(e.target.value == "za"){
        filterInp.sort((a,b) => b.name.localeCompare(a.name))
    } else {
        filterInp = coppy
    }
    getAll()
})


/////Carousel/////

const karusel = document.querySelector('.carousel');

let index = 0;
const divs = document.querySelectorAll(".carousel div").length;

function karuseliDeyis(index){
    if(index < 0){
        index = divs - 1;
    } else if(index >= divs){
        index = 0;
    } else {
        index = index;
    }

    const newPosition = -index * (18 / divs);
    karusel.style.transform = `translateX(${newPosition}%)`
}

function showPrev(){
    karuseliDeyis((index - 1 + divs) % divs)
}
function showNext(){
    karuseliDeyis((index + 1) % divs)
}

setInterval(showNext, 5000);