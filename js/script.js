const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
loadingCircle = document.querySelector(".loading"),
resultsDiv = document.querySelector(".results"),
input = dropArea.querySelector("input");
let file;
button.onclick = () => input.click(); 

input.addEventListener("change", function() {
  file = this.files[0];
  console.log(file);
  dropArea.classList.add("active");
  loadingCircle.style.display = "block"
  loadingCircle.classList.add('scale')

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
  // loadingCircle.style.display = '';
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
      console.log(e.loaded);
      console.log(parseInt(((e.loaded / e.total) * 100), 10));
    }
    fileReader.onloadend = (e) => {
        console.log(e);
    }
    fileReader.readAsDataURL(file);

  } else {
    alert("This is not an Image File!");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}
// zmsugu
// function() {
//   var total = Files.length; loaded = 0;
//   for (var i in Files) {
//       var fileReader = new FileReader();
//       fileReader.readAsBinaryString(Files[i]);
//       fileReader.onload = function() {

//           // do something on FileReader onload
//           loaded++;

//           if (loaded == total){
//               onAllFilesLoaded();
//           }
//       }

//       fileReader.onprogress = function(data) {
//           if (data.lengthComputable) {                                            
//               var progress = parseInt( ((data.loaded / data.total) * 100), 10 );
//               console.log(progress);
//           }
//       }
//   }
// }