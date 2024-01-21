function saveToLocalStorage(event) {
  event.preventDefault();

  const username = event.target.username.value;
  console.log(username);
  const email = event.target.email.value;
  const phonenumber = event.target.phonenumber.value;

  const obj = {
    username,
    email,
    phonenumber,
  };

  axios
    .post("http://localhost:4000/user", obj)
    .then((res) => {
      console.log(res);
      showuseronscreen(res.data.newUser);
    })
    .catch((err) => {
      document.body.innerHTML =
        document.body.innerHTML + "<h4> Somethinh went wrong </h4>";
      console.log(err);
    });
}

window.addEventListener("DOMContentLoaded", () => {
  axios.get("http://localhost:4000/user/get-user").then((res) => {
    console.log(res);
    for(var i=0;i<res.data.allUsers.length; i++){
      showuseronscreen(res.data.allUsers[i]);
    }
  }).catch((err) => {
    console.log(err);
  })
})

function showuseronscreen(user) {
  document.getElementById("email").value = "";
  document.getElementById("username").value = "";
  document.getElementById("phonenumber").value = "";

  if(localStorage.getItem(user.email) != null){
    removeUserFromScreen(user.email);
  }

  const parentNode = document.getElementById("listOfUsers");
  const childHTML = `<li id=${user.id}> ${user.username} - ${user.email} - ${user.phonenumber}
                    <button onclick=deleteUser('${user.id}')> Delete User</button>    
                    <button onclick=editsUserDetails('${user.id}','${user.username}','${user.email}','${user.phonenumber}')> Edit User</button>    
                    </li>`;

  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}
