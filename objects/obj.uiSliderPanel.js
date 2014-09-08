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
                                var iTop = 0,
                                    eTop = 0,
                                    iLeft = 0,
                                    eLeft = 0,
                                    iHeight = 0,
                                    eHeight = 0,
                                    iWidth = 0,
                                    eWidth = 0;
                                if (af_panel.position != 0) {
                                    //partial
                                    if (af_panel.z == 0) {
                                        //pasive
                                        iTop = eTop = 0;
                                        iLeft = -af_panel.position;
                                        eLeft = 0;
                                        iHeight = eHeight = instance.$wrap.height();
                                        iWidth = instance.$wrap.width() + af_panel.position;
                                        ewidth = instance.$wrap.width();
                                    } else {
                                        //active
                                        iTop = eTop = 0;
                                        iHeight = eHeight = instance.$wrap.height();
                                        if (af_panel.width != "undefined" && af_panel.width > 0) {
                                            //intermediate
                                            iLeft = instance.$wrap.width();
                                            eLeft = instance.$wrap.width() - af_panel.position;
                                            iWidth = eWidth = af_panel.width;
                                        } else {
                                            //leading
                                            iLeft = instance.$wrap.width();
                                            eLeft = instance.$wrap.width() - af_panel.position;
                                            iWidth = eWidth = af_panel.position;
                                        }
                                    }
                                } else {
                                    //full
                                    iTop = eTop = 0;
                                    iLeft = instance.$wrap.width();
                                    eLeft = 0;
                                    iHeight = eHeight = instance.$wrap.height();
                                    iWidth = eWidth = instance.$wrap.width();
                                }
                                _writeLog('info', '_slidePanel', "INI|"+af_panel.type+"|"+af_panel.mode+"|"+af_panel.direction+"|"+af_panel.z+"|"+instance.$wrap.width()+"x"+instance.$wrap.height(), "top:"+iTop+";left:"+iLeft+";height:"+iHeight+";width:"+iWidth);
                                _writeLog('info', '_slidePanel', "END|"+af_panel.type+"|"+af_panel.mode+"|"+af_panel.direction+"|"+af_panel.z+"|"+instance.$wrap.width()+"x"+instance.$wrap.height(), "top:"+eTop+";left:"+eLeft+";height:"+eHeight+";width:"+eWidth);
                                //positioning
                                af_panel.$el
                                  .css("position", "absolute")
                                  .css("top", iTop+"px")
                                  .css("left", iLeft+"px")
                                  .css("display", "block")
                                  .height(iHeight)
                                  .width(iWidth);

                                // animation
                                af_panel.$el.animate({
                                    top: eTop,
                                    left: eLeft,
                                    height: eHeight,
                                    width: eWidth
                                }, af_panel.duration);
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
                                    tHeight = instance.$wrap.height();
                                    if (af_panel.width != "undefined" && af_panel.width > 0) {
                                        //intermediate
                                        tLeft = -af_panel.width;
                                        tWidth = af_panel.width;
                                    } else {
                                        //leading
                                        tLeft = -af_panel.position;
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
                                //partial
                                if (af_panel.z == 0) {
                                    //pasive
                                    tWidth = instance.$wrap.width();
                                    af_panel.$el.animate({
                                      width: tWidth
                                    }, af_panel.duration);                           
                                } else {
                                    //active
                                    if (af_panel.width != "undefined" && af_panel.width > 0) {
                                        //intermediate
                                        tLeft = af_panel.position - af_panel.width;
                                        af_panel.$el.animate({
                                          left: tLeft
                                        }, af_panel.duration);
                                    } else {
                                        //leading
                                        tLeft = 0;
                                        af_panel.$el.animate({
                                          left: tLeft
                                        }, af_panel.duration);
                                    }
                                }
                            } else {
                                //full
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
                                        tWidth = af_panel.width;
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
                                //partial
                                if (af_panel.z == 0) {
                                    //pasive
                                    tWidth = instance.$wrap.width() + af_panel.position;
                                    tLeft = -af_panel.position;
                                    af_panel.$el.animate({
                                      width: tWidth,
                                      left: tLeft
                                    }, af_panel.duration);
                                } else {
                                    //active
                                    if (af_panel.width != "undefined" && af_panel.width > 0) {
                                        //intermediate
                                        tLeft = instance.$wrap.width();
                                        af_panel.$el.animate({
                                          left: tLeft
                                        }, af_panel.duration);
                                    } else {
                                        //leading
                                        tLeft = instance.$wrap.width();
                                        af_panel.$el.animate({
                                          left: tLeft
                                        }, af_panel.duration);
                                    }
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
                              try {
                                var iTop = 0,
                                    eTop = 0,
                                    iLeft = 0,
                                    eLeft = 0,
                                    iHeight = 0,
                                    eHeight = 0,
                                    iWidth = 0,
                                    eWidth = 0;
                                if (af_panel.position != 0) {
                                    //partial
                                    if (af_panel.z == 0) {
                                        //pasive
                                        iTop = eTop = 0;
                                        iLeft = eLeft = 0;
                                        iHeight = instance.$wrap.height() + af_panel.position;
                                        eHeight = instance.$wrap.height();
                                        iWidth = eWidth = instance.$wrap.width();
                                    } else {
                                        //active
                                        iLeft = eLeft = 0;
                                        iWidth = eWidth = instance.$wrap.width();
                                        if (af_panel.width != "undefined" && af_panel.width > 0) {
                                            //intermediate
                                            iTop = -af_panel.width;
                                            eTop = af_panel.position -af_panel.width;
                                            iHeight = eHeight = af_panel.width;
                                        } else {
                                            //leading
                                            iTop = -af_panel.position;
                                            eTop = 0;
                                            iHeight = eHeight = af_panel.position;
                                        }
                                    }
                                } else {
                                    //full
                                    iTop = -instance.$wrap.height();
                                    eTop = 0;
                                    iLeft = eLeft = 0;
                                    iHeight = eHeight = instance.$wrap.height();
                                    iWidth = eWidth = instance.$wrap.width();
                                }
                                _writeLog('info', '_slidePanel', "INI|"+af_panel.type+"|"+af_panel.mode+"|"+af_panel.direction+"|"+af_panel.z+"|"+instance.$wrap.width()+"x"+instance.$wrap.height(), "top:"+iTop+";left:"+iLeft+";height:"+iHeight+";width:"+iWidth);
                                _writeLog('info', '_slidePanel', "END|"+af_panel.type+"|"+af_panel.mode+"|"+af_panel.direction+"|"+af_panel.z+"|"+instance.$wrap.width()+"x"+instance.$wrap.height(), "top:"+eTop+";left:"+eLeft+";height:"+eHeight+";width:"+eWidth);
                                //positioning
                                af_panel.$el
                                  .css("position", "absolute")
                                  .css("top", iTop+"px")
                                  .css("left", iLeft+"px")
                                  .css("display", "block")
                                  .height(iHeight)
                                  .width(iWidth);

                                // animation
                                af_panel.$el.animate({
                                    top: eTop,
                                    left: eLeft,
                                    height: eHeight,
                                    width: eWidth
                                }, af_panel.duration);
                            } catch (error) {
                                _writeLog('error', af_panel.type+"|"+af_panel.mode+"|"+af_panel.direction+"|"+af_panel.z+"|"+instance.$wrap.width()+"x"+instance.$wrap.height(), err, err.description);
                            }
                            break;
                          case "out":
                            var iTop = 0,
                                eTop = 0,
                                iLeft = 0,
                                eLeft = 0,
                                iHeight = 0,
                                eHeight = 0,
                                iWidth = 0,
                                eWidth = 0;
                            if (af_panel.position != 0) {
                                //partial
                                if (af_panel.z == 0) {
                                    //pasive
                                    iTop = 0;
                                    eTop = -af_panel.position;
                                    iLeft = eLeft = 0;
                                    iHeight = instance.$wrap.height();
                                    eHeight = instance.$wrap.height() + af_panel.position;
                                    iWidth = eWidth = instance.$wrap.width();
                                } else {
                                    //active
                                    iLeft = eLeft = 0;
                                    iWidth = eWidth = instance.$wrap.width();
                                    if (af_panel.width != "undefined" && af_panel.width > 0) {
                                        //intermediate
                                        iTop = instance.$wrap.height() - af_panel.position;
                                        eTop = instance.$wrap.height();
                                        iHeight = eHeight = af_panel.width;
                                    } else {
                                        //leading
                                        iTop = instance.$wrap.height() -af_panel.position;
                                        eTop = instance.$wrap.height();
                                        iHeight = eHeight = af_panel.position;
                                    }
                                }
                            } else {
                                //full
                                iTop = 0;
                                eTop = instance.$wrap.height();
                                iLeft = eLeft = 0;
                                iHeight = eHeight = instance.$wrap.height();
                                iWidth = eWidth = instance.$wrap.width();
                            }
                            _writeLog('info', '_slidePanel', "INI|"+af_panel.type+"|"+af_panel.mode+"|"+af_panel.direction+"|"+af_panel.z+"|"+instance.$wrap.width()+"x"+instance.$wrap.height(), "top:"+iTop+";left:"+iLeft+";height:"+iHeight+";width:"+iWidth);
                            _writeLog('info', '_slidePanel', "END|"+af_panel.type+"|"+af_panel.mode+"|"+af_panel.direction+"|"+af_panel.z+"|"+instance.$wrap.width()+"x"+instance.$wrap.height(), "top:"+eTop+";left:"+eLeft+";height:"+eHeight+";width:"+eWidth);

                            //positioning
                            af_panel.$el
                              .css("position", "absolute")
                              .css("top", iTop+"px")
                              .css("left", iLeft+"px")
                              .css("display", "block")
                              .height(iHeight)
                              .width(iWidth);
                            //animation
                            af_panel.$el.animate({
                                top: eTop,
                                left: eLeft,
                                height: eHeight,
                                width: eWidth
                            }, af_panel.duration);
                            break;
                        }
                        break;
                      case "bottomToTop":
                        switch (af_panel.direction) {
                          case "in":
                            var iTop = 0,
                                eTop = 0,
                                iLeft = 0,
                                eLeft = 0,
                                iHeight = 0,
                                eHeight = 0,
                                iWidth = 0,
                                eWidth = 0;
                            if (af_panel.position != 0) {
                                //partial
                                if (af_panel.z == 0) {
                                    //pasive
                                    iTop = -af_panel.position;
                                    eTop = 0;
                                    iLeft = eLeft = 0;
                                    iHeight = instance.$wrap.height() + af_panel.position;
                                    eHeight = instance.$wrap.height();
                                    iWidth = eWidth = instance.$wrap.width();
                                } else {
                                    //active
                                    iLeft = eLeft = 0;
                                    iWidth = eWidth = instance.$wrap.width();
                                    if (af_panel.width != "undefined" && af_panel.width > 0) {
                                        //intermediate
                                        iTop = instance.$wrap.height();
                                        eTop = instance.$wrap.height() -af_panel.position;
                                        iHeight = eHeight = af_panel.width;
                                    } else {
                                        //leading
                                        iTop = instance.$wrap.height();
                                        eTop = instance.$wrap.height() -af_panel.position;
                                        iHeight = eHeight = af_panel.position;
                                    }
                                }
                            } else {
                                //full
                                iTop = instance.$wrap.height();
                                eTop = 0;
                                iLeft = eLeft = 0;
                                iHeight = eHeight = instance.$wrap.height();
                                iWidth = eWidth = instance.$wrap.width();
                            }
                            _writeLog('info', '_slidePanel', "INI|"+af_panel.type+"|"+af_panel.mode+"|"+af_panel.direction+"|"+af_panel.z+"|"+instance.$wrap.width()+"x"+instance.$wrap.height(), "top:"+iTop+";left:"+iLeft+";height:"+iHeight+";width:"+iWidth);
                            _writeLog('info', '_slidePanel', "END|"+af_panel.type+"|"+af_panel.mode+"|"+af_panel.direction+"|"+af_panel.z+"|"+instance.$wrap.width()+"x"+instance.$wrap.height(), "top:"+eTop+";left:"+eLeft+";height:"+eHeight+";width:"+eWidth);

                            //positioning
                            af_panel.$el
                              .css("position", "absolute")
                              .css("top", iTop+"px")
                              .css("left", iLeft+"px")
                              .css("display", "block")
                              .height(iHeight)
                              .width(iWidth);
                            //animation
                            af_panel.$el.animate({
                                top: eTop,
                                left: eLeft,
                                height: eHeight,
                                width: eWidth
                            }, af_panel.duration);
                            break;
                        case "out":
                            var iTop = 0,
                                eTop = 0,
                                iLeft = 0,
                                eLeft = 0,
                                iHeight = 0,
                                eHeight = 0,
                                iWidth = 0,
                                eWidth = 0;
                            if (af_panel.position != 0) {
                                //partial
                                if (af_panel.z == 0) {
                                    //pasive
                                    iTop = eTop = 0;
                                    iLeft = eLeft = 0;
                                    iHeight = instance.$wrap.height();
                                    eHeight = instance.$wrap.height() + af_panel.position;
                                    iWidth = eWidth = instance.$wrap.width();
                                } else {
                                    //active
                                    iLeft = eLeft = 0;
                                    iWidth = eWidth = instance.$wrap.width();
                                    if (af_panel.width != "undefined" && af_panel.width > 0) {
                                        //intermediate
                                        iTop = af_panel.position -af_panel.width;
                                        eTop = -af_panel.width;
                                        iHeight = eHeight = af_panel.width;
                                    } else {
                                        //leading
                                        iTop = 0;
                                        eTop = -af_panel.position;
                                        iHeight = eHeight = af_panel.position;
                                    }
                                }
                            } else {
                                //full
                                iTop = 0;
                                eTop = -instance.$wrap.height();
                                iLeft = eLeft = 0;
                                iHeight = eHeight = instance.$wrap.height();
                                iWidth = eWidth = instance.$wrap.width();
                            }
                            _writeLog('info', '_slidePanel', "INI|"+af_panel.type+"|"+af_panel.mode+"|"+af_panel.direction+"|"+af_panel.z+"|"+instance.$wrap.width()+"x"+instance.$wrap.height(), "top:"+iTop+";left:"+iLeft+";height:"+iHeight+";width:"+iWidth);
                            _writeLog('info', '_slidePanel', "END|"+af_panel.type+"|"+af_panel.mode+"|"+af_panel.direction+"|"+af_panel.z+"|"+instance.$wrap.width()+"x"+instance.$wrap.height(), "top:"+eTop+";left:"+eLeft+";height:"+eHeight+";width:"+eWidth);

                            //positioning
                            af_panel.$el
                              .css("position", "absolute")
                              .css("top", iTop+"px")
                              .css("left", iLeft+"px")
                              .css("display", "block")
                              .height(iHeight)
                              .width(iWidth);
                            //animation
                            af_panel.$el.animate({
                                top: eTop,
                                left: eLeft,
                                height: eHeight,
                                width: eWidth
                            }, af_panel.duration);
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