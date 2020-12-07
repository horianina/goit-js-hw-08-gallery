import { default as galleryItems } from './gallery-items.js';

console.dir(galleryItems);
const gallery = document.querySelector('.js-gallery');
const openModal = document.querySelector('.lightbox')
const closeModal = document.querySelector('button[data-action="close-lightbox"]')
const overlay = document.querySelector('.js-lightbox')
const modalImage = document.querySelector('.lightbox__image');
const lightboxButton = document.querySelector('.lightbox__button');

function galleryMarkup() {
  let markup = '';
  galleryItems.forEach(
    item =>
      (markup += `
<li class="gallery__item">
  <a class="gallery__link"
    href="${item.original}"
  >
    <img
      class="gallery__image"
      src="${item.preview}"
      data-source="${item.original}"
      alt="${item.description}"
    />
  </a>
</li>`),
  );
  gallery.innerHTML = markup;
  return markup;
}
galleryMarkup();

openModal.addEventListener('click', onOpenModal)

closeModal.addEventListener('click', onCloseModal)
// overlay.addEventListener('click', onOverlay)


function onOpenModal(event){
  event.preventDefault();
  if (event.target.nodeName === 'IMG') {
    overlay.classList.add('is-open');
    modalImage.src = event.target.dataset.source;
  }
}
gallery.addEventListener('click', onOpenModal);
function onCloseModal(event){
  if (event.target === lightboxButton || event.code === 'Escape') {
    modalImage.src = '';
    overlay.classList.remove('is-open');
    gallery.removeEventListener('click', onCloseModal);
  }
  // document.body.classList.remove("close-lightbox")
}

document.addEventListener('keydown', onCloseModal);
lightboxButton.addEventListener('click', onCloseModal);
