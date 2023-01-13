$(document).ready(async function (){
    await Check_register().then((data) =>{
         if (data.auth){
             ChangeNavbar();
         }
      });
      LoadMoviesList();
      await $('.exit').click(async function(){
         Exit();
     });
 });

function LoadPostList(){
    fetch("https://react-midterm.kreosoft.space/api/movies/3")
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        $("#post-container").empty();
        let template = $('#card-template');
            let array = json.movies;
            for(let i = 0; i < array.length; i++){
                let block = template.clone();
                block.attr("data-id", array[i].id);
                block.find(".post-title").text(array[i].name);
                block.find(".post-year").text(array[i].year);
                block.find(".post-image").attr("src", array[i].poster);
                block.find(".post-country").text(array[i].country);
                block.removeClass("d-none");
                $("#post-container").append(block);
            }
     });
};

function RegisterClickEvents(){
    $(".post").click(function(){
        let id = $(this).data("id");
        LoadFilm(id);
      });
}

function Pagination() {
    if (objJson.length > 50) {
            document.getElementById("nextPage").style.visibility = "visible";
    }

    if (someVar <= 50) {
            document.getElementById("prevPage").style.visibility ="hidden";
    } else {
            document.getElementById("prevPage").style.visibility = "visible";
    }
}


function nextPage() {
    document.getElementById("listingTable").innerHTML = "";

    if (someVar < objJson.length) {
            document.getElementById("nextPage").style.visibility = "visible";
    } else {
            document.getElementById("nextPage").style.visibility = "hidden";
    }

    for (var i = someVar - 50; i < someVar; i++) {
            document.getElementById("listingTable").innerHTML += objJson[i].adName + "<br>";
    }

    someVar += 50;

    document.getElementById("prevPage").style.visibility = "visible";
}


function prevPage() {
    document.getElementById("listingTable").innerHTML = "";

    if (someVar > 50) {
            document.getElementById("prevPage").style.visibility = "visible";
    } else {
            document.getElementById("prevPage").style.visibility = "hidden";
    }

    for (var i = someVar - 50; i < someVar; i++) {
            document.getElementById("listingTable").innerHTML += objJson[i].adName + "<br>";
    }

    someVar -= 50;

    document.getElementById("nextPage").style.visibility = "visible";
}

function LoadPost(id){
    $("#container").empty();
    $(".pagination").empty();
    fetch("https://react-midterm.kreosoft.space/api/details/" + id)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        $("#container").empty();
        let template = $('#card-template-2');
        let array = json;
        let id_feedback='';
                let block = template.clone();
                block.find(".title").text(array.name);
                
                block.find(".image").attr("src", array.poster);
            
                block.find(".time").text(array.time + " мин.");
          
                block.find(".film-description").text(array.description);
                block.removeClass("d-none");
                $("#container").append(block);
                let feedback = GetFeedback(json.reviews,id_feedback);

                if(user.auth){
                    if(feedback==false){
                        TakeFeedback(id);
                    }
                    else{
                        $('#my-feedback-form').addClass("d-none");
                        let id_feedback = $(`.${user.user.id}`).attr("id");
                        $('#my-feedback-form').after($(`#${id_feedback}`));
                        deleteFeedback(id,id_feedback);
                        $('#edit-feedback').click(function(){
                            $('#my-feedback-form').removeClass("d-none");
                            EditFeedback(id,id_feedback);

                        })
                    }
                }
                else{
                    $('#button-give-films').addClass("d-none");
                    $('#my-feedback-form').addClass("d-none");
                }
     });
}
