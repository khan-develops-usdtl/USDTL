import "@pnp/sp/webs";
import "@pnp/sp/items";
import "@pnp/sp/files";
import "@pnp/sp/lists";
import "@pnp/sp/folders";
import "@pnp/sp/profiles";
import { sp } from "@pnp/sp";
import * as React from "react";
import * as moment from "moment";
import "@pnp/sp/site-users/web";
import { MONTHS } from "../../Constants";
import { useEffect, useState } from "react";
import styles from "./IBirthday.module.scss";
import { IEmailProperties } from "@pnp/sp/sputilities";
import { ICurrentUser, IEmployee } from "../IHomeWpProps";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

export const Birthday = ({ context }) => {
  const [currentUser, setCurrentUser] = useState<ICurrentUser>({ Title: "", Email: "" });
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [userBirthdate, setUserBirthdate] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("Email sent successfully");
  const [severity, setSeverity] = useState<"error" | "info" | "success" | "warning">("success");

  useEffect(() => {
    sp.setup({ spfxContext: context });
    _getEmployees();
  }, []);

  const _getEmployees = async () => {
    const currentUserRes = await sp.web.currentUser();
    setCurrentUser(currentUserRes);
    const employeesRes: IEmployee[] = await sp.web.lists
      .getByTitle("Employee List")
      .items.top(5000)
      .get();
    setEmployees(employeesRes);
  };

  const _createOrUpdateBirthdate = async (
    employees: IEmployee[],
    user: ICurrentUser,
    birthdate: string,
    event
  ) => {
    event.preventDefault();
    if (employees.some((employee) => employee.Title === user.Title)) {
      if (!employees.filter((employee) => employee.Title === user.Title)[0].BirthDate) {
        await sp.web.lists
          .getByTitle("Employee List")
          .items.getById(employees.filter((employee) => employee.Title === user.Title)[0].ID)
          .update({
            BirthDate: moment(birthdate).format("MM/DD"),
          });
      }
    } else {
      await sp.web.lists.getByTitle("Employee List").items.add({
        Title: currentUser.Title,
        Email: currentUser.Email,
        BirthDate: moment(birthdate).format("MM/DD"),
        HireDate: null,
      });
    }
    _getEmployees();
  };

  const _isBirthdayExists = (employees: IEmployee[], user: ICurrentUser) => {
    if(employees.some(employee => employee.Title === user.Title)) {
      return employees.filter(employee => employee.Title === user.Title)[0].BirthDate !== null
    } else {
      return false
    }
    // return employees.some(employee => employee.Title === user.Title) && employees.filter(employee => employee.Title === user.Title)[0].BirthDate !== null
    
  };

  const _getBirthDay = (birthDate: string) => {
    return birthDate ? Number(birthDate.split("/")[1]) : null;
  };

  const _getBirthMonth = (birthDate: string) => {
    return birthDate ? Number(birthDate.split("/")[0]) : null;
  };

  const _sortedAndFilteredEmployees = (employees: IEmployee[]) => {
    return employees
      .filter(
        (sortedEmployee) =>
          _getBirthMonth(sortedEmployee.BirthDate) === Number(new Date().getMonth()) + 1
      )
      .sort((a, b) => _getBirthDay(a.BirthDate) - _getBirthDay(b.BirthDate));
  };

  const _setEmailBody = () => {
    let str = ``;
    _sortedAndFilteredEmployees(employees).map(
      (employee) =>
        (str =
          str +
          `  
    <tr>        
      <td style="padding-right:24px;">${employee.Title}</td>
      <td style="padding-right:24px;">${employee.BirthDate}</td>
    <tr>
    `)
    );
    return str;
  };
  const _setEmailProp = (email: string): IEmailProperties => {
    const emailProps: IEmailProperties = {
      To: [email],
      Subject: `${MONTHS[new Date().getMonth()]} BIRTHDAYS`,
      From: "support@usdtl.com",
      AdditionalHeaders: {
        "content-type": "text/html",
      },
      Body: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta name="x-apple-disable-message-reformatting">
        <title></title>
      </head>
      <body>
      <h3>${MONTHS[new Date().getMonth()]} BIRTHDAYS</h3>
        <table font-size:16px;text-align:left;">
          <tr style="border-bottom:2px solid #ddd;">
            <th style="padding-top:12px;padding-bottom:12px;text-align:left;">Name</th>
            <th style="padding-top:12px;padding-bottom:12px;text-align:left;">Birthday</th>
          </tr>
          ${_setEmailBody()} 
        </table>
      </body>
      </html>
      `,
    };
    return emailProps;
  };
  const _sendEmail = async () => {
    await Promise.all(
      ["batsaikhan.ulambayar@usdtl.com", "priti.soni@usdtl.com", "matt.russell@usdtl.com"].map(
        async (email) => await sp.utility.sendEmail(_setEmailProp(email))
      )
    )
      .then(() => {
        setMessage("succes");
        setSeverity("success");
        setIsSnackbarOpen(true);
      })
      .catch((error) => {
        setMessage(error.toString());
        setSeverity("error");
        setIsSnackbarOpen(true);
      });
  };

  const _handleSnackbarClose = (e?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbarOpen(false);
  };

  return (
    <div className={styles.birthdayWp}>
      <div className={styles.heading}>
        <i className="fa fa-birthday-cake fa-lg" aria-hidden="true"></i>{" "}
        {MONTHS[new Date().getMonth()]} BIRTHDAYS
        {(currentUser.Title === "Priti Soni" ||
          currentUser.Title === "Batsaikhan Ulambayar" ||
          currentUser.Title === "Matt Russell") && (
            <Button
              style={{ fontSize: "0.7em", float: "right" }}
              onClick={() => setIsDialogOpen(true)}>
              Send {MONTHS[new Date().getMonth()]} birthdays
            </Button>
          )}
      </div>
      <div className={styles.container}>
        {_isBirthdayExists(employees, currentUser) ? (
          <div>
            {_sortedAndFilteredEmployees(employees).map((employee) => (
              <div className={styles.content}>
                <div className={styles.day}>{_getBirthDay(employee.BirthDate)}</div>
                <div className={styles.name}>{employee.Title}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.formContainer}>
            <div className={styles.birthdayEntryRequest}>
              Oops! Looks like you have not entered your birthdate for the Monthly Birthday
              Celebration. Please enter your birthdate.
            </div>
            <input
              className={styles.dateField}
              type="date"
              id="start"
              name="birhtdate"
              onChange={(e) => setUserBirthdate(e.target.value)}
              max={moment(new Date()).format("YYYY-MM-DD")}></input>
            <button
              className={styles.submitButton}
              onClick={(event) =>
                _createOrUpdateBirthdate(employees, currentUser, userBirthdate, event)
              }
              disabled={userBirthdate === ""}>
              Submit
            </button>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} maxWidth="md" onClose={() => setIsDialogOpen(false)}>
        <DialogContent dividers={true}>
          <DialogContentText style={{ fontSize: "large" }}>
            Please confirm to send your email.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            style={{ fontSize: "small" }}
            variant="outlined"
            color="primary"
            onClick={() => {
              _sendEmail();
              setIsDialogOpen(false);
            }}>
            Confirm
          </Button>
          <Button
            autoFocus
            style={{ fontSize: "small" }}
            variant="outlined"
            color="secondary"
            onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setIsSnackbarOpen(false)}>
        <Alert onClose={_handleSnackbarClose} severity={severity} style={{ fontSize: "large" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
