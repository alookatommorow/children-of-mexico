$(document).ready(function() {
  var pageIndex = {
    "/contact/": "Contact",
    "/": "Home",
    "/faq/": "Volunteer FAQ",
    "/about/": "About",
  }

  var pageTitle = pageIndex[window.location.pathname];
  $("a:contains("+pageTitle+")").addClass("active");
})
