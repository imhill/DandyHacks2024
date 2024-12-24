const deleteConfirmationModal = document.getElementById("deleteConfirmationModal");

export function ShowDeleteConfirmationModal(username){
    deleteConfirmationModal.style.display = "block";
    /*alert(`Are you sure you want to remove ${username} as a friend?`);*/
}