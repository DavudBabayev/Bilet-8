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


let id = new URLSearchParams(window.location.search).get("id")
let url = "http://localhost:3000/data/";
let card = document.querySelector(".cards")

async function details(id){
    let res = await axios.get(url + id)
    let data = res.data
        
    card.innerHTML += `
        <div>
            <img src="${data.img}" alt="">
            <h1>${data.name}</h1>
            <p>${data.text}</p>
            <h2>$ ${data.price}</h2>
        </div>
    `
}
details(id)