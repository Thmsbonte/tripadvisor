const $ = document;

// CREATE A COOKIE

const createCookie = (cname, cvalue, exdays) => {
  let d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

// READ A COOKIE
const readCookie = (name) => {
  let nameEQ = name + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// DELETE A COOKIE
const eraseCookie = (name) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

$.addEventListener("DOMContentLoaded", () => {
  console.log("Page chargée");

  // LOGIN/DISCONNECT BUTTON

  // Si l'utilisateur est loggué (cookie de session), on affiche le bouton Disconnect
  if (readCookie("user")) {
    $.querySelector("#login-button").classList.add("hidden");
    $.querySelector("#disconnect-button").classList.remove("hidden");
  }

  // Bouton se déconnecter
  $.querySelector("#disconnect-link").addEventListener("click", () => {
    eraseCookie("user");
    $.location.reload();
  });

  // LOGIN FORM
  //   Afficher / cacher le formulaire de login
  $.querySelector("#login-button").addEventListener("click", () => {
    $.querySelector(".modal").classList.remove("hidden");
    $.querySelector(".login-modal-page").classList.remove("hidden");
  });

  $.querySelector("#close-login-form").addEventListener("click", () => {
    $.querySelector(".modal").classList.add("hidden");
    $.querySelector(".login-modal-page").classList.add("hidden");
  });

  $.querySelector("#signup-link").addEventListener("click", () => {
    $.querySelector(".login-modal-page").classList.add("hidden");
    $.querySelector(".signup-modal-page").classList.remove("hidden");
  });

  // Envoyer les données du formulaire de login au back-end
  $.querySelector("#login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = {
      mail: $.querySelector("#login-mail").value,
      password: $.querySelector("#login-password").value,
    };
    try {
      const response = await axios.post(
        "https://thmsbonte-tripadvisor-backend.herokuapp.com/user/login",
        data
      );
      if (response.status === 200) {
        // Création d'un cookie de session
        createCookie("user", response.data.username, 1);
        // On indique que la connexion est réussie et on ferme les fenêtres de connexion
        $.querySelector(".login-modal-page").classList.add("hidden");
        $.querySelector(".login-successfull").classList.remove("hidden");
        setTimeout(() => {
          $.querySelector(".login-successfull").classList.add("hidden");
          $.querySelector(".modal").classList.add("hidden");
          // Rechargement de la page
          $.location.reload();
        }, 2000);
      } else {
        $.querySelector(".modal").classList.add("hidden");
        alert("La connexion a échoué");
      }
    } catch (error) {
      alert(
        `Votre adresse e-mail ou votre mot de passe est incorrect. Merci de réessayer.`
      );
    }
  });

  // SIGNUP FORM
  // Afficher/chacher le formulaire d'inscription
  $.querySelector("#login-link").addEventListener("click", () => {
    $.querySelector(".signup-modal-page").classList.add("hidden");
    $.querySelector(".login-modal-page").classList.remove("hidden");
  });

  $.querySelector("#close-signup-form").addEventListener("click", () => {
    $.querySelector(".modal").classList.add("hidden");
    $.querySelector(".signup-modal-page").classList.add("hidden");
  });

  // Envoyer les données du formulaire d'inscription au back-end
  $.querySelector("#signup-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = {
      username: $.querySelector("#signup-username").value,
      mail: $.querySelector("#signup-mail").value,
      password: $.querySelector("#signup-password").value,
      message: $.querySelector("#signup-message").value,
    };
    try {
      const response = await axios.post(
        "https://thmsbonte-tripadvisor-backend.herokuapp.com/user/signup",
        data
      );
      if (response.status === 200) {
        // Création d'un cookie de session
        createCookie("user", response.data.username, 1);
        // On indique que la connexion est réussie et on ferme les fenêtres de connexion
        $.querySelector(".signup-modal-page").classList.add("hidden");
        $.querySelector(".signup-successfull").classList.remove("hidden");
        setTimeout(() => {
          $.querySelector(".signup-successfull").classList.add("hidden");
          $.querySelector(".modal").classList.add("hidden");
          // Rechargement de la page
          $.location.reload();
        }, 2000);
      } else {
        $.querySelector(".modal").classList.add("hidden");
        alert("L'inscription a échoué");
      }
    } catch (error) {
      alert(`Il manque des paramètres`);
    }
  });
});
