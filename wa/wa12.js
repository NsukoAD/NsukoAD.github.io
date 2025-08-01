const searchBtn = document.querySelector('#search-btn');
const searchInput = document.querySelector('#anime-search');

searchBtn.addEventListener('click', animeSearch);

async function animeSearch() {
    const title = searchInput.value.trim(); // turns "fire force" into fireforce - cuts out da spaces****
    if (!title) {
        alert('Please enter an anime :)');
    }

    const endpoint = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(title)}&sfw=true`;

    try {
        const response = await fetch(endpoint);
        if (!response.ok) throw Error(response.statusText);
        const animeInfo = await response.json();

        const anime = animeInfo.data[0]; //data is stored in an array in the api - 0 is the first result - grabs closest match to what is searched****
        displayAnime(anime);
    } catch (err) {
        console.error(err);
        alert('Failed to fetch anime :(');
    }
}

function displayAnime(anime) {
    document.querySelector('#anime-title').textContent = anime.title;
    document.querySelector('#anime-img').src = anime.images.jpg.image_url;
    document.querySelector('#anime-img').alt = anime.title;
    document.querySelector('#anime-description').textContent = anime.synopsis;
}

// WHY DOES IT PULL UP COWBOY BEBOP WHEN NOTHING IS IN THE SEARCH BAR AND YOU SEARCH ************* MAYBE LINE 9-10?????? ************