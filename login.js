document.addEventListener("DOMContentLoaded", function () {
    // const loginButton = document.getElementById("loginButton");
    const message = document.getElementById("message");
  
    // Attach click event listener to the "Login" button
    const loginButton = document.querySelector(".form-group button");
    loginButton.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default form submission
  
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      if (username === "user" && password === "password") {
        message.textContent = "Login successful!";
        message.style.color = "green";
      } else {
        message.textContent = "Invalid credentials. Please try again.";
        message.style.color = "red";
      }
    });
  

    let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 5000); // Change image every 2 seconds
}
    
    
});

  
  
    
  