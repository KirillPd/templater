let Templater = {
    components: {},
    addTag: function (tag, template) {
        if (typeof tag === 'undefined' || typeof template === 'undefined') return;

        this.components[tag] = template;
    },
    run: function () {
        console.log(this.components);

        for (let component in this.components) {
            let elements = document.getElementsByTagName(component),
                length = elements.length;

            if (!length) continue;

            for (let i = 0; i < length; i++) {
                elements[0].outerHTML = this.components[component];
            }
        }
    }
};