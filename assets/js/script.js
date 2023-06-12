var searchButton = document.getElementById('search-button'); 
var userInput = document.querySelector('#inputCocktail');
var startContainer = document.querySelector('.start-container');

function validateUserInput() {
    //console.log('Testing search button');

    if (userInput.value) {
        getCocktailResults(userInput.value);
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

}

// Event listener for search button
searchButton.addEventListener('click', validateUserInput);


