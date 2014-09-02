//#region uiSliderPanel
(function ($) {
  var _views = [];
  var defaults = {
    containerId: "mainSlider",
    animation: {
      open: 500,
      close: 500
    },
    actions: [],
    events: {
      initialize: function ($af_container, af_page) { },
      closed: function ($af_container, af_page) { },
      log: function (a_module, a_type, a_function, a_msg, a_info) { }
    },
    layout: {
      $background: null,
      panel: {
        $elem: null,
        type: 'normal',
        modal: true
      },
      header: {
        $elem: null,
        className: "",
        icon: "",
        title: "",
        description: ""
      },
      content: {
        url: "",
        $elem: null
      },
      buttons: {
        $elem: null,
        items: []
      }
    }
  };
  // Private functions ----------------------------------------------------
  var drawPanel = function () {
    try {
      hideOthersHeaders();

      defaults.layout.$background = $("<div id='slider-bk-" + defaults.containerId + "' class='uiBk'></div>");
      defaults.layout.$background
        .height(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)
        .width(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)
        .fadeTo(0, 0);
      defaults.layout.$background
        .appendTo("body");
      defaults.layout.$background
        .fadeTo('slow', 0.3)
        .css("z-index", LIB_module("web-utils").getHighIndex("div"));

      defaults.layout.panel.$elem = $("<div id='slider-panel-" + defaults.containerId + "' class='uiSliderPanel'></div>");
      drawHeader();
      defaults.layout.panel.$elem
          .width(defaults.layout.panel.width)
          .appendTo("body");
      if (typeof defaults.layout.panel.height != "undefined") {
        defaults.layout.panel.$elem
            .height(defaults.layout.panel.height);
      }
      drawButtons();
      drawContent();

      $("body").css("overflow", "hidden");
        
        try {
            $("body", defaults.layout.content.$elem[0].contentWindow.document)
                .css("overflow", "hidden");
        } catch (err) {
            writeLog('error', 'drawPanel', err, err.description);
        }
      defaults.layout.panel.$elem
        .show()
        .css("left", $("body").width())
        .css("width", $("body").width())
        .css("height", document.body.clientHeight)
        .css("z-index", LIB_module("web-utils").getHighIndex("div"))
        .animate(
          {
            left: 0
          }, 1000, function () {
            if (LIB_module("design").getPageDataContainer() != null) {
              LIB_module("design").getPageDataContainer().hide();
            }
            $("div[role='dialog']").hide();
            $("#bttnsMSG").hide();
            $(this)
              .width("100%")
              .css("height", document.body.clientHeight);
            try {
                $("body", defaults.layout.content.$elem[0].contentWindow.document)
                    .css("overflow", "auto");
            } catch (err) {
                writeLog('error', 'drawPanel.animate', err, err.description);
            }
          }
        );
    } catch (err) {
      writeLog('error', 'drawPanel', err, err.description);
    }
  }
  var drawHeader = function () {
    try {
      defaults.layout.header.$elem = $("<div id='" + defaults.containerId + "-header' class='uiSliderPanel-header'><span class='slider-header-title'>" + defaults.layout.header.title + "</span><span class='slider-header-description'>" + defaults.layout.header.description + "</span></div>");
      if (defaults.layout.header.className != "") {
        defaults.layout.header.$elem.addClass(defaults.layout.header.className);
      }
      defaults.layout.header.$elem
        .css("background-image", "url(" + defaults.layout.header.icon + ")")
        .appendTo(defaults.layout.panel.$elem);
    } catch (err) {
      writeLog('error', 'drawHeader', err, err.description);
    }
  }
  var drawButtons = function () {
    try {
      defaults.layout.buttons.$elem = $("<div id='" + defaults.containerId + "-buttons' class='uiSliderPanelButtons uiToolbar'></div>");
      $.each(defaults.layout.buttons.items, function (index, button) {
        writeLog('info', 'drawButtons', 'Draw button', button.id);
        var $bt = $('<a id="' + defaults.containerId + '-button-' + button.id + '" class="ActiveButton" role="button">' + button.text + '</a>');
        if (button.className != "") {
          $bt.addClass(button.className);
        }
        if (button.action != null) {
          $bt.bind("click", function () {
            var action = getAction(button.action);
            if (action) {
              action.fn(defaults.layout.content.$elem, $.uiSliderPanel);
            }
          });
        }
        defaults.layout.buttons.$elem.append($bt);
      });
      defaults.layout.buttons.$elem.appendTo(defaults.layout.header.$elem);
    } catch (err) {
      writeLog('error', 'drawButtons', err, err.description);
    }
  }
  var drawContent = function () {
    try {
      if (defaults.layout.content.url != "") {
        defaults.layout.content.$elem = $('<iframe />');
        var height = getHeight();
        defaults.layout.content.$elem
            .attr("name", 'contentSliderIFrame_name_' + defaults.containerId)
            .attr("id", 'contentSliderIFrame_id_' + defaults.containerId)
            .attr("src", defaults.layout.content.url)
            .attr("width", "100%")
            .attr("height", height)
            .attr("type", "slider")
            .attr("frameborder", "0")
            .load(function () {
                try {
                    $("body", defaults.layout.content.$elem[0].contentWindow.document)
                        .height(height);
                }
                catch (err) {
                    writeLog('error', 'drawContent.load', err, err.description);
                }
            });
        defaults.layout.content.$elem
            .appendTo(defaults.layout.panel.$elem);
      }
    } catch (err) {
      writeLog('error', 'drawContent', err, err.description);
    }
  }
  var getAction = function (a_name) {
    var action = null;
    $.each(defaults.actions, function (af_key, af_action) {
      if (a_name == af_action.name) {
        action = af_action;
        return; // end each loop
      }
    });
    return action;
  }
  var getHeight = function () {
    var height = "innerHeight" in window
               ? window.innerHeight
               : document.documentElement.offsetHeight;
    return height - defaults.layout.header.$elem.innerHeight();
  }
  var closePanel = function () {
    try {
      defaults.layout.$background.fadeTo('slow', 0, function () {
        defaults.layout.$background.remove();
      });

      if (LIB_module("design").getPageDataContainer() != null) {
        LIB_module("design").getPageDataContainer().show();
      }
      defaults.layout.panel.$elem.animate(
          {
            left: defaults.layout.panel.$elem.width()
          }, 1000, function () {
            showOthersHeaders();
            $(this).hide();
            $("div[role='dialog']").show();
            defaults.layout.panel.$elem.remove();
            $("body").css("overflow", "auto");
          }
      );
      defaults.events.closed(defaults.layout.content.$elem, $.uiSliderPanel);
    } catch (err) {
      writeLog('error', 'closePanel', err, err.description);
    }
  }
  var hideOthersHeaders = function () {
    var fnResize = function (a_id) {
      if (a_id != "") {
        $("#contentSliderIFrame_id_" + a_id, parent.document).height($("#slider-panel-" + a_id, parent.document).height());
      }
    };
    $("div", parent.document).filter(function () {
      if (this.className == "uiSliderPanel-header") {
        key = this.id.substring(0, this.id.length - 7); //xxxxxxxx-header
        $(this).hide(0, function () { fnResize(key); });
      }
    });
  }
  var showOthersHeaders = function () {
    $("div", parent.document).filter(function () {
      if (this.className == "uiSliderPanel-header") {
        key = this.id.substring(0, this.id.length - 7); //xxxxxxxx-header
        $(this).show(0, function () { });
      }
    });
  }
  var writeLog = function (a_type, a_function, a_msg, a_info) {
    defaults.events.log('uiSliderPanel', a_type, a_function, a_msg, a_info);
  }
  // Public functions ----------------------------------------------------
  jQuery.uiSliderPanel = jQuery.J = function () { };

  jQuery.J.Initialize = function (options) {
    try {
      options = jQuery.extend(defaults, options);
      writeLog('infoData', 'Initialize', 'Initialize the slider panel', options);
      drawPanel();
      
      $(window).resize(function () {
        defaults.layout.panel.height = document.body.clientHeight;
        defaults.layout.content.$elem.height(getHeight());
      });
      defaults.events.initialize(defaults.layout.content.$elem, $.uiSliderPanel);
    } catch (err) {
      writeLog('error', 'Initialize', err, err.description);
    }
  };
  jQuery.J.Close = function () {
    writeLog('infoData', 'Close', 'Close the slider panel', '');
    closePanel();
  };
  jQuery.J.getOptions = function () {
    return defaults;
  };
  jQuery.J.removeButton = function (a_id) {
    $("#" + defaults.containerId + '-button-' + a_id).remove();
    $.each(defaults.layout.buttons.items, function (index, button) {
      if (button.name == a_id) {
        defaults.layout.buttons.items.splice(index, 1);
        return; // end the loop function
      }
    });
  };
  jQuery.J.hideButton = function (a_id) {
    $("#" + defaults.containerId + '-button-' + a_id).hide();
  };
  jQuery.J.showButton = function (a_id) {
    $("#" + defaults.containerId + '-button-' + a_id).show();
  };
})(jQuery);
//#endregion