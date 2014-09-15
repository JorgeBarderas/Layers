;(function(factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else {
    factory(jQuery);
  }
})(function($){
    'use strict';

    var instances   = [];
    var defaults = {
            id: "mainSlider",
            panels: {},
            instances: [],
            wrap: {
            $el: null
        },
        events: {
            initialize: function (a_panel) { },
            closed: function () { },
            log: function () { }
        }
    };
    // Private functions ----------------------------------------------------
    var _animatePanel = function (a_instance) {
        try {
            console.log("ddddddddd", a_instance);
            af_panel.$el
                .appendTo(instance.$wrap)
                .width(instance.$wrap.width())
                .height(instance.$wrap.height());
        } catch (err) {
            _writeLog('error', '_animatePanel', err, err.description);
        }
    };
    var _writeLog = function (a_type, a_function, a_msg, a_info) {
        defaults.events.log('obj.layers', a_type, a_function, a_msg, a_info);
    };
    // The Layer object
    var Layers = function(a_el, a_options) {
        this.el       = a_el;
        this.$el      = $(a_el);
        this.panels   = [];

        // Register this instance
        this.instanceNumber = instances.length;
        instances.push(this);
        // Save the reference
        this.$el.data('layer-instance', this.instanceNumber);
        _writeLog('infoData', 'Constructor', 'New instance', this.instanceNumber);
    };
    $.extend(Layers.prototype, {
        addPanels: function(a_panels) {
            $.each(a_panels, function () {
                this.panels.push(this);
            });
        },
        animate: function(a_options) {
            console.log(a_options, this);
        }
    });
    // Register the jQuery selector actions
    $.fn.layers = function() {
        var argumentsArray = Array.prototype.slice.call(arguments, 0);
        return this.each(function() {
            // If no data was set, jQuery.data returns undefined
            var instanceNumber = $(this).data('layer-instance');
            // Verify if we already have a layer for this element ...
            if (instanceNumber !== undefined) {
                var instance = instances[instanceNumber],
                    method = argumentsArray[0];
                if(Layers.prototype.hasOwnProperty(method)) {
                    instance[method].apply(instance, argumentsArray.slice(1));
                    // If method look like a date try to set a new final date
                } else {
                    $.error('Method %s does not exist on jQuery.Layers'
                        .replace(/\%s/gi, method));
                }
            } else {
                // ... if not we create an instance
                new Layers(this, argumentsArray[0], argumentsArray[1]);
            }
        });
    };
    // Public functions ----------------------------------------------------
    jQuery.layers = jQuery.J = function (options) {
    };
    jQuery.J.Initialize = function (a_options) {
        defaults = jQuery.extend(true, defaults, a_options);
        _writeLog('infoData', 'Initialize', 'Initialize the layers object', defaults);
    };
    jQuery.J.createWrapper = function (a_id, $a_panel) {
        try {
            var $wrap = $("<div></div>");
            $wrap
                .attr("id", a_id)
                .css("overflow", "hidden")
                .css("position", "relative")
                .height($a_panel.height())
                .width($a_panel.width());
            $a_panel.wrap($wrap);
            _writeLog('infoData', 'createWrapper', 'Create wrapper layer', $wrap);
            return $wrap;
        } catch (err) {
            _writeLog('error', 'createWrapper', err, err.description);
        }
        return [];
    };
});