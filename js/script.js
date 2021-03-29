const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
loadingCircle = document.querySelector(".loading"),
resultsDiv = document.querySelector(".results"),
input = dropArea.querySelector("input"),
modal = document.querySelector('card'),
footer = document.querySelector(".footer");
let file;
button.onclick = () => input.click(); 

input.addEventListener("change", function() {
  file = this.files[0];
  console.log(file);
  dropArea.classList.add("active");
  console.log('loading ON');
  showFile();

});


dropArea.addEventListener("dragover", (e) => {
  e.preventDefault(); 
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

//If the user drop File on DropArea
dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  file = e.dataTransfer.files[0];
  console.log(file)
  showFile();
});

const showFile = () => {
  loadingCircle.style.display = "block"
  loadingCircle.classList.add('scale')
  let fileType = file.type;
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; 
  if (validExtensions.includes(fileType)) {
    let fileReader = new FileReader(); 
    fileReader.onloadstart = ( e ) => {
      console.log(e);
    }
    fileReader.onload = ( e ) => {
      console.log(e.target);
      let fileURL = fileReader.result;
      let imgTag = `<img class="img-predict"src="${fileURL}" alt="">`;
      dropArea.innerHTML = imgTag; 
      fileReceived(file.name);
    }
    fileReader.onprogress = (e) => {
      console.log('the file is in progress');
    }
    fileReader.onloadend = (e) => {
        console.log('the file has been uploaded');
    }
    fileReader.readAsDataURL(file);

  } else {
    // active message if th file is not an image
    modal.classList.toggle('fadein')
    loadingCircle.style.display = 'none';
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}

// enter year at footer

footer.querySelector('.footer-year').textContent = `Copyright © ${new Date().getFullYear()} - `;

// modal

modal.querySelector('button').addEventListener('click', (e) => {
  e.preventDefault();
  modal.classList.toggle('fadein')
})

function changeOpacity() {
  document.body.style.setProperty('--opacity', opacity.value);
}
changeOpacity();