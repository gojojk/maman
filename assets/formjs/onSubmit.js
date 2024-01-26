// window.onload = function() {
//     document.getElementById('contact-form').addEventListener('submit', function(event) {
//         event.preventDefault();

//         const name = document.getElementById('name').value
//         const phone = document.getElementById('phone').value
//         const email = document.getElementById('email').value
//         const service = document.getElementById('service').value
//         const message = document.getElementById('message').value
//         const subject = document.getElementById('subject').value

//         // these IDs from the previous steps
//         emailjs.send('service_9wub6wl', 'template_1yf8dq8', {
//             subject,
//             from_name: name,
//             from_email: email,
//             message,
//             service,
//             phone

//         }, '7isIFdkjJgSSUn_Hs')
//             .then(function() {
//                 console.log('SUCCESS!');
//             }, function(error) {
//                 console.log('FAILED...', error);
//             });
//     });
// }