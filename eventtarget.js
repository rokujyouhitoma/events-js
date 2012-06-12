var events = require("./events").events;


/**
 * http://www.w3.org/2003/01/dom2-javadoc/org/w3c/dom/events/EventTarget.html
 * @constructor
 */
var EventTarget = function() {};


/**
 * This method allows the registration of event listeners on the event target.
 * @param {String} type .
 * @param {Function} listener .
 * @param {Boolean?} useCapture .
 * @return {Boolean} .
 */
EventTarget.prototype.addEventListener = function(type, listener, useCapture) {
    events.listen(this, type, listener, useCapture);
};


/**
 * This method allows the dispatch of events into the implementations event model.
 * @param {Event} evt .
 */
EventTarget.prototype.dispatchEvent = function(evt) {
    events.dispatchEvent(this, evt);
};


/**
 * @param {String} type .
 * @param {Function} listener .
 * @param {Boolean?} useCapture .
 */
EventTarget.prototype.removeEventListener = function(type, listener, useCapture) {
    events.unlisten(this, type, listener, useCapture);
};


exports.EventTarget = EventTarget;
