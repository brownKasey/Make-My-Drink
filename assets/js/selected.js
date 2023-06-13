var infoContainer = document.querySelector('.info-container');
var stuff = JSON.parse(localStorage.getItem('idDrink'));

function getCocktailResults() {
    stuff = JSON.parse(localStorage.getItem('drinkID'));
    var requestUrl = 'https://thecocktaildb.com/api/json/v2/9973533/lookup.php?i=' + stuff;
    console.log(requestUrl);
    fetch(requestUrl)
    .then(function (response) {
      console.log(response.status);
      return response.json();
      // TO-DO: Add error handling
    })
    .then(function (data) {
        console.log(data);
        displayCocktails(data);
    });
}

function displayCocktails(data) {
    var pEl = document.createElement('p');
    pEl.textContent = data.drinks[0].strIngredient1;
    infoContainer.append(pEl);
}

getCocktailResults();