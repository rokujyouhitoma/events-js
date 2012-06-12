/**
 * @constructor
 */
var Event = function(eventTypeArg, canBubbleArg, cancelableArg) {
    this.type = null;
    this.bubbles = null;
    this.cancelable = null;
    this.timeStamp = Date.now();
    this.initEvent(eventTypeArg, cancelableArg, cancelableArg);
};


/**
 * 
 */
Event.prototype.stopPropagation = function() {
    throw new Error("Not implemented yet");
};


/**
 * 
 */
Event.prototype.preventDefault = function() {
    throw new Error("Not implemented yet");
};


/**
 * @param {string} eventTypeArg .
 * @param {boolean} canBubbleArg .
 * @param {boolean} cancelableArg .
 */
Event.prototype.initEvent = function(eventTypeArg, canBubbleArg, cancelableArg) {
    if (eventTypeArg === undefined) {
        throw new Error("Not enough arguments");
    } else {
        eventTypeArg = "" + eventTypeArg;
    }
    this.type = eventTypeArg;
    this.bubbles = !!canBubbleArg;
    this.cancelable = !!cancelableArg;
};

exports.Event = Event;