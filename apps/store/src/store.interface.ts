export interface ContactInfoInterface {
  contact_infos_id: string;
  adress: string;
  tel: string;
}

export interface HeadquarterInterface {
  headquarter_id: string;
  adress: string;
  tel: string;
}


export interface CategoryInterface {
  store_category_id: string;
  title: string;
  image: string;
}

export interface StoreInterface {
  title: string;
  longitude: string;
  latitude: string;
  contact_infos: ContactInfoInterface;
  headquarter: HeadquarterInterface;
  store_category: CategoryInterface;
}
