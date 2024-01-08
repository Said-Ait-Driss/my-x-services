export interface ClientInterface {
    client_id: string;
    username: string;
}

export interface HeadquarterInterface {
    headquarter_id: string;
    title: string;
}

export interface OrdersInterface {
    order_date: string;
    client: ClientInterface;
    headquarter: HeadquarterInterface;
    status: string;
    picks_count: number;
}
