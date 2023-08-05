
function viewImage(e) {
  var element = e.currentTarget;
  var href = element.getAttribute("href");
  if (href) {
    e.preventDefault();
    e.stopPropagation();
    showImageModal(href);
  }
}

function showImageModal(imagePath) {
  var modal = document.getElementById('modal');
  var modalImg = document.getElementById("modal-content")
  modal.style.display = "block";
  modalImg.src = imagePath;
};

function closeModal() {
  var modal = document.getElementById('modal');
  modal.style.display = "none";
}