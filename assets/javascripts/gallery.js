function ImageGallery() {

  var currentIndex = 0,
      imageNames =  ["IMG0456", "DSC00461", "DSC01000", "DSC01506", "DSC01718", "DSC01723", "DSC01782", "DSC00635", "DSC02794", "DSC02850", "DSC02873", "DSC02879", "DSC02891", "IMG0119", "IMG0131", "IMG0148", "IMG0166", "IMG0170", "DSC00896", "IMG0174", "IMG0179", "IMG0267", "IMG0285", "IMG0363", "IMG0474", "IMG0488", "IMG0529", "IMG0668", "IMG0741"],
      $photos,
      lastIndex,
      $thumbs;

  this.init = function() {
    imageNames.forEach(function (image) {
      $(".carousel-image-container").append("<div class='gallery-image'><img src='"+generateUrl(image)+"'></div>")
      $(".photo-thumbnails").append("<div class='circle-container'><div class='circle gallery-thumbnail'></div></div>")
    })
    $photos = $('.carousel-image-container div');
    lastIndex = $photos.length - 1;
    $thumbs = $(".circle-container");
    $photos.eq(currentIndex).show();
    $thumbs.first().children().addClass("active-photo");
  }

  function selectNextThumb(next) {
    $(".active-photo").removeClass("active-photo");
    next.addClass("active-photo");
  }

  function showNext() {
    var $currentPhoto = $photos.eq(currentIndex);
    var $nextThumb = $thumbs.eq(currentIndex + 1).children();
    if (currentIndex === lastIndex) {
      $currentPhoto.hide();
      $photos.first().show();
      selectNextThumb($thumbs.first().children());
      currentIndex = 0;
    } else {
      $currentPhoto.hide();
      $currentPhoto.next().show();
      selectNextThumb($nextThumb);
      currentIndex++;
    }
  }

  function showPrev() {
    var $currentPhoto = $photos.eq(currentIndex),
        $nextThumb = $thumbs.eq(currentIndex - 1).children();
    if (currentIndex === 0) {
      $currentPhoto.hide();
      $photos.last().show();
      selectNextThumb($nextThumb);
      currentIndex = lastIndex;
    } else {
      $currentPhoto.hide();
      $currentPhoto.prev().show();
      selectNextThumb($nextThumb);
      currentIndex--;
    }
  }

  $(".carousel-button").click(function(){
    if ($(this).data("carousel") === "prev") {
      showPrev();
    } else {
      showNext();
    }
  });

  $(".photo-display").on("click", ".gallery-image", function() {
    showNext();
  });

  $(".photo-display").on("click", ".gallery-thumbnail", function() {
    nextIndex = $(this).parent().index();
    var $currentPhoto = $photos.eq(currentIndex);
    $currentPhoto.hide();
    $photos.eq(nextIndex).show();
    selectNextThumb($thumbs.eq(nextIndex).children());
    currentIndex = nextIndex;
  });

  //key navigation logic
  if ($("#photo").hasClass("active")) {
    $(document).on('keydown', function(event) {
      event = event || window.event;
      switch(event.which || event.keyCode) {
        case 37: // left
          showPrev();
        break;

        case 39: //right
          showNext();
        break;

        default: return; // exit this handler for other keys
      }
    });
  }
}
