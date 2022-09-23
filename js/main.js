/* global data */
var imageURL = document.querySelector('#PhotoURL');
var placeHolder = document.querySelector('#PlaceHolderURL');
imageURL.addEventListener('input', function (event) {
  placeHolder.setAttribute('src', event.target.value);
});

var noEntries = document.querySelector('#no-entries');

var entries = document.querySelector('#entries');
var form = document.querySelector('form');
var entryForm = document.querySelector('#entry-form');
var title = document.querySelector('#Title');
var h1 = document.querySelector('h1');
var textArea = document.querySelector('textarea');
var image = document.querySelector('img');
//

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
    noEntries.setAttribute('class', 'hidden');
    entryForm.setAttribute('class', 'view hidden');
    entries.setAttribute('class', 'view active');
    form.reset();
  } else if (data.editing !== null) {
    data.editing.title = title.value;
    data.editing.image = imageURL.value;
    data.editing.textArea = textArea.value;
    imageURL.value = data.editing.image;
    noEntries.setAttribute('class', 'hidden');
    entryForm.setAttribute('class', 'view hidden');
    entries.setAttribute('class', 'view active');
    var li = document.querySelectorAll('li');
    for (var i = 0; i < li.length; i++) {
      if (parseInt(li[i].getAttribute('data-entry-id')) === data.editing.entryId) {
        li[i].replaceWith(domTreeReturn(data.editing));
        data.editing = null;
      }
    }
    form.reset();
  }
});

function domTreeReturn(entry) {
  var container = document.createElement('li');
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
    noEntries.setAttribute('class', 'hidden');
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

var deleteButton = document.querySelector('#delete');

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
      }
    }
    for (var o = 0; o < view.length; o++) {
      if (eventTarget3 === view[o].getAttribute('data-view')) {
        view[o].className = 'view active';
        h1.textContent = 'Edit Entry';
      } else {
        view[o].className = 'view hidden';
      }
    }
    deleteButton.setAttribute('class', 'view active');
  }
});
var modal = document.querySelector('#modal');
var cancelButton = document.querySelector('#cancel');
var confirmButton = document.querySelector('#confirm');

deleteButton.addEventListener('click', function (event) {
  modal.className = 'view active';
});

cancelButton.addEventListener('click', function (event) {
  modal.className = 'view hidden';
});

confirmButton.addEventListener('click', function (event) {
  entries.className = 'view active';
  modal.className = 'view hidden';
  entryForm.className = 'view hidden';
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === data.editing.entryId) {
      data.entries.splice(i, 1);
    }
  }
  var li = document.querySelectorAll('li');
  for (var s = 0; s < li.length; s++) {
    if (parseInt(li[s].getAttribute('data-entry-id')) === data.editing.entryId) {
      li[s].remove();
    }
  }
  if (data.entries.length === 0) {
    noEntries.setAttribute('class', 'view active');
  }
});
