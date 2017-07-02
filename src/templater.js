const templater = (function () {
  function toReplace(element, p1) {
    return p1 === 'html' ? element.innerHTML : element.getAttribute(p1);
  }

  function render(template, element) {
    return template.replace(/{{(.*?)}}/g, (match, p1) => {
      return toReplace(element, p1);
    });
  }

  function run(parent, tag, template) {
    let child = parent.querySelector(tag);

    if (child === null) {
      return;
    }

    child.outerHTML = render(template, child);
    run(parent, tag, template);
  }

  function findTags(element, tags) {
    Object.keys(tags).map(key => {
      if (tags.hasOwnProperty(key)) {
        run(element, key, tags[key]);
      }
    });
  }

  return function (parent, options) {
    let parents = document.querySelectorAll(parent);
    
    for(let i = parents.length; i--; ) {
      if (typeof options === 'undefined' || typeof options.tags === 'undefined') {
        return;
      }
      
      findTags(parents[i], options.tags);
    }
  }
})();


templater('.super-block', {
  tags: {
    'super-child-strong': '<strong>{{html}}</strong>'
  }
});

templater('body', {
  tags: {
    'panel': '<div class="panel"><div class="panel-heading">{{heading}}</div><div class="panel-body">{{html}}</div></div>',
    'bootstrap_button': '<button class="{{class}}" type="{{type}}" aria-label="{{aria-label}}">{{html}}</button>',
    'bootstrap_link': '<a class="btn btn--default" href="#" role="button">Some Another Text</a>',
    'super-child-strong': '<i>{{html}}</i>'
  }
});