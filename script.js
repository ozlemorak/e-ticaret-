const url = "https://fakestoreapi.com/products";

document.addEventListener("DOMContentLoaded", function(){
    fetch(url)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
        data.forEach(function(resim){
            ekranaYazdir(resim)
        })
    })
})


const ekranaYazdir = (resim) => {
    const row = document.querySelector(".row");
    row.innerHTML += `
            <div class="col-4 boyut mb-4">
                <div class="card">
                    <img width="200px" height="300px" src="${resim.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${(resim.title).slice(0,25)}</h5>
                      <p class="card-price">${resim.price}₺</p>
                      <a id="addBtn" href="#" class="btn btn-primary">Sepete Ekle</a>
                    </div>
                </div>
            </div>
    `
}


// ! Ürünler içerisinde arama algoritmasını oluşturmak için;

const form = document.querySelector("form");


form.addEventListener("submit", function(e){
    e.preventDefault()
    let searchText = searchInput.value;
    // console.log(searchText);
    searchInput.value = "";

    let cards = document.querySelectorAll(".col-4");

    cards.forEach(function(card){
        let title = card.querySelector(".card-title");
        if(title.innerHTML.trim().toLowerCase().includes(searchText)){
            card.style.display = "block";
        }else{
            card.style.display = "none";
        }
    })
})


// ! Sepete ekle butonuna tıkladığımda little-box divinin değerini artırmak için;
const row = document.querySelector(".row");

const ekle = (e) => {
    if(e.target.id.includes("addBtn")){
        const littleBox = document.querySelector(".little-box");
        littleBox.innerHTML++;

        const parentDiv = e.target.parentElement.parentElement;
        // console.log(parentDiv);
        sepeteEkle(parentDiv);
    }
}

// ! Sepet İçindeki İşlemler;
const sepeteEkle = (parentDiv) => {
    const li = document.querySelector(".modal-li");
    const price = parentDiv.children[1].children[1].innerHTML;
    console.log(price);
    const title = parentDiv.children[1].children[0].innerHTML;
    console.log(title);
    const image = parentDiv.children[0].src;
    console.log(image);

    const ürünBilgisi =document.createElement("div");
    ürünBilgisi.classList.add("ürün-bilgisi", "d-flex" , "align-items-center", "justify-content-around","mb-2");

    ürünBilgisi.innerHTML += `
    
    <div class="fotograf">
        <img width="100px" height="100px" id="ürün-img" src="${image}">
    </div>
    <div class="baslik">${title}</div>
    <div class="butonlar">
        <button id="arttir">+</button>
        <span class="adet">1</span>
        <button id="azalt">-</button>
    </div>
    <div class="fiyat">${price}</div>
    <div class="toplamFiyat">${price}</div>
    <i class="fa-regular fa-circle-xmark fs-5"></i>

    `

    li.append(ürünBilgisi);


    // !Arttır butonuna tıkladığımda gerçekleşecek işlemler
// const ürünBilgisi =document.querySelector(".ürün-bilgisi") ;   
const arttir =ürünBilgisi.querySelector("#arttir");
const azalt =ürünBilgisi.querySelector("#azalt");
const adet =ürünBilgisi.querySelector(".adet");
const toplamFiyat = ürünBilgisi.querySelector(".toplamFiyat");

arttir.addEventListener("click",function(){
    adet.innerHTML++;
    toplamFiyat.innerHTML =`${adet.innerHTML*parseFloat(price)}₺ `;
})

azalt.addEventListener("click",function(){
    if(adet.innerHTML !=0){
        adet.innerHTML--;
        toplamFiyat.innerHTML=`${adet.innerHTML*parseFloat(price)}₺`
    }
    
})


const silme =ürünBilgisi.querySelector(".fa-regular");
silme.addEventListener("click",function(){
    const littleBox =document.querySelector(".little-box");
    ürünBilgisi.remove();
    if(littleBox.innerHTML !=0){
        littleBox.innerHTML--;
    }
})



}






row.addEventListener("click", ekle);



