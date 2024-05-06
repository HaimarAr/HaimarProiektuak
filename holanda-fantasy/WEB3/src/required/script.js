$(document).ready(function () {
  //LOG IN /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////

  // Ocultar el formulario de login al principio
  $(".login").hide();
  $(".register_li").addClass("active");

  // Ezizena berifikatzeko funtzioa
  function validateUsername(username) {
    var regex = /^[^0-9][A-Za-z0-9_]{2,}$/;
    return regex.test(username);
  }

  // Emaila berifikatzeko funtzioa
  function validateEmail(email) {
    var regex = /^[A-Za-z._-]+(@gmail|@goierrieskola|@hotmail)\.(com|eus|org)$/;
    return regex.test(email);
  }

  // Kontraseña berifikatzeko funtzioa
  function validatePassword(password) {
    // Al menos 8 caracteres, una mayúscula, una minúscula y un número
    var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return regex.test(password);
  }

  // Verificar los datos al escribir en los campos de entrada
  $(".input").on("input", function () {
    var input = $(this);
    var inputValue = input.val();

    switch (input.attr("placeholder")) {
      case "Username":
        if (validateUsername(inputValue)) {
          input.css("border-color", "green");
        } else {
          input.css("border-color", "red");
        }
        break;
      case "E-mail":
        if (validateEmail(inputValue)) {
          input.css("border-color", "green");
        } else {
          input.css("border-color", "red");
        }
        break;
      case "Password":
        if (validatePassword(inputValue)) {
          input.css("border-color", "green");
        } else {
          input.css("border-color", "red");
        }
        break;
      default:
        break;
    }
  });

  $(".login_li").click(function () {
    $(this).addClass("active");
    $(".register_li").removeClass("active");
    $(".register").fadeOut("fast", function () {
      $(".login").fadeIn("fast");
    });
  });

  $(".register_li").click(function () {
    $(this).addClass("active");
    $(".login_li").removeClass("active");
    $(".login").fadeOut("fast", function () {
      $(".register").fadeIn("fast");
    });
  });

  //LOG IN ////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //Bilatzailea ////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  document
    .getElementById("search-button")
    .addEventListener("click", function (e) {
      e.preventDefault();
      var searchTerm = document.getElementById("search-input").value;
      searchProducts(searchTerm);
    });

  function searchProducts(term) {
    var found = window.find(term, false, false, true, false, true, false);
    if (!found) {
      var aukeraHizkuntzaSelect = $("#selectHizkuntzaAukeratzeko").val();
      switch (aukeraHizkuntzaSelect) {
        case "eus": {
          alert("Ez da aurkitu bilatutakoa.");
          break;
        }
        case "es": {
          alert("No se encontraron coincidencias.");
          break;
        }
        case "en": {
          alert("No matches found.");
          break;
        }
      }
    }
  }

  //Bilatzailea ////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //ERREGISTRATU ////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////

  $(".btnRegist").click(function (event) {
    event.preventDefault(); // Evitar que el enlace o botón actúe como un enlace estándar o botón de envío

    // Verificar si los bordes de los elementos de entrada son verdes
    var greenBorders = true;
    $(".register .input_field input").each(function () {
      if ($(this).css("border-color") !== "rgb(0, 128, 0)") {
        greenBorders = false;
        return false; // Salir del bucle each si se encuentra un borde que no es verde
      }
    });

    // Si los bordes son verdes, continuar con la operación AJAX
    if (greenBorders) {
      var namevalue = $("#ezizena").val();
      var emailValue = $("#emailaRegist").val();
      var passwordValue = $("#pasahitzRegist").val();

      $.ajax({
        type: "POST",
        url: "../../required/ajaxDeiak.php",
        data: {
          action: "registratu",

          ezizena: namevalue,
          email: emailValue,
          pasahitza: passwordValue,
        },
        success: function (response) {
          // Aquí puedes manejar la respuesta del servidor si es necesaria
          console.log(response);
        },
      }).done(function (data) {
        location.reload();
        alert(data);
      });
    } else {
      // Si los bordes no son verdes, muestra un mensaje de error o realiza alguna otra acción
      alert("Sartu datuak zuzen!");
    }
  });
  //ERREGISTRATU ///////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //log in /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////
  $(".btnLogIn").click(function () {
    event.preventDefault(); // Evitar que el enlace o botón actúe como un enlace estándar o botón de envío

    // Verificar si los bordes de los elementos de entrada son verdes
    var greenBorders = true;
    $(".login .input_field input").each(function () {
      if ($(this).css("border-color") !== "rgb(0, 128, 0)") {
        greenBorders = false;
        return false; // Salir del bucle each si se encuentra un borde que no es verde
      }
    });

    // Si los bordes son verdes, continuar con la operación AJAX
    if (greenBorders) {
      var emailValue = $("#emailaLog").val();
      var passwordValue = $("#pasahitzaLog").val();

      $.ajax({
        type: "POST",
        url: "../../required/ajaxDeiak.php",
        data: {
          action: "logeatu",

          email: emailValue,
          pasahitza: passwordValue,
        },
        success: function (response) {
          // Aquí puedes manejar la respuesta del servidor si es necesaria
          console.log(response);
        },
      }).done(function (data) {
        location.reload();
        alert(data);
      });
    } else {
      // Si los bordes no son verdes, muestra un mensaje de error o realiza alguna otra acción
      alert("Ez dago konturik datu horiekin");
    }
  });
  //log in ////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});
