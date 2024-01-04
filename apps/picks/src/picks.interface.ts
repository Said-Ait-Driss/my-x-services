export interface Store {
    store_id: String;
    title: String;
}

export interface CurrentOffer {
    offer_id: string;
    price: number;
    discount: number;
}

export interface PicksInterface {
    name: string;
    brand: string;
    store: Store;
    image: string;
    original_price: number;
    current_offer: CurrentOffer;
}
