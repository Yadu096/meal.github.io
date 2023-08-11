//Set the color of the body to lightcyan when the webpage loads
window.addEventListener('load', function() {
    document.body.style.backgroundColor = 'lightcyan';
  });

//array for storing values to local storage
if(localStorage.getItem("favsList")==null){
    var favsList = [];
  }else{
    var favsList = JSON.parse(localStorage.getItem("favsList"));
  }

function showMeal(){
    //Check if the session storage is empty
    if(sessionStorage.getItem("showMealItem")!=null){
        const mealName = sessionStorage.getItem("showMealItem");
        const APIlink = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + mealName;
        //An IIFE to hit the API and get the relevant details about the meal for us
        (function(){
            var xhrRequest = new XMLHttpRequest();
            xhrRequest.open("get",APIlink,true);
            xhrRequest.send();
            var meal= new Array();
            xhrRequest.onload= function(){
                var responseJSON = JSON.parse(xhrRequest.response);
                meal = responseJSON.meals;
                //Create card
                var card = document.createElement("div");
                card.classList.add('card','text-center','p-4','mx-auto');
                card.style.width = "35rem";
                //create image element of card
                var image = document.createElement("img");
                image.setAttribute("src", meal[0].strMealThumb);
                image.classList.add('card-img-top');
                //Create card-body
                var cardBody = document.createElement("div");
                cardBody.classList.add('card-body');
                //Create title for the meal
                var title = document.createElement("h5");
                title.classList.add('card-title','text-success', 'card-header')
                title.innerText = meal[0].strMeal;
                //For putting instructions related to the meal
                var cardText = document.createElement("p");
                cardText.classList.add('card-body');
                cardText.innerText = meal[0].strInstructions;
                //Create a button to add meal to the favourites
                var favButton = document.createElement("a");
                favButton.classList.add('btn', 'btn-outline-success');
                favButton.innerText = "Add to favourites";
                //Add to favourites list when button is clicked
                favButton.onclick = function(){
                    var isthere = false;
                    for(var i=0; i< favsList.length; i++){
                        if(favsList[i]===meal[0].strMeal){
                        isthere = true;
                        }
                    }
                    if(isthere===false){
                        favsList.push(meal[0].strMeal);
                    }
                    //Save the list in the local storage
                    localStorage.setItem("favsList", JSON.stringify(favsList));
                }
                //Create footer for the card
                var footer = document.createElement("div");
                footer.classList.add("card-footer");
                //Append the childrens
                footer.append(favButton)
                cardBody.append(title, cardText, footer);
                card.append(image, cardBody);
                document.getElementById("meal-details").append(card);
            }
        })();
    }
};
showMeal();
