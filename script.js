const form = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const categorySelect = document.querySelector('#note-category');
const searchInput = document.querySelector('#search-input');
const notesList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');
const errorMessage = document.querySelector('#error-message');
const clearAllBtn = document.querySelector('#clear-all');

const STORAGE_KEY = 'quicknotes';
const MAX_LENGTH = 200;

function loadNotes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return [];
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

let notes = loadNotes();

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
  saveNotes();
  render();
}

function deleteNote(id) {
  notes = notes.filter(function (note) {
    return note.id !== id;
  });
  saveNotes();
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

  const words = searchInput.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const visibleNotes = notes.filter(function (note) {
    return words.every(function (word) {
      return note.text.toLowerCase().includes(word);
    });
  });

  if (notes.length > 0 && visibleNotes.length === 0) {
    const empty = document.createElement('li');
    empty.classList.add('no-results');
    empty.textContent = 'No notes match your search.';
    notesList.appendChild(empty);
  }

  visibleNotes.forEach(function (note) {
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
searchInput.addEventListener('input', render);

clearAllBtn.addEventListener('click', function () {
  if (notes.length === 0) {
    return;
  }
  if (confirm('Delete all notes?')) {
    notes = [];
    saveNotes();
    render();
  }
});

render();
searchInput.addEventListener('input', render);

render();