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
     </div>`)
    .join("");

    const container = q("#wrapper");
    render(
        container,
        `
        <div>${elements}</div>
        `
    );
};

const searchInp = q(".searchInp")



searchInp.addEventListener('keyup', async (event) => {
 

    const value = searchInp.value.toLowerCase();
    
    const results = data.filter((names) => 
      names.name.toLowerCase().search(value) > -1 ||
      names.username.toLowerCase().search(value) > -1 ||
      names.email.toLowerCase().search(value) > -1 ||
      names.phone.toLowerCase().search(value) > -1 
    );

    list(results);
  });




// function createContact(parent, nameCont, usernameCont, emailCont, phoneCont) {
//     const contact = document.createElement("div");
//     contact.className = "divList";

//     createText(contact, nameCont, usernameCont, emailCont, phoneCont);
//     parent.appendChild(contact);
// }

// function createText(parent, nameCont, usernameCont, emailCont, phoneCont) {
//     const nameC = document.createElement("p");
//     nameC.textContent = `Nome: ${nameCont}`;
  
//     const usernameC = document.createElement("p");
//     usernameC.textContent = `Username: ${usernameCont}`;

//     const emailC = document.createElement("p");
//     emailC.textContent = `Email: ${emailCont}`;

//     const phoneC = document.createElement("p");
//     phoneC.textContent = `Phone: ${phoneCont}`;
  
//     parent.append(nameC, usernameC, emailC, phoneC);
//   }

//   function renderContact(listContact) {
//     listContact.map((contact) => {
//       createContact(
//         wrapperCont,
//         contact.name,
//         contact.username,
//         contact.email,
//         contact.phone,
//       );
//     });
//   }

// // SEARCH
//   function filterSearch() {
//   document.querySelectorAll(".divList")
//   .forEach((contact) => wrapperCont.removeChild(contact));

//   renderContact(
//   contactList.filter((contact) =>
//     contact.name
//       .toLowerCase()
//       .includes(inputFilterSearch.value.toLowerCase())
//   )
// );
// }

// // ASYNC AWAIT
// const getProductsList = async () => {
//     const res = await fetch("https://jsonplaceholder.typicode.com/users");
//     const data = await res.json();
//     contactList = data;
  
    
//     return renderContact(data);
//   };
  
//   let contactList = [];
//   const wrapperCont = q("#wrapper");
