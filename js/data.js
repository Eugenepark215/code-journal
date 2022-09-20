/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousDataJSON = localStorage.getItem('code-journal-local-storage');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', function (event) {
  var stringifyDataEntries = JSON.stringify(data);
  localStorage.setItem('code-journal-local-storage', stringifyDataEntries);
  // localStorage.clear();
});
