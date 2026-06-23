document.addEventListener('DOMContentLoaded', function () {

  var burger   = document.getElementById('burger');
  var sidemenu = document.getElementById('sidemenu');
  var topbar   = document.querySelector('.topbar');
  var isIndex  = document.body.classList.contains('index-page');

  //햄버거
  if (burger){
    burger.addEventListener('click', function(){
      burger.classList.toggle('open');
      sidemenu.classList.toggle('open');
    });
  }
  
    //사이드커서대면자동으로열리기
    if (!isIndex) {
      var handle = document.createElement('div');
      handle.id  = 'sidemenu-handle';
      document.body.appendChild(handle);
      Object.assign(handle.style, {
        position:'fixed', top:0, right:0,
        width:'32px', height:'100vh', zIndex:998
      });
  
      function openMenu () { sidemenu.classList.add('open'); }
      function closeMenu() { sidemenu.classList.remove('open'); if(burger) burger.classList.remove('open'); }
  
      handle  .addEventListener('mouseenter', openMenu);
      sidemenu.addEventListener('mouseenter', openMenu);
      sidemenu.addEventListener('mouseleave', closeMenu);
    }
  
    //아래페이드
    if (isIndex) {
      var slides = document.querySelectorAll('.slide');
      if (slides.length) {
        var idx = 0;
        setInterval(function () {
          slides[idx].classList.remove('active');
          idx = (idx+1) % slides.length;
          slides[idx].classList.add('active');
        }, 6000);
      }
    }
  

    window.addEventListener('scroll', function(){
      if (window.scrollY > 20){
        topbar.classList.add('scrolled');
      } else {
        topbar.classList.remove('scrolled');
      }
    });
  
  });

  