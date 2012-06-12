/**
 * @constructor
 */
var EventListener = function() {};

/**
 * Counter used to create a unique key
 * @type {number}
 * @private
 */
EventListener.counter_ = 0;


/**
 * The key of the listener.
 * @type {number}
 */
EventListener.prototype.key = 0;


/**
 * Whether the listener is a function or an object that implements handleEvent.
 * @type {boolean}
 * @private
 */
EventListener.prototype.isFunctionListener_;


/**
 * Initializes the listener.
 * @param {Function|Object} listener Callback function, or an object with a
 *     handleEvent function.
 * @param {Object} src Source object for the event.
 * @param {string} type Event type.
 * @param {boolean} capture Whether in capture or bubble phase.
 * @param {Object=} opt_handler Object in whose context to execute the callback.
 */
EventListener.prototype.init = function(listener, src, type, capture,
                                        opt_handler) {
    if (listener instanceof Function) {
        this.isFunctionListener_ = true;
    } else if (listener && listener.handleEvent && listener.handleEvent instanceof Function) {
        this.isFunctionListener_ = false;
    } else {
        throw Error('Invalid listener argument');
    }
    this.listener = listener;
    this.src = src;
    this.type = type;
    this.capture = !!capture;
    this.handler = opt_handler ? opt_handler : null;
    this.key = ++EventListener.counter_;
};


/**
 * This method is called whenever an event occurs of the type for which the EventListener interface was registered.
 * @param {Event} evt event Object.
 */
EventListener.prototype.handleEvent = function(evt) {
    if (this.isFunctionListener_) {
        return this.listener.call(this.handler || this.src, evt);
    }
    return this.listener.handleEvent.call(this.listener, evt);
};


exports.EventListener = EventListener;