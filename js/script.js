const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input");
let file;

button.onclick = () => input.click(); 

input.addEventListener("change", function() {
  file = this.files[0];
  console.log(file);
  dropArea.classList.add("active");
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
  let fileType = file.type;
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; 
  if (validExtensions.includes(fileType)) {
    let fileReader = new FileReader(); 
    fileReader.onload = () => {
      let fileURL = fileReader.result;
      let imgTag = `<img class="img-predict"src="${fileURL}" alt="">`;
      dropArea.innerHTML = imgTag; 
      fileReceived(file.name);
    }
    fileReader.readAsDataURL(file);
  } else {
    alert("This is not an Image File!");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}
