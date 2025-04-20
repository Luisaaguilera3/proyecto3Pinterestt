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
            if (currentPage === 1) {
                firstQuery = query;
                firstImages = images;
            }
            
            displayImages(images, imageContainer);
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
    });

    logo.addEventListener("click", () => {
        searchInput.value = "";
        displayImages(firstImages, imageContainer);
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
    <img id="logo" src="./src/assets/LOGO.png" alt="LA Pictures logo">
    <div id="searchContainer">
        <input type="text" id="searchInput" placeholder="Buscar imágenes...">
        <button id="searchButton">Search</button>
    </div>
</header>
<div id="imageContainer"></div>
<div id="sentinel"></div>
`;