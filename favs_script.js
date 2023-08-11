//An IIFE to hit the localStorage and show the list 
(function(){
    //check if the localStorage has favsList
    if(localStorage.getItem("favsList")!=null){
        var favsList = JSON.parse(localStorage.getItem("favsList"));
        //Loop over the array and create list using its values
        for(var i=0; i<favsList.length; i++){
            var li = document.createElement("li");
            li.innerText = favsList[i];
            li.classList.add("list-group-item", "list-group-item-light");
            document.getElementById("favsList").append(li);
        }
    }
})();