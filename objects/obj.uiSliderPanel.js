//#region uiSliderPanel
(function ($) {
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
    var _slidePanel = function () {
        try {
            var instance = _getInstance();
            $.each(defaults.panels, function (af_key, af_panel) {
                // envelop the elements and initialize the instance
                if (instance.$wrap == null) {
                    var $wrap = $("<div id='sp-"+instance.id+"'></div>");
                    $wrap
                        .height(af_panel.$el.height())
                        .width(af_panel.$el.width())
                        .css("overflow", "hidden")
                        .css("position", "relative");
                    af_panel.$el.wrap($wrap);
                    instance.$wrap = $("#sp-"+instance.id);
                }
                af_panel.$el.appendTo(instance.$wrap);

                // positioning the elements
                switch (af_panel.type) {
                  case "slide":
                    switch (af_panel.mode) {
                      case "rightToLeft":
                        switch (af_panel.direction) {
                          case "in":
                            var tWidth = (af_panel.position != 0) ? af_panel.position : instance.$wrap.width();
                            af_panel.$el
                              .css("position", "absolute")
                              .css("top", "0px")
                              .css("left", instance.$wrap.width()+"px")
                              .css("display", "block")
                              .width(tWidth);

                            // animation
                            var tLeft = (af_panel.position != 0) ? instance.$wrap.width() - af_panel.position : 0;
                            af_panel.$el.animate({
                              left: tLeft
                            }, af_panel.duration);
                            break;
                          case "out":
                            var tWidth = (af_panel.position != 0) ? instance.$wrap.width() - af_panel.position : instance.$wrap.width();
                            af_panel.$el
                              .css("position", "absolute")
                              .css("top", "0px")
                              .css("left", "0px")
                              .css("display", "block");

                            // animation
                            if (af_panel.position != 0) {
                                af_panel.$el.animate({
                                  width: tWidth
                                }, af_panel.duration);
                            } else {
                                af_panel.$el.animate({
                                  left: -instance.$wrap.width()
                                }, af_panel.duration);
                            }
                            break;
                        }
                        break;
                      case "leftToRight":
                        switch (af_panel.direction) {
                          case "in":
                            var tWidth = (af_panel.position != 0) ? af_panel.position : instance.$wrap.width();
                            af_panel.$el
                              .css("position", "absolute")
                              .css("top", "0px")
                              .css("left", "-"+tWidth+"px")
                              .css("display", "block")
                              .width(tWidth);

                            // animation
                            af_panel.$el.animate({
                              left: 0
                            }, af_panel.duration);
                            break;
                          case "out":
                            var tLeft = (af_panel.position != 0) ? instance.$wrap.width() - af_panel.position : 0;
                            af_panel.$el
                              .css("position", "absolute")
                              .css("top", "0px")
                              .css("left", tLeft+"px")
                              .css("display", "block");

                            // animation
                            af_panel.$el.animate({
                              left: instance.$wrap.width()
                            }, af_panel.duration);
                            break;
                        }
                        break;
                      case "topToBottom":
                        switch (af_panel.direction) {
                          case "in":
                            af_panel.$el
                              .css("position", "absolute")
                              .css("left", "0px")
                              .css("top", "-"+instance.$wrap.height()+"px")
                              .css("display", "block");

                            // animation
                            var tTop = (af_panel.position != 0) ? instance.$wrap.height() - af_panel.position : 0;
                            af_panel.$el.animate({
                              top: tTop
                            }, af_panel.duration);
                            break;
                          case "out":
                            af_panel.$el
                              .css("position", "absolute")
                              .css("top", "0px")
                              .css("left", "0px")
                              .css("display", "block");

                            // animation
                            var tTop = (af_panel.position != 0) ? af_panel.position : instance.$wrap.height();
                            af_panel.$el.animate({
                              top: tTop
                            }, af_panel.duration);
                            break;
                        }
                        break;
                      case "bottomToTop":
                        switch (af_panel.direction) {
                          case "in":
                            af_panel.$el
                              .css("position", "absolute")
                              .css("left", "0px")
                              .css("top", instance.$wrap.height()+"px")
                              .css("display", "block");

                            // animation
                            af_panel.$el.animate({
                              top: 0
                            }, af_panel.duration);
                            break;
                          case "out":
                            af_panel.$el
                              .css("position", "absolute")
                              .css("top", "0px")
                              .css("left", "0px")
                              .css("display", "block");

                            // animation
                            af_panel.$el.animate({
                              top: -instance.$wrap.height()
                            }, af_panel.duration);
                            break;
                        }
                        break;
                    }
                    break;
                    default:
                        af_panel.$el
                          .css("position", "absolute")
                          .css("top", "0px")
                          .css("left", "0px")
                          .css("display", "block");
                        break;
                }
            });
        } catch (err) {
            _writeLog('error', '_slidePanel', err, err.description);
        }
    };
    var _getInstance = function () {
        var inst = null;
        try {
            $.each(defaults.instances, function (af_index, af_inst) {
                if (af_inst.id == defaults.instance) {
                    inst = af_inst;
                    return false; //exit loop
                }
            });
            if (!inst) {
                // create the instance
                inst = {
                    id: defaults.instance,
                    $wrap: null
                };
                defaults.instances.push(inst);
            }
        } catch (err) {
            _writeLog('error', '_getInstance', err, err.description);
        }
        console.log(inst);
        return inst;
    };
    var _writeLog = function (a_type, a_function, a_msg, a_info) {
        defaults.events.log('uiSliderPanel', a_type, a_function, a_msg, a_info);
    };
    // Public functions ----------------------------------------------------
    jQuery.uiSliderPanel = jQuery.J = function (options) {
        try {
            defaults.panels = {};
            defaults = jQuery.extend(true, defaults, options);
            _writeLog('infoData', 'Constructor', 'Create the slider panel', options);
            _slidePanel();
            defaults.events.initialize($.uiSliderPanel);
        } catch (err) {
            _writeLog('error', 'Initialize', err, err.description);
        }
    };
    jQuery.J.Initialize = function (options) {
        defaults = jQuery.extend(true, defaults, options);
        _writeLog('infoData', 'Initialize', 'Initialize the slider panel', '');
    };
})(jQuery);
//#endregion