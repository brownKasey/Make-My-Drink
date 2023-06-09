var drinkId = JSON.parse(localStorage.getItem('drinkID'));
var selectedImage = document.querySelector('#selected-image');
var ingredientBox = document.querySelector('#ingredient-box');
var stepBox = document.querySelector('#step-box');
var ingredientInfoButton = document.querySelector('.ingredient-button');
var ingredientInput = document.querySelector('#spiritName');
var ingredientInfoEl = document.querySelector('.spirit-info');
var goBackButton = document.querySelector('#go-back-button');
var nutritionInput = document.querySelector('#calorieInput');
var nutritionInfoButton = document.querySelector('.calorie-button');

var labelContainer = document.querySelector('.labels');
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

// Fetch and parse data from CocktailDb API
function getCocktailResults() {
    //hideNutritionLabel();
    drinkId = JSON.parse(localStorage.getItem('drinkID'));
    var requestUrl = 'https://thecocktaildb.com/api/json/v2/9973533/lookup.php?i=' + drinkId;
    //console.log(requestUrl);
    
    fetch(requestUrl)
    .then(function (response) {
      //console.log(response.status);
      return response.json();
    })
    .then(function (data) {
        displayCocktails(data);
    });
}

// Hide nutrition label if no results are fetched
function hideNutritionLabel(){
    labelContainer.classList.add('class', 'hidden');
}

