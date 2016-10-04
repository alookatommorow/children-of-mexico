$(document).ready(function() {

  var pageIndex = {
    "/contact/": "Contact",
    "/": "Home",
    "/faq/": "Volunteer FAQ",
    "/about/": "About",
    "/gallery/": "Gallery",
    "/news/": "News and Events"
  }

  var pageTitle = pageIndex[window.location.pathname];
  $("a:contains("+pageTitle+")").addClass("active");

  /// toggle menu caret display ////

  $("#show-menu").click(function() {
    if(window.innerWidth <= 600) {
      $(".fa-caret-down").toggle();
      $(".fa-caret-up").toggle();
    }
  })

  /// start image rotation on root path ///
  if (window.location.pathname === "/") {
    new ImageRotator().init();
  }

  /// validate then send contact form ///
  $(".contact-form").submit(function (event) {
    event.preventDefault();

    var validation = new FormValidator(this).validateForm();
    var data = $(this).serialize();

    if (validation) {
      $.ajax({
          url: this.action,
          method: this.method,
          data: data,
          dataType: "json"
      })
      .done(formSuccess)
      .fail(function(response){
        console.log("error", response);
      });
    }
  });
});
