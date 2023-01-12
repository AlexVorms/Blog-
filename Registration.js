import {ChangeNavbar, GetFavouriteFilms,Check_register,Exit} from './function.js';

$(document).ready(async function (){
    await Check_register().then((data) =>{
        if (data.auth){
            ChangeNavbar();
        }
     });
     await $('.exit').click(async function(){
        Exit();
    });
    Getprofile();
});

function Getprofile(){
            GetFavouriteFilms(`https://react-midterm.kreosoft.space/api/account/profile`).then((array)=>{ 
            $("#nickname").text(array.nickName);
            $("#exampleInputEmail1").attr('value',array.email);
            if(array.avatarLink != null){
                $("#inputimage").attr('value',array.avatarLink);
                $(".movies-image").attr("src",array.avatarLink);
            }
            let date = Date(array.birthDate);
            $("#inputName").attr('value',array.name);
            $("#startDate").attr('value',date);
            if(array.gender == 0){
                $("#inputState").html('<option selected value="0">Женщина</option><option value="1">Мужчина</option>');
            }
            get(array.id,array.nickName)
        });
}

function Date(date){
    let date2="";
    let year ="";
    let month ="";
    let day ="";
    for(let i=0; i<4;i++){
        year+=date[i];
    }
    for(let i = 5; i<7;i++){
        month+=date[i];
    }
    for(let i = 8; i<10;i++){
        day+=date[i];
    }
    date2 = year+"-"+month+"-"+day;
    return date2;
}

function get(id,login){
    $('#button-edit').click(function(){
    var image = $("#inputimage").val();
    if(image==null){image="https://fallofthewall25.com/img/default-user.jpg"}
    var email = $("#exampleInputEmail1").val();
    var name = $("#inputName").val();
    var gender = Number($('#inputState').val());
    var date = $('#startDate').val();

    const data = {
        id: id,
        nickName: login,
        email: email,
        avatarLink: image,
        name: name,
        birthDate: date,
        gender: gender
    }
    sendData('https://react-midterm.kreosoft.space/api/account/profile',data);
});
}

async function sendData(url, data){
    let token = localStorage.getItem("jwt");
    const response = await fetch(url, {
      method:'PUT',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
  
    if (!response.ok) {
      throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
    }
    else{
        window.location.href = 'http://127.0.0.1:5500/profile.html';
    }
  }