const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');


function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

const storyText = 'So there I was, on a beautiful Tuesday, :insertx:, waiting for  :inserty: thats supposed to show up soon. Maybe I should :insertz: while waiting.';

const insertX = [
'chillin',
'vibing out',
'laying on the ground'];

const insertY = [
'this mean doordash meal',
'a cat',
'impending doom'];

const insertZ = [
'take a 10 hour nap',
'contemplate quantum gravity and general relativity',
'do a flip'];

randomize.addEventListener('click', result);

function result() {
    let newStory = storyText;
    const xItem = randomValueFromArray(insertX);
    const yItem = randomValueFromArray(insertY);
    const zItem = randomValueFromArray(insertZ);

    newStory = newStory.replaceAll(':insertx:', xItem);
    newStory = newStory.replaceAll(':inserty:', yItem);
    newStory = newStory.replaceAll(':insertz:', zItem);

  if(customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replaceAll('I', name);

  }

  if(document.getElementById("uk").checked) {
    // const weight = Math.round(300/14) + ' stone';
    // const temperature =  Math.round((94-32)*5/9) + ' centigrade';
    const day = 'Chewsday';
    newStory = newStory.replaceAll('Tuesday', day);
    // newStory = newStory.replaceAll('300 pounds', weight);

  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}