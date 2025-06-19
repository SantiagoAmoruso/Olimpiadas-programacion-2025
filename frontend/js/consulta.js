
  let isLoggedIn = false; 

  document.getElementById('consulta-form').addEventListener('submit', function (e) {
    e.preventDefault(); 

    if (!isLoggedIn) {
      alert("No se pudo enviar la consulta. Debés iniciar sesión primero.");
      return;
    }


    alert("Consulta enviada correctamente. ¡Gracias por contactarnos!");


    this.reset();
  });