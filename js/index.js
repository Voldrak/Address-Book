import { api, render, renderFav } from "./utils.js";

const q = (selector) => document.querySelector(selector);

const searchInp = q(".searchInp");
const favDiv = q(".wrapperFav");
let data = [];
let favorites = [];



// FETCH
document.addEventListener("DOMContentLoaded", async () => {
    const fetchdata = await fetch(api)
    data = await fetchdata.json()
    list(data);
    listFav(favorites);
    favorAdd()
});


// RENDER DATA
const list = (data) => {
    const elements = data
        .map((names) =>
            `<div class="divList" > <div>
        <p><span class="nuet">Nome:</span> ${names.name}</p> 
        <p><span class="nuet">Username:</span> ${names.username}</p>
        <p><span class="nuet">Email:</span> ${names.email}</p>
        <p><span class="nuet">Tel:</span> ${names.phone}</p>
     </div><button class="fav" id="${names.id}"></button></div>`).join("");

    const container = q(".wrapperNor");
    render(
        container,
        `${elements}`
    );
};


//RENDER PREFERITI
const listFav = (favorites) => {
    const elementsFav = favorites
        .map((names) =>
            `<div class="divList" > <div>
        <p><span class="nuet">Nome:</span> ${names.name}</p> 
        <p><span class="nuet">Username:</span> ${names.username}</p>
        <p><span class="nuet">Email:</span> ${names.email}</p>
        <p><span class="nuet">Tel:</span> ${names.phone}</p>
     </div><button class="fav favAct" id="${names.id}"></button></div>`).join("");

    renderFav(
        favDiv,
        `${elementsFav}`
    );
   
 
    }


// CERCA CONTATTO
let results = [];
let resultsFav = [];

searchInp.addEventListener('keyup', (event) => {


    const value = searchInp.value.toLowerCase();

    results = data.filter((names) =>
        names.name.toLowerCase().search(value) > -1 ||
        names.username.toLowerCase().search(value) > -1 ||
        names.email.toLowerCase().search(value) > -1 ||
        names.phone.toLowerCase().search(value) > -1
    );

    resultsFav = favorites.filter((names) =>
        names.name.toLowerCase().search(value) > -1 ||
        names.username.toLowerCase().search(value) > -1 ||
        names.email.toLowerCase().search(value) > -1 ||
        names.phone.toLowerCase().search(value) > -1
);

    list(results);
    listFav(resultsFav);

    if (results.length < 1) {
        q(".notFound").classList.add("notFoundShow");
    } else {
        q(".notFound").classList.remove("notFoundShow");
    }
});



//ADD FAVORITES
function favorAdd() {
    let fav = document.querySelectorAll('.fav')
    

    for (let item of fav) {
        item.addEventListener('click', (el) => {
            item.classList.toggle("favAct");
           const myEle = data.find((pref) => pref.id == el.target.id);
            
            if (item.classList.contains("favAct")) {

                favDiv.style.opacity = 1;
                favorites.push(myEle) 
                listFav(favorites);
                
            }
             else {
                    const eleRem = favorites.filter((pref) => pref.id == el.target.id);

                    favorites = favorites.filter(pref => !eleRem.includes(pref))

                    if(favorites.length < 1){
                        favDiv.style.opacity = 0};
                    listFav(favorites);
                };
                
            })
            
        }; 
        
    }
// console.log(favorites);

    
