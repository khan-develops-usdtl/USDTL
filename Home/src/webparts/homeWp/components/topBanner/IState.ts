import { ImageFit } from '@fluentui/react/lib/Image'

export interface IImages {
    Name: string;
    ServerRelativeUrl: string;
}
export interface IImagesSpfx {
    imageSrc: string,
    title: string,
    description: string,
    showDetailsOnHover: boolean,
    Url: string,
    imageFit: ImageFit
}