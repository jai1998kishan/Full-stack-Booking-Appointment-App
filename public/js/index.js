const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/user",
});
var curr = null;
let form = document.getElementById("my-form");

form.addEventListener("submit", handleSubmit);
window.addEventListener("load", () => {
  renderElements();
});

async function handleSubmit(e) {
  e.preventDefault();

  try {
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
    };

    console.log(JSON.stringify(data));
    let res;
    let id = document.querySelector('input[type="submit"]').id;
    if (id) {
      res = await axiosInstance.put(`/${id}`, data);
    } else {
      res = await axiosInstance.post("/", data);
      id = res.data.id;
    }
    let elem = document.querySelector('input[type="submit"]').dataset.elem;
    console.log(res);

    e.target.name.value = "";
    e.target.email.value = "";
    e.target.phone.value = "";
    let ul = document.getElementById("users");
    let li = document.createElement("li");
    li.className = "item";
    let span = document.createElement("span");
    span.textContent = `Name : ${data.name} Email : ${data.email}
   phone number : ${data.phone}`;
    li.appendChild(span);
    let div = document.createElement("div");

    let edit = document.createElement("button");
    edit.className = "edit";
    edit.textContent = "edit";
    edit.id = id;
    div.appendChild(edit);
    let deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "delete";
    deleteBtn.id = id;
    div.appendChild(deleteBtn);
    li.appendChild(div);

    if (curr !== null) {
      ul.insertBefore(li, curr);
      document.querySelector('input[type="submit"]').id = "";
      curr = null;
    } else {
      ul.appendChild(li);
    }
  } catch (e) {
    console.log(e);
  }
}

async function renderElements() {
  try {
    const users = await axiosInstance.get();
    console.log(users);
    let ul = document.getElementById("users");
    ul.innerHTML = ``;
    users.data.data.forEach((user, index) => {
      let li = document.createElement("li");
      li.className = "item";
      let span = document.createElement("span");
      span.textContent = `Name : ${user.name} Email : ${user.email}
      phone number : ${user.phone}`;
      li.appendChild(span);
      let div = document.createElement("div");

      let edit = document.createElement("button");
      edit.className = "edit";
      edit.textContent = "edit";
      edit.id = user.id;
      div.appendChild(edit);
      let deleteBtn = document.createElement("button");
      deleteBtn.className = "delete";
      deleteBtn.textContent = "delete";
      deleteBtn.id = user.id;
      div.appendChild(deleteBtn);
      li.appendChild(div);
      ul.appendChild(li);
    });
  } catch (e) {
    console.log(e);
  }
}

var dl = document.getElementById("users");
dl.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete")) {
    let id = e.target.id;
    let res = await axiosInstance.delete(`/${id}`);

    if (res.status === 200) {
      let ul = document.getElementById("users");

      ul.removeChild(e.target.parentNode.parentNode);
    }
  }

  if (e.target.classList.contains("edit")) {
    let elem = e.target.parentNode.parentNode;
    let ul = document.getElementById("users");
    let li = e.target.parentElement.parentElement;
    curr = li.nextElementSibling;
    let str = elem.textContent;
    console.log(str);
    console.log(elem);
    document.getElementById("name").value = str.substring(
      7,
      str.indexOf("Email") - 1
    );
    document.getElementById("email").value = str.substring(
      str.indexOf("Email") + 8,
      str.indexOf("phone number") - 1
    );
    document.getElementById("phone").value = str.substring(
      str.indexOf("phone number") + 15,
      str.lastIndexOf("edit")
    );
    console.log(e.target.id);
    document.querySelector('input[type="submit"]').id = e.target.id;

    ul.removeChild(li);
    // li.style.display = ""
  }
});
