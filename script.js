document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Configuration
  const galleryContainer = document.getElementById('gallery');
  const imageFolder = 'images/';
  const totalImages = 30; // Update this if you add more images

  /**
   * Loads gallery images dynamically into the #gallery container.
   * @param {number} numImages - The number of images to load.
   */
  const loadGallery = (numImages = totalImages) => {
    for (let i = 1; i <= numImages; i++) {
      const imagePath = `${imageFolder}cat${i}.jpg`;
      const galleryItem = document.createElement('div');
      galleryItem.classList.add('gallery-item');

      const imgElement = document.createElement('img');
      imgElement.src = imagePath;
      imgElement.alt = `Cat ${i}`;
      imgElement.loading = 'lazy';

      galleryItem.appendChild(imgElement);

      // Open modal on click
      galleryItem.addEventListener('click', () => openModal(imagePath));
      galleryContainer.appendChild(galleryItem);
    }
  };

  // ------------------------------------------------------------------------
  // Modal Setup
  // ------------------------------------------------------------------------
  const modal = document.createElement('div');
  modal.classList.add('modal');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const modalClose = document.createElement('span');
  modalClose.classList.add('modal-close');
  modalClose.innerHTML = '&times;';

  // Image element for modal display
  const modalImage = document.createElement('img');
  modalImage.alt = 'Expanded view of selected cat image';
  // (CSS should enforce: max-width: 90%; max-height: 90%; object-fit: contain)

  // Create actions container for Download, Copy, and Share buttons
  const modalActions = document.createElement('div');
  modalActions.classList.add('modal-actions');

  // Download Button
  const downloadButton = document.createElement('button');
  downloadButton.classList.add('modal-action');
  downloadButton.textContent = 'Download Image';
  downloadButton.addEventListener('click', () => {
    const a = document.createElement('a');
    a.href = modalImage.src;
    // Extract filename from URL (e.g., "cat3.jpg")
    a.download = modalImage.src.substring(modalImage.src.lastIndexOf('/') + 1);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });

  // Copy Button
  const copyButton = document.createElement('button');
  copyButton.classList.add('modal-action');
  copyButton.textContent = 'Copy Image URL';
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(modalImage.src);
      alert('Image URL copied to clipboard!');
    } catch (err) {
      alert('Failed to copy image URL.');
    }
  });

  // Share Button
  const shareButton = document.createElement('button');
  shareButton.classList.add('modal-action');
  shareButton.textContent = 'Share Image';
  shareButton.addEventListener('click', async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this cat image!',
          text: 'I found this awesome cat image.',
          url: modalImage.src,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      alert('Share feature is not supported in your browser.');
    }
  });

  // Append action buttons to the modal actions container
  modalActions.appendChild(downloadButton);
  modalActions.appendChild(copyButton);
  modalActions.appendChild(shareButton);

  // Assemble modal elements
  modalContent.appendChild(modalClose);
  modalContent.appendChild(modalImage);
  modalContent.appendChild(modalActions);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  /**
   * Opens the modal with the provided image source.
   * @param {string} imageSrc - The source path of the image to display.
   */
  const openModal = (imageSrc) => {
    modalImage.src = imageSrc;
    modal.style.display = 'flex';
  };

  /**
   * Closes the modal.
   */
  const closeModal = () => {
    modal.style.display = 'none';
  };

  // Event listeners for closing modal
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display === 'flex') {
      closeModal();
    }
  });

  // Initialize the gallery on page load
  loadGallery();
});

