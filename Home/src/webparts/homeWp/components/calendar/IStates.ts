export interface ICalendar {
    id: string;
    title: string;
    start: string;
    end: string;
    url: string;
    allDay: boolean;
}
export interface IDialogConfig {
    dialogUrl: any,
    hideDialog: boolean,
}