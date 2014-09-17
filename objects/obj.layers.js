;(function(factory) {
  'use strict';

  if (typeof define === 'function') {
    define(['jquery'], factory);
  } else {
    factory(jQuery);
  }
})(function($){
    'use strict';

    var instances   = [];
    var defaults = {
            events: {
                initialize: function (a_panel) { },
                closed: function () { },
                log: function () { }
            }
        };
    // Private functions ----------------------------------------------------
    var _animatePanel = function (a_instance, a_panel, a_animation) {
        try {
            switch (a_animation.type) {
                case 'slide':
                    //slider panel
                    var iTop = 0,
                        eTop = 0,
                        iLeft = 0,
                        eLeft = 0,
                        iHeight = 0,
                        eHeight = 0,
                        iWidth = 0,
                        eWidth = 0,
                        iAlfa = 1,
                        eAlfa = 1;
                    if (a_animation.position === undefined) {a_animation.position = 0;}
                    if (a_animation.duration === undefined) {a_animation.duration = 500;}
                    if (a_animation.mode === undefined) {a_animation.mode = "";}
                    if (a_animation.modal === undefined) {a_animation.modal = false;}
                    if (a_animation.origin === undefined) {a_animation.origin = 0;}
                    if (a_animation.callback === undefined) {a_animation.callback = null;}
                    switch (a_animation.mode) {
                        case "rightToLeft":
                            switch (a_animation.direction) {
                                case "in":
                                    try {
                                        if (a_animation.position != 0) {
                                            //partial
                                            if (a_animation.z == 0) {
                                                //pasive
                                                iTop = eTop = 0;
                                                iLeft = -a_animation.position;
                                                eLeft = 0;
                                                iHeight = eHeight = a_instance.$el.height();
                                                iWidth = a_instance.$el.width() + a_animation.position;
                                                eWidth = a_instance.$el.width();
                                                if (a_animation.modal) {
                                                    _removeModalBk(a_instance, a_panel, a_animation);
                                                }                                        
                                            } else {
                                                //active
                                                iTop = eTop = 0;
                                                iHeight = eHeight = a_instance.$el.height();
                                                if (a_animation.width != "undefined" && a_animation.width > 0) {
                                                    //intermediate
                                                    if (a_animation.origin > 0) {
                                                        iLeft = a_instance.$el.width() - a_animation.origin;
                                                        iAlfa = 0;
                                                    } else {
                                                        iLeft = a_instance.$el.width();
                                                    }
                                                    eLeft = a_instance.$el.width() - a_animation.position;
                                                    iWidth = eWidth = a_animation.width;
                                                } else {
                                                    //leading
                                                    if (a_animation.origin > 0) {
                                                        iLeft = a_instance.$el.width() - a_animation.origin;
                                                        iAlfa = 0;
                                                    } else {
                                                        iLeft = a_instance.$el.width();
                                                    }
                                                    eLeft = a_instance.$el.width() - a_animation.position;
                                                    iWidth = eWidth = a_animation.position;
                                                }
                                            }
                                        } else {
                                            //full
                                            iTop = eTop = 0;
                                            if (a_animation.origin > 0) {                                                
                                                iLeft = a_animation.origin;
                                                iAlfa = 0;
                                            } else {
                                                iLeft = a_instance.$el.width();
                                            }
                                            eLeft = 0;
                                            iHeight = eHeight = a_instance.$el.height();
                                            iWidth = eWidth = a_instance.$el.width();
                                            if (a_animation.modal) {
                                                _removeModalBk(a_instance, a_panel, a_animation);
                                            }                                        
                                        }
                                    } catch (err) {
                                        _writeLog('error', a_animation.type+"|"+a_animation.mode+"|"+a_animation.direction+"|"+a_animation.z+"|"+a_instance.$el.width()+"x"+a_instance.$el.height(), err, err.description);
                                    }
                                    break; //in
                                case "out":
                                    try {
                                        if (a_animation.position != 0) {
                                            //partial
                                            if (a_animation.z == 0) {
                                                //pasive
                                                iTop = eTop = 0;
                                                iLeft = 0;
                                                eLeft = 0;
                                                iHeight = eHeight = a_instance.$el.height();
                                                iWidth = a_instance.$el.width();
                                                eWidth = a_instance.$el.width() +a_animation.position;
                                                if (a_animation.modal) {
                                                    _addModalBk(a_instance, a_panel, a_animation);
                                                }
                                            } else {
                                                //active
                                                iTop = eTop = 0;
                                                iHeight = eHeight = a_instance.$el.height();
                                                if (a_animation.width != "undefined" && a_animation.width > 0) {
                                                    //intermediate
                                                    iLeft = a_animation.position - a_animation.width;
                                                    if (a_animation.origin > 0) {
                                                        eLeft = -a_animation.width + a_animation.origin;
                                                        eAlfa = 0;
                                                    } else {
                                                        eLeft = -a_animation.width;
                                                    }
                                                    iWidth = eWidth = a_animation.width;
                                                } else {
                                                    //leading
                                                    iLeft = 0;
                                                    if (a_animation.origin > 0) {
                                                        eLeft = -a_animation.origin;
                                                        eAlfa = 0;
                                                    } else {
                                                        eLeft = -a_animation.position;
                                                    }
                                                    iWidth = eWidth = a_animation.position; 
                                                }
                                            }
                                        } else {
                                            //full
                                            iTop = eTop = 0;
                                            iLeft = 0;
                                            if (a_animation.origin > 0) {                                                
                                                eLeft = -a_animation.origin;
                                                eAlfa = 0;
                                            } else {
                                                eLeft = -a_instance.$el.width();
                                            }
                                            iHeight = eHeight = a_instance.$el.height();
                                            iWidth = eWidth = a_instance.$el.width();
                                            if (a_animation.z == 0 && a_animation.modal) {
                                                _addModalBk(a_instance, a_panel, a_animation);
                                            }
                                        }
                                    } catch (err) {
                                        _writeLog('error', a_animation.type+"|"+a_animation.mode+"|"+a_animation.direction+"|"+a_animation.z+"|"+a_instance.$el.width()+"x"+a_instance.$el.height(), err, err.description);
                                    }
                                    break; //out
                            }
                            break; //rightToLeft
                        case "leftToRight":
                            switch (a_animation.direction) {
                                case "in":
                                    try {
                                        if (a_animation.position != 0) {
                                            //partial
                                            if (a_animation.z == 0) {
                                                //pasive
                                                iTop = eTop = 0;
                                                iLeft = 0;
                                                eLeft = 0;
                                                iHeight = eHeight = a_instance.$el.height();
                                                iWidth = a_instance.$el.width() + a_animation.position;
                                                eWidth = a_instance.$el.width();
                                                if (a_animation.modal) {
                                                    _removeModalBk(a_instance, a_panel, a_animation);
                                                }                                        
                                            } else {
                                                //active
                                                iTop = eTop = 0;
                                                iHeight = eHeight = a_instance.$el.height();
                                                if (a_animation.width != "undefined" && a_animation.width > 0) {
                                                    //intermediate
                                                    if (a_animation.origin > 0) {
                                                        iLeft = -a_animation.width + a_animation.origin;
                                                        iAlfa = 0;
                                                    } else {
                                                        iLeft = -a_animation.width;
                                                    }
                                                    eLeft = a_animation.position - a_animation.width;
                                                    iWidth = eWidth = a_animation.width;
                                                } else {
                                                    //leading
                                                    if (a_animation.origin > 0) {
                                                        iLeft = -a_animation.origin;
                                                        iAlfa = 0;
                                                    } else {
                                                        iLeft = -a_animation.position;
                                                    }
                                                    eLeft = 0;
                                                    iWidth = eWidth = a_animation.position;
                                                }
                                            }
                                        } else {
                                            //full
                                            iTop = eTop = 0;
                                            if (a_animation.origin > 0) {
                                                iLeft = -a_animation.origin;
                                                iAlfa = 0;
                                            } else {
                                                iLeft = -a_instance.$el.width();
                                            }
                                            eLeft = 0;
                                            iHeight = eHeight = a_instance.$el.height();
                                            iWidth = eWidth = a_instance.$el.width();
                                            if (a_animation.modal) {
                                                _removeModalBk(a_instance, a_panel, a_animation);
                                            }                                        
                                        }
                                    } catch (err) {
                                        _writeLog('error', a_animation.type+"|"+a_animation.mode+"|"+a_animation.direction+"|"+a_animation.z+"|"+a_instance.$el.width()+"x"+a_instance.$el.height(), err, err.description);
                                    }
                                    break; //in
                                case "out":
                                    try {
                                        if (a_animation.position != 0) {
                                            //partial
                                            if (a_animation.z == 0) {
                                                //pasive
                                                iTop = eTop = 0;
                                                iLeft = 0;
                                                eLeft = -a_animation.position;
                                                iHeight = eHeight = a_instance.$el.height();
                                                iWidth = a_instance.$el.width();
                                                eWidth = a_instance.$el.width() + a_animation.position;
                                                if (a_animation.modal) {
                                                    _addModalBk(a_instance, a_panel, a_animation);
                                                }
                                            } else {
                                                //active
                                                iTop = eTop = 0;
                                                iHeight = eHeight = a_instance.$el.height();
                                                iLeft = a_instance.$el.width() - a_animation.position;
                                                if (a_animation.width != "undefined" && a_animation.width > 0) {
                                                    //intermediate
                                                    if (a_animation.origin > 0) {
                                                        eLeft = a_instance.$el.width() - a_animation.origin;
                                                        eAlfa = 0;
                                                    } else {
                                                        eLeft = a_instance.$el.width();
                                                    }
                                                    iWidth = eWidth = a_animation.width;
                                                } else {
                                                    //leading
                                                    if (a_animation.origin > 0) {
                                                        eLeft = a_instance.$el.width() - a_animation.origin;
                                                        eAlfa = 0;
                                                    } else {
                                                        eLeft = a_instance.$el.width();
                                                    }
                                                    iWidth = eWidth = a_animation.position;
                                                }
                                            }
                                        } else {
                                            //full
                                            iTop = eTop = 0;
                                            iLeft = 0;
                                            if (a_animation.origin > 0) {
                                                eLeft = a_animation.origin;
                                                eAlfa = 0;
                                            } else {
                                                eLeft = a_instance.$el.width();
                                            }
                                            iHeight = eHeight = a_instance.$el.height();
                                            iWidth = eWidth = a_instance.$el.width();
                                            if (a_animation.z == 0 && a_animation.modal) {
                                                _addModalBk(a_instance, a_panel, a_animation);
                                            }
                                        }
                                    } catch (err) {
                                        _writeLog('error', a_animation.type+"|"+a_animation.mode+"|"+a_animation.direction+"|"+a_animation.z+"|"+a_instance.$el.width()+"x"+a_instance.$el.height(), err, err.description);
                                    }
                                    break; //out
                            }
                            break; //leftToRight
                        case "topToBottom":
                            switch (a_animation.direction) {
                                case "in":
                                    try {
                                        if (a_animation.position != 0) {
                                            //partial
                                            if (a_animation.z == 0) {
                                                //pasive
                                                iTop = eTop = 0;
                                                iLeft = eLeft = 0;
                                                iHeight = a_instance.$el.height() + a_animation.position;
                                                eHeight = a_instance.$el.height();
                                                iWidth = eWidth = a_instance.$el.width();
                                                if (a_animation.modal) {
                                                    _removeModalBk(a_instance, a_panel, a_animation);
                                                }                                        
                                            } else {
                                                //active
                                                iLeft = eLeft = 0;
                                                iWidth = eWidth = a_instance.$el.width();
                                                if (a_animation.width != "undefined" && a_animation.width > 0) {
                                                    //intermediate
                                                    if (a_animation.origin > 0) {
                                                        iTop = -a_animation.width + a_animation.origin;
                                                        iAlfa = 0;
                                                    } else {
                                                        iTop = -a_animation.width;
                                                    }
                                                    eTop = a_animation.position -a_animation.width;
                                                    iHeight = eHeight = a_animation.width;
                                                } else {
                                                    //leading
                                                    if (a_animation.origin > 0) {
                                                        iTop = -a_animation.origin;
                                                        iAlfa = 0;
                                                    } else {
                                                        iTop = -a_animation.position;
                                                    }
                                                    eTop = 0;
                                                    iHeight = eHeight = a_animation.position;
                                                }
                                            }
                                        } else {
                                            //full
                                            if (a_animation.origin > 0) {
                                                iTop = -a_animation.origin;
                                                iAlfa = 0;
                                            } else {
                                                iTop = -a_instance.$el.height();
                                            }
                                            eTop = 0;
                                            iLeft = eLeft = 0;
                                            iHeight = eHeight = a_instance.$el.height();
                                            iWidth = eWidth = a_instance.$el.width();
                                            if (a_animation.modal) {
                                                _removeModalBk(a_instance, a_panel, a_animation);
                                            }                                        
                                        }
                                    } catch (err) {
                                        _writeLog('error', a_animation.type+"|"+a_animation.mode+"|"+a_animation.direction+"|"+a_animation.z+"|"+a_instance.$el.width()+"x"+a_instance.$el.height(), err, err.description);
                                    }
                                    break; //in
                                case "out":
                                    try {
                                        if (a_animation.position != 0) {
                                            //partial
                                            if (a_animation.z == 0) {
                                                //pasive
                                                iTop = 0;
                                                eTop = -a_animation.position;
                                                iLeft = eLeft = 0;
                                                iHeight = a_instance.$el.height();
                                                eHeight = a_instance.$el.height() + a_animation.position;
                                                iWidth = eWidth = a_instance.$el.width();
                                                if (a_animation.modal) {
                                                    _addModalBk(a_instance, a_panel, a_animation);
                                                }
                                            } else {
                                                //active
                                                iLeft = eLeft = 0;
                                                iWidth = eWidth = a_instance.$el.width();
                                                if (a_animation.width != "undefined" && a_animation.width > 0) {
                                                    //intermediate
                                                    iTop = a_instance.$el.height() - a_animation.position;
                                                    if (a_animation.origin > 0) {
                                                        eTop = a_instance.$el.height() - a_animation.origin;
                                                        eAlfa = 0;
                                                    } else {
                                                        eTop = a_instance.$el.height();
                                                    }
                                                    iHeight = eHeight = a_animation.width;
                                                } else {
                                                    //leading
                                                    iTop = a_instance.$el.height() -a_animation.position;
                                                    if (a_animation.origin > 0) {
                                                        eTop = a_instance.$el.height() - a_animation.origin;
                                                        eAlfa = 0;
                                                    } else {
                                                        eTop = a_instance.$el.height();
                                                    }
                                                    iHeight = eHeight = a_animation.position;
                                                }
                                            }
                                        } else {
                                            //full
                                            iTop = 0;
                                            if (a_animation.origin > 0) {
                                                eTop = a_animation.origin;
                                                eAlfa = 0;
                                            } else {
                                                eTop = a_instance.$el.height();
                                            }
                                            iLeft = eLeft = 0;
                                            iHeight = eHeight = a_instance.$el.height();
                                            iWidth = eWidth = a_instance.$el.width();
                                            if (a_animation.z == 0 && a_animation.modal) {
                                                _addModalBk(a_instance, a_panel, a_animation);
                                            }
                                        }
                                    } catch (err) {
                                        _writeLog('error', a_animation.type+"|"+a_animation.mode+"|"+a_animation.direction+"|"+a_animation.z+"|"+a_instance.$el.width()+"x"+a_instance.$el.height(), err, err.description);
                                    }
                                    break; //out
                            }
                            break; //topToBottom
                        case "bottomToTop":
                            switch (a_animation.direction) {
                                case "in":
                                    try {
                                        if (a_animation.position != 0) {
                                            //partial
                                            if (a_animation.z == 0) {
                                                //pasive
                                                iTop = -a_animation.position;
                                                eTop = 0;
                                                iLeft = eLeft = 0;
                                                iHeight = a_instance.$el.height() + a_animation.position;
                                                eHeight = a_instance.$el.height();
                                                iWidth = eWidth = a_instance.$el.width();
                                                if (a_animation.modal) {
                                                    _removeModalBk(a_instance, a_panel, a_animation);
                                                }                                        
                                            } else {
                                                //active
                                                iLeft = eLeft = 0;
                                                iWidth = eWidth = a_instance.$el.width();
                                                if (a_animation.width != "undefined" && a_animation.width > 0) {
                                                    //intermediate
                                                    if (a_animation.origin > 0) {
                                                        iTop = a_instance.$el.height() - a_animation.origin;
                                                        iAlfa = 0;
                                                    } else {
                                                        iTop = a_instance.$el.height();
                                                    }
                                                    eTop = a_instance.$el.height() -a_animation.position;
                                                    iHeight = eHeight = a_animation.width;
                                                } else {
                                                    //leading
                                                    if (a_animation.origin > 0) {
                                                        iTop = a_instance.$el.height() - a_animation.origin;                                                        
                                                        iAlfa = 0;
                                                    } else {
                                                        iTop = a_instance.$el.height();                                                        
                                                    }
                                                    eTop = a_instance.$el.height() -a_animation.position;
                                                    iHeight = eHeight = a_animation.position;
                                                }
                                            }
                                        } else {
                                            //full
                                            if (a_animation.origin > 0) {
                                                iTop = a_animation.origin;
                                                iAlfa = 0;
                                            } else {
                                                iTop = a_instance.$el.height();
                                            }
                                            eTop = 0;
                                            iLeft = eLeft = 0;
                                            iHeight = eHeight = a_instance.$el.height();
                                            iWidth = eWidth = a_instance.$el.width();
                                            if (a_animation.modal) {
                                                _removeModalBk(a_instance, a_panel, a_animation);
                                            }                                        
                                        }
                                    } catch (err) {
                                        _writeLog('error', a_animation.type+"|"+a_animation.mode+"|"+a_animation.direction+"|"+a_animation.z+"|"+a_instance.$el.width()+"x"+a_instance.$el.height(), err, err.description);
                                    }
                                    break; //in
                                case "out":
                                    try {
                                        if (a_animation.position != 0) {
                                            //partial
                                            if (a_animation.z == 0) {
                                                //pasive
                                                iTop = eTop = 0;
                                                iLeft = eLeft = 0;
                                                iHeight = a_instance.$el.height();
                                                eHeight = a_instance.$el.height() + a_animation.position;
                                                iWidth = eWidth = a_instance.$el.width();
                                                if (a_animation.modal) {
                                                    _addModalBk(a_instance, a_panel, a_animation);
                                                }
                                            } else {
                                                //active
                                                iLeft = eLeft = 0;
                                                iWidth = eWidth = a_instance.$el.width();
                                                if (a_animation.width != "undefined" && a_animation.width > 0) {
                                                    //intermediate
                                                    iTop = a_animation.position -a_animation.width;
                                                    if (a_animation.origin > 0) {
                                                        eTop = -a_animation.width + a_animation.origin;
                                                        eAlfa = 0;
                                                    } else {
                                                        eTop = -a_animation.width;
                                                    }
                                                    iHeight = eHeight = a_animation.width;
                                                } else {
                                                    //leading
                                                    iTop = 0;
                                                    if (a_animation.origin > 0) {
                                                        eTop = -a_animation.origin;
                                                        eAlfa = 0;
                                                    } else {
                                                        eTop = -a_animation.position;
                                                    }
                                                    iHeight = eHeight = a_animation.position;
                                                }
                                            }
                                        } else {
                                            //full
                                            iTop = 0;
                                            if (a_animation.origin > 0) {
                                                eTop = -a_animation.origin;
                                                eAlfa = 0;
                                            } else {
                                                eTop = -a_instance.$el.height();
                                            }
                                            iLeft = eLeft = 0;
                                            iHeight = eHeight = a_instance.$el.height();
                                            iWidth = eWidth = a_instance.$el.width();
                                            if (a_animation.z == 0 && a_animation.modal) {
                                                _addModalBk(a_instance, a_panel, a_animation);
                                            }
                                        }
                                    } catch (err) {
                                        _writeLog('error', a_animation.type+"|"+a_animation.mode+"|"+a_animation.direction+"|"+a_animation.z+"|"+a_instance.$el.width()+"x"+a_instance.$el.height(), err, err.description);
                                    }
                                    break; //out
                            }
                            break; //bottomToTop
                        default: //direction
                            iTop = eTop = 0;
                            iLeft = eLeft = 0;
                            iHeight = eHeight = a_instance.$el.height();
                            iWidth = eWidth = a_instance.$el.width();
                            if (a_animation.direction == "in" && a_animation.modal) {
                                _removeModalBk(a_instance, a_panel, a_animation);
                            } else if (a_animation.direction == "out" && a_animation.modal) {
                                _addModalBk(a_instance, a_panel, a_animation);
                            }
                            break; //default
                    }
                    _writeLog('info', '_animatePanel', "INI|"+a_animation.type+"|"+a_animation.mode+"|"+a_animation.direction+"|"+a_animation.z+"|"+a_instance.$el.width()+"x"+a_instance.$el.height(), "top:"+iTop+";left:"+iLeft+";height:"+iHeight+";width:"+iWidth+";alfa:"+iAlfa);
                    _writeLog('info', '_animatePanel', "END|"+a_animation.type+"|"+a_animation.mode+"|"+a_animation.direction+"|"+a_animation.z+"|"+a_instance.$el.width()+"x"+a_instance.$el.height(), "top:"+eTop+";left:"+eLeft+";height:"+eHeight+";width:"+eWidth+";alfa:"+eAlfa);
                    //positioning
                    a_panel.$el
                      .css("position", "absolute")
                      .css("top", iTop+"px")
                      .css("left", iLeft+"px")
                      .css("display", "block")
                      .css("opacity", iAlfa)
                      .height(iHeight)
                      .width(iWidth);

                    // animation
                    a_panel.$el.animate({
                        top: eTop,
                        left: eLeft,
                        height: eHeight,
                        width: eWidth,
                        opacity: eAlfa
                    }, a_animation.duration
                    , function () {
                        if (a_animation.callback != null) {
                            _writeLog('info', '_animatePanel', "Callback triggered", "");
                            a_animation.callback();
                        }
                    });
                    break; //slider
                case 'dialog':
                    //dialog panel
                    //ToDO
                    break; //dialog
            }

        } catch (err) {
            _writeLog('error', '_animatePanel', err, err.description);
        }
    };
    var _addModalBk = function (a_instance, a_panel, a_animation) {
        try {
            if (a_animation.duration == "undefined" || a_animation.duration == "") {a_animation.duration = 500;}
            var $bk = $("<div></div>");
            $bk
                .css("top", "0px")
                .css("left", "0px")
                .css("opacity", "0")
                .height(a_instance.$el.height())
                .width(a_instance.$el.width())
                .addClass("bk-modal")
                .animate({
                    opacity: 0.8
                }, a_animation.duration);
            a_panel.$el
                .after($bk)
                .css("-webkit-filter", "blur(1px)")
                .css("-moz-filter", "blur(1px)")
                .css("-o-filter", "blur(1px)")
                .css("-ms-filter", "blur(1px)")
                .css("filter", "blur(1px)")
                .css("z-index", "-1");
            _writeLog('info', '_addModalBk', "Add modal panel", "");

        } catch (err) {
            _writeLog('error', '_addModalBk', err, err.description);
        }
    }
    var _removeModalBk = function (a_instance, a_panel, a_animation) {
        try {
            if (a_animation.duration == "undefined" || a_animation.duration == "") {a_animation.duration = 500;}
            var $bk = a_instance.$el.children(".bk-modal");
            $bk
                .animate({
                    opacity: 0
                }, a_animation.duration, function() {
                    $(this).remove();
                });
            a_panel.$el
                .css("-webkit-filter", "")
                .css("-moz-filter", "")
                .css("-o-filter", "")
                .css("-ms-filter", "")
                .css("filter", "")
                .after($bk)
                .css("z-index", "0");
            _writeLog('info', '_removeModalBk', "Remove modal panel", "");

        } catch (err) {
            _writeLog('error', '_removeModalBk', err, err.description);
        }
    }
    var _addPanel = function (a_instance, a_panel) {
        try {
            var found = false;
            $.each(a_instance.panels, function (af_panel) {
                if (af_panel.id == a_panel.id) {
                    found = true;
                    return false; //exit the loop                    
                }
            });
            if (!found) {
                if (a_instance.$el.children("#"+a_panel.id).length == 0) {
                    a_panel.$el.appendTo(a_instance.$el);
                }
                a_instance.panels.push(a_panel);
            }
        } catch (err) {
            _writeLog('error', '_addPanel', err, err.description);
        }
    }
    var _getPanel = function (a_instance, a_id) {
        try {
            var panel = null;
            $.each(a_instance.panels, function () {
                if (this.id == a_id) {
                    panel = this;
                    return false; //exit the loop                    
                }
            });
            return panel;
        } catch (err) {
            _writeLog('error', '_getPanel', err, err.description);
        }
    }
    var _writeLog = function (a_type, a_function, a_msg, a_info) {
        defaults.events.log('obj.layers', a_type, a_function, a_msg, a_info);
    };
    // The Layer object
    var Layers = function(a_el) {
        this.el       = a_el;
        this.$el      = $(a_el);
        this.$el
            .css("overflow", "hidden")
            .css("position", "relative");
        this.panels   = [];

        // Register this instance
        this.instanceNumber = instances.length;
        instances.push(this);
        // Save the reference
        this.$el.data('layer-instance', this.instanceNumber);
        _writeLog('infoData', 'Constructor', 'New instance', this.instanceNumber);
        return this;
    };
    $.extend(Layers.prototype, {
        addPanels: function(a_panels) {
            var lyrs = this;
            $.each(a_panels, function () {
                if (this.$el.length >0) {
                    _addPanel(lyrs, this);
                }
            });
        },
        animate: function(a_options) {
            var panel = _getPanel(this, a_options.id);
            if (panel) {
                _animatePanel(this, panel, a_options);
            } else {
                _writeLog('warning', 'animate', 'Panel not found', a_options.id);
            }
        }
    });
    // Register the jQuery selector actions
    $.fn.layers = function() {
        var argumentsArray = Array.prototype.slice.call(arguments, 0);
        _writeLog('infoData', 'layers', 'selector action', argumentsArray);
        return this.each(function() {
            // If no data was set, jQuery.data returns undefined
            var instanceNumber = $(this).data('layer-instance');
            // Verify if we already have a layer for this element ...
            var instance = null;
            if (instanceNumber !== undefined) {
                instance = instances[instanceNumber];
            } else {
                // ... if not we create an instance
                instance = new Layers(this);
            }
            var method = argumentsArray[0];
            if (method !== undefined) {
                if(Layers.prototype.hasOwnProperty(method)) {
                    instance[method].apply(instance, argumentsArray.slice(1));
                    // If method look like a date try to set a new final date
                } else {
                    $.error('Method %s does not exist on jQuery.Layers'
                        .replace(/\%s/gi, method));
                }                
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