// Display selected cocktail image, ingredients and instructions
function displayCocktails(data) {
    //console.log(data);

    var drink = data.drinks[0];

    // Create image element
    var imageEl = document.createElement('img');
    imageEl.classList.add('image');
    imageEl.setAttribute('src', drink.strDrinkThumb);
    selectedImage.append(imageEl);

    // Create parallel arrays to match up measurements with ingredients
    // Credit: Instructor Charlie Werness
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
    for (var i = 1; i < ingredientsArray.length; i++) {
        
        var bigString = '';
        //console.log("Item" + i + ":", ingredientsArray[i] + ":", + measuresArray[i]);
        var ingredientBullet = document.createElement('li');
        if (measuresArray[i] == null) {
            measuresArray[i] = '';
        }
        // Uppercase string ingredients to fix inconsitent capitalization in response data
        ingredientBullet.textContent = (measuresArray[i] + ' ' + ingredientsArray[i]).toUpperCase();
        ingredientBox.append(ingredientBullet);

        // FOR FUTURE DEVELOPMENT: concatenate all ingredients to form one string that will be passed into Nutritionix API 
        /*
        var ingredient = measuresArray[i] + ' ' + ingredientsArray[i];
        bigString = bigString + ' ' + ingredient + ',';
        console.log('Testing ingredient ' + i + ': ' + ingredient);
        console.log(bigString);
        
        getNutritonalFacts(bigString);
        */
    }

    // Split instructions string into sub-instruction strings
    var instructionsArray = [];
    var instructions = drink.strInstructions;
    //console.log(instructions);

    instructionsArray = instructions.split('.');
    //console.log(instructionsArray);

    // Fix inconsistent text formatting and print list of steps
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

// Handle click event on nutrition info button
function getCalorieInput() {
    console.log('Testing calorie button');

    // Trim white space from both ends
    var nutritionName = nutritionInput.value.trim();

    // Clear search bar input upon click event
    nutritionInput.value = '';

    if (nutritionName) {
        getNutritonalFacts(nutritionName);
    } else {
        return
    }
};

// Fetch and parse data from Nutritionix API
// Extract nutrient values and display in nutrition label
function getNutritonalFacts(nutritionName) {
    console.log('testing ' + nutritionName);
    var apiUrl = 'https://trackapi.nutritionix.com/v2/natural/nutrients/'
     var myInit = {
         method: "POST",
         headers: {
             'content-type': 'application/json',
 
            // Monika #2
            'x-app-id': '23d32bc2',
            // Kasey
            //'x-app-id': '5cd39341',
            // Monika #1
            //'x-app-id': 'b1f1abf8',
            'x-app-key': '4a90a025f5eb01e5a625a71e02f13682',
            // Kasey
            //'x-app-key': 'bda13b00f69ec6525e8dcd738a635a2a',
            // Monika #2
            //'x-app-key': '03fb315dcb6058443303cebb1abf9c28',
             'x-remote-user-id': '0',
         },
         body: JSON.stringify({
             "query": nutritionName,
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
         //var transFatNum = 0;
         var cholNum = 0;
         var sodNum = 0;
         var totalCarbNum = 0;
         var dietaryFiberNum = 0;
         //var totalSugNum = 0;
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
 
             caloriesNum = Math.round(foodData.nf_calories);
             calorieEl.innerHTML = caloriesNum;
 
             totalFatNum = Math.round(foodData.nf_total_fat);
             totalFatEl.innerHTML = totalFatNum + "g";
 
             satFatNum = Math.round(foodData.nf_saturated_fat);
             satFatEl.innerHTML = satFatNum + "g";
 
             //transFatNum = Math.round(foodData.full_nutrients[83].value + transFatNum);
             //transFatEl.innerHTML = transFatNum + "g";
 
             cholNum = Math.round(foodData.nf_cholesterol);
             cholEl.innerHTML = cholNum + "mg";
 
             sodNum = Math.round(foodData.nf_sodium);
             sodiumEl.innerHTML = sodNum + "mg";
 
             totalCarbNum = Math.round(foodData.nf_total_carbohydrate);
             carbEl.innerHTML = totalCarbNum + "g";
 
             dietaryFiberNum = Math.round(foodData.nf_dietary_fiber);
             dietFiberEl.innerHTML = dietaryFiberNum + "g";
 
             //totalSugNum = Math.round(foodData.nf_sugars + totalSugNum);
             //sugarsEl.innerHTML = totalSugNum + "g";
 
             proteinNum = Math.round(foodData.nf_protein);
             proteinEl.innerHTML = proteinNum + "g";
 
             vitDNum = Math.round(foodData.full_nutrients[35].value);
             vitaminEl.innerHTML = vitDNum + "mcg";
 
             calciumNum = Math.round(foodData.full_nutrients[19].value);
             calciumEl.innerHTML = calciumNum + "mg";
 
             ironNum = Math.round(foodData.full_nutrients[20].value);
             ironEl.innerHTML = ironNum + "mg";
             
             potassiumNum = Math.round(foodData.full_nutrients[23].value);
             potassiumEl.innerHTML = potassiumNum + "mg";
             
         }
         //unhides the label only after all results have been found and are displayed in the correct html element
         labelContainer.classList.remove('hidden');
         }
     );
 };

// FOR FUTURE DEVELOPMENT: Generate nutrition label for all ingredients in a cocktail
/*
function getNutritonalFacts(bigString) {
    var apiUrl = 'https://trackapi.nutritionix.com/v2/natural/nutrients/'
    var ingredients = bigString;
    var myInit = {
        method: "POST",
        headers: {
            'content-type': 'application/json',
            'x-app-id': '23d32bc2',
            //'x-app-key': '03fb315dcb6058443303cebb1abf9c28',
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
        //var transFatNum = 0;
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

            caloriesNum = Math.round(foodData.nf_calories);
            calorieEl.innerHTML = caloriesNum;

            totalFatNum = Math.round(foodData.nf_total_fat + totalFatNum);
            totalFatEl.innerHTML = totalFatNum + "g";

            satFatNum = Math.round(foodData.nf_saturated_fat + satFatNum);
            satFatEl.innerHTML = satFatNum + "g";

            //transFatNum = Math.round(foodData.full_nutrients[83].value + transFatNum);
            //transFatEl.innerHTML = transFatNum + "g";

            cholNum = Math.round(foodData.nf_cholesterol + cholNum);
            cholEl.innerHTML = cholNum + "mg";

            sodNum = Math.round(foodData.nf_sodium + sodNum);
            sodiumEl.innerHTML = sodNum + "mg";

            totalCarbNum = Math.round(foodData.nf_total_carbohydrate + totalCarbNum);
            carbEl.innerHTML = totalCarbNum + "g";

            dietaryFiberNum = Math.round(foodData.nf_dietary_fiber + dietaryFiberNum);
            dietFiberEl.innerHTML = dietaryFiberNum + "g";

            //totalSugNum = Math.round(foodData.nf_sugars + totalSugNum);
            //sugarsEl.innerHTML = totalSugNum + "g";

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
*/

// Handle user click event on ingredient info button
function getIngredientInput() {
    //console.log('Testing spiritInfoButton');

    // Trim white space from both ends
    var ingredientName = ingredientInput.value.trim();

    // Clear search bar input upon click event
    ingredientInput.value = '';

    if (ingredientName) {
        getIngredientData(ingredientName);
    } else {
        return;
    }
};

// Fetch data for user entered ingredient
function getIngredientData(ingredientName) {
    //console.log(spiritName);

    var requestUrl = 'https://thecocktaildb.com/api/json/v1/1/search.php?i=' + ingredientName
    //console.log(requestUrl);
    
    fetch(requestUrl)
    .then(function (response) {
      //console.log(response.status);
      return response.json();
    })
    .then(function (data) {
        displayIngredientText(data);
    });
}

// Display ingredient lookup text
function displayIngredientText(data) {
    //console.log(data);
    
    var spirit = data.ingredients[0];
    //console.log(spirit);

    // Create text box
    var textEl = document.createElement('div');
    textEl.classList.add('block');
    textEl.textContent = spirit.strDescription;
    ingredientInfoEl.append(textEl);
}

// Redirect to landing page
function goBack() {
    //console.log("Testing go back button");
    window.location.href='./index.html'
}

// Event listeners
goBackButton.addEventListener('click', goBack);
ingredientInfoButton.addEventListener('click', getIngredientInput);
nutritionInfoButton.addEventListener('click', getCalorieInput);

getCocktailResults();