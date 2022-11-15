export interface IFile {
    Name: string;
    ServerRelativeUrl: string;
    TimeCreated: string;
};
export interface IFilesInFolder {
    FolderName: string;
    Files: IFile[];
}
export interface IVideo {
    Title: string;
    Created: string;
    ThumbnailImage: {
        Url: string;
    }
    VideoLink: {
        Url: string;
    }
}