export const myRabbitMqConfig = {
    rabbitMq_uri: 'amqp://localhost',
    store: {
        routing_key: 'store_service_outgoing_key',
        extchange: 'store-service-exchange',
        name: 'STORE_SERVICE',
        queue: 'STORE_QUEUE',
        clients: {
            picks: {
                queue: 'PICKS_QUEUE',
            },
        },
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
            orders: {
                queue: 'ORDERS_QUEUE',
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
    picks: {
        queue: 'PICKS_QUEUE',
        name: 'PICKS_SERVICE',
        client: {},
    },
    offers: {
        queue: 'OFFERS_QUEUE',
        name: 'OFFERS_SERVICE',
        clients: {
            picks: {
                queue: 'PICKS_QUEUE',
            },
        },
    },

    user: {
        queue: 'USER_QUEUE',
        name: 'USER_SERVICE',
        clients: {
            orders: {
                queue: 'ORDERS_QUEUE',
            },
        },
    },
    orders:{
        queue: 'ORDERS_QUEUE',
        name: 'ORDERS_SERVICE',
        clients: {

        },
    }
};
