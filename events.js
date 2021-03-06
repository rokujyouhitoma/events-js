var EventListener = require("./eventlistener").EventListener;
var Event = require("./event").Event;


var uidCounter_ = 0;
var UID_PROPERTY_ = 'uid_' + Math.floor(Math.random() * 2147483648).toString(36);
function getUid(obj) {
    return obj[UID_PROPERTY_] || (obj[UID_PROPERTY_] = ++uidCounter_);
};

var events = {};


/**
 * Container for storing event listeners and their proxies
 * @private
 * @type {Object.<goog.events.Listener>}
 */
events.listeners_ = {};


/**
 * @param {EventTarget} src .
 * @param {string} type .
 * @param {Function} listener .
 * @param {boolean=} opt_capt .
 */
events.listen = function(src, type, listener) {
    if(!type) {
        throw Error('Invalid event type');
    }

    /** @type {Listener} */
    var listenerObj = new EventListener();
    listenerObj.init(listener, src, type);

    var srcUid = getUid(src);

    var key = listenerObj.key;

    if (!events.listeners_[type]) {
        events.listeners_[type] = [];
    }
    events.listeners_[type].push(listenerObj);

    return key;
};


/**
 * @param {EventTarget} src .
 * @param {string} type .
 * @param {Function} listener . 
 */
events.unlisten = function(src, type, listener) {
    var map = events.listeners_;
    if(!type in map) {
        return false;
    }
    var listeners = map[type];
    for(var key in listeners) {
        if(listeners[key].listener === listener && listeners[key].src === src && listeners[key].type === type) {
            delete listeners[key];
        }
    }
    return false;
};


/**
 * @param {EventTarget} src .
 * @param {string|Event} e .
 */
events.dispatchEvent = function(src, e) {
    var type = e.type || e;
    var map = events.listeners_;
    if (!type in map) {
        return true;
    }
    if(typeof e === "string") {
        e = new Event(e, src);
    } else {
        e.target = e.target || src;
    }
    var listeners = map[type];
    for(var i = 0; i < listeners.length; ++i) {
        var listener = listeners[i];
        if(listener && listener.src === src) {
            var result = events.fireListener(listener, e);
        }
    }
    return null;
};


/**
 * @param {Function} listener .
 * @param {Event} eventObject .
 * @return {boolean} .
 */
events.fireListener = function(listener, eventObject) {
    return listener.handleEvent(eventObject);
};


/**
 * @private
 */
events.removeBySrc_ = function(src) {
    var map = events.listeners_;
    var events_;
    var type;
    var key;
    for(type in map) {
        events_ = map[type];
        for(key in events_) {
            if(src === events_[key].src) {
                delete events_[key];
            }
        }
    }
};


/**
 * @private
 */
events.removeAll_ = function() {
    var map = events.listeners_;
    var events_;
    var type;
    var key;
    for(type in map) {
        events_ = map[type];
        for(key in events_) {
            delete events_[key];
        }
    }
    events.listeners_ = {};
};


/**
 * @private
 */
events.cleanUp_ = function() {
    var map = events.listeners_;
    var events_;
    var type;
    var key;
    for(type in map) {
        events_ = map[type];
        var i = events_.length;
        while(i--) {
            if(events_[i] === undefined) {
                events_.splice(i, 1);
            }
        }
        if(events_.length === 0) {
            delete map[type];
        }
    }
};


exports.events = events;