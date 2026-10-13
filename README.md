# QuickNotes

QuickNotes is a small browser-based notes app built with plain HTML, CSS and JavaScript. You can write short notes, give each one a category, search through them and delete the ones you no longer need. Notes are saved in the browser, so they are still there after a page refresh.

## Features

- Add notes with a category (Personal, Work, Study)
- Delete notes
- Live search through your notes (not case-sensitive)
- Validation: empty notes and notes over 200 characters are rejected with an error message
- Note counter that handles zero, one and many notes
- Colour-coded category cards
- Notes saved with localStorage
- Responsive layout for small screens

## How to run locally

1. Clone the repository: `git clone https://github.com/YOUR-USERNAME/quicknotes-app.git`
2. Open the `quicknotes-app` folder.
3. Double-click `index.html` to open it in your browser (or use the Live Server extension in VS Code).

No installation or build step is needed.

## What I learned

- How to build a page with semantic HTML and link every form label to its input.
- How to rebuild the page from an array of objects with `createElement` and `textContent`, which avoids `innerHTML` for user text.
- How to save and load data with `localStorage`, using `JSON.stringify` and `JSON.parse`.
- How to make a layout respond to small screens with Flexbox and a media query.
- How to write small, clear Git commits as each feature is finished.