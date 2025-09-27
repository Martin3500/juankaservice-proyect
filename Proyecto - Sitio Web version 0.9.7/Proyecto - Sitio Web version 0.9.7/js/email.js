(function() {
  emailjs.init("owOlETeRc1gZHNfly"); // 🔑 tu public key aquí
})();

    // Envía el formulario al hacer submit
document.getElementById('formulario').addEventListener('submit', function(e) {
e.preventDefault();

  // Evita bots
  if (document.getElementById('honeypot').value !== "") {
    alert("Es curioso, ¿No? Parece que el formulario intento ser enviado por una persona de otro tipo de mundo. Si no eres un bot, por favor contacta con el administrador del sitio web.");
    return;
  }

      // Envía el formulario
  emailjs.sendForm("service_kn3xzoy", "template_dpn6msp", this)
    .then(function() {
      alert("El mensaje se envio de forma exitosa, a la brevedad recibiras una respuesta de uno de nuestros empleados. Gracias por contactarnos.");
        document.getElementById('formulario').reset();
      },function(error) {
          alert("Error durante el proceso del envio: " + JSON.stringify(error));
      });
  });