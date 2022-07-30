export interface ItemsInterface {
    id?: number;
    name: string,
    description: string,
    quantity: number,
    inCart: boolean,
    image: string
}

export enum keywordTypes {
    items = "items",
    id = "id",
    inCart = "inCart"
}