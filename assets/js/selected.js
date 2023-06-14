var infoContainer = document.querySelector('.info-container');
var stuff = JSON.parse(localStorage.getItem('idDrink'));

function getCocktailResults() {
    stuff = JSON.parse(localStorage.getItem('drinkID'));
    var requestUrl = 'https://thecocktaildb.com/api/json/v2/9973533/lookup.php?i=' + stuff;
    //console.log(requestUrl);
    fetch(requestUrl)
    .then(function (response) {
      //console.log(response.status);
      return response.json();
      // TO-DO: Add error handling
    })
    .then(function (data) {
        displayCocktails(data);
    });
}

function displayCocktails(data) {
    //console.log(data);
        var drink = data.drinks[0];

        var ingredientsArray = [];
        var measuresArray = [];
        for (var property in drink) {
            console.log(property);// strIngredient1
            if (property.indexOf("strIngredient") !== -1) {
                if (drink[property]) {
                    var idx = property.split("strIngredient")[1];
                    idx = parseInt(idx);
                    ingredientsArray[idx] = drink[property];
                }
            } else if (property.indexOf("strMeasure") !== -1) {
                if (drink[property]) {
                    var idx = property.split("strMeasure")[1];
                    idx = parseInt(idx);
                    measuresArray[idx] = drink[property];
                }
            }
        }
        for (var i = 0; i < ingredientsArray.length; i++) {
            console.log("Item " + i + ":", ingredientsArray[i] + ": " + measuresArray[i]);
            var listItem = document.createElement('li');
            listItem.textContent = ingredientsArray[i] + " " + measuresArray[i];
            console.log(listItem);
            infoContainer.append(listItem);
        }
}

getCocktailResults();