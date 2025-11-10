let add = document.getElementById("add");
let clear = document.getElementById("clear");
let load = document.getElementById("load");
let title = document.getElementById("title");
let des = document.getElementById("description");
let dark = document.getElementById("dark");
let body = document.body;
let container = document.getElementById("container");
let task = document.getElementById("task");

let darkMode = localStorage.getItem("darkMode") === "true"; 

task.innerHTML = localStorage.getItem("tasks") || "";

if (!darkMode) {
  enableDarkMode();
} else {
  disableDarkMode();
}

dark.addEventListener("click", function () {
  darkMode = !darkMode;

  if (darkMode) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }

  localStorage.setItem("darkMode", darkMode);
});

function enableDarkMode() {
  body.style.backgroundColor = "#121212";
  body.style.color = "#f1f1f1";
  container.style.backgroundColor = "#1e1e1e";
  container.style.borderColor = "#333";
  dark.innerText = " Light Mode";
}

function disableDarkMode() {
  body.style.background = "white";
  body.style.color = "black";
  container.style.backgroundColor = "white";
  container.style.borderColor = "black";
  dark.innerText = " Dark Mode";
}

load.addEventListener("click", function () { 
  function fetchSampleTasks(callback) {
    alert("Fetching sample tasks from server...");
    setTimeout(() => {
      const sampleTasks = [
        { title: "Buy groceries", description: "Milk, bread, eggs", status: "pending" },
        { title: "Workout", description: "Evening gym", status: "completed" },
      ];
      callback(sampleTasks);
    }, 1500); 
  }

  fetchSampleTasks(function (tasks) {
    console.log("Tasks loaded:", tasks);
    task.innerHTML = "";

    tasks.forEach((t) => {
      let newtask = document.createElement("div");
      newtask.classList.add("tasks");
      newtask.innerHTML = `
        <h3>${t.title}</h3>
        <p>${t.description}</p>
        <p>${t.title} - <span class="status">${t.status.toUpperCase()}</span> (${new Date().toLocaleString()})</p>
        <div class="task-buttons">
          <button class="success">Done</button>
          <button class="edit">Edit</button>
          <button class="remove">Delete</button>
        </div>
      `;
      task.appendChild(newtask);

      let success = newtask.querySelector(".success");
      let remove = newtask.querySelector(".remove");
      let status = newtask.querySelector(".status");
      let edit = newtask.querySelector(".edit");

      success.addEventListener("click", function () {
        if (newtask.style.backgroundColor !== "green") {
          newtask.style.backgroundColor = "green";
          success.style.background = "blue";
          status.innerHTML = "COMPLETED";
          success.innerText = "Undone";
        } else {
          newtask.style.backgroundColor = "#1e40af";
          success.style.background = "green";
          status.innerHTML = "PENDING";
          success.innerText = "Done";
        }
        localStorage.setItem("tasks", task.innerHTML);
      });

      remove.addEventListener("click", function () {
        newtask.remove();
        localStorage.setItem("tasks", task.innerHTML);
      });

      edit.addEventListener("click", function () {
        let t1 = prompt("Enter new title:");
        let d2 = prompt("Enter new description:");

        if (t1 && d2) {
          newtask.querySelector("h3").innerText = t1;
          newtask.querySelector("p").innerText = d2;
          localStorage.setItem("tasks", task.innerHTML);
        }
      });
    });

    localStorage.setItem("tasks", task.innerHTML); 
  });
});

add.addEventListener("click", function () {
  const t = title.value.trim();
  const d = des.value.trim();
  if (!t || !d) {
    alert("Please enter both title and description!");
  } else {
    let newtask = document.createElement("div");
    newtask.classList.add("tasks");
    newtask.innerHTML = `
      <h3>${t}</h3>
      <p>${d}</p>
      <p>${t} - <span class="status">PENDING</span> (${new Date().toLocaleString()})</p>
      <div class="task-buttons">
        <button class="success">Done</button>
        <button class="edit">Edit</button>
        <button class="remove">Delete</button>
      </div>
    `;

    task.appendChild(newtask);

    let success = newtask.querySelector(".success");
    let remove = newtask.querySelector(".remove");
    let status = newtask.querySelector(".status");
    let edit = newtask.querySelector(".edit");

    success.addEventListener("click", function () {
      if (newtask.style.backgroundColor !== "green") {
        newtask.style.backgroundColor = "green";
        success.style.background = "blue";
        status.innerHTML = "COMPLETED";
        success.innerText = "Undone";
      } else {
        newtask.style.backgroundColor = "#1e40af";
        success.style.background = "green";
        status.innerHTML = "PENDING";
        success.innerText = "Done";
      }
      localStorage.setItem("tasks", task.innerHTML);
    });

    remove.addEventListener("click", function () {
      newtask.remove();
      localStorage.setItem("tasks", task.innerHTML);
    });

    edit.addEventListener("click", function () {
      let t1 = prompt("Enter new title:");
      let d2 = prompt("Enter new description:");

      if (t1 && d2) {
        newtask.querySelector("h3").innerText = t1;
        newtask.querySelector("p").innerText = d2;
        localStorage.setItem("tasks", task.innerHTML);
      }
    });

    clear.addEventListener("click", function () {
      newtask.remove();
      localStorage.setItem("tasks", task.innerHTML);
    });

    title.value = "";
    des.value = "";
  }
});
