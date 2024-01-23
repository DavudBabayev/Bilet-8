let url = "http://localhost:3000/data/";
let card = document.querySelector("table tbody")
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
        <tr>
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.text}</td>
            <td>$ ${element.price}</td>
            <td><button onclick = "dc(${element.id})">Delete</button></td>
        </tr>
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

//Delete//

function dc(id){
    axios.delete(url + id)
}



/////POST/////

let form = document.querySelector("form")
let file = document.querySelector("#file")
let image = document.querySelector(".img img")
let nameInp = document.querySelector("#name")
let text = document.querySelector("#text")
let price = document.querySelector("#price")

file.addEventListener("change", (e)=>{
    let src = e.target.files[0];
    if(src){
        let reader = new FileReader()
        reader.readAsDataURL(src)
        reader.onload = (e)=>{
            image.src = e.target.result
        }
    }
})

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    if(nameInp.value.trim() == 0 || text.value.trim() == 0 || price.value.trim() == 0 || file.files.lenght == 0){
        if(document.querySelector(".alert").style.top == "-100px"){
            document.querySelector(".alert").style.top = "100px"
        } else {
            document.querySelector(".alert").style.top = "-100px"
        }
    } else {
        axios.post(url , {
            img: image.src,
            name: nameInp.value,
            text: text.value,
            price: price.value
        })
    }
})

document.querySelector("#close").addEventListener("click", ()=>{
    document.querySelector(".alert").style.top = "-100px"
})