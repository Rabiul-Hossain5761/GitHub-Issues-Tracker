document.getElementById("Login-btn").addEventListener("click",() => {
    const user = "admin";
    const pass = "admin123";
    const userName = document.getElementById("username").value;
    const passWord = document.getElementById("password").value;
    if(userName === user && passWord === pass){
        alert("Login successful");
        window.location.href=("home.html");
    }
    else{
        alert("Invalid Login");
    }

    
});