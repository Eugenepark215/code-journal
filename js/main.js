/* global data */

var imageURL = document.querySelector('#PhotoURL');
var placeHolder = document.querySelector('#PlaceHolderURL');
imageURL.addEventListener('input', function (event) {
  placeHolder.setAttribute('src', event.target.value);
});

var placeholder = document.querySelector('li');

var entries = document.querySelector('#entries');
var form = document.querySelector('form');
var entryForm = document.querySelector('#entry-form');
var title = document.querySelector('#Title');
var notes = document.querySelector('#Notes');
entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  data.view = 'entries';
  var codeJournalObject = {};
  codeJournalObject.title = title.value;
  codeJournalObject.image = imageURL.value;
  codeJournalObject.notes = notes.value;
  placeHolder.setAttribute('src', 'images/placeholder-image-square.jpg');
  codeJournalObject.entryId = data.nextEntryId++;
  data.entries.unshift(codeJournalObject);
  ul.prepend(domTreeReturn(codeJournalObject));
  placeholder.setAttribute('class', 'hidden');
  entryForm.setAttribute('class', 'view hidden');
  entries.setAttribute('class', 'view active');
  form.reset();
});

function domTreeReturn(entry) {
  var container = document.createElement('div');
  container.setAttribute('class', 'container');

  var row = document.createElement('div');
  row.setAttribute('class', 'row');
  container.appendChild(row);

  var columnHalf1 = document.createElement('div');
  columnHalf1.setAttribute('class', 'column-half');
  row.appendChild(columnHalf1);

  var img = document.createElement('img');
  img.setAttribute('src', entry.image);
  columnHalf1.appendChild(img);

  var columnHalf2 = document.createElement('div');
  columnHalf2.setAttribute('class', 'column-half');
  row.appendChild(columnHalf2);

  var row2 = document.createElement('div');
  row2.setAttribute('class', 'row space-between');
  columnHalf2.appendChild(row2);

  var h3 = document.createElement('h3');
  h3.textContent = entry.title;
  row2.appendChild(h3);

  var editPen = document.createElement('i');
  editPen.setAttribute('class', 'fa-solid fa-pen pen');
  editPen.setAttribute('data-view', 'edit-entry');
  editPen.setAttribute('href', '#edit-entry');
  row2.appendChild(editPen);

  var p1 = document.createElement('p');
  p1.textContent = entry.notes;
  columnHalf2.appendChild(p1);

  return container;
}

var ul = document.querySelector('.list');
window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    var domTrees = domTreeReturn(data.entries[i]);
    ul.appendChild(domTrees);
    domTrees.setAttribute('data-entry-id', data.entries[i].entryId);
    placeholder.setAttribute('class', 'hidden');
  }
  for (var m = 0; m < view.length; m++) {
    if (data.view === view[m].getAttribute('data-view')) {
      view[m].className = 'view active';
    } else {
      view[m].className = 'view hidden';
    }
  }
});

var view = document.querySelectorAll('.view');
var aEntries = document.querySelector('.aentries');
aEntries.addEventListener('click', function (event) {
  data.view = 'entries';
  var eventTarget = event.target.getAttribute('data-view');
  for (var j = 0; j < view.length; j++) {
    if (eventTarget === view[j].getAttribute('data-view')) {
      view[j].className = 'view active';
    } else {
      view[j].className = 'view hidden';
    }
  }
});

var aNew = document.querySelector('.anew');
aNew.addEventListener('click', function (event) {
  data.view = 'entry-form';
  var eventTarget2 = event.target.getAttribute('data-view');
  for (var k = 0; k < view.length; k++) {
    if (eventTarget2 === view[k].getAttribute('data-view')) {
      view[k].className = 'view active';
    } else {
      view[k].className = 'view hidden';
    }
  }
});

ul.addEventListener('click', function (event) {
  if (event.target.tagName === 'I') {
    return true;
  }
});
