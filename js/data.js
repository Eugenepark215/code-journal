/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};
var imageURL = document.querySelector('#PhotoURL');
var image = document.querySelector('img');
imageURL.addEventListener('input', function (event) {
  image.src = imageURL.value;
});

var form = document.querySelector('form');
var title = document.querySelector('#Title');
var notes = document.querySelector('#Notes');
form.addEventListener('submit', function (event) {
  event.preventDefault();
  var codeJournalObject = {};
  codeJournalObject[title] = title.value;
  codeJournalObject[image] = imageURL.value;
  codeJournalObject[notes] = notes.value;
  image.src = 'images/placeholder-image-square.jpg';
  codeJournalObject[data.nextEntryId] = data.nextEntryId++;
  data.entries.unshift(codeJournalObject);
  form.reset();

  var stringifyDataEntries = JSON.stringify(data.entries);
  localStorage.setItem('code-journal-local-storage', stringifyDataEntries);
});
