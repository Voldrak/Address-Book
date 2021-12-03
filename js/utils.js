const api = "https://jsonplaceholder.typicode.com/users";

const render = (container, content) => (container.innerHTML = content);
const renderFav = (favDiv, content) => (favDiv.innerHTML = content);

export { api, render, renderFav };