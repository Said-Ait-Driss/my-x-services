export const myRabbitMqConfig = {
    rabbitMq_uri: 'amqp://localhost',
    store: {
        routing_key: 'store_service_outgoing_key',
        extchange: 'store-service-exchange',
        name: 'STORE_SERVICE',
        queue: 'STORE_QUEUE',
    },
    store_category: {
        queue: 'STORE_CATEGORIES_QUEUE',
        name: 'STORE_CATEGORIES_SERVICE',
        clients: {
            store: {
                queue: 'STORE_QUEUE',
            },
        },
    },
    headquarter: {
        queue: 'HEADQUARTER_QUEUE',
        name: 'HEADQUARTER_SERVICE',
        clients: {
            store: {
                queue: 'STORE_QUEUE',
            },
        },
    },
    contact_infos: {
        queue: 'CONTACT_INFOS_QUEUE',
        name: 'CONTACT_INFOS_SERVICE',
        clients: {
            store: {
                queue: 'STORE_QUEUE',
            },
            user: {
                queue: 'USER_QUEUE',
            },
        },
    },
};
