function movePage(pageId) {
  // Ẩn trang hiện tại
  var currentPage = document.querySelector(".active-page");
  currentPage.classList.remove("active-page");
  currentPage.style.display = "none";

  // Hiển thị trang mới
  var newPage = document.getElementById(pageId);
  newPage.classList.add("active-page");
  newPage.style.display = "block";
}

function fadeoutPage1() {
  var page1 = document.getElementById("loading__front");
  page1.classList.add("fade-out");
}

const myDiv = document.querySelector("#page1");
const loading__front = document.getElementById("loading__front");
if (myDiv.style.display === "none") {
  loading__front.classList.remove("fade-out");
} else {
  loading__front.classList.add("fade-out");
}

function toPage2() {
  fadeoutPage1();
  setTimeout(function () {
    movePage("page2");
  }, 1500);
}

function whenRefresh() {
  movePage("page1");
  toPage2();
}
window.onload = whenRefresh();

// create picture

const data = [
  {
    image: "./assets/pic1.png",
    title: "Website",
    description:
      "A full picture of Services and Tools we bring to the table, How we help each industry and our Price package",
  },
  {
    image: "./assets/pic2.png",
    title: "Profile",
    description:
      "A brief walk through of what we offer and how we help your businesses",
  },
  {
    image: "./assets/pic3.png",
    title: "Case Studies",
    description:
      "A closer look at what projects and complex requirements TagOn have taken",
  },
];
function createCard(imageUrl, title, description) {
  const card = document.createElement("div");
  card.classList.add("card");

  const image = document.createElement("img");
  image.classList.add("card-image");
  image.src = imageUrl;
  card.appendChild(image);

  const info = document.createElement("div");
  info.classList.add("card-info");

  const titleElement = document.createElement("h1");
  titleElement.classList.add("card-title");
  titleElement.innerText = title;
  info.appendChild(titleElement);

  const desc = document.createElement("p");
  desc.classList.add("card-desc");
  desc.innerText = description;
  info.appendChild(desc);

  card.appendChild(info);

  return card;
}

const container = document.querySelector(".cards");

data.forEach((item) => {
  const card = createCard(item.image, item.title, item.description);
  container.appendChild(card);
});

// form submit
const form = document.querySelector("form");
const emailInput = form.querySelector("#email");
const phoneInput = form.querySelector("#phone");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const emailValue = emailInput.value;
  const phoneValue = phoneInput.value;

  if (!isValidEmail(emailValue) || !isValidPhone(phoneValue)) {
    alert("Invalid email address or phone number");
  } else {
    movePage("page3");
    checkSrceenSize();
  }
});

function isValidEmail(email) {
  // sử dụng regular expression để kiểm tra định dạng email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function isValidPhone(phone) {
  // sử dụng regular expression để kiểm tra định dạng số điện thoại
  const phonePattern = /^\d{10}$/;
  return phonePattern.test(phone);
}

// change srcoll
const scrollDiv = document.querySelector(".scroll.rotate");
const AboutUsLink = document.getElementById("AboutUsLink");
const ContactLink = document.getElementById("ContactLink");
const ContactElement = document.getElementById("Contact");
const scrollPosition = 300;

window.addEventListener("scroll", () => {
  var screenWidth = window.innerWidth;

  if (document.documentElement.scrollTop > scrollPosition) {
    scrollDiv.innerHTML = `
      <div class="line"></div> 
      <a href="#AboutUs">Scroll</a>
    `;
    AboutUsLink.classList.add("unselect");
    ContactLink.classList.remove("unselect");
    window.location.hash = "#Contact";
    clearInterval(intervalId);
  } else {
    scrollDiv.innerHTML = `
      <a href="#Contact">Scroll</a>
      <div class="line"></div>
    `;
    AboutUsLink.classList.remove("unselect");
    ContactLink.classList.add("unselect");
    if (screenWidth < 768) {
      intervalId = mobileShow("card", intervalId);
    }
  }
});

var prevScrollpos = window.pageYOffset;

window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    window.location.hash = "#AboutUs";
  } else {
    window.location.hash = "#Contact";
  }
  prevScrollpos = currentScrollPos;
};

//submitted
const data_mini = [
  {
    image: "./assets/pic1.png",
    title: "Website",
  },
  {
    image: "./assets/pic2.png",
    title: "Profile",
  },
  {
    image: "./assets/pic3.png",
    title: "Case Studies",
  },
];
function createCardMini(imageUrl, title) {
  const card = document.createElement("div");
  card.classList.add("card__mini");

  const image = document.createElement("img");
  image.classList.add("card__mini-image");
  image.src = imageUrl;
  card.appendChild(image);

  const titleElement = document.createElement("h1");
  titleElement.classList.add("card__mini-title");
  titleElement.innerText = title;
  card.appendChild(titleElement);

  return card;
}

const container_mini = document.querySelector(".cards__mini");

data.forEach((item) => {
  const card = createCardMini(item.image, item.title);
  container_mini.appendChild(card);
});

// responsive

// menu

const menuIcon = document.querySelector(".selectzone__menu");
const selectZone = document.querySelector(".selectzone");

menuIcon.addEventListener("click", () => {
  if (selectZone.style.display == "flex") {
    selectZone.style.display = "none";
  } else {
    selectZone.style.display = "flex";
  }
});

selectZone.addEventListener("click", () => {
  selectZone.style.display = "none";
});

// slide show

let intervalId; // Biến lưu trữ ID của setInterval

function mobileShow(typeOf, intervalId) {
  let slideIndex = 0;
  showSlides(slideIndex);

  function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName(typeOf);

    if (n > slides.length - 1) {
      slideIndex = 0;
    }

    console.log(slideIndex);

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
  }
  clearInterval(intervalId); // Dừng định kỳ cũ (nếu có)
  intervalId = setInterval(function () {
    showSlides((slideIndex += 1));
  }, 3000);
  return intervalId;
}

//switch slideshow
function checkPosition() {
  const page3 = document.querySelector("#page3");

  if (page3.style.display === "block") {
    intervalId = mobileShow("card__mini");
  } else {
    intervalId = mobileShow("card");
  }
}

//resize
function checkSrceenSize() {
  var screenWidth = window.innerWidth;
  const loading__back = document.getElementById("loading__back");

  if (screenWidth < 768) {
    checkPosition();
    loading__back.innerHTML = `
            <img src="./assets/clone-page2-mobile.png" alt="" />

    `;
  } else {
    loading__back.innerHTML = `
            <img src="./assets/clone-page2.png" alt="" />
`;
  }
}

checkSrceenSize();

//
console.log(intervalId);
