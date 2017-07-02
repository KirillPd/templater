describe('Stage 5', function () {
    it('must create method `templater` for `jQuery.fn`', function () {
        (typeof jQuery.fn.templater).should.equals('function');
    });

    it('must replace elements with tag `panel` to elements with tag `div`, class `panel`', function () {
        $('panel').length.should.equals(3, 'document should have 3 `panel` tags');
        $(document).templater({
            tags: {
                'panel': '<div class="panel"><div class="panel-heading">{{heading}}</div><div class="panel-body">{{html}}</div></div>'
            }
        });
        
        checkPanel('body > .panel');
        checkPanel('body > .panel > .panel-body > .panel');
        checkPanel('body > .panel > .panel-body > .panel bootstrap_button .panel');

        function checkPanel(panel) {
            var $panel = $(panel);

            $panel.length.should.equals(1, 'Element with `panel` class was not created. Amount of `panel` elements in DOM');
            $panel.find('> .panel-heading').length.should.equals(1, 'Replaced element should have tag with `.panel-heading` class');
            $panel.find('> .panel-body').length.should.equals(1, 'Replaced element should have tag with `.panel-body` class');
        }
    });

    it('must replace elements with tag `bootstrap_button` to element with tag `button`, class `btn btn--red some-class`', function () {
        $('bootstrap_button').length.should.equals(1, 'document should have 1 `bootstrap_button` tag');
        $(document).templater({
            tags: {
                'panel': '<div class="panel"><div class="panel-heading">{{heading}}</div><div class="panel-body">{{html}}</div></div>',
                'bootstrap_button': '<button class="{{class}}" type="{{type}}" aria-label="{{aria-label}}">{{html}}</button>'
            }
        });
        var $replaced = $(' button');
        $replaced.length.should.equals(1, 'Element with `button` tag was not created. Amount of `button` elements in DOM');
        $replaced.attr('class').should.equals('btn btn--red some-class', 'Element with `button` tag has wrong class. It has class');
        $replaced.attr('type').should.equals('submit', 'Element with `button` tag has wrong type. It has class');
    });
});