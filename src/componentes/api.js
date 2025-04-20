export async function fetchImages(query, page, count) {
    const clientId = "hQs2C-CL3bhXvVcqH0GYXOAqreh-siflkv3_12d5ZrU";
    try {
        const url = query
            ? `https://api.unsplash.com/search/photos?query=${query}&per_page=${count}&page=${page}&client_id=${clientId}`
            : `https://api.unsplash.com/photos?per_page=${count}&page=${page}&client_id=${clientId}`;
        
        console.log(`Fetching images: ${url}`);
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error fetching images");
        
        const data = await response.json();
        return query ? data.results : data;
    } catch (error) {
        console.error("Error fetching images:", error);
        return [];
    }
}