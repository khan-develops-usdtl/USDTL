export interface IReading {
    ID: number;
    Title: string;
    Description: string;
    Category: string;
    Date: string;
    AverageRating: number;
    ReviewJSON: string;

};
export interface IUserProfile {
    PictureUrl: string
}
export interface IReview {
    ID: string;
    Comment: string;
    Rating: number;
    Created: string;
    Author: {
        Title: string;
    };
    Book: {
        Id: number
    };
    ImageUrl: {
        Url: string;
    };
};