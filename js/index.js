import { api, render } from "./utils.js";

const q = (selector) => document.querySelector(selector);

let data = [];

document.addEventListener("DOMContentLoaded", async () => {
    const fetchdata = await fetch(api)
    data = await fetchdata.json()
    list(data);
});


const list = (data) => {
    const elements = data
    .map((names) =>
     `<div class="divList">
        <p><span class="nuet">Nome:</span> ${names.name}</p> 
        <p><span class="nuet">Username:</span> ${names.username}</p>
        <p><span class="nuet">Email:</span> ${names.email}</p>
        <p><span class="nuet">Tel:</span> ${names.phone}</p>
     </div>`).join("");

    const container = q(".wrapper");
    render(
        container,
        `${elements}`
    );
};

const searchInp = q(".searchInp");

searchInp.addEventListener('keyup', async (event) => {
 

    const value = searchInp.value.toLowerCase();
    
    const results = data.filter((names) => 
      names.name.toLowerCase().search(value) > -1 ||
      names.username.toLowerCase().search(value) > -1 ||
      names.email.toLowerCase().search(value) > -1 ||
      names.phone.toLowerCase().search(value) > -1 
    );

    list(results);
     
if(results.length < 1){
        q(".notFound").classList.add("notFoundShow");
     } else {
        q(".notFound").classList.remove("notFoundShow");
      }

  });