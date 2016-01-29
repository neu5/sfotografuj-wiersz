$().ready(() => {
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

    function putData(elem = {name: ''}, callback = open) {
      clear();
      let profession = elem['contest-photo'] ? 'Fotograf' : 'Pisarz';

      $modalContent.append(`
        <div class="modal-content__artist-wrapper">
          <img src="${elem.path}${elem.img}">
          <h1>${elem.name}</h1>
          <h2>${profession}</h2>
        </div>
        <div class="modal-content__contest-content-wrapper">
        </div>
      `);

      if (profession === 'Fotograf') {
        let contestPhoto = $('<img>', {
          src: `${elem.path}${elem['contest-photo']}`
        });
        $modalContent.children('.modal-content__contest-content-wrapper').append(contestPhoto);
        contestPhoto.load(callback);
      } else {
        $modalContent.children('.modal-content__contest-content-wrapper').append(elem['contest-poem']);
        callback();
      }
    }

    function clear() {
      $modalContent.html('');
    }

    function show(elem) {
      putData(elem, open);
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

  const PATH = '/assets/homepage.json';

  let listData = null;

  $('.pictures-list a').on('click', function(ev) {
    ev.preventDefault();

    let $this = $(this);
    let listType = $this.data('list-type');
    let listIndex = $this.data('list-index');

    getJson(listType).done(data => {
      modal.show(data[listType][listIndex]);
    });
  });

  function getJson() {
    let deferred = $.Deferred();

    if (listData === null) {
      return $.getJSON(PATH, data => listData = data);
    } else {
      deferred.resolve(listData);
    }

    return deferred.promise();
  }
});
