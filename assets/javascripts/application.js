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


  if (window.location.pathname === "/") {
    new ImageRotator().init();
  }
});

function ImageRotator() {
  var interval;


  this.init = function() {
    $("img.first").css("display", "block");
    interval = setInterval(animate, 4000);
  }


  function animate() {
    var $currentImage = $("img.active");
    console.log($currentImage)
    var $currentCircle = $(".circle.active");
    var $nextImage = $currentImage.next();
    var $nextCircle = $currentCircle.next();
    if ($nextImage.length === 0) {
      $nextImage = $("img.first");
      $nextCircle = $(".circle.first");
    }
    $currentImage.fadeOut(1000, function() {
      $currentImage.removeClass("active");
      $nextImage.addClass("active").fadeIn(1000);
      $currentCircle.removeClass("active");
      $nextCircle.addClass("active");
    });
  }

  $(".circle").click(function(){
    clearInterval(interval);
    var clickedIndex = $(this).index();
    var corrImage = $(".photo-container img:eq("+ clickedIndex +")");

    $(".circle").removeClass("active")
    $("img").removeClass("active");
    corrImage.addClass("active");
    $(this).addClass("active");
    $(".photo-container img:not(.active)").css("display", "none");
    corrImage.css("display", "block");
    interval = setInterval(animate, 5000);
  });



  // function generateImages(location) {
  //   var url, className;
  //   totalImages = imageIndex[location].length;

  //   for (var i = 0; i < totalImages; i++) {
  //     url = googleBucketUrlFrom(imageIndex[location][i]);
  //     if (i === 0) {
  //       className = 'portfolio-image active first'
  //     } else {
  //       className = 'portfolio-image'
  //     }
  //     $('.image-container').append("<img class='"+ className+"' src='"+url+"'>")
  //   }
  //   $(".portfolio-image.first").css("display", "block");
  // }
}
