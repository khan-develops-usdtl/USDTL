import { WebPartContext } from '@microsoft/sp-webpart-base'

export interface IHomeWpProps {
  context: WebPartContext
}

export interface ICurrentUser {
  Title: string;
  Email: string;
}

export interface IEmployee {
  ID: number;
  Title: string;
  Email: string;
  HireDate: string;
  BirthDate: string;
}
