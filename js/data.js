/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (event) {
  var stringifyDataEntries = JSON.stringify(data.entries);
  localStorage.setItem('code-journal-local-storage', stringifyDataEntries);
});
