import { API, render } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
    fetch(API)
    .then((response) => response.json())
    .then((data) => list(data));
});


const list = (data) => {
    const elements = data
    .map((item) =>
     `<div class="divList">
     ${item.name} ${item.username} ${item.email} ${item.phone}
     </div>`)
    .join("");

    const container = document.querySelector("#wrapper");
    render(
        container,
        `
        <div>${elements}</div>
        `
    );
};

export { list };