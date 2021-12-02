import { api, render } from "./utils.js";

const q = (selector) => document.querySelector(selector);

const divList = document.querySelector(".divList")
const searchInp = q(".searchInp");
let data = [];
const favorites = [];

// FETCH
document.addEventListener("DOMContentLoaded", async () => {
    const fetchdata = await fetch(api)
    data = await fetchdata.json()
    list(data);

});


// RENDER
const list = (data) => {
    const elements = data
        .map((names) =>
            `<div class="divList"> <div>
        <p><span class="nuet">Nome:</span> ${names.name}</p> 
        <p><span class="nuet">Username:</span> ${names.username}</p>
        <p><span class="nuet">Email:</span> ${names.email}</p>
        <p><span class="nuet">Tel:</span> ${names.phone}</p>
     </div><button class="fav"></button></div>`).join("");

    const container = q(".wrapperNor");
    render(
        container,
        `${elements}`
    );
    favorAdd()
};

// CERCA CONTATTO
let results = [];


searchInp.addEventListener('keyup', (event) => {


    const value = searchInp.value.toLowerCase();

    results = data.filter((names) =>
        names.name.toLowerCase().search(value) > -1 ||
        names.username.toLowerCase().search(value) > -1 ||
        names.email.toLowerCase().search(value) > -1 ||
        names.phone.toLowerCase().search(value) > -1
    );


    list(results);

    if (results.length < 1) {
        q(".notFound").classList.add("notFoundShow");
    } else {
        q(".notFound").classList.remove("notFoundShow");
    }
});


//ADD FAVORITES
function favorAdd() {
    let fav = document.querySelectorAll('.fav')
    const norDiv = q(".wrapperNor");
    const favDiv = q(".wrapperFav");
    

    for (let item of fav) {
        item.addEventListener('click', () => {
            item.classList.toggle("favAct");

            if (item.classList.contains("favAct")) {
                favDiv.style.opacity = 1;
                favorites.push(item.parentElement.outerHTML)
                // item.parentElement.remove()

                favDiv.innerHTML = favorites.join("");

            } else if (!item.classList.contains("favAct")) {
                
                favorites.pop(item.parentElement.outerHTML)
                favDiv.innerHTML = favorites.join("");

                if(favorites.length === 0){
                    favDiv.style.opacity = 0
                };


            }
        });
    }
}

