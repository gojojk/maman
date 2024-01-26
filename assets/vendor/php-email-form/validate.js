/**
* PHP Email Form Validation - v3.6
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      let thisForm = this;

      console.log("inside form submit event handler");
        event.preventDefault();

        const name = document.getElementById('name').value
        const phone = document.getElementById('phone').value
        const email = document.getElementById('email').value
        const service = document.getElementById('service').value
        const message = document.getElementById('message').value
        const subject = document.getElementById('subject').value

        thisForm.querySelector('.loading').classList.add('d-block');

        // these IDs from the previous steps
        emailjs.send('service_9wub6wl', 'template_1yf8dq8', {
            subject,
            from_name: name,
            from_email: email,
            message,
            service,
            phone

        })
        .then(function() {
            console.log('inside SUCCESS!');
            displaySuccessAndClear(thisForm)
        }).catch(function(error) {
            console.log('inside FAILED...', error);
            displayError(thisForm,error)
        });
    });
  });

  function php_email_form_submit(thisForm, action, formData) {
    fetch(action, {
      method: 'POST',
      body: formData,
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    })
    .then(response => {
      if( response.ok ) {
        return response.text();
      } else {
        throw new Error(`${response.status} ${response.statusText} ${response.url}`); 
      }
    })
    .then(data => {
      thisForm.querySelector('.loading').classList.remove('d-block');
      if (data.trim() == 'OK') {
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.reset(); 
      } else {
        throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action); 
      }
    })
    .catch((error) => {
      displayError(thisForm, error);
    });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = JSON.stringify(error); //TODO: don't print exception to the client
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

  function displaySuccessAndClear(thisForm) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.sent-message').classList.add('d-block');
    thisForm.reset();
  }

})();
