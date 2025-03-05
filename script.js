document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Configuration: Adjust these variables as needed.
  const galleryContainer = document.getElementById('gallery');
  const imageFolder = 'images/'; // Folder where your cat images are stored
  const totalImages = 30; // Default number of images in the gallery

  /**
   * Dynamically loads gallery items into the #gallery container.
   *
   * @param {number} numImages - The number of images to load.
   */
  const loadGallery = (numImages = totalImages) => {
    for (let i = 1; i <= numImages; i++) {
      const imagePath = `${imageFolder}cat${i}.jpg`;

      // Create the gallery item container
      const galleryItem = document.createElement('div');
      galleryItem.classList.add('gallery-item');

      // Create the image element
      const imgElement = document.createElement('img');
      imgElement.src = imagePath;
      imgElement.alt = `Cat ${i}`;
      imgElement.loading = 'lazy'; // Use lazy loading for performance

      // Append image to gallery item
      galleryItem.appendChild(imgElement);

      // Attach click event for opening the lightbox modal
      galleryItem.addEventListener('click', () => openModal(imagePath));

      // Append the gallery item to the main gallery container
      galleryContainer.appendChild(galleryItem);
    }
  };

  // ------------------------------------------------------------------------
  // Lightbox Modal Setup
  // ------------------------------------------------------------------------
  // Create modal elements dynamically
  const modal = document.createElement('div');
  modal.classList.add('modal');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  // Create the close button for the modal
  const modalClose = document.createElement('span');
  modalClose.classList.add('modal-close');
  modalClose.innerHTML = '&times;'; // Multiplication sign (×)

  // Create an image element to display the clicked image in the modal
  const modalImage = document.createElement('img');
  modalImage.alt = 'Expanded view of selected cat image';

  // Assemble modal elements
  modalContent.appendChild(modalClose);
  modalContent.appendChild(modalImage);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  /**
   * Opens the modal with the specified image source.
   *
   * @param {string} imageSrc - The source path of the image to display.
   */
  const openModal = (imageSrc) => {
    modalImage.src = imageSrc;
    modal.style.display = 'flex'; // Display modal using flex (as defined in CSS)
  };

  /**
   * Closes the modal.
   */
  const closeModal = () => {
    modal.style.display = 'none';
  };

  // Event listener for close button
  modalClose.addEventListener('click', closeModal);

  // Close modal when clicking outside the modal content
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Close modal on pressing the Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display === 'flex') {
      closeModal();
    }
  });

  // Initialize the gallery on page load
  loadGallery();
});
