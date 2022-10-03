export type TCategoryAttributes = {
    name: string;
    createdAt: string;
    updatedAt: string;
}

export type TCategory = {
    id: number;
    attributes: TCategoryAttributes;
}

export type TCategories = {
    data: TCategory[] | []
}