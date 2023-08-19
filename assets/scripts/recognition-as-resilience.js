
var _player;

function viewImage(e) {
  var element = e.currentTarget;
  var href = element.getAttribute("href");
  if (href) {
    e.preventDefault();
    e.stopPropagation();
    showImageModal(element);
  }
};

function viewVideo(e) {
  var element = e.currentTarget;
  var href = element.getAttribute("href");
  if (href) {
    e.preventDefault();
    e.stopPropagation();
    showVideoModal(element);
  }
};

function showImageModal(element) {
  var img = element.querySelector('.image-container');
  var modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = img.innerHTML;

  showModal();
};

function closeModal() {
  var modal = document.getElementById('modal');

  document.querySelector('body').classList.remove('modal-visible');
  modal.style.display = "none";

  if (_player) {
    _player.dispose();
  }
};

function showVideoModal(element) {
  var videoElement = element.querySelector('video');
  var modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = videoElement.outerHTML;

  showModal();

  _player = videojs(
    modalContent.querySelector('video'),
    {
      controls: true,
      autoplay: true,
      fluid: true
    });
}

function showModal() {
  var modal = document.getElementById('modal');

  document.querySelector('body').classList.add('modal-visible');
  modal.style.display = "block";
}
