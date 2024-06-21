window.onscroll = function() {
  var button = document.getElementById("back-to-top");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      button.style.display = "block";
  } else {
      button.style.display = "none";
  }
};

document.getElementById("back-to-top").onclick = function() {
  window.scrollTo({top: 0, behavior: 'smooth'});
};
