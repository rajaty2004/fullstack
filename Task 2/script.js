const addButton = document.getElementById('addButton');
const notesContainer = document.getElementById('notesContainer');

addButton.addEventListener('click', () => {
    const note = document.createElement('div');
    note.className = 'note';
    note.contentEditable = 'true';
    note.textContent = 'New note...';
    notesContainer.appendChild(note);
    note.focus();
});
