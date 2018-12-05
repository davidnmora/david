document.addEventListener('DOMContentLoaded', function () {

  //
  // Initialize stuff
  //

  var grid = null;
  var docElem = document.documentElement;
  var demo = document.querySelector('.grid-demo');
  var gridElement = demo.querySelector('.grid');
  var filterField = demo.querySelector('.filter-field');
  var searchField = demo.querySelector('.search-field');
  var characters = 'abcdefghijklmnopqrstuvwxyz';
  var filterOptions = ['red', 'blue', 'green'];
  var uuid = 0;
  var filterFieldValue;
  var searchFieldValue;

  //
  // Grid helper functions
  //

  function initDemo() {

    initGrid();

    // Reset field values.
    searchField.value = '';
    [filterField].forEach(function (field) {
      field.value = field.querySelectorAll('option')[0].value;
    });

    // Set inital search query, active filter, active sort value and active layout.
    searchFieldValue = searchField.value.toLowerCase();
    filterFieldValue = filterField.value;

    // Search field binding.
    searchField.addEventListener('keyup', function () {
      var newSearch = searchField.value.toLowerCase();
      if (searchFieldValue !== newSearch) {
        searchFieldValue = newSearch;
        filter();
      }
    });

    // Filter, sort and layout bindings.
    filterField.addEventListener('change', filter);

    // Add/remove items bindings.
    gridElement.addEventListener('click', function (e) {
      console.log('clicked!')
      // if (elementMatches(e.target, '.card-remove, .card-remove i')) {
      //   removeItem(e);
      // }
    });

  }

  function initGrid() {



    grid = new Muuri(gridElement, {
      layoutDuration: 400,
      layoutEasing: 'ease',
    })
    .on('move', updateIndices);
  }

  function filter() {

    filterFieldValue = filterField.value;
    grid.filter(function (item) {
      var element = item.getElement();
			var searchText = element.querySelector('.card-title').innerText + element.querySelector('.card-info > p').innerText
      var isSearchMatch = !searchFieldValue ? true : (searchText || '').toLowerCase().indexOf(searchFieldValue) > -1;
      var isFilterMatch = !filterFieldValue ? true : (element.getAttribute('data-color') || '') === filterFieldValue;
      return isSearchMatch && isFilterMatch;
    });

  }

  //
  // Generic helper functions
  //

  function compareItemTitle(a, b) {

    var aVal = a.getElement().getAttribute('data-title') || '';
    var bVal = b.getElement().getAttribute('data-title') || '';
    return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;

  }

  function compareItemColor(a, b) {

    var aVal = a.getElement().getAttribute('data-color') || '';
    var bVal = b.getElement().getAttribute('data-color') || '';
    return aVal < bVal ? -1 : aVal > bVal ? 1 : compareItemTitle(a, b);

  }

  function updateIndices() {

    grid.getItems().forEach(function (item, i) {
      item.getElement().setAttribute('data-id', i + 1);
      item.getElement().querySelector('.card-id').innerHTML = i + 1;
    });

  }

  function elementMatches(element, selector) {

    var p = Element.prototype;
    return (p.matches || p.matchesSelector || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector).call(element, selector);

  }

  //
  // Fire it up!
  //

  // initDemo();

});