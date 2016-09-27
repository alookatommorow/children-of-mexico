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


  // var currentIndex = 0,
  //     $photos = $('.photo-container img'),
  //     lastIndex = $photos.length - 1,
  //     $thumbs = $(".circle");

  // $photos.eq(currentIndex).show();
  // $thumbs.first().children().addClass("active-photo");

  // function selectNextThumb(next) {
  //   $(".active-photo").removeClass("active-photo");
  //   next.addClass("active-photo");
  // }

  // function showNext() {
  //   var $currentPhoto = $photos.eq(currentIndex);
  //   var $nextThumb = $thumbs.eq(currentIndex + 1).children();
  //   if (currentIndex === lastIndex) {
  //     $currentPhoto.hide();
  //     $photos.first().show();
  //     selectNextThumb($thumbs.first().children());
  //     currentIndex = 0;
  //   } else {
  //     $currentPhoto.hide();
  //     $currentPhoto.next().show();
  //     selectNextThumb($nextThumb);
  //     currentIndex++;
  //   }
  // }

  // function showPrev() {
  //   var $currentPhoto = $photos.eq(currentIndex),
  //       $nextThumb = $thumbs.eq(currentIndex - 1).children();
  //   if (currentIndex === 0) {
  //     $currentPhoto.hide();
  //     $photos.last().show();
  //     selectNextThumb($nextThumb);
  //     currentIndex = lastIndex;
  //   } else {
  //     $currentPhoto.hide();
  //     $currentPhoto.prev().show();
  //     selectNextThumb($nextThumb);
  //     currentIndex--;
  //   }
  // }

  // $(".carousel-button").click(function(){
  //   if ($(this).data("carousel") === "prev") {
  //     showPrev();
  //   } else {
  //     showNext();
  //   }
  // });

  // $('.skatepark-show-image').click(function() {
  //   showNext();
  // });

  // $('.skatepark-show-thumbnail').click(function() {
  //   nextIndex = $(this).index();
  //   var $currentPhoto = $photos.eq(currentIndex);
  //   $currentPhoto.hide();
  //   $photos.eq(nextIndex).show();
  //   selectNextThumb($thumbs.eq(nextIndex).children());
  //   currentIndex = nextIndex;
  // });
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
    $currentImage.fadeOut(1500, function() {
      $currentImage.removeClass("active");
      $nextImage.addClass("active").fadeIn(1500);
      $currentCircle.removeClass("active");
      $nextCircle.addClass("active").fadeIn(1500);
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
    $("img:not(.active)").css("display", "none");
    corrImage.css("display", "block");
    interval = setInterval(animate, 4000);
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
