let Templater = {
  components: {},
  render: function (template, element) {
    let attribute,
      r = /{{(.*?)}}/g;

    while ((attribute = r.exec(template)) !== null) {
      if (attribute[1] === 'html') {
        template = template.replace(attribute[0], element.innerHTML);
      } else {
        template = template.replace(attribute[0], element.getAttribute(attribute[1]));
      }
    }

    return template
  },
  addTag: function (tag, template) {
    if (typeof tag === 'undefined' || typeof template === 'undefined') return;

    this.components[tag] = template;
  },
  run: function () {
    for (let component in this.components) {
      let elements = document.getElementsByTagName(component),
        element = elements[0],
        length = elements.length;

      if (!length) return;

      for (let i = 0; i < length; i++) {
        elements[0].outerHTML = this.render(this.components[component], elements[0]);
      }
    }
  }
};