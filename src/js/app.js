const btn = document.querySelector("button");
const recaptchaScore = document.querySelector("#score-render");
const form = document.querySelector(".demo-form");

// There is 3 step to validate your user action with reCAPTCHA security
// 1. generate token a token with help of site key
// 2. send that token to the backend
// 3. varify token and create assessment to get score for that token

// For more info follow
// 1. https://cloud.google.com/recaptcha-enterprise/docs/instrument-web-pages?authuser=1
// 2. https://cloud.google.com/recaptcha-enterprise/docs/create-assessment?authuser=1

function createToken(e){
  e.preventDefault();
  grecaptcha.enterprise.ready(async function() {
    //---- step : 1 generating token with help of site key (you can make site key public)
    const token = await grecaptcha.enterprise.execute(
      "6Lf2-1ceAAAAAKFggSYLN1GWxB69n45zr5EXvI5i",
      {
        action: "LOGIN",
      }
    );
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, action: "LOGIN" })
    };
    console.log(token)

    //---- step : 2 sending generated token to backend

    let res = await fetch("https://recaptcha.learning-cloud.co.in/interpret", options);

    let resJson = await res.json();
    console.log(resJson);
    form.submit();
    recaptchaScore.innerText = `The recaptcha score is ${resJson.score}`;
  });
}

btn.addEventListener("click", createToken);
