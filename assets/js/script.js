var searchButton = document.getElementById('search-button'); 
var cocktailName = document.querySelector('#inputCocktail');
var startContainer = document.querySelector('.start-container');
var resultsContainer = document.querySelector('.results-container');
var cardsContainer = document.querySelector('.card-container');
var infoContainer = document.querySelector('.info-container');

// 
function validateUserInput() {
    //console.log('Testing search button');

    if (cocktailName.value) {
        getCocktailResults(cocktailName.value);
    // TO-DO: Swap out alert for a modal
    } else {
        alert('Please enter a cocktail name');
    }
};

function getCocktailResults(cocktail) {
    var requestUrl = 'https://thecocktaildb.com/api/json/v2/9973533/search.php?s=' + cocktail;
    fetch(requestUrl)
    .then(function (response) {
      console.log(response.status);
      return response.json();
      // TO-DO: Add error handling
    })
    .then(function (data) {
        console.log(data);
        // Check if fetch fetched any results
        // If not, display message
        // Clear search results from cards container
        cardsContainer.innerHTML = '';
        displayCocktails(data);
    });
}

function displayCocktails(data) {
    startContainer.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
    for (var i = 0; i < data.drinks.length; i++) {
        
        // Create container to hold card components
        // Add classes to display cards in a 3-column layout
        var cardEl = document.createElement('div');
        cardEl.classList.add('column', 'is-one-third', 'card');

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
        var recipeButton = document.createElement('button');
        recipeButton.textContent = "GET RECIPE";
        recipeButton.classList.add('button', 'recipe-button', 'is-fullwidth');

        headerEl.append(cardTitle);
        cardEl.append(headerEl, imageEl, recipeButton);
        cardsContainer.append(cardEl);
        // Event listener for recipe buttons
        recipeButton.addEventListener('click', displaySelectedCocktail);
      }
}

function displaySelectedCocktail(event, data) {
    var events = event.target;
    resultsContainer.classList.add('hidden');
    infoContainer.classList.remove('hidden');

}

// Event listener for search button
searchButton.addEventListener('click', validateUserInput);
