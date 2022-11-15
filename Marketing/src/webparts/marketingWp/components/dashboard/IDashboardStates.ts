import { IDashboardOStates } from './IDashboardOStates'

export interface IDashboardStates {
    requests: IDashboardOStates[];
    statusOptions: string[];
    assignedToOptions: string[];
    priorityOptions: string[];
    categoryOptions: string[];
    selected: number[];
    searchValue: string;
    isFormVisible: boolean;
    page: number;
    rowsPerPage: number;
    formErrorMessage: string;
    currentUserRequestNumber: number;

    currentUser: {
        Id: number;
        Email: string;
        LoginName: string;
        Title: string;
    }
    adminIT: {
        Id: number;
        Email: string;
        LoginName: string;
        Title: string;
    }
    adminMarketing: {
        Id: number;
        Email: string;
        LoginName: string;
        Title: string;
    }
    Title: string;
    Description: string;
    Priority: string;
    Location: string;
    Category: string;
}