$(document).ready(function() {

  $(".contact-form").submit( function (event) {
    event.preventDefault();

    var validation = new FormValidator(this).validateForm();

    if (validation) {
      console.log("hell ya");
    }
  });

  $("textarea.validate").focus(function() {
    if ($(this).hasClass("error")) {
      $(this).removeClass("error");
    }
  });

})

var validationTypes = {
  first: {
    prompt: "Please enter a first name",
    counterpart: "[placeholder='First Name']",
    validator: "empty"
  },

  last: {
    prompt: "Please enter a last name",
    counterpart: "[placeholder='Last Name']",
    validator: "empty"
  },

  email: {
    prompt: "Please enter a valid email address",
    counterpart: "[placeholder='Email']",
    validator: "email"
  },

  message: {
    prompt: 'Please enter a message',
    counterpart: "textarea",
    validator: "empty"
  }
}

var validators = {
  empty: function(input) {
    return input.length > 0;
  },

  email: function(input) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(input);
  },
}

function FormValidator(form) {
  this.form = form;
}

FormValidator.prototype.validateForm = function() {
  var inputTypes = [];
  var validationType, validator;
  var input = $(this.form).find(".validate");
  var errorCounterparts = [];
  var errorList = "<ul class='error-list'>";

  $(input).each(function(item) {
    validationType = input[item].className.split(" ")[1];
    console.log(validationType);
    validator = validators[validationTypes[validationType].validator];
    if ( !validator($(input[item]).val()) ) {
      errorList += "<li>" + validationTypes[validationType].prompt + "</li>";
      errorCounterparts.push(validationTypes[validationType].counterpart)
    } else {
      $("" + validationTypes[validationType].counterpart + "").removeClass("error");
    }
  });

  if (errorCounterparts.length > 0) {
    $(this.form).find(".error.user-message").html(errorList).show();
    $(""+errorCounterparts.join(", ")+"").addClass("error");
  } else {
    $(".error.user-message").hide();
    return true;
  }
}
