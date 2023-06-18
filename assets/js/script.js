var searchButton = document.getElementById('search-button'); 
var cocktailName = document.querySelector('#inputCocktail');
var startContainer = document.querySelector('.start-container');
var resultsContainer = document.querySelector('.results-container');
var cardsContainer = document.querySelector('.card-container');
var infoContainer = document.querySelector('.info-container');
var modalContainer = document.getElementById('modal-container');
var modalButton = document.getElementById('modal-button');
var modal = document.getElementById("myModal");
var confirmYes = document.getElementById("confirmYes");
var confirmNo = document.getElementById("confirmNo");
// var ageConfirmed = localStorage.getItem("ageConfirmed");

// 
function validateUserInput() {
    //console.log('Testing search button');

    if (cocktailName.value) {
        getCocktailResults(cocktailName.value);
    // TO-DO: Swap out alert for a modal
    } else {
        modalContainer.style.display = 'block'; // Replaced alert with modalContainer
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

        // Clear previous search results from cards container
        cardsContainer.innerHTML = '';
        displayCocktails(data);
    });
}

function displayCocktails(data) {
    startContainer.classList.add('class', 'hidden');
    resultsContainer.classList.remove('hidden');
    for (var i = 0; i < data.drinks.length; i++) {
        
        // Create container to hold card components
        // Add classes to display cards in a 3-column layout
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
searchButton.addEventListener('click', validateUserInput);

// Added Modal 

modalButton.addEventListener('click', () => {
   
});

var closeButton = modalContainer.querySelector('.modal-close');
closeButton.addEventListener('click', () => {
    modalContainer.style.display = 'none';
});
// Added a confirm page modal & Local Stroage
// if (ageConfirmed === "true") {
   
// } else {
//     modal.style.display = "block";
// }

confirmYes.onclick = function() {
    // User clicked "Yes" button
    localStorage.setItem("ageConfirmed", "true");
    modal.style.display = "none";
        
}

confirmNo.onclick = function() {
    // User clicked "No" button
    localStorage.setItem("ageConfirmed", "false");
    modal.style.display = "none";
    window.location.href = "https://giphy.com/gifs/G7y1nEq4I251TKMFFZ/fullscreen";
}
// function showContent() {
//     // Add the content of your cocktail site here
//     document.body.innerHTML += "<section class='section'><div class='container'><h1 class='title'>Welcome to Make My Drink</h1></div></section>";
//   }
  
//   function redirectToBypassPage() {
//     window.location.href = "https://vpnpro.com/guides-and-tutorials/how-to-bypass-access-denied-website/";
//   }

modal.style.display = "block";

