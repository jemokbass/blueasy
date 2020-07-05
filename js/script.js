//WEBP ИЗОБРАЖЕНИЯ НА САЙТАХ
function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
  if (support == true) {
    document.querySelector('body').classList.add('webp');
  } else {
    document.querySelector('body').classList.add('no-webp');
  }
});
//АДАПТИВНЫЕ ИЗОБРАЖЕНИЯ В HTML
function ibg() {
  let ibg = document.querySelectorAll(".--ibg");
  for (var i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector('img')) {
      ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
    }
  }
}

ibg();

//HEADER MENU BURGER


//PLACEHOLDER for input
$(document).ready(function () {
  $('input,textarea').focus(function () {
    $(this).data('placeholder', $(this).attr('placeholder'))
    $(this).attr('placeholder', '');
  });
  $('input,textarea').blur(function () {
    $(this).attr('placeholder', $(this).data('placeholder'));
  });
});

// When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size


window.onscroll = function () { scrollFunction() };


function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("navbar").style.padding = "28px 0px 27px 0px";
  } else {
    document.getElementById("navbar").style.padding = "58px 0px 57px 0px";
  }
}

$('.navbar__icon').click(function (event) {
  $(this).toggleClass('active');
  $('.navbar-body').toggleClass('active');
  if ($(this).hasClass('active')) {
    $('body').data('scroll', $(window).scrollTop());
  }
  $('body').toggleClass('lock');
  if (!(this).hasClass('active')) {
    $('body,html').scrollTop(parseInt($('body').data('scroll')));
  }
});

//GALLERY
let galleryImages = document.querySelectorAll('.gallery-img');
let getLatestOpenedImg;
let windowWidth = window.innerWidth;

if (galleryImages) {
  galleryImages.forEach(function (image, index) {
    image.onclick = function () {
      let getElementCss = window.getComputedStyle(image);
      let getFullImgUrl = getElementCss.getPropertyValue("background-image");
      let getImgUrlPos = getFullImgUrl.split("/img/gallery/");
      let setNewImgUrl = getImgUrlPos[1].replace('")', '');

      getLatestOpenedImg = index + 1;

      let container = document.body;
      let newImgWindow = document.createElement("div");
      container.appendChild(newImgWindow);
      newImgWindow.setAttribute("class", "img-window");
      newImgWindow.setAttribute("onclick", "closeImg()");

      let newImg = document.createElement("img");
      newImgWindow.appendChild(newImg);
      newImg.setAttribute("src", "img/gallery/" + setNewImgUrl);
      newImg.setAttribute("id", "current-img");

      newImg.onload = function () {
        let imgWidth = this.width;
        let calcImgToEdge = ((windowWidth - imgWidth) / 2) - 80;

        let newNextBtn = document.createElement("a");
        let btnNextText = document.createTextNode("Next");
        newNextBtn.appendChild(btnNextText);
        container.appendChild(newNextBtn);
        newNextBtn.setAttribute("class", "img-btn-next");
        newNextBtn.setAttribute("onclick", "changeImg(1)");
        newNextBtn.style.cssText = "right: " + calcImgToEdge + "px;";

        let newPrevBtn = document.createElement("a");
        let btnPrevText = document.createTextNode("Prev");
        newPrevBtn.appendChild(btnPrevText);
        container.appendChild(newPrevBtn);
        newPrevBtn.setAttribute("class", "img-btn-prev");
        newPrevBtn.setAttribute("onclick", "changeImg(0)");
        newPrevBtn.style.cssText = "left: " + calcImgToEdge + "px;";
      }

    }
  });
}

function closeImg() {
  document.querySelector(".img-window").remove();
  document.querySelector(".img-btn-next").remove();
  document.querySelector(".img-btn-prev").remove();
}

function changeImg(changeDir) {
  document.querySelector("#current-img").remove();

  let getImgWindow = document.querySelector(".img-window");
  let newImg = document.createElement("img");
  getImgWindow.appendChild(newImg);

  let calcNewImg;
  if (changeDir === 1) {
    calcNewImg = getLatestOpenedImg + 1;
    if (calcNewImg > galleryImages.length) {
      calcNewImg = 1;
    }
  }
  else if (changeDir === 0) {
    calcNewImg = getLatestOpenedImg - 1;
    if (calcNewImg < 1) {
      calcNewImg = galleryImages.length;
    }
  }
  newImg.setAttribute("src", "img/gallery/0" + calcNewImg + ".jpg");
  newImg.setAttribute("id", "current-img");

  getLatestOpenedImg = calcNewImg;

  newImg.onload = function () {
    let imgWidth = this.width;
    let calcImgToEdge = ((windowWidth - imgWidth) / 2) - 180;

    let nextBtn = document.querySelector(".img-btn-next");
    nextBtn.style.cssText = "right: " + calcImgToEdge + "px;";

    let prevtBtn = document.querySelector(".img-btn-prev");
    prevtBtn.style.cssText = "left: " + calcImgToEdge + "px;";
  }
}
//TABS FOR GALLERY
let tab = function () {
  let tabNav = document.querySelectorAll('.gallery-tabs__item'),
    tabContent = document.querySelectorAll('.gallery-block'),
    tabName;


  tabNav.forEach(item => {
    item.addEventListener('click', selectTabNav)
    function selectTabNav() {
      tabNav.forEach(item => {
        item.classList.remove('tab-active');
      });
      this.classList.add('tab-active');
      tabName = this.getAttribute('data-tab-name');
      selectTabContent(tabName);
    }
    function changeName() {

    }
    function selectTabContent(tabName) {
      tabContent.forEach(item => {
        item.classList.contains(tabName) ?
          item.classList.add('tab-active') :
          item.classList.remove('tab-active');
      })
    }
  })
};
tab();
