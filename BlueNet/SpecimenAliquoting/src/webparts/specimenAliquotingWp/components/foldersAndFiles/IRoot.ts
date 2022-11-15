import { IResourcePath } from "@pnp/sp/utils/toResourcePath";

export interface IFolder {
  Name: string;
  isOpen: boolean;
  ServerRelativeUrl: IResourcePath | string;
  TimeCreated: string;
  "odata.id": string;
  Exists: boolean;
  IsWOPIEnabled: boolean;
  ItemCount: number;
  ProgID: string;
  ServerRelativePath: IResourcePath;
  TimeLastModified: string;
  UniqueId: string;
  WelcomePage: string;
};

export interface IFile {
  Name: string;
  ServerRelativeUrl: string;
  TimeCreated: string;
};