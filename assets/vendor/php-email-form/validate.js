/**
* PHP Email Form Validation - v3.6
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (e) {
    e.addEventListener('submit', function (event) {
      let thisForm = this;

      console.log("inside form submit event handler");
      event.preventDefault();

      const name = document.getElementById('name').value
      const phone = document.getElementById('phone').value
      const email = document.getElementById('email').value
      const service = document.getElementById('service').value
      const message = document.getElementById('message').value
      const subject = document.getElementById('subject').value
      const token = grecaptcha.getResponse()

      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      if(token.length === 0) {
        displayError(thisForm, {
          text: "The g-recaptcha-response parameter not found"
        })
        return;
      }

      // these IDs from the previous steps
      emailjs.send('service_9wub6wl', 'template_1yf8dq8', { 
        subject,
        from_name: name,
        from_email: email,
        message,
        service,
        phone,
        'g-recaptcha-response': token
      })
      .then(function () {
        console.log('inside SUCCESS!');
        displaySuccessAndClear(thisForm)
      }).catch(function (error) {
        console.log('inside FAILED...', error);
        displayError(thisForm, error)
      });
    });
  });

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.sent-message').classList.remove('d-block');
    thisForm.querySelector('.error-message').classList.add('d-block');
    if (error.text.includes("The g-recaptcha-response parameter not found"))
      thisForm.querySelector('.error-message').innerHTML = "Please confirm that you are not a robot";
    else
      thisForm.querySelector('.error-message').innerHTML = "Some unknown error occurred, please try after sometime"; //TODO: don't print exception to the client
  }

  function displaySuccessAndClear(thisForm) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').classList.remove('d-block');
    thisForm.querySelector('.sent-message').classList.add('d-block');
    thisForm.reset();
  }

})();
