var selectedImage = document.querySelector('#selected-image');
var ingredientBox = document.querySelector('#ingredient-box');
var stepBox = document.querySelector('#step-box');
var drinkId = JSON.parse(localStorage.getItem('drinkID'));

function getCocktailResults() {
    drinkId = JSON.parse(localStorage.getItem('drinkID'));
    var requestUrl = 'https://thecocktaildb.com/api/json/v2/9973533/lookup.php?i=' + drinkId;
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
    console.log(data);

    var drink = data.drinks[0];

    // Create image element
    var imageEl = document.createElement('img');
    imageEl.classList.add('image');
    imageEl.setAttribute('src', drink.strDrinkThumb);
    selectedImage.append(imageEl);

    // Create parallel arrays
    var ingredientsArray = [];
    var measuresArray = [];
    for (var property in drink) {
        if (property.indexOf("strMeasure") !== -1) {
            if (drink[property]) {
                var idx = property.split("strMeasure")[1];
                idx = parseInt(idx);
                measuresArray[idx] = drink[property];
                console.log(measuresArray[idx]);
            }
        } else if (property.indexOf("strIngredient") !== -1) {
            if (drink[property]) {
                var idx = property.split("strIngredient")[1];
                idx = parseInt(idx);
                ingredientsArray[idx] = drink[property];
                console.log(ingredientsArray[idx]);
            }
        }
    }

    // Print each ingredient in list format
    for (var i = 1; i < measuresArray.length; i++) {
        var bigString = '';
        //console.log("Item" + i + ":", ingredientsArray[i] + ":", + measuresArray[i]);
        var ingredientBullet = document.createElement('li');
        ingredientBullet.textContent = (measuresArray[i] + ' ' + ingredientsArray[i]).toUpperCase();
        ingredientBox.append(ingredientBullet);

        var ingredient = measuresArray[i] + ' ' + ingredientsArray[i];
        bigString = bigString + ' ' + ingredient + ',';
        //console.log('Testing ingredient ' + i + ': ' + ingredient);
        //fetchFunction(bigString);
    }

    // Print each step in list format
    var instructionsArray = [];
    var instructions = drink.strInstructions;
    instructionsArray = instructions.split('.');
    //console.log(instructionsArray);

    /*for (var i = 0; instructionsArray.length; i++) {
        var stepBullet = document.createElement('li');
        stepBullet.textContent = instructionsArray[i];
        stepBox.append(stepBullet);
    }*/

    var step1 = document.createElement('li');
    step1.textContent = instructionsArray[0];
    var step2 = document.createElement('li');
    step2.textContent = instructionsArray[1];
    var step3 = document.createElement('li');
    step3.textContent = instructionsArray[2];
    stepBox.append(step1);
    stepBox.append(step2);
    stepBox.append(step3);
}

/*function fetchFunction(bigString) {
    console.log('Testing ' + bigString);
    stepBox.append(bigString);
}*/

getCocktailResults();