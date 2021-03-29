const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
loadingCircle = document.querySelector(".loading"),
resultsDiv = document.querySelector(".results"),
input = dropArea.querySelector("input"),
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
    alertify.alert('This is not an Image File!', function(){ alertify.success('Ok'); });
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}