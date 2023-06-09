var searchButton = document.getElementById('search-button'); 
cocktailName = document.querySelector('#inputCocktail');
var container = document.querySelector('.result-container');

// 
function getCocktailResults() {
    console.log('Testing search button');

    if (cocktailName.value) {
        getCocktailInfo(cocktailName.value);
    } else {
        alert('Please enter a cocktail name'); // Change this to a modal
    }
};

function getCocktailInfo(cocktail) {
    var requestUrl = 'https://thecocktaildb.com/api/json/v1/1/filter.php?s=' + cocktail;
    // var requestUrl = 'https://thecocktaildb.com/api/json/v1/1/filter.php?i=' + cocktail; this works if your searching by alcohol type (gin, vodka, etc.)
  fetch(requestUrl)
    .then(function (response) {
      console.log(response.status);
      console.log(response);
      return response.json();
    })
    .then(function (data) {
        console.log(data);
        console.log(data.drinks[2].strDrink); // testing
    });
}

// Event listener for search button
searchButton.addEventListener('click', getCocktailResults);
