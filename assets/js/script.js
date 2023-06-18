var searchButton = document.getElementById('search-button'); 
var userInput = document.querySelector('#inputCocktail');
var resultsContainer = document.querySelector('.results-container');
var cardsContainer = document.querySelector('.card-container');
var backgroundImage = document.querySelector('.wrapper');
var searchContainer = document.querySelector('.search-container');
var spiritButtons = document.querySelector('.buttons');



// monika's code
function getUserInput(event) {
    event.preventDefault();
    //console.log('Testing search button');

    // Trim white space from both ends
    var cocktailName = userInput.value.trim();

    // Clear search bar input upon click event
    userInput.value = '';

    if (cocktailName) {
        getCocktailData(cocktailName);
    // TO-DO: Swap out alert for a modal
    } else {
        alert('Please enter a cocktail name');
    }
};

function spiritButtonsHandler (event) {
    //console.log("Testing spirit button");

    var e = event.target;
    var spirit = e.getAttribute('data-spirit');
    //console.log(spirit);

    if (spirit) {
        getSpiritData(spirit);
    } else {
        return;
    }
}

function getSpiritData(spirit) {
    var requestUrl = 'https://thecocktaildb.com/api/json/v2/9973533/filter.php?i=' + spirit;
    console.log(requestUrl);

    fetch(requestUrl)
    .then(function (response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    })
    .then(function (data) {
        displayCocktails(data);
    })
    .catch(function (error) {
        console.log('Unable to connect to the CocktailDB');
    })
}

function getCocktailData(cocktail) {
    var requestUrl = 'https://thecocktaildb.com/api/json/v2/9973533/search.php?s=' + cocktail;
    fetch(requestUrl)
    .then(function (response) {
      //console.log(response.status);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(function (data) {
        displayCocktails(data);
    });
}

function displayCocktails(data) {
    // Clear previous search results from cards container
    cardsContainer.innerHTML = '';

    // Remove full background image
    backgroundImage.classList.remove('wrapper');
    // Add background image to search bar container
    searchContainer.classList.add('wrapper2');
    resultsContainer.classList.remove('hidden');

    for (var i = 0; i < data.drinks.length; i++) {
        
        // Create container to hold card components
        // Add classes to display cards in a 4-column layout
        var cardEl = document.createElement('div');
        cardEl.classList.add('column', 'is-3', 'card');

        // Create header component of card
        var headerEl = document.createElement('h4');
        headerEl.classList.add('card-header');

        var cardTitle = document.createElement('p');
        cardTitle.classList.add('card-header-title', 'is-centered');
        cardTitle.textContent = data.drinks[i].strDrink;

        // Create container for image element
        var cardImageEl = document.createElement('div');
        cardImageEl.classList.add('card-image');
    
        // Create image element
        var imageEl = document.createElement('img');
        imageEl.classList.add('image');
        imageEl.setAttribute('src', data.drinks[i].strDrinkThumb);

        // Create button
        var recipeButton = document.createElement('a');
        recipeButton.textContent = "GET RECIPE";
        recipeButton.classList.add('button', 'recipe-button', 'is-fullwidth');
        recipeButton.setAttribute('href', 'selected.html');
        recipeButton.setAttribute('target', '_blank'); // open linked document in new window
        recipeButton.setAttribute('idDrink', data.drinks[i].idDrink);
        //console.log(recipeButton);

        headerEl.append(cardTitle);
        cardEl.append(headerEl, imageEl, recipeButton);
        cardsContainer.append(cardEl);
      }
}
// Event listener for search button
searchButton.addEventListener('click', getUserInput);

// Event listener for spirit buttons
spiritButtons.addEventListener('click', spiritButtonsHandler);

// Event listener for cocktail selection
// Store drink id of user selected cocktail in local storage
resultsContainer.addEventListener('click', function(event) {
    var e = event.target;
    drinkID = e.getAttribute('idDrink');
    //console.log(drinkID);
    localStorage.setItem('drinkID', JSON.stringify(drinkID));
})