
export let user = { auth: false, user: {} };
export async function Check_register(){
    let token = localStorage.getItem("jwt");
    user.auth=false;
    user.user={};
    try {
        let response = await fetch(`https://react-midterm.kreosoft.space/api/account/profile`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        if (response.ok) {
            let json = await response.json();
            user.auth=true;
            user.user=json;
            return user;
        }
        else{
         localStorage.removeItem("jwt");
         return user;
        }
    }
    catch {
        localStorage.removeItem("jwt");
        return user;
    }
}

export function ChangeNavbar(){
    $(".favourites-page").removeClass("d-none");
    $(".profile-page").removeClass("d-none");
    $(".entrance-item").html(`<a class="nav-link active" aria-current="page">Авторизован как ${user.user.nickName}</a>`);
    $(".registration-item").html('<li class="nav-item registration-item exit"><a class="nav-link active" aria-current="page">Выйти</a></li>');
}

export async function sendData(url, data){
    const response = await fetch(url, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  
    if (!response.ok) {
      throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
    }
    else{
      window.location.href = 'http://127.0.0.1:5500/test.html';
    }
  }

export async function sendDataAuth(url, data){
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