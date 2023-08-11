//array for storing values to local storage
if(localStorage.getItem("favsList")==null){
    var favsList = [];
  }else{
    var favsList = JSON.parse(localStorage.getItem("favsList"));
  }
  
  //array for storing suggestion for the search
  var suggestionsData = new Array();
  //array for storing meal objects from the api
  var mealsArray = new Array();
  //An IIFE that runs the meal API and stores names of all the dishes to the suggestionsData array
  (function(){
    var xhrRequest = new XMLHttpRequest();
    xhrRequest.open("get","https://www.themealdb.com/api/json/v1/1/search.php?s",true);
    xhrRequest.send();
    xhrRequest.onload = function(){
      var responseJSON = JSON.parse(xhrRequest.response);
      mealsArray = responseJSON.meals;
      for(var i=0; i<mealsArray.length; i++){
        suggestionsData[i] = mealsArray[i].strMeal;
      }
    }
  })();
  
  const searchInput = document.getElementById("search-input");
  const suggestionsList = document.getElementById("suggestions");
  
  //Check search box input and filter data from the suggestionsData
  searchInput.addEventListener("input", () => {
    const searchString = searchInput.value.toLowerCase();
    const filteredSuggestions = suggestionsData.filter(suggestion =>
      suggestion.toLowerCase().includes(searchString)
    );
  
    renderSuggestions(filteredSuggestions);
  });
  
  //Feeds the filtered suggestions to the ul list for user to choose from list like google does in realtime
  function renderSuggestions(suggestions) {
    suggestionsList.innerHTML = "";
    //Set display of the list to none if the search input has no matching suggestions to show
    if (suggestions.length === 0) {
      suggestionsList.style.display = "none";
      return;
    }
  
    suggestionsList.style.display = "block";
    suggestions.forEach(suggestion => {
      const li = document.createElement("i");
      li.style.display = "block";
      li.textContent = suggestion;
  
      //Create a button to add item to favourites
      const favsButton = document.createElement("button");
      favsButton.innerText = "Add to favourites";
      favsButton.style.position = "relative";
      favsButton.style.left = "80px";
      
      //Add to favsList when favsButton is clicked
      favsButton.onclick = function(){
        var isItemPresent = false;
        for(var i=0; i< favsList.length; i++){
          if(favsList[i]===suggestion){
            isItemPresent = true;
          }
        }
        if(isItemPresent===false){
          favsList.push(suggestion);
        }
        //Save the list in the local storage
        localStorage.setItem("favsList", JSON.stringify(favsList));
      }
      //Add the favsButton to the li
      li.append(favsButton);
  
      //Create a detailsButton to direct the poage towards meal details page
      const detailsButton = document.createElement("button");
      detailsButton.innerText = "Details";
      detailsButton.style.position= "relative";
      detailsButton.style.left = "100px";
  
      //Add the button to the li
      li.append(detailsButton);
      detailsButton.onclick = function(){
        //Save the meal name in the sessionStorage to load the meal page
        sessionStorage.setItem("showMealItem",suggestion);
        suggestionsList.style.display = "none";
        //Open the meal details page using the window location object
        window.location.href = "details_index.html";
      }
      suggestionsList.appendChild(li);
    });
  }
  
  
  