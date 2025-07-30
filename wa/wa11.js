const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imgGallery = ['shibuya.jpeg','bike.jpeg','chinatown.jpeg','temple.jpeg','asakusa.jpeg'];



/* Declaring the alternative text for each image file */
const imgAlt = {'shibuya.jpeg' : 'downtown Shibuya, Tokyo with many led signs', 'bike.jpeg' : 'Alex on the streen next to a bike', 'chinatown.jpeg' : 'busy chinatown alley in Tokyo', 'temple.jpeg' : 'a picture of a orange tree and a tower from the imperial palace', 'asakusa.jpeg' : 'busy temple in Asakusa, Tokyo'};

//resizing images
displayedImage.style.width = '640px';
displayedImage.style.height = '480px';


/* Looping through images */
for (const img of imgGallery){
const newImage = document.createElement('img');
newImage.setAttribute('src', img);
newImage.setAttribute('alt', imgAlt[img]);
thumbBar.appendChild(newImage);
newImage.addEventListener('click', () => displayedImage.setAttribute('src', img));
newImage.addEventListener('click', () => displayedImage.setAttribute('alt', imgAlt[img]));
}

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', darkenButton)

function darkenButton(){
    const btnClass = btn.getAttribute('class')
if (btnClass === 'dark'){
    btn.setAttribute('class', 'light');
    btn.textContent = 'lighten';
    overlay.style.backgroundColor = "rgb(0 0 0 / 50%)";
} else {
    btn.setAttribute('class', 'dark');
    btn.textContent = 'darken';
    overlay.style.backgroundColor = "rgb(0 0 0 / 0%)";
}
}