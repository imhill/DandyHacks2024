const deleteConfirmationModal = document.getElementById("deleteConfirmationModal");

export function ShowDeleteConfirmationModal(username){
    deleteConfirmationModal.children[0].children[0].textContent = username;
    deleteConfirmationModal.style.display = "block";
}

export function HideDeleteConfirmationModal(event){
    deleteConfirmationModal.style.display = "none";
}