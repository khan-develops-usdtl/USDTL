import * as React from "react";
import { useEffect, useState } from "react";
import { IContextInfo } from "@pnp/sp/sites";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/items";
import "@pnp/sp/lists";
import "@pnp/sp/sputilities";
import "@pnp/sp/site-users/web";
import "@pnp/sp/site-groups/web";
import { IEmailProperties } from "@pnp/sp/sputilities";
import styles from "./Announcement.module.scss";
import {
  Grid,
  Snackbar,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Checkbox,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { IAnnouncement, ICurrentUser, IImage, IUser } from "./IAnnouncement";

const Announcement = ({ context }) => {
  const [announcements, setAnnouncements] = useState<IAnnouncement[]>([]);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("Email sent successfully");
  const [severity, setSeverity] = useState<"error" | "info" | "success" | "warning">("success");
  const [currentUser, setCurrentUser] = useState<ICurrentUser>({ Title: "" });
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<IAnnouncement[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [images, setImages] = useState<IImage[]>([]);
  const [imageSource, setImageSource] = useState<String>("");

  useEffect(() => {
    sp.setup({ spfxContext: context });
    _getImages();
    _getAnnouncements();
    _getCurrentUser();
    _getGroups();
  }, [selected]);

  const _getImages = async () => {
    const imagesRes = await sp.web.getFolderByServerRelativePath("Announcements Images").files();
    setImages(imagesRes);
    
 

  };

  const _getAnnouncements = async () => {
    const announcementsRes = await sp.web.lists.getByTitle("Announcements").items.get();
    setAnnouncements(announcementsRes);
  };

  const _getGroups = async () => {
    const users = await sp.web.siteUserInfoList.items.top(5000).get();
  };

  const _getCurrentUser = async () => {
    const currentUserRes = await sp.web.currentUser();
    setCurrentUser(currentUserRes);
  };

  const _handleSnackbarClose = (e?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbarOpen(false);
  };

  const _setBody = () => {
    let str = ``;
    selected
      .sort((a, b) => a.Id - b.Id)
      .map(
        (announcement) =>
          (str =
            str +
            `          
    <div style="padding-top:36px;padding-bottom:72px;margin-bottom:36px;border-bottom:2px solid #e1e1e1;">
        
          <img src=${announcement.ImageLink.Url} alt="BLUENET ANNOUNCEMENT" width="auto" height="250"/>

      <div style="color:#1347a4;font-size:20px;font-weight:700;padding: 0; margin-top: 20px;">${
        announcement.Title
      }</div>
      <div style="color:#000;opacity:0.7;font-size:16px;font-weight:700;padding-bottom:12px;">Posted on ${new Date(
        announcement.Date
      ).toLocaleDateString("en-US")}</div>
      <div>${announcement.Description}</div>
    </div> 
    `)
      );
    return str;
  };
  const _setEmailProp = (email: string): IEmailProperties => {
    const emailProps: IEmailProperties = {
      To: [email],
      Subject: "BlueNet Announcement",
      From: "marketing@usdtl.com",
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
        ${_setBody()} 
      </body>

    
      </html>
      `,
      
    };
    return emailProps;
  };
  const _sendEmail = async () => {
    // await sp.utility.sendEmail(_setEmailProp("priti.soni@usdtl.com"))
    // await sp.utility.sendEmail(_setEmailProp("mehdia.shams@usdtl.com"))

     const users: IUser[] = await sp.web.siteUserInfoList.items.top(5000).get();
     await Promise.all(
     users.map(async (user) => {
     if (user.EMail && user.EMail.split("@")[1] === "usdtl.com") {
        await sp.utility.sendEmail(_setEmailProp(user.EMail));
       }
      })
    )
      .then(() => {
        setMessage("succes");
        setSeverity("success");
        setIsSnackbarOpen(true);
        setSelected([]);
      })
      .catch((error) => {
        setMessage(error.toString());
        setSeverity("error");
        setIsSnackbarOpen(true);
        setSelected([]);
      });
  };

  const _getSorted = (announcement: IAnnouncement[]) => {
    return announcement.sort(
      (obj1, obj2) => new Date(obj2.Date).getTime() - new Date(obj1.Date).getTime()
    );
  };

  const _handleCheck = (e: React.ChangeEvent<HTMLInputElement>, announcement: IAnnouncement) => {
    if (selected.length < 1) {
      setSelected((prevSelected) => [...prevSelected, announcement]);
      return;
    }
    if (selected.filter((item) => item.Id === announcement.Id).length > 0) {
      const newSelected = selected.filter((item) => item.Id !== announcement.Id);
      setSelected(newSelected);
      return;
    }
    setSelected((selected) => [...selected, announcement]);
  };

  return (
    <div className={styles.announcementWp}>
      <div>
        <div className={styles.mainHeading}>
          <i className="fa fa-bullhorn fa-lg" aria-hidden="true"></i> ANNOUNCEMENTS
          <span style={{ float: "right" }}>
            {selected.length > 0 && (
              <Button style={{ fontSize: "0.7em" }} onClick={() => setIsDialogOpen(true)}>
                Send
              </Button>
            )}
          </span>
        </div>
      </div>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setIsSnackbarOpen(false)}>
        <Alert onClose={_handleSnackbarClose} severity={severity} style={{ fontSize: "large" }}>
          {message}
        </Alert>
      </Snackbar>
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
      <div className={styles.container}>
        {_getSorted(announcements).map(
          (announcement) =>
            announcement && announcement.IsActive && (
              <Grid container className={styles.gridContainer} spacing={1}>
                <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
                  {announcement && announcement.DocumentLink ? (
                    <a href={announcement.DocumentLink.Url ? announcement.DocumentLink.Url : '' } target="_blank">
                      <img className={styles.announcementImage} src={announcement.ImageLink.Url} />
                    </a>
                  ) : (
                    <img className={styles.announcementImage} src={announcement.ImageLink.Url} />
                  )}
                </Grid>
                <Grid item xs={12} sm={8} md={9} lg={9} xl={9}>
                  <Grid container className={styles.gridContainer} spacing={1}>
                    <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
                      <div className={styles.announcementHeading}>{announcement.Title}</div>
                      <div className={styles.announcementDate}>
                        Posted on {new Date(announcement.Date).toLocaleDateString("en-US")}
                      </div>
                    </Grid>
                    <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                      {(currentUser.Title === "Matt Russell" ||
                        currentUser.Title === "Priti Soni" ||
                        currentUser.Title === "Michelle Lach" ||
                        currentUser.Title === "Michaela Bennett" ||
                        currentUser.Title === "Madeline Lange" ||
                        currentUser.Title === "Batsaikhan Ulambayar") && (
                        <input
                          style={{ float: "right" }}
                          checked={
                            selected.filter((item) => item.Id === announcement.Id).length > 0
                          }
                          type="checkbox"
                          onChange={(e) => _handleCheck(e, announcement)}
                        />
                      )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <div
                        className={styles.announcementDesc}
                        dangerouslySetInnerHTML={{ __html: announcement.Description }}></div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )
        )}
      </div>
    </div>
  );
};

export default Announcement;
