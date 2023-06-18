var selectedImage = document.querySelector('#selected-image');
var ingredientBox = document.querySelector('#ingredient-box');
var stepBox = document.querySelector('#step-box');
var drinkId = JSON.parse(localStorage.getItem('drinkID'));

var labelContainer = document.querySelector('.label');
var calorieEl = document.querySelector('.calories');
var totalFatEl = document.querySelector('.total-fat');
var satFatEl = document.querySelector('.saturated-fat');
var transFatEl = document.querySelector('.trans-fat');
var cholEl = document.querySelector('.cholesterol');
var sodiumEl = document.querySelector('.sodium');
var carbEl = document.querySelector('.total-carb');
var dietFiberEl = document.querySelector('.dietary-fiber');
var sugarsEl = document.querySelector('.total-sugars');
var proteinEl = document.querySelector('.protein');
var vitaminEl = document.querySelector('.vitamin-d');
var calciumEl = document.querySelector('.calcium');
var ironEl = document.querySelector('.iron');
var potassiumEl = document.querySelector('.potassium');



//monika's code
function getCocktailResults() {
    hideNutritionLabel();
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
function hideNutritionLabel(){
    labelContainer.classList.add('class', 'hidden');
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
    getNutritonalFacts(bigString);
    }

    // Print each step in list format
    var instructionsArray = [];
    var instructions = drink.strInstructions;
    instructionsArray = instructions.split('.');
    console.log(instructionsArray);

    for (var j = 0; j < instructionsArray.length; j++) {
        var stepBullet = document.createElement('li');
        if (instructionsArray[j]) {
            stepBullet.textContent = instructionsArray[j];
            stepBox.append(stepBullet);
        }
    }
}
function getNutritonalFacts(bigString) {
    var apiUrl = 'https://trackapi.nutritionix.com/v2/natural/nutrients/'
    var ingredients = bigString;
    var myInit = {
        method: "POST",
        headers: {
            'content-type': 'application/json',
            'x-app-id': '5cd39341',
            'x-app-key': 'bda13b00f69ec6525e8dcd738a635a2a',
            'x-remote-user-id': '0',
        },
        body: JSON.stringify({
            "query": ingredients,
        }),
    };
    fetch (apiUrl, myInit)
    .then(function (response) {
        return response.json();

      })
      .then(function (data) {
        
        var foodArray = data.foods;
        //numbers that hold values
        var caloriesNum = 0;
        var totalFatNum = 0;
        var satFatNum = 0;
        var transFatNum = 0;
        var cholNum = 0;
        var sodNum = 0;
        var totalCarbNum = 0;
        var dietaryFiberNum = 0;
        var totalSugNum = 0;
        var proteinNum = 0;
        var vitDNum = 0;
        var calciumNum = 0;
        var ironNum = 0;
        var potassiumNum = 0;
        //for loop that will look at all the elements and add each corresponding value to itself(data.food[0].nf_calories) 
        //will also round the result 
        //also displays the result to the page.
        for (var i = 0; i < foodArray.length; i++){
            var foodData = data.foods[i];
            console.log(foodData);
            caloriesNum = Math.round(foodData.nf_calories + caloriesNum);
            calorieEl.innerHTML = caloriesNum;

            totalFatNum = Math.round(foodData.nf_total_fat + totalFatNum);
            totalFatEl.innerHTML = totalFatNum + "g";

            satFatNum = Math.round(foodData.nf_saturated_fat + satFatNum);
            satFatEl.innerHTML = satFatNum + "g";

            transFatNum = Math.round(foodData.full_nutrients[83].value + transFatNum);
            transFatEl.innerHTML = transFatNum + "g";

            cholNum = Math.round(foodData.nf_cholesterol + cholNum);
            cholEl.innerHTML = cholNum + "mg";

            sodNum = Math.round(foodData.nf_sodium + sodNum);
            sodiumEl.innerHTML = sodNum + "mg";

            totalCarbNum = Math.round(foodData.nf_total_carbohydrate + totalCarbNum);
            carbEl.innerHTML = totalCarbNum + "g";

            dietaryFiberNum = Math.round(foodData.nf_dietary_fiber + dietaryFiberNum);
            dietFiberEl.innerHTML = dietaryFiberNum + "g";

            totalSugNum = Math.round(foodData.nf_sugars + totalSugNum);
            sugarsEl.innerHTML = totalSugNum + "g";

            proteinNum = Math.round(foodData.nf_protein + proteinNum);
            proteinEl.innerHTML = proteinNum + "g";

            vitDNum = Math.round(foodData.full_nutrients[35].value + vitDNum);
            vitaminEl.innerHTML = vitDNum + "mcg";

            calciumNum = Math.round(foodData.full_nutrients[19].value + calciumNum);
            calciumEl.innerHTML = calciumNum + "mg";

            ironNum = Math.round(foodData.full_nutrients[20].value + ironNum);
            ironEl.innerHTML = ironNum + "mg";
            
            potassiumNum = Math.round(foodData.full_nutrients[23].value + proteinNum);
            potassiumEl.innerHTML = potassiumNum + "mg";
            
        }
        //unhides the label only after all results have been found and are displayed in the correct html element
        labelContainer.classList.remove('hidden');
        }

    );
};



/*function getExerciseFacts(){
    var apiUrl = 'https://trackapi.nutritionix.com/v2/natural/exercise'
        var myInit = {
        method: "POST",
        headers: {
            'content-type': 'application/json',

            'x-app-id': '5cd39341',
            'x-app-key': 'bda13b00f69ec6525e8dcd738a635a2a',
            'x-remote-user-id': '0',
        },
    fetch (apiUrl, myInit)

    .then(function (response) {
        console.log(response.status);
        return response.json();
      })
      .then(function (data) {
        console.log(data);
    });
}*/
getCocktailResults();
/*function fetchFunction(bigString) {
    console.log('Testing ' + bigString);
    stepBox.append(bigString);
}*/

