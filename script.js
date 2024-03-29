function downloadCV(fileName) {
    event.preventDefault();
    var fileUrl = fileName;
    var link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

//gallery item filter
const filterButtons = document.querySelector("#filter-btns").children;
const items = document.querySelector(".portfolio-gallery").children;
for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener("click", function () {
        for (let j = 0; j < filterButtons.length; j++) {
            filterButtons[j].classList.remove("active")
        }
        this.classList.add("active");
        const target = this.getAttribute("data-target");
        for (let k = 0; k < items.length; k++) {
            items[k].style.display = "none";
            if (target == items[k].getAttribute("data-id")) {
                items[k].style.display = "block";
            }
            if (target == "all") {
                items[k].style.display = "block";
            }
        }

    })
}
//lightbox
const closeLightbox = document.querySelector(".close-lightbox");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");

lightbox.addEventListener("click", function () {
    if (event.target != lightboxImage) {
        lightbox.classList.add("hide");
        lightbox.classList.remove("show");
    }

})
closeLightbox.addEventListener("click", function () {
    lightbox.classList.add("hide");
    lightbox.classList.remove("show");

})

const gallery = document.querySelector(".portfolio-gallery");
const galleryItem = gallery.querySelectorAll(".item");

galleryItem.forEach(function (element) {
    element.querySelector(".fa-plus").addEventListener("click", function () {
        lightbox.classList.remove("hide");
        lightbox.classList.add("show");
        lightboxImage.src = element.querySelector("img").getAttribute("src");

    })
});

const sliderContainer = document.querySelector(".testimonials-slider");
const slides = sliderContainer.children;
const containerWidth = sliderContainer.offsetWidth;
let itemPerSlide = 0;
const margin = 30;
let slideDot;

const responsive = [{
    breakPoint: {
        width: 0,
        item: 1
    }
},
{
    breakPoint: {
        width: 991,
        item: 2
    }
}
]

function load() {
    for (let i = 0; i < responsive.length; i++) {
        if (window.innerWidth > responsive[i].breakPoint.width) {
            itemPerSlide = responsive[i].breakPoint.item;
        }
    }
    start();
}

function start() {
    totalWidth = 0;
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.width = (containerWidth / itemPerSlide) - margin + "px";
        slides[i].style.margin = margin / 2 + "px";
        totalWidth += containerWidth * itemPerSlide;
    }
    sliderContainer.style.width = totalWidth + "px"
    slideDot = Math.ceil(slides.length / itemPerSlide);
    for (let i = 0; i < slideDot; i++) {
        const div = document.createElement("div");
        div.id = i;
        div.setAttribute("onclick", "controlSlide(this)")
        if (i == 0) {
            div.classList.add("active");
        }
        document.querySelector(".slide-controls").appendChild(div);
    }

}
let currentSlide = 0;
let autoSlide = 0

function controlSlide(element) {
    clearInterval(timer);
    timer = setInterval(autoPlay, 5000);
    autoSlide = element.id;
    currentSlide = element.id;
    changeSlide(currentSlide);
}

function changeSlide(currentSlide) {
    controlButtons = document.querySelector(".slide-controls").children;
    for (let i = 0; i < controlButtons.length; i++) {

        controlButtons[i].classList.remove("active");

    }
    controlButtons[currentSlide].classList.add("active");
    sliderContainer.style.marginLeft = -(containerWidth * currentSlide) + "px";
}

function autoPlay() {
    if (autoSlide == slideDot - 1) {
        autoSlide = 0;
    } else {
        autoSlide++;
    }
    changeSlide(autoSlide)
}
let timer = setInterval(autoPlay, 5000);
window.onload = load();

//header when scroll
window.onscroll = function () {
    const docScroll = document.documentElement.scrollTop;
    if (window.innerWidth > 991) {
        if (docScroll > 100) {
            document.querySelector("header").classList.add("fixed");
        } else {
            document.querySelector("header").classList.remove("fixed");
        }
    }
}
const navbar = document.querySelector(".navbar");
a = navbar.querySelectorAll("a");
a.forEach(function (element) {
    element.addEventListener("click", function () {
        for (let i = 0; i < a.length; i++) {
            a[i].classList.remove("active");
        }
        this.classList.add("active");
        document.querySelector(".navbar").classList.toggle("show");
    })
})

const hamBurger = document.querySelector(".ham-burger");
hamBurger.addEventListener("click", function () {
    document.querySelector(".navbar").classList.toggle("show");
})