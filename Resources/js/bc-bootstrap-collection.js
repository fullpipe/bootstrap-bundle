/* ==========================================================
 * bc-bootstrap-collection.js
 * http://bootstrap.braincrafted.com
 * ==========================================================
 * Copyright 2013 Florian Eckerstorfer
 *
 * ========================================================== */


!function ($) {

    "use strict"; // jshint ;_;

    /* COLLECTION CLASS DEFINITION
     * ====================== */

    var addField = '[data-addfield="collection"]',
        removeField = '[data-removefield="collection"]',
        CollectionAdd = function (el) {
            $(el).on('click', addField, this.addField);
        },
        CollectionRemove = function (el) {
            $(el).on('click', removeField, this.removeField);
        }
    ;

    CollectionAdd.prototype.addField = function (e) {
        var $this = $(this),
            selector = $this.attr('data-collection'),
            prototypeName = $this.attr('data-prototype-name')
        ;

        e && e.preventDefault();

        var collection = $('#'+selector),
            list = collection.find('> ul'),
            count = list.find('li').size()
        ;

        var newWidget = collection.attr('data-prototype');

        // Check if an element with this ID already exists.
        // If it does, increase the count by one and try again
        var newName = newWidget.match(/id="(.*?)"/);
        var re = new RegExp(prototypeName, "g");
        while ($('#' + newName[1].replace(re, count)).size() > 0) {
            count++;
        }
        newWidget = newWidget.replace(re, count);
        newWidget = newWidget.replace(/__id__/g, newName[1].replace(re, count));
        var newLi = $('<li></li>').html(newWidget);
        newLi.appendTo(list);
    };

    CollectionRemove.prototype.removeField = function (e) {
        var $this = $(this),
            selector = $this.attr('data-field')
        ;

        e && e.preventDefault();

        var listElement = $this.closest('li').remove();
    }


    /* COLLECTION PLUGIN DEFINITION
     * ======================= */

    var oldAdd = $.fn.addField;
    var oldRemove = $.fn.removeField;

    $.fn.addField = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('addfield')
            ;
            if (!data) {
                $this.data('addfield', (data = new CollectionAdd(this)));
            }
            if (typeof option == 'string') {
                data[option].call($this);
            }
        });
    };

    $.fn.removeField = function (option) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data('removefield')
            ;
            if (!data) {
                $this.data('removefield', (data = new CollectionRemove(this)));
            }
            if (typeof option == 'string') {
                data[option].call($this);
            }
        });
    };

    $.fn.addField.Constructor = CollectionAdd;
    $.fn.removeField.Constructor = CollectionRemove;


    /* COLLECTION NO CONFLICT
     * ================= */

    $.fn.addField.noConflict = function () {
        $.fn.addField = oldAdd;
        return this;
    }
    $.fn.removeField.noConflict = function () {
        $.fn.removeField = oldRemove;
        return this;
    }


    /* COLLECTION DATA-API
     * ============== */

    $(document).on('click.addfield.data-api', addField, CollectionAdd.prototype.addField);
    $(document).on('click.removefield.data-api', removeField, CollectionRemove.prototype.removeField);


    /* COLLECTION SORTING */
    /* ================== */

    $(document).ready(function() {
        $('.bc-sortable-collection').bcSortableCollection();
    });

 }(window.jQuery);

+(function ( $, window, document, undefined ) {
    var pluginName = 'bcSortableCollection';

    function Plugin( element, options ) {
        this.element = element;

        this.options = $.extend( {}, options) ;

        this._name = pluginName;

        this.init();
    }

    Plugin.prototype.init = function () {
        var $elem = $(this.element);

        $elem.on('click', '.bc-sortable-up, .bc-sortable-down', function(event) {
            event.preventDefault();

            var
                $a = $(this),
                $li = $a.parentsUntil($elem).last()
                ;

            if ($a.is('.bc-sortable-up')) {
                $li.insertBefore($li.prev());
            } else if ($a.is('.bc-sortable-down')) {
                $li.insertAfter($li.next());
            }

            return false;
        })
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new Plugin( this, options ));
            }
        });
    }
})( jQuery, window, document );
