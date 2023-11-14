document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById("file-input");
    const documentList = document.getElementById("document-list");
  
    fileInput.addEventListener("change", handleFileChange);
  
    function handleFileChange() {
      const files = fileInput.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file) {
          displayFileInfo(file);
        }
      }
  
      fileInput.value = null; // Restablecer el valor del campo de entrada para que puedas seleccionar más documentos.
    }
  
    function displayFileInfo(file) {
      const fileName = file.name;
      const listItem = document.createElement("li");
      listItem.textContent = fileName;
      documentList.appendChild(listItem);
  
      // Mostrar enlace para descargar el documento
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(file);
      downloadLink.target = "_blank";
      downloadLink.textContent = "Descargar";
      listItem.appendChild(downloadLink);
    }
  });
  