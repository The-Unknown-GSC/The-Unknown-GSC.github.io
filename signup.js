document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signupForm");

  signupForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the form from submitting normally

      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Perform signup logic here (e.g., sending data to a server)

      console.log("Username:", username);
      console.log("Email:", email);
      console.log("Password:", password);

      // Clear the form fields
      signupForm.reset();
  });
});