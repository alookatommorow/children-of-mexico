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


/// Image Rotator ///

function ImageRotator() {
  var $container = $('.photo-container');
  var currentIndex = 0;
  var $currentCircle = $(".circle.active");
  var $nextCircle = $currentCircle.next();
  var imageNames = ["IMG0170", "DSC02873", "IMG0363", "IMG0668", "DSC00461"];
  var interval, currentUrl;

  this.init = function() {
    interval = setInterval(cycleImages, 5000);
  }

  function animate(url) {
    $container.fadeOut(1000, function() {
      $container.css('background-image', 'url('+url+')');
      $currentCircle.removeClass("active");
      $container.fadeIn(1000);
      $nextCircle.addClass("active");
    });
  }

  function cycleImages () {
    $currentCircle = $(".circle.active");
    if (currentIndex === imageNames.length - 1) {
      currentIndex = 0;
      $nextCircle = $(".circle.first");
    } else {
      currentIndex++;
      $nextCircle = $currentCircle.next();
    }
    currentUrl = generateUrl(imageNames[currentIndex]);
    animate(currentUrl);
  };

  function generateUrl(name) {
    return "https://storage.googleapis.com/children-of-mexico/"+name+".JPG"
  }

  $(".circle").click(function(){
    clearInterval(interval);
    var clickedIndex = $(this).index();
    var currentUrl = generateUrl(imageNames[clickedIndex]);
    currentIndex = clickedIndex;

    $(".circle").removeClass("active")
    $(this).addClass("active");
    $container.css('background-image', 'url('+currentUrl+')');
    interval = setInterval(cycleImages, 5000);
  });
}
