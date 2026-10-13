const form = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const categorySelect = document.querySelector('#note-category');
const searchInput = document.querySelector('#search-input');
const notesList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');
const errorMessage = document.querySelector('#error-message');

let notes = [];

function addNote(text, category) {
  const note = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString()
  };
  notes.push(note);
  render();
}

function render() {
  notesList.textContent = '';

  notes.forEach(function (note) {
    const li = document.createElement('li');
    li.classList.add('note', `category-${note.category}`);

    const label = document.createElement('span');
    label.classList.add('badge');
    label.textContent = note.category;

    const text = document.createElement('p');
    text.textContent = note.text;

    const time = document.createElement('small');
    time.textContent = note.createdAt;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.type = 'button';
    deleteBtn.textContent = 'Delete';

    li.append(label, text, time, deleteBtn);
    notesList.appendChild(li);
  });
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const text = noteInput.value.trim();
  addNote(text, categorySelect.value);
  noteInput.value = '';
  noteInput.focus();
});

render();