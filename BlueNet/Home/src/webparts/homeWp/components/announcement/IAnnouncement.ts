export interface IAnnouncement {
    Id: number;
    Title: string;
    Description: string;
    Date: string;
    Url: string;
    imageSource: string;
    IsActive: boolean;
    ImageFile: string;
    DocumentLink: {
        Url: string;
    };
    ImageLink: {
        Url: string;
        Description: string;
    };
};
export interface ICurrentUser {
    Title: string;
};
export interface IUser {
    EMail: string;
    FirstName: string;
    LastName: string;
}

export interface IImage {
    Title: string;
    Name: string;
    ServerRelativeUrl: string;
}