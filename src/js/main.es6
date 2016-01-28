$(document).ready(function () {
  let modal = function Modal() {
    let $overlay = $('#overlay');
    let $modal = $('#modal');
    let $modalContent = $('#modal-content');
    let $closeBtn = $modal.children('.icon-cancel');

    function open() {
      $overlay[0].style.display = 'block';
    }

    function close() {
      $overlay[0].style.display = 'none';
    }

    function putData(elem = {name: '', path: '', img: ''}) {
      clear();
      let profession = elem.hasOwnProperty('contest-photo') ? 'Fotograf' : 'Pisarz';

      $modalContent.append(`
        <div class="modal-content__artist-wrapper">
          <img src="${elem.path}${elem.img}">
          <h1>${elem.name}</h1>
          <h2>${profession}</h2>
        </div>
        <div class="modal-content__contest-content-wrapper">
          <img  src="${elem.path}${elem['contest-photo']}">
        </div>
      `);
    }

    function clear() {
      $modalContent.html('');
    }

    function show(elem) {
      putData(elem);
      open();
    }

    return {
      show: show,
      close: close,
      $closeBtn: $closeBtn,
      $overlay: $overlay
    };
  }();

  modal.$closeBtn.on('click', modal.close);
  modal.$overlay.on('click', function(ev) {
    if (ev.target.id === 'overlay') {
      modal.close();
    }
  });

  let listData = {
    photographers: {
      path: '/assets/photographers.json',
      data: null
    },
    poets: {
      path: '/assets/poets.json',
      data: null
    }
  };

  $('.pictures-list a').on('click', function(ev) {
    ev.preventDefault();

    let $this = $(this);
    let listType = $this.data('list-type');
    let listIndex = $this.data('list-index');

    let currentList = listData[listType];

    if (currentList.data === null) {
      getJson(currentList).complete(() => {
        modal.show(currentList.data[listIndex]);
      });
    } else {
      modal.show(currentList.data[listIndex]);
    }
  });

  function getJson(dataObj) {
    return $.getJSON(dataObj.path, returnedData => dataObj.data = returnedData);
  }
});
