fetch("repos.json")
  .then((res) => res.json())
  .then((data) => {
    let output = "";
    data.forEach(function (repo) {
      output += `<!--repo card started--><div class="col-sm-4 mb-40"><div class="mdl-card mdl-shadow--2dp pa-0 repo-card"><div class="mdl-card__title pa-0"><img class="blog-img"loading="lazy"src="${
        repo.banner
      }"></div><div class="mdl-card__supporting-text relative"><span class="blog-cat"style="${
        repo.lang ? "" : "display: none"
      };"><span class="lang"style="background-color: ${
        repo.color
      };"></span><span>${repo.lang}</span></span><a href="${
        repo.url
      }"><h4 class="mt-15 mb-20">${repo.name}</h4></a><p>${
        repo.description
      }</p><a href="${
        repo.url
      }"class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect bg-gray mdl-shadow--8dp"data-upgraded="MaterialButton,MaterialRipple"><i class="zmdi zmdi-github-alt"></i><span class="mdl-button__ripple-container"><span class="mdl-ripple"></span></span></a></div><div class="mdl-card__actions mdl-card--border"><span class="blog-post-date inline-block">${
        repo.date.split("T")[0]
      }</span><div class="mdl-layout-spacer"></div><div class="mdl-card__actions"><img class="mr-5"src="img/icon-andy.jpg"/><span>${
        repo.stars
      }</span><img class="mr-5 ml-5"src="img/fork.svg"/><span>${
        repo.forks
      }</span></div></div></div></div><!--repo card ended-->`;
    });
    document.getElementById("repo-card").innerHTML = output;
  });


function requestNotificationPermission() {
    if (Notification.permission === "default") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                console.log("Notification permission granted");
            }
        });
    }
}

function showNotification() {
  if (Notification.permission === "granted") {
      new Notification("Pesan Terkirim", {
          body: "Data berhasil disimpan di IndexedDB",
          icon: "/img/icon-144x144.png"
      });
  }
}
document.getElementById("contact").addEventListener("click", function(event) {
  event.preventDefault();

  const request = window.indexedDB.open("DatabaseContacts", 1);


  // menyimpan sebuah value
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  request.onerror = (event)=>{
    console.error("IndexedDB tidak tersambung");
    console.error(event)
  }

  request.onupgradeneeded = ()=>{
    const db = request.result;
    
    const store = db.createObjectStore("Contact", {keyPath: "id" ,autoIncrement: true});
    store.createIndex("name", ["name"], {unique: false});
    store.createIndex("email" ,["email"], {unique: false});
    store.createIndex("message", ["message"],{unique: false});
  }

  request.onsuccess = function (){
    console.log("Database berhasil disimpan");

    const db = request.result;

    const transaction = db.transaction("Contact", "readwrite");
    const store = transaction.objectStore("Contact");
    console.log(name+ email+ message);

    const data = {
      name: name,
      email: email,
      message: message
    }
    store.add(data);
    const idQuery = store.get();
    console.log(idQuery);

    transaction.oncomplete = ()=>{
      db.close();
    }
  }
});

document.addEventListener("DOMContentLoaded", requestNotificationPermission);
