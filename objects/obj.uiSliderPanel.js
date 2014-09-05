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
                af_panel.$el
                    .appendTo(instance.$wrap)
                    .width(instance.$wrap.width())
                    .height(instance.$wrap.height());

                // positioning the elements
                switch (af_panel.type) {
                  case "slide":
                    switch (af_panel.mode) {
                      case "rightToLeft":
                        switch (af_panel.direction) {
                          case "in":
                            var tTop = 0;
                            var tLeft = 0;
                            var tHeight = 0;
                            var tWidth = 0;
                            if (af_panel.position != 0) {
                                //partial
                                if (af_panel.z == 0) {
                                    //pasive
                                    tTop = 0;
                                    tLeft = -af_panel.position;
                                    tHeight = instance.$wrap.height();
                                    tWidth = instance.$wrap.width() + af_panel.position;
                                } else {
                                    //active
                                    tTop = 0;
                                    tLeft = instance.$wrap.width();
                                    tHeight = instance.$wrap.height();
                                    if (af_panel.width != "undefined" && af_panel.width > 0) {
                                        //intermediate
                                        tWidth = af_panel.width;
                                    } else {
                                        //leading
                                        tWidth = af_panel.position;
                                    }
                                }
                            } else {
                                //full
                                tTop = 0;
                                tLeft = instance.$wrap.width();
                                tHeight = instance.$wrap.height();
                                tWidth = instance.$wrap.width();
                            }

                            _writeLog('info', '_slidePanel', "INI|"+af_panel.type+"|"+af_panel.mode+"|"+af_panel.direction+"|"+af_panel.z+"|"+instance.$wrap.width()+"x"+instance.$wrap.height(), "top:"+tTop+";left:"+tLeft+";height:"+tHeight+";width:"+tWidth);
                            af_panel.$el
                              .css("position", "absolute")
                              .css("top", "0px")
                              .css("left", tLeft+"px")
                              .css("display", "block")
                              .width(tWidth);

                            // animation
                            if (af_panel.position != 0) {
                                if (af_panel.z == 0) {
                                    tWidth = instance.$wrap.width();
                                    tLeft = 0;
                                    af_panel.$el.animate({
                                        width: tWidth,
                                        left: tLeft
                                    }, af_panel.duration);
                                } else {
                                    tLeft = instance.$wrap.width() - af_panel.position;
                                    af_panel.$el.animate({
                                      left: tLeft
                                    }, af_panel.duration);
                                }
                            } else {
                                tLeft = 0;
                                af_panel.$el.animate({
                                  left: tLeft
                                }, af_panel.duration);
                            }
                            _writeLog('info', '_slidePanel', "END|"+af_panel.type+"|"+af_panel.mode+"|"+af_panel.direction+"|"+af_panel.z+"|"+instance.$wrap.width()+"x"+instance.$wrap.height(), "top:"+tTop+";left:"+tLeft+";height:"+tHeight+";width:"+tWidth);
                            break;
                          case "out":
                            if (af_panel.position != 0) {
                                //partial
                                if (af_panel.z == 0) {
                                    //pasive
                                    tTop = 0;
                                    tLeft = 0;
                                    tHeight = instance.$wrap.height();
                                    tWidth = instance.$wrap.width();
                                } else {
                                    //active
                                    tTop = 0;
                                    tHeight = instance.$wrap.height();
                                    if (af_panel.width != "undefined" && af_panel.width > 0) {
                                        //intermediate
                                        tLeft = af_panel.position - af_panel.width;
                                        tWidth = af_panel.width;
                                    } else {
                                        //leading
                                        tLeft = 0;
                                        tWidth = af_panel.position;
                                    }
                                }
                            } else {
                                //full
                                tTop = 0;
                                tLeft = 0;
                                tHeight = instance.$wrap.height();
                                tWidth = instance.$wrap.width();
                            }
                            _writeLog('info', '_slidePanel', "INI|"+af_panel.type+"|"+af_panel.mode+"|"+af_panel.direction+"|"+af_panel.z+"|"+instance.$wrap.width()+"x"+instance.$wrap.height(), "top:"+tTop+";left:"+tLeft+";height:"+tHeight+";width:"+tWidth);
                            af_panel.$el
                              .css("position", "absolute")
                              .css("top", "0px")
                              .css("left", tLeft+"px")
                              .css("display", "block")
                              .width(tWidth);

                            // animation
                            if (af_panel.position != 0) {
                                //partial
                                if (af_panel.z == 0) {
                                    //pasive
                                    tWidth = instance.$wrap.width() + af_panel.position;
                                    af_panel.$el.animate({
                                      width: tWidth
                                    }, af_panel.duration);
                                } else {
                                    //active
                                    if (af_panel.width != "undefined" && af_panel.width > 0) {
                                        //intermediate
                                        tLeft = -af_panel.width;
                                        af_panel.$el.animate({
                                          left: tLeft
                                        }, af_panel.duration);
                                    } else {
                                        //leading
                                        tLeft = -af_panel.position;
                                        af_panel.$el.animate({
                                          left: tLeft
                                        }, af_panel.duration);
                                    }
                                }
                            } else {
                                //full
                                tLeft = -instance.$wrap.width();
                                af_panel.$el.animate({
                                  left: tLeft
                                }, af_panel.duration);
                            }
                            _writeLog('info', '_slidePanel', "END|"+af_panel.type+"|"+af_panel.mode+"|"+af_panel.direction+"|"+af_panel.z+"|"+instance.$wrap.width()+"x"+instance.$wrap.height(), "top:"+tTop+";left:"+tLeft+";height:"+tHeight+";width:"+tWidth);
                            break;
                        }
                        break;
                      case "leftToRight":
                        switch (af_panel.direction) {
                          case "in":
                            var tTop = 0;
                            var tLeft = 0;
                            var tHeight = 0;
                            var tWidth = 0;
                            if (af_panel.position != 0) {
                                //partial
                                if (af_panel.z == 0) {
                                    //pasive
                                    tTop = 0;
                                    tLeft = 0;
                                    tHeight = instance.$wrap.height();
                                    tWidth = instance.$wrap.width() + af_panel.position;
                                } else {
                                    //active
                                    tTop = 0;
                                    tLeft = -af_panel.position;
                                    tHeight = instance.$wrap.height();
                                    if (af_panel.width != "undefined" && af_panel.width > 0) {
                                        //intermediate
                                        tWidth = af_panel.position - af_panel.width;
                                    } else {
                                        //leading
                                        tWidth = af_panel.position;
                                    }
                                }
                            } else {
                                //full
                                tTop = 0;
                                tLeft = -instance.$wrap.width();
                                tHeight = instance.$wrap.height();
                                tWidth = instance.$wrap.width();
                            }
                            _writeLog('info', '_slidePanel', "INI|"+af_panel.type+"|"+af_panel.mode+"|"+af_panel.direction+"|"+af_panel.z+"|"+instance.$wrap.width()+"x"+instance.$wrap.height(), "top:"+tTop+";left:"+tLeft+";height:"+tHeight+";width:"+tWidth);
                            af_panel.$el
                                .css("position", "absolute")
                                .css("top", "0px")
                                .css("left", tLeft+"px")
                                .css("display", "block")
                                .width(tWidth);

                            // animation

                            if (af_panel.position != 0) {
                                if (af_panel.z == 0) {
                                    tWidth = instance.$wrap.width();
                                    af_panel.$el.animate({
                                      width: tWidth
                                    }, af_panel.duration);                                    
                                } else {
                                    tLeft = 0;
                                    af_panel.$el.animate({
                                      left: tLeft
                                    }, af_panel.duration);                                    
                                }
                            } else {
                                tLeft = 0;
                                af_panel.$el.animate({
                                  left: tLeft
                                }, af_panel.duration);
                            }
                            _writeLog('info', '_slidePanel', "END|"+af_panel.type+"|"+af_panel.mode+"|"+af_panel.direction+"|"+af_panel.z+"|"+instance.$wrap.width()+"x"+instance.$wrap.height(), "top:"+tTop+";left:"+tLeft+";height:"+tHeight+";width:"+tWidth);
                            break;
                          case "out":
                            var tTop = 0;
                            var tLeft = 0;
                            var tHeight = 0;
                            var tWidth = 0;
                            if (af_panel.position != 0) {
                                //partial
                                if (af_panel.z == 0) {
                                    //pasive
                                    tTop = 0;
                                    tLeft = 0;
                                    tHeight = instance.$wrap.height();
                                    tWidth = instance.$wrap.width();
                                } else {
                                    //active
                                    tTop = 0;
                                    tLeft = instance.$wrap.width() - af_panel.position;
                                    tHeight = instance.$wrap.height();
                                    if (af_panel.width != "undefined" && af_panel.width > 0) {
                                        //intermediate
                                        tWidth = af_panel.position - af_panel.width;
                                    } else {
                                        //leading
                                        tWidth = af_panel.position;
                                    }
                                }
                            } else {
                                //full
                                tTop = 0;
                                tLeft = 0;
                                tHeight = instance.$wrap.height();
                                tWidth = instance.$wrap.width();
                            }
                            _writeLog('info', '_slidePanel', "INI|"+af_panel.type+"|"+af_panel.mode+"|"+af_panel.direction+"|"+af_panel.z+"|"+instance.$wrap.width()+"x"+instance.$wrap.height(), "top:"+tTop+";left:"+tLeft+";height:"+tHeight+";width:"+tWidth);
                            af_panel.$el
                              .css("position", "absolute")
                              .css("top", "0px")
                              .css("left", tLeft+"px")
                              .css("display", "block")
                              .width(tWidth);

                            // animation
                            if (af_panel.position != 0) {
                              if (af_panel.z == 0) {
                                tWidth = instance.$wrap.width() + af_panel.position;
                                tLeft = -af_panel.position;
                                af_panel.$el.animate({
                                  width: tWidth,
                                  left: tLeft
                                }, af_panel.duration);
                              } else {
                                tLeft = instance.$wrap.width();
                                af_panel.$el.animate({
                                  left: tLeft
                                }, af_panel.duration);
                              }
                            } else {
                                tLeft = instance.$wrap.width();
                                af_panel.$el.animate({
                                    left: tLeft
                                }, af_panel.duration);
                            }
                            _writeLog('info', '_slidePanel', "END|"+af_panel.type+"|"+af_panel.mode+"|"+af_panel.direction+"|"+af_panel.z+"|"+instance.$wrap.width()+"x"+instance.$wrap.height(), "top:"+tTop+";left:"+tLeft+";height:"+tHeight+";width:"+tWidth);
                            break;
                        }
                        break;
                      case "topToBottom":
                        switch (af_panel.direction) {
                          case "in":
                            var tHeight = 0;
                            var tTop = 0;
                            if (af_panel.z == 0) {
                                tHeight = (af_panel.position != 0) ? instance.$wrap.height() + af_panel.position : instance.$wrap.height();
                                tTop = (af_panel.position != 0) ? 0 : -instance.$wrap.height();                             
                            } else {
                                tHeight = (af_panel.position != 0) ? af_panel.position : instance.$wrap.height();
                                tTop = (af_panel.position != 0) ? -af_panel.position : -instance.$wrap.height();                                
                            }
                            _writeLog('info', '_slidePanel', "INI|"+af_panel.type+"|"+af_panel.mode+"|"+af_panel.direction+"|"+af_panel.z+"|"+instance.$wrap.width()+"x"+instance.$wrap.height(), "top:"+tTop+";left:"+tLeft+";height:"+tHeight+";width:"+tWidth);
                            af_panel.$el
                              .css("position", "absolute")
                              .css("left", "0px")
                              .css("top", tTop+"px")
                              .css("display", "block")
                              .height(tHeight);

                            // animation
                            if (af_panel.position != 0) {
                              if (af_panel.z == 0) {
                                tHeight = instance.$wrap.height();
                                af_panel.$el.animate({
                                  height: tHeight
                                }, af_panel.duration);
                              } else {
                                tTop = 0;
                                af_panel.$el.animate({
                                  top: tTop
                                }, af_panel.duration);
                              }
                            } else {
                                tTop = 0;
                                af_panel.$el.animate({
                                    top: tTop
                                }, af_panel.duration);
                            }
                            _writeLog('info', '_slidePanel', "END|"+af_panel.type+"|"+af_panel.mode+"|"+af_panel.direction+"|"+af_panel.z+"|"+instance.$wrap.width()+"x"+instance.$wrap.height(), "top:"+tTop+";left:"+tLeft+";height:"+tHeight+";width:"+tWidth);
                            break;
                          case "out":
                            var tHeight = 0;
                            var tTop = 0;
                            if (af_panel.z == 0) {
                                tHeight = (af_panel.position != 0) ? instance.$wrap.height() : instance.$wrap.height();
                                tTop = (af_panel.position != 0) ? 0 : 0;                             
                            } else {
                                tHeight = (af_panel.position != 0) ? af_panel.position : instance.$wrap.height();
                                tTop = (af_panel.position != 0) ? instance.$wrap.height() -af_panel.position : 0;                                
                            }
                            _writeLog('info', '_slidePanel', "INI|"+af_panel.type+"|"+af_panel.mode+"|"+af_panel.direction+"|"+af_panel.z+"|"+instance.$wrap.width()+"x"+instance.$wrap.height(), "top:"+tTop+";left:"+tLeft+";height:"+tHeight+";width:"+tWidth);

                            af_panel.$el
                              .css("position", "absolute")
                              .css("top", tTop+"px")
                              .css("left", "0px")
                              .css("display", "block")
                              .height(tHeight);

                            // animation
                            if (af_panel.position != 0) {
                              if (af_panel.z == 0) {
                                tTop = -af_panel.position;
                                tHeight = instance.$wrap.height() + af_panel.position;
                                af_panel.$el.animate({
                                  height: tHeight,
                                  top: tTop
                                }, af_panel.duration);
                              } else {
                                tTop = instance.$wrap.height();
                                af_panel.$el.animate({
                                  top: tTop
                                }, af_panel.duration);
                              }
                            } else {
                              tTop = instance.$wrap.height();
                              af_panel.$el.animate({
                                top: tTop
                              }, af_panel.duration);
                            }
                            _writeLog('info', '_slidePanel', "END|"+af_panel.type+"|"+af_panel.mode+"|"+af_panel.direction+"|"+af_panel.z+"|"+instance.$wrap.width()+"x"+instance.$wrap.height(), "top:"+tTop+";left:"+tLeft+";height:"+tHeight+";width:"+tWidth);
                            break;
                        }
                        break;
                      case "bottomToTop":
                        switch (af_panel.direction) {
                          case "in":
                            var tHeight = 0;
                            var tTop = 0;
                            if (af_panel.z == 0) {
                                tHeight = (af_panel.position != 0) ? instance.$wrap.height() +af_panel.position : instance.$wrap.height();
                                tTop = (af_panel.position != 0) ? -af_panel.position : instance.$wrap.height();                             
                            } else {
                                tHeight = (af_panel.position != 0) ? af_panel.position : instance.$wrap.height();
                                tTop = (af_panel.position != 0) ? instance.$wrap.height() : instance.$wrap.height();                                
                            }
                            _writeLog('info', '_slidePanel', "INI|"+af_panel.type+"|"+af_panel.mode+"|"+af_panel.direction+"|"+af_panel.z+"|"+instance.$wrap.width()+"x"+instance.$wrap.height(), "top:"+tTop+";left:"+tLeft+";height:"+tHeight+";width:"+tWidth);
                            af_panel.$el
                              .css("position", "absolute")
                              .css("left", "0px")
                              .css("top", tTop+"px")
                              .css("display", "block")
                              .height(tHeight);

                            // animation
                            if (af_panel.position != 0) {
                              if (af_panel.z == 0) {
                                tTop = 0;
                                tHeight = instance.$wrap.height();
                                af_panel.$el.animate({
                                  height: tHeight,
                                  top: tTop
                                }, af_panel.duration);
                              } else {
                                tTop = instance.$wrap.height() -af_panel.position;
                                af_panel.$el.animate({
                                  top: tTop
                                }, af_panel.duration);
                              }
                            } else {
                              tTop = 0;
                              af_panel.$el.animate({
                                top: tTop
                              }, af_panel.duration);
                            }
                            _writeLog('info', '_slidePanel', "END|"+af_panel.type+"|"+af_panel.mode+"|"+af_panel.direction+"|"+af_panel.z+"|"+instance.$wrap.width()+"x"+instance.$wrap.height(), "top:"+tTop+";left:"+tLeft+";height:"+tHeight+";width:"+tWidth);
                            break;
                          case "out":
                            var tHeight = 0;
                            var tTop = 0;
                            if (af_panel.z == 0) {
                                tHeight = (af_panel.position != 0) ? instance.$wrap.height() : instance.$wrap.height();
                                tTop = (af_panel.position != 0) ? 0 : 0;                             
                            } else {
                                tHeight = (af_panel.position != 0) ? af_panel.position : instance.$wrap.height();
                                tTop = (af_panel.position != 0) ? 0 : 0;                                
                            }
                            _writeLog('info', '_slidePanel', "INI|"+af_panel.type+"|"+af_panel.mode+"|"+af_panel.direction+"|"+af_panel.z+"|"+instance.$wrap.width()+"x"+instance.$wrap.height(), "top:"+tTop+";left:"+tLeft+";height:"+tHeight+";width:"+tWidth);
                            af_panel.$el
                              .css("position", "absolute")
                              .css("top", tTop+"px")
                              .css("left", "0px")
                              .css("display", "block")
                              .height(tHeight);

                            // animation
                            if (af_panel.position != 0) {
                              if (af_panel.z == 0) {
                                tTop = 0;
                                tHeight = instance.$wrap.height() + af_panel.position;
                                af_panel.$el.animate({
                                  height: tHeight,
                                  top: tTop
                                }, af_panel.duration);
                              } else {
                                tTop = -af_panel.position;
                                af_panel.$el.animate({
                                  top: tTop
                                }, af_panel.duration);
                              }
                            } else {
                              tTop = -instance.$wrap.height();
                              af_panel.$el.animate({
                                top: tTop
                              }, af_panel.duration);
                            }
                            _writeLog('info', '_slidePanel', "END|"+af_panel.type+"|"+af_panel.mode+"|"+af_panel.direction+"|"+af_panel.z+"|"+instance.$wrap.width()+"x"+instance.$wrap.height(), "top:"+tTop+";left:"+tLeft+";height:"+tHeight+";width:"+tWidth);
                            break;
                        }
                        break;
                    }
                    break;
                    default:
                        _writeLog('info', '_slidePanel', "X|"+af_panel.type+"|default|"+instance.$wrap.width()+"x"+instance.$wrap.height(), "top:0;left:0;height:"+instance.$wrap.height()+";width:"+instance.$wrap.width());
                        af_panel.$el
                          .css("position", "absolute")
                          .css("top", "0px")
                          .css("left", "0px")
                          .css("display", "block")
                          .width(instance.$wrap.width())
                          .height(instance.$wrap.height());
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