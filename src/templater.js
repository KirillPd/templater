;(function ($) {
  function toReplace(element, p1) {
    return p1 === 'html' ? element.innerHTML : element.getAttribute(p1);
  }

  function render(template, element) {
    return template.replace(/{{(.*?)}}/g, (match, p1) => {
      return toReplace(element, p1);
    });
  }

  function run($elements, tag, template) {
    $elements.each(function (index, el) {
      el.outerHTML = render(template, el);
    });
  }

  function findTags($el, tags) {
    Object.keys(tags).map(function (key) {
      if (tags.hasOwnProperty(key)) {
        let $elements = $el.find(key);
        if ($elements.length) {
          run($elements, key, tags[key]);
        }
      }
    });
  }

  $.fn.templater = function (options) {
    return this.each(function (index, el) {
      let $el = $(el);

      if (typeof options === 'undefined' || typeof options.tags === 'undefined') {
        return;
      }

      findTags($el, options.tags);
    });
  }
})(jQuery);