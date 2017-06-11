;(function ($) {
  function toReplace(element, p1) {
    return p1 === 'html' ? element.innerHTML : element.getAttribute(p1);
  }

  function render(template, element) {
    return template.replace(/{{(.*?)}}/g, (match, p1) => {
      return toReplace(element, p1);
    });
  }

  function run($el, tag, template) {
    let $elements = $el.find(tag),
      el;

    if (!$elements.length) {
      return;
    }

    el = $elements[0];
    el.outerHTML = render(template, el);
    run($el, tag, template);
  }

  function findTags($el, tags) {
    Object.keys(tags).map(function (key) {
      if (tags.hasOwnProperty(key)) {
        run($el, key, tags[key]);
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

$('.super-block').templater({
  tags: {
    'super-child-strong': '<strong>{{html}}</strong>'
  }
});

$(document).templater({
  tags: {
    'panel': '<div class="panel"><div class="panel-heading">{{heading}}</div><div class="panel-body">{{html}}</div></div>',
    'bootstrap_button': '<button class="{{class}}" type="{{type}}" aria-label="{{aria-label}}">{{html}}</button>',
    'bootstrap_link': '<a class="btn btn--default" href="#" role="button">Some Another Text</a>',
    'super-child-strong': '<i>{{html}}</i>'
  }
});