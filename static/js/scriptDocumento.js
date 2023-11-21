const fileInput = document.getElementById("file-input");
const fileViewer = document.getElementById("document-viewer");
const fileNameDisplay = document.getElementById("file-name");
const documentList = document.getElementById("document-list");

fileInput.addEventListener("change", () => {
    const files = fileInput.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file) {
            const fileName = file.name;
            const listItem = document.createElement("li");
            listItem.textContent = fileName;

            // Agregar un botón para eliminar el documento
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            deleteButton.addEventListener("click", () => {
                listItem.remove();
            });

            listItem.appendChild(deleteButton);
            documentList.appendChild(listItem);
        }
    }

    fileInput.value = null; // Restablecer el valor del campo de entrada para que puedas seleccionar más documentos.
});