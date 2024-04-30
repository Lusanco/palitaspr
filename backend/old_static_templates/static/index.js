// // // Function to fetch user data from Flask backend
// // function fetchUsers() {
// //   fetch("/users")
// //     .then((response) => response.json())
// //     .then((users) => {
// //       const userList = document.getElementById("user-list");
// //       userList.classList = "gap-4 flex flex-col";
// //       users.forEach((user) => {
// //         const listContainer = document.createElement("div");
// //         listContainer.classList = "bg-slate-300 p-4 rounded-lg shadow-lg";
// //         const listItem = document.createElement("li");
// //         listItem.textContent = `${user.first_name} ${user.last_name}: ${user.email}`;
// //         listItem.classList = "font-bold text-slate-800 text-center list-none";
// //         listContainer.appendChild(listItem);
// //         userList.appendChild(listContainer);
// //       });
// //     });
// // }

// // Function to fetch service data from Flask backend
// // function fetchServices() {
// //   fetch("/services")
// //     .then((response) => response.json())
// //     .then((services) => {
// //       const serviceList = document.getElementById("service-list");
// //       serviceList.innerHTML = "";
// //       services.forEach((service) => {
// //         const listItem = document.createElement("li");
// //         listItem.textContent = service.name;
// //         serviceList.appendChild(listItem);
// //       });
// //     });
// // }

// // Fetch data when the page loads
// // fetchUsers();
// // fetchServices();

// document.addEventListener("DOMContentLoaded", function() {
//   // Get the "Sign up" button element
//   const signupButton = document.getElementById("signup-btn");

//   // Add an event listener for the click event
//   signupButton.addEventListener("click", userToDict);
// });

// function userToDict() {
//   const firstNameInput = document.getElementById("first_name");
//   const lastNameInput = document.getElementById("last_name");
//   const emailInput = document.getElementById("email");
//   const passwordInput = document.getElementById("password");

//   let user = {
//     User: {
//       first_name: firstNameInput.value,
//       last_name: lastNameInput.value,
//       email: emailInput.value,
//       password: passwordInput.value,
//     },
//   };

//   let userDict = JSON.stringify(user);

//   const fetchURL = "http://127.0.0.1:5000/create_object";
//   const fetchOptions = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: userDict,
//   };

//   fetch(fetchURL, fetchOptions)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log("POST request successful: ", data);
//     })
//     .catch((error) => {
//       console.error("There was a problem with the POST request: ", error);
//     });
// }

document.addEventListener("DOMContentLoaded", function () {
  // Get the "Sign up" button element
  const signupButton = document.getElementById("signup-btn");

  // Add an event listener for the click event
  signupButton.addEventListener("click", handleSignup);
});

async function handleSignup() {
  const firstNameInput = document.getElementById("first_name");
  const lastNameInput = document.getElementById("last_name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const user = {
    User: {
      first_name: firstNameInput.value,
      last_name: lastNameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    },
  };

  const userDict = JSON.stringify(user);
  const fetchURL = "http://127.0.0.1:5000/create_object";
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: userDict,
  };

  try {
    const response = await fetch(fetchURL, fetchOptions);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.text();
    console.log("HTML RESPONSE");
    // console.log("POST request successful: ", data);
  } catch (error) {
    console.error("There was a problem with the POST request: ", error);
  }
}