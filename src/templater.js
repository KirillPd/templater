let Templater = {
    run: function () {
        let elements = document.getElementsByTagName('bootstrap_button'),
            length = elements.length;

        if (!length) return;

        for(let i = 0; i < length; i++) {
          let el = elements[0],
              elInnerHtml = el.innerHTML,
              newElement = document.createElement('button');

          newElement.setAttribute('type', 'submit');
          newElement.className = 'btn btn-default';
          newElement.innerHTML = elInnerHtml.replace(/\s/g, '').length !== 0 ?elInnerHtml : 'Some Text';

          el.parentNode.replaceChild(newElement, el);
        }       
    }
};