// // -------   Mail Send ajax

//  $(document).ready(function() {
//     var form = $('#myForm'); // contact form
//     var submit = $('.submit-btn'); // submit button
//     var alert = $('.alert-msg'); // alert div for show alert message

//     // form submit event
//     form.on('submit', function(e) {
//         e.preventDefault(); // prevent default form submit

//         $.ajax({
//             url: 'mail.php', // form action url
//             type: 'POST', // form submit method get/post
//             dataType: 'html', // request type html/json/xml
//             data: form.serialize(), // serialize form data
//             beforeSend: function() {
//                 alert.fadeOut();
//                 submit.html('Sending....'); // change submit button text
//             },
//             success: function(data) {
//                 alert.html(data).fadeIn(); // fade in response data
//                 form.trigger('reset'); // reset form
//                 submit.attr("style", "display: none !important");; // reset submit button text
//             },
//             error: function(e) {
//                 console.log(e)
//             }
//         });
//     });
// });




(function ($) {
  "use strict";

  $(window).on("load", function () {
    $('#submit').click(function (e) {
      e.preventDefault()
      var name = $("#name").val();
      var email = $("#email").val();
      var subject = $('#subject').val();
      var msg = $("#message").val();

      if (!name) {
        $.toaster('Please enter your name', 'Missing Data', 'warning');
        return false
      }
      if (!subject) {
        $.toaster('Please enter subject', 'Missing Data', 'warning');
        return false
      }
      if (!email) {
        $.toaster('Please enter your email', 'Missing Data', 'warning');
        return false
      }
      if (!msg) {
        $.toaster('Please enter your message', 'Missing Data', 'warning');
        return false
      }


      // var target = ["gacw128@gmail.com","hi2friends90@gmail.com","contact@gacwrmd.in"]
      var target = ["bcomca.sgac2025@gmail.com"]
      $("#submit").prop('disabled', true)
      var request = $.ajax({
        url: "https://cewti8xhnb.execute-api.us-east-1.amazonaws.com/Production/sendMail",
        method: "POST",
        data: JSON.stringify({ body: { name: name, email: email, message: msg }, "template": "Templates/Gacwrmdtemplate.html", subject: `Mail from ${name}`, target: target, fromAddress: "bcomca.sgac2025@gmail.com" }),
        contentType: "application/json",
        dataType: "json"
      });

      request.done(function (msg) {
        $("#name").val("")
        $("#email").val("")
        $("#subject").val("")
        $("#message").val("")
        $.toaster('Request has been submitted successfully', 'Request', 'success');
        $("#submit").prop('disabled', false)
      });

      request.fail(function (jqXHR, textStatus) {
        $.toaster('Something gone wrong!!!', 'Error', 'danger');
        $("#submit").prop('disabled', false)
      });


    })




  });
})(jQuery);