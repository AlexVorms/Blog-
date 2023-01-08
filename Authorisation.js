
$(document).ready(function (){
    get();
 });

async function get(){
    $('#button-entrance').on("click", async () => {
    var login = $("#inputLogin").val();
    var password = $("#inputPassword").val();

    const data = {
        username: login,
        password: password,
    }
   await sendDataAuth('https://react-midterm.kreosoft.space/api/account/login',data);
});
}

async function sendDataAuth(url, data){
    const response = await fetch(url, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  
    if (!response.ok) {
    }
    else{
        let json = await response.json();
        localStorage.setItem("jwt", json.token);
        window.location.href = 'http://127.0.0.1:5500/test.html';
        return true;
    }
  }