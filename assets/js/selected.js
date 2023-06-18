var selectedImage = document.querySelector('#selected-image');
var ingredientBox = document.querySelector('#ingredient-box');
var stepBox = document.querySelector('#step-box');
var drinkId = JSON.parse(localStorage.getItem('drinkID'));
var goBackButton = document.querySelector('#go-back-button');

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

    var drink = data.drinks[0];
    //console.log(drink);

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
    }

    var instructionsArray = [];
    var instructions = drink.strInstructions;
    console.log(instructions);

    // Split instructions string into sub-instruction strings
    instructionsArray = instructions.split('.');
    console.log(instructionsArray);

    for (var k = 0; k < instructionsArray.length; k++) {
        var stepBullet = document.createElement('li');
        if (instructionsArray[k])  {
            var firstLetter = instructionsArray[k].charAt(0).toUpperCase();
            var leftoverLetters = instructionsArray[k].slice(1);
            instructionsArray[k] = firstLetter + leftoverLetters + '.';
            stepBullet.textContent = instructionsArray[k];
            stepBox.append(stepBullet);
        }
    }
}

function goBack() {
    //console.log("Testing go back button");
    window.location.href='./index.html'
}

goBackButton.addEventListener('click', goBack);

getCocktailResults();
