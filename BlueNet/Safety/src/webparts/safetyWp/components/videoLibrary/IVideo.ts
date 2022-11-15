export interface IVideo {
    Title: string;
    Category: string;
    VideoLink: IVideoLink;
    VideoImage: IImageLink;
}

export interface IVideoLink {
    Url: string;
}
export interface IImageLink {
    Url: string;
}