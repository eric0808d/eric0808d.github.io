'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// project modal variables
const projectCards = document.querySelectorAll("[data-project-open]");
const projectModalContainer = document.querySelector("[data-project-modal-container]");
const projectModalCloseBtn = document.querySelector("[data-project-modal-close-btn]");
const projectOverlay = document.querySelector("[data-project-overlay]");
const projectModalTitle = document.querySelector("[data-project-modal-title]");
const projectModalDescription = document.querySelector("[data-project-modal-description]");
const projectModalSummary = document.querySelector("[data-project-modal-summary]");
const projectModalWork = document.querySelector("[data-project-modal-work]");
const projectFeaturedImage = document.querySelector("[data-project-featured-image]");
const projectFeaturedTrigger = document.querySelector("[data-project-featured-trigger]");
const projectModalThumbs = document.querySelector("[data-project-modal-thumbs]");
const imageViewerContainer = document.querySelector("[data-image-viewer-container]");
const imageViewerOverlay = document.querySelector("[data-image-viewer-overlay]");
const imageViewerCloseBtn = document.querySelector("[data-image-viewer-close-btn]");
const imageViewerImg = document.querySelector("[data-image-viewer-img]");
const projectDefaultImage = "./assets/images/project-1.jpg";

const projectModalToggle = function () {
  projectModalContainer.classList.toggle("active");
  projectOverlay.classList.toggle("active");
}

const imageViewerToggle = function () {
  imageViewerContainer.classList.toggle("active");
  imageViewerOverlay.classList.toggle("active");
}

const renderProjectGallery = function (images, title) {
  projectModalThumbs.innerHTML = "";

  if (!images.length) {
    projectFeaturedImage.src = projectDefaultImage;
    projectFeaturedImage.alt = `${title} - imagen principal`;
    return;
  }

  projectFeaturedImage.src = images[0];
  projectFeaturedImage.alt = `${title} - imagen principal`;

  images.forEach((src, index) => {
    const thumbBtn = document.createElement("button");
    thumbBtn.type = "button";
    thumbBtn.className = "project-thumb-btn";
    thumbBtn.setAttribute("aria-label", `Ver imagen ${index + 1} de ${title}`);

    if (index === 0) {
      thumbBtn.classList.add("active");
    }

    thumbBtn.innerHTML = `<img src="${src}" alt="${title} - miniatura ${index + 1}" loading="lazy">`;

    thumbBtn.addEventListener("click", function () {
      projectFeaturedImage.src = src;
      projectFeaturedImage.alt = `${title} - imagen ${index + 1}`;

      projectModalThumbs.querySelectorAll(".project-thumb-btn").forEach((button) => {
        button.classList.remove("active");
      });

      this.classList.add("active");
    });

    projectModalThumbs.append(thumbBtn);
  });
}

projectCards.forEach((card) => {
  card.addEventListener("click", function () {
    const title = this.dataset.projectTitle;
    const gallery = (this.dataset.projectGallery || "").split(",").map((img) => img.trim()).filter(Boolean);

    projectModalTitle.textContent = title;
    projectModalDescription.textContent = this.dataset.projectDescription || "Haz clic en una miniatura para ver la imagen completa.";
    projectModalSummary.textContent = this.dataset.projectSummary;
    projectModalWork.textContent = this.dataset.projectWork;

    renderProjectGallery(gallery, title);

    projectModalToggle();
  });
});

projectFeaturedTrigger.addEventListener("click", function () {
  imageViewerImg.src = projectFeaturedImage.src;
  imageViewerImg.alt = projectFeaturedImage.alt;
  imageViewerToggle();
});

projectModalCloseBtn.addEventListener("click", projectModalToggle);
projectOverlay.addEventListener("click", projectModalToggle);
imageViewerCloseBtn.addEventListener("click", imageViewerToggle);
imageViewerOverlay.addEventListener("click", imageViewerToggle);



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach(link => {
  link.addEventListener("click", () => {

    const targetPage = link.dataset.target;

    pages.forEach(page => {
      page.classList.toggle(
        "active",
        page.dataset.page === targetPage
      );
    });

    navigationLinks.forEach(nav => {
      nav.classList.toggle(
        "active",
        nav === link
      );
    });

    window.scrollTo(0, 0);
  });
});
