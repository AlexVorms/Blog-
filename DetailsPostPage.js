function GetFeedback(array){
    for(let i = 0; i < array.length; i++){
        let form = $('#card-template-feedback').clone();
        form.attr("id", array[i].id);
        form.find(".feedback-text").text(array[i].reviewText);
        form.find(".feedback-rating").text(array[i].rating);
        let date = GetDate(array[i].createDateTime);
        form.find(".feedback-date").text(date);
        if((array[i].author.avatar != null) && !array[i].isAnonymous){
            form.find(".author-image").attr("src", array[i].author.avatar);
        }
        else{
            form.find(".author-image").attr("src", 'https://fallofthewall25.com/img/default-user.jpg');
        }

        if(array[i].rating > 5){
            form.find(".feedback-colour").addClass('border-success');
            form.find(".feedback-text").addClass('text-success');
            form.find(".feedback-rating").addClass('bg-success');
        }
        else{
            form.find(".feedback-colour").addClass('border-danger');
            form.find(".feedback-text").addClass('text-danger');
           form.find(".feedback-rating").addClass('bg-danger');
        }

        if(array[i].isAnonymous){
            form.find(".feedback-author").text("Анонимный пользователь");
        }
        else{
            form.find(".feedback-author").text(array[i].author.nickName);
        }

        form.removeClass("d-none");
        $("#card-template-2").append(form);
    }
}

function GetDate(array){
    let date="";
    let year ="";
    let month ="";
    let day ="";
    for(let i=0; i<4;i++){
        year+=array[i];
    }
    for(let i = 5; i<7;i++){
        month+=array[i];
    }
    for(let i = 8; i<10;i++){
        day+=array[i];
    }
    date = day+"."+month+"."+year;
    return date;
}