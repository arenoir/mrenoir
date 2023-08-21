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
  var videoElement = element.querySelector('video-js');
  var modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = videoElement.outerHTML;

  showModal();

  _player = videojs(
    modalContent.querySelector('video-js'),
    {
      controls: true,
      autoplay: true,
      fluid: true
    }
  );

  _player.addClass('video-js');
}

function showModal() {
  var modal = document.getElementById('modal');

  document.querySelector('body').classList.add('modal-visible');
  modal.style.display = "block";
}

function activateFootnotes() {
  var wrapper = document.querySelector('.wrapper');

  if (!wrapper) {
    return;
  }

  var anchors = wrapper.querySelectorAll('a');

  anchors.forEach(activateFootnoteLink);
}

function activateFootnoteLink(anchor) {
  if (!typeof anchor.name === 'string') {
    return;
  }

  if (!anchor.name.startsWith('_ftnref')) {
    return;
  }

  if (!typeof anchor.href == 'string') {
    return;
  }

  var name = anchor.href.split('#')[1];

  if (!typeof name == 'string') {
    return;
  }

  var content = document.getElementsByName(name);

  if (!content) {
    return;
  }

  var reference = content[0].closest('p');

  new Opentip(anchor, reference.innerHTML, { fixed: true });
}

activateFootnotes();