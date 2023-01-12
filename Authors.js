$(document).ready(function (){
    LoadAuthorsList();
    ChangeNavbar();
});

function LoadAuthorsList(){
    let token = localStorage.getItem("jwt");
    fetch(`https://react-midterm.kreosoft.space/api`, {
    headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Authorization": `Bearer ${token}`
    }
    })
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        $("#authors-container").empty();
        let template = $('#card-template');
            let array = json.movies;
            for(let i = 0; i < array.length; i++){
                let block = template.clone();
                block.find(".delete-aithor").attr("data-id", array[i].id);
                block.find(".author-title").text(array[i].name);
              
                block.find(".author-image").attr("src", array[i].poster);
                block.find(".author-country").text(array[i].country);
                let genres = GetGenres(array[i]);
                block.removeClass("d-none");
                $("#author-container").append(block);
            }
     });
};

function ChangeNavbar(){
    $(".favourites-page").removeClass("d-none");
    $(".profile-page").removeClass("d-none");
    $(".entrance-item").html('<a class="nav-link active" aria-current="page">Авторизован как </a>');
    $(".registration-item").html('<a class="nav-link active" aria-current="page" href="http://127.0.0.1:5500/User%20registration.html">Выйти</a>');
}