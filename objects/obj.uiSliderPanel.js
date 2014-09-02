//#region uiSliderPanel
(function ($) {
  var defaults = {
    id: "mainSlider",
    panels: {},
    wrap: {
      $el: null
    },
    animation: {
      slide: 500
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
      $.each(defaults.panels, function (af_key, af_panel) {
        // envelop the elements
        if (defaults.wrap.$el == null) {
          var $wrap = $("<div id='sliderWrap'></div>");
          $wrap
            .height(af_panel.$el.height())
            .width(af_panel.$el.width())
            .css("overflow", "hidden")
            .css("position", "relative");
          af_panel.$el.wrap($wrap);
          defaults.wrap.$el = $("#sliderWrap");
        }
        af_panel.$el.appendTo(defaults.wrap.$el);

        // positioning the elements
        switch (af_panel.type) {
          case "slide":
            switch (af_panel.mode) {
              case "leftToRight":
                switch (af_panel.direction) {
                  case "in":
                    af_panel.$el
                      .css("position", "absolute")
                      .css("top", "0px")
                      .css("left", defaults.wrap.$el.width()+"px")
                      .css("display", "block");

                    // animation
                    af_panel.$el.animate({
                      left: 0
                    }, defaults.animation.slide);
                    break;
                  case "out":
                    af_panel.$el
                      .css("position", "absolute")
                      .css("top", "0px")
                      .css("left", "0px")
                      .css("display", "block");

                    // animation
                    af_panel.$el.animate({
                      left: -defaults.wrap.$el.width()
                    }, defaults.animation.slide);
                    break;
                }
                break;
              case "rightToLeft":
                switch (af_panel.direction) {
                  case "in":
                    af_panel.$el
                      .css("position", "absolute")
                      .css("top", "0px")
                      .css("left", "-"+defaults.wrap.$el.width()+"px")
                      .css("display", "block");

                    // animation
                    af_panel.$el.animate({
                      left: 0
                    }, defaults.animation.slide);
                    break;
                  case "out":
                    af_panel.$el
                      .css("position", "absolute")
                      .css("top", "0px")
                      .css("left", "0px")
                      .css("display", "block");

                    // animation
                    af_panel.$el.animate({
                      left: defaults.wrap.$el.width()
                    }, defaults.animation.slide);
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
      _writeLog('error', 'Initialize', err, err.description);
    }
  };
  var _closePanel = function () {
  };
  var _writeLog = function (a_type, a_function, a_msg, a_info) {
    defaults.events.log('uiSliderPanel', a_type, a_function, a_msg, a_info);
  };
  // Public functions ----------------------------------------------------
  jQuery.uiSliderPanel = jQuery.J = function (options) {
    try {
      defaults = jQuery.extend(true, defaults, options);
      _writeLog('infoData', 'Initialize', 'Initialize the slider panel', options);
      _slidePanel();
      defaults.events.initialize($.uiSliderPanel);
    } catch (err) {
      _writeLog('error', 'Initialize', err, err.description);
    }
  };
  jQuery.J.Close = function () {
    _writeLog('infoData', 'Close', 'Close the slider panel', '');
    _closePanel();
  };
  jQuery.J.getOptions = function () {
    return defaults;
  };
})(jQuery);
//#endregion