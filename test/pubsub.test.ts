import { expect } from 'chai';
import { PubSub } from '../pubsub';

describe('Testing PubSub class', () => {
    it('Should be able to subcribe to specified eventType, and receive events on that topic', () => {
        let message;
        const pubsub = new PubSub();
        const testFunction = (data: any) => {
            message = data;
        };
        pubsub.subscribe('test-event-type', (data) => message = data);
        pubsub.notify('test-event-type', 'test-message');
        expect(message).to.equal('test-message');
    });
    it('Should be able to unSubcribe from specified eventType, and no longer receive events on that topic', () => {
        let message;
        const pubsub = new PubSub();
        const testFunction = (data: any) => {
            message = data;
        };
        pubsub.subscribe('test-event-type', testFunction);
        pubsub.unSubscribe('test-event-type', testFunction);
        pubsub.notify('test-event-type', 'test-message');
        expect(message).to.be.undefined;
    });
    it('Should send messages to correct eventType only', () => {
        let message1, message2;
        const pubsub = new PubSub();
        pubsub.subscribe('test-event-type', (data) => message1 = data);
        pubsub.subscribe('test-event-type-2', (data) => message2 = data);
        pubsub.notify('test-event-type', 'message1');
        pubsub.notify('test-event-type-2', 'message2');
        expect(message1).to.equal('message1');
        expect(message2).to.equal('message2');
    });

});
