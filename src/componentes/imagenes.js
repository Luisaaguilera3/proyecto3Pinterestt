export function displayImages(images, container) {
    container.innerHTML = ""; 
    if (images.length === 0) {
        displayPlaceholderImages(container);
        return;
    }
    
    images.forEach(image => {
        const link = document.createElement("a");
        link.href = image.links.html;
        link.target = "_blank";

        const img = document.createElement("img");
        img.src = image.urls.regular;
        img.alt = image.alt_description || "Image";

        link.appendChild(img);
        container.appendChild(link);
    });
}

function displayPlaceholderImages(container) {
    for (let i = 0; i < 5; i++) {
        const img = document.createElement("img");
        img.src = "https://cataas.com/cat?random=" + Math.random();
        img.alt = "Placeholder Cat Image";
        container.appendChild(img);
    }
}