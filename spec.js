describe("require", function() {
    it("Event", function() {
        var Event = require("./event").Event;
        expect(Event).toBeDefined();
    });
    it("events", function() {
        var events = require("./events").events;
        expect(events).toBeDefined();
    });
    it("EventTarget", function() {
        var EventTarget = require("./eventtarget").EventTarget;
        expect(EventTarget).toBeDefined();
    });
    it("EventListener", function() {
        var EventListener = require("./eventlistener").EventListener;
        expect(EventListener).toBeDefined();
    });
});

describe("EventTarget", function() {
    var Event;
    var EventTarget;
    beforeEach(function() {
        Event = require("./event").Event;
        EventTarget = require("./eventtarget").EventTarget;
    });
    it("usecase: add dispatch remove", function() {
        var finished = false;
        var target = new EventTarget();
        var listener = function(e){
            finished = true;
        }; 
        target.addEventListener("SAY", listener);
        target.dispatchEvent("SAY");
        target.removeEventListener("SAY", listener);
        expect(finished).toBeTruthy(finished);
    });
    it("usecase: two target", function() {
        var finished = false;
        var target1 = new EventTarget();
        var target2 = new EventTarget();
        var listener1 = function(e){
            target2.dispatchEvent("SAY");
        }; 
        var listener2 = function(e){
            finished = true;
        };
        target1.addEventListener("SAY", listener1);
        target2.addEventListener("SAY", listener2);
        target1.dispatchEvent("SAY");
        expect(finished).toBeTruthy(finished);
    });
    it("usecase: inherit", function() {
        var finished = false;
        var MyEventTarget = function() {};
        var _ = function(){};
        _.prototype = EventTarget.prototype;
        MyEventTarget.prototype = new _;

        var target = new MyEventTarget();
        var listener1 = function(e){
            finished = true;
        };
        target.addEventListener("SAY", listener1);
        target.dispatchEvent("SAY");
        expect(finished).toBeTruthy(finished);
    });
});
