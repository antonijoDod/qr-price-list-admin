import { TCategories } from 'types/categories'

export type TImageFormat = {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path: string | null;
    width: number;
    height: number;
    size: number;
    url: string
}

export type TImageFormats = {
    thumbnail: TImageFormat;
    small?: TImageFormat;
    medium?: TImageFormat;
    large?: TImageFormat;
}

export type TImageAttributes = {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    formats: TImageFormats;
    previewUrl: string | null;
    provider: string | null;
    createdAt: string;
    updatedAt: string;
}

export type TImage = {
    id: number;
    attributes: TImageAttributes;
}

export type TImageData = {
    data: TImage
}

export type TBusinessAttributes = {
    name: string | null;
    slug: string | null;
    description: string | null;
    phone: string | null;
    location: string | null;
    createdAt: string;
    updatedAt: string;
    short_name: string | null;
    image: TImageData;
    categories: TCategories
}

export type TBusiness = {
    id: number;
    attributes: TBusinessAttributes
}

export type TBusinesses = {
    data: TBusiness[] | []
    meta: TMeta
}

export type TMeta = {
    pagination: TPagination
}

export type TPagination = {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number
}