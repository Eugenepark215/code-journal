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
var h1 = document.querySelector('h1');
var textArea = document.querySelector('textarea');
var image = document.querySelector('img');

entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  data.view = 'entries';
  var codeJournalObject = {};
  if (data.editing === null) {
    codeJournalObject.title = title.value;
    codeJournalObject.image = imageURL.value;
    codeJournalObject.textArea = textArea.value;
    placeHolder.setAttribute('src', 'images/placeholder-image-square.jpg');
    codeJournalObject.entryId = data.nextEntryId++;
    data.entries.unshift(codeJournalObject);
    ul.prepend(domTreeReturn(codeJournalObject));
    placeholder.setAttribute('class', 'hidden');
    entryForm.setAttribute('class', 'view hidden');
    entries.setAttribute('class', 'view active');
    form.reset();
  } else if (data.editing !== null) {
    data.editing.title = title.value;
    data.editing.image = imageURL.value;
    data.editing.textArea = textArea.value;
    imageURL.value = data.editing.image;
    placeholder.setAttribute('class', 'hidden');
    entryForm.setAttribute('class', 'view hidden');
    entries.setAttribute('class', 'view active');
    ul.prepend(domTreeReturn(data.editing));
    form.reset();
  }
});

function domTreeReturn(entry) {
  var container = document.createElement('div');
  container.setAttribute('class', 'container');
  container.setAttribute('data-entry-id', data.entries.length);

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
  editPen.setAttribute('data-view', 'entry-form');
  editPen.setAttribute('href', '#entry-form');
  row2.appendChild(editPen);

  var p1 = document.createElement('p');
  p1.textContent = entry.textArea;
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
      h1.textContent = 'New Entry';
      title.value = '';
      textArea.value = '';
      imageURL.value = '';
      image.src = 'images/placeholder-image-square.jpg';

    } else {
      view[k].className = 'view hidden';
    }
  }
});
var deleteButton = document.querySelector('.delete view hidden');

ul.addEventListener('click', function (event) {
  var eventTarget3 = event.target.getAttribute('data-view');
  var dataEntryId = (parseInt(event.target.closest('.container').getAttribute('data-entry-id')));
  if (event.target.tagName === 'I') {
    data.view = 'entry-form';
    for (var p = 0; p < data.entries.length; p++) {
      if (data.entries[p].entryId === dataEntryId) {
        data.editing = data.entries[p];
        title.value = data.editing.title;
        textArea.value = data.editing.textArea;
        imageURL.value = data.editing.image;
        image.src = data.editing.image;
        event.target.closest('.container').remove();
      }
    }
    for (var o = 0; o < view.length; o++) {
      if (eventTarget3 === view[o].getAttribute('data-view')) {
        view[o].className = 'view active';
        h1.textContent = 'Edit Entry';
        deleteButton.setAttribute('class', 'view active');
      } else {
        view[o].className = 'view hidden';
      }
    }
  }
});

deleteButton.addEventListener('click', function () {
  data.view = 'entry-form';
  deleteButton.setAttribute('class', 'delete view active');
});
