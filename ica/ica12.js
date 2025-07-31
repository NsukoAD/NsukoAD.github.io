// Select the new quote button using a querySelector. Assign it to a new variable.

const newQuote = document.querySelector("#js-new-quote");
const newAnswer = document.querySelector("#js-tweet");

// Write an event listener to check if the button is clicked. When the button is clicked, run a function called "getQuote".

newQuote.addEventListener('click', getQuote);
newAnswer.addEventListener('click', displayAnswer);

// Add a new variable that holds the API endpoint: // https://trivia.cyberwisp.com/getrandomchristmasquestion
const endpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";

// Write the function declaration, and check the button click works by returning a message in the console everytime the button is clicked.

let json = ''; //this makes json a global varriable which means we can change in our function getQuote() and all access it in displayAnswer()

async function getQuote(){
    const answerArea = document.querySelector('#js-answer-text');
    answerArea.textContent = '';
    // console.log("testing getQuote");
    // Change the getQuote function to use the fetch method to get a random quote from that endpoint.
    // If successful, output the quote to the console
    // If it fails, output an error message to the console AND via alert
    try{
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        json = await response.json();
        //console.log(json.question);
        //console.log(json.answer);
        displayQuote(json.question);
    } catch (err){
        console.log(err);
        alert('Failed to fetch a new trivia');
    }
}

function displayQuote(quote){
    const quoteText = document.querySelector('#js-quote-text');
    quoteText.textContent = quote;
}

getQuote();

function displayAnswer(){
    const answerText = json.answer;
    const answerArea = document.querySelector('#js-answer-text');
    answerArea.textContent = answerText
}

// const newAnswer = document.querySelector("#js-tweet");

// newAnswer.addEventListener('click', getAnswer);

// function displayAnswer(answer){
//     const quoteText = document.querySelector('#js-answer-text');
//     quoteText.textContent = answer;
// }