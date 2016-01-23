$(document).ready(function () {
  var listData = {
    photographers: {
      path: '/assets/photographers.json',
      data: null
    },
    poets: {
      path: '/assets/poets.json',
      data: null
    }
  };

  $('.pictures-list a').on('click', function (event) {
    event.preventDefault();

    var $this = $(this);
    var listType = $this.data('list-type');
    var listIndex = $this.data('list-index');

    var currentList = listData[listType];

    if (currentList.data === null) {
      getJson(currentList).complete(function () {
        showItem(currentList.data[listIndex]);
      });
    } else {
      showItem(currentList.data[listIndex]);
    }
  });

  function getJson(dataObj) {
    return $.getJSON(dataObj.path, function(returnedData) {
      dataObj.data = returnedData;
    });
  }

  function showItem(item) {

  }
});
