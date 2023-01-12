const elForm = document.querySelector(".js-form");
const elInputEmail = document.querySelector(".js-inputemail");
const elInputPassword = document.querySelector(".js-password");
const ElEye = document.querySelector(".js-eye");

ElEye.addEventListener("mousedown", function () {
    elInputPassword.type = "text"

})
ElEye.addEventListener("mouseup", function () {
    elInputPassword.type = "password"
})

elForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    fetch("http://192.168.0.103:5000/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: elInputEmail.value,
            password: elInputPassword.value,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data.token) {
                localStorage.setItem("token", data.token)
                location.replace("index.html")
            }
        })
        .catch((err) => console.log(err));
})
