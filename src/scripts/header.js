const toggle = document.getElementById('toggle');
const menu = document.getElementById('menu');
const body = document.body;
var scrollpos = window.scrollY;
var delay = 300;

//Activate the navbar
toggle.onclick = function() {
  menu.classList.toggle("active");
  body.classList.toggle('overflow');
  setTimeout(() => {
  window.scrollTo(0,0);    
  }, delay);
}

//Add or remove class on scroll
function add_class_on_scroll() {
    toggle.classList.add("fade-out");
}
function remove_class_on_scroll() {
    toggle.classList.remove('fade-out');
}

window.addEventListener('scroll', function() {
    scrollpos = window.scrollY;

    if(scrollpos > 20) {
        add_class_on_scroll();
    }
    else {
        remove_class_on_scroll();
    }
});