import {sendData} from './function.js';

$(document).ready(function (){
    get();
 });

function get(){
    $('#button-registration').click(async function(){
    var login = $("#inputLogin").val();
    var password = $("#inputPassword").val();
    var confirm_password = $("#inputPassword4").val();
    var email = $("#inputEmail").val();
    var name = $("#inputName").val();
    var gender = $('#inputState').val();
    var date = $('#startDate').val();
    if(gender=="1"){gender=1}
    else{gender=0}

    const data = {
        userName: login,
        name: name,
        password: password,
        email: email,
        birthDate: date,
        gender: gender
    }
    console.log(data);
    sendData('https://react-midterm.kreosoft.space/api/account/register',data);
});
}
