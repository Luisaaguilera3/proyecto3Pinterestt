import "./style.css";
import { fetchImages } from "./componentes/api.js";
import { displayImages } from "./componentes/imagenes.js";
import { showMessage } from "./componentes/alertas.js";

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const imageContainer = document.getElementById("imageContainer");
    const logo = document.getElementById("logo");
    const sentinel = document.getElementById("sentinel");
    let currentPage = 1;
    const imagesPerPage = 25;
    let isFetching = false;
    let firstQuery = "";
    let firstImages = [];

    function loadImages(query = "", reset = false) {
        if (isFetching) return;
        isFetching = true;
        
        if (reset) {
            imageContainer.innerHTML = "";
            currentPage = 1;
        }

        fetchImages(query, currentPage, imagesPerPage).then(images => {
            if (currentPage === 1 && query) {
                firstQuery = query;
                firstImages = images;
            }
            if (!localStorage.getItem("busquedaPrimera")){
                localStorage.setItem("busquedaPrimera", query);
            }
            
            displayImages(images, imageContainer);
            if (images.length === 0 && currentPage === 1){
                showMessage("No such luck. We leave you with these adorable kittens. Try again!")
            }
            isFetching = false;
        });
    }
    
    loadImages();

    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (query.length < 3) {
            showMessage("Please enter at least 3 characters.");
            return;
        }
        loadImages(query, true);
        searchInput.value = "";
    });

    logo.addEventListener("click", () => {
        const busquedaPrimera = localStorage.getItem("busquedaPrimera");
        if (busquedaPrimera) {
            loadImages(busquedaPrimera, true);
        } else{
            loadImages("", true);
        }
    });

    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !isFetching) {
            currentPage++;
            loadImages(searchInput.value.trim());
        }
    }, { rootMargin: "100px" });

    observer.observe(sentinel);
});

const app = document.getElementById("html");
app.innerHTML = `
<header>
    <img id="logo" src="./LOGO.png" alt="LA Pictures logo">
    <div id="searchContainer">
        <input type="text" id="searchInput" placeholder="Buscar imágenes...">
        <button id="searchButton">Search</button>
    </div>
</header>
<div id="imageContainer"></div>
<div id="sentinel"></div>
`;