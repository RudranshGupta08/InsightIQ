const EventEmitter = require("events");

class LearningEventBus extends EventEmitter {

    constructor() {

        super();

        this.setMaxListeners(100);

    }

    emitEvent(eventName, payload = {}) {

        this.emit(

            eventName,

            {

                timestamp: new Date(),

                ...payload

            }

        );

    }

    subscribe(eventName, handler) {

        this.on(

            eventName,

            handler

        );

    }

    unsubscribe(eventName, handler) {

        this.removeListener(

            eventName,

            handler

        );

    }

    subscribeOnce(eventName, handler) {

        this.once(

            eventName,

            handler

        );

    }

}

module.exports = new LearningEventBus();