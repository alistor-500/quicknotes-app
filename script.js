const form = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const categorySelect = document.querySelector('#note-category');
const searchInput = document.querySelector('#search-input');
const notesList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');
const errorMessage = document.querySelector('#error-message');

let notes = [];

const MAX_LENGTH = 200;

function validate(text) {
  if (text === '') {
    return 'Please type a note first.';
  }
  if (text.length > MAX_LENGTH) {
    return 'Notes must be 200 characters or fewer.';
  }
  return '';
}

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

function deleteNote(id) {
  notes = notes.filter(function (note) {
    return note.id !== id;
  });
  render();
}

function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = 'You have no notes yet.';
  } else if (notes.length === 1) {
    noteCount.textContent = 'You have 1 note.';
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
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
    deleteBtn.addEventListener('click', function () {
      deleteNote(note.id);
    });

    li.append(label, text, time, deleteBtn);
    notesList.appendChild(li);
  });

  updateCount();
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const text = noteInput.value.trim();
  const error = validate(text);

  if (error) {
    errorMessage.textContent = error;
    return;
  }

  errorMessage.textContent = '';
  addNote(text, categorySelect.value);
  noteInput.value = '';
  noteInput.focus();
});

render();