import * as React from "react";
import { useEffect, useState } from "react";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/items";
import "@pnp/sp/lists";
import "@pnp/sp/sputilities";
import "@pnp/sp/site-users/web";
import "@pnp/sp/site-groups/web";
import styles from "./Announcement.module.scss";
import { IAnnouncement } from "./IAnnouncement";
import { Button } from "@material-ui/core";

const Announcement = ({ context }) => {
  const [announcement, setAnnouncements] = useState<IAnnouncement>(undefined);

  useEffect(() => {
    sp.setup({ spfxContext: context });
    _getAnnouncements();
  }, []);

  const _getAnnouncements = async () => {
    const announcementRes: IAnnouncement = await sp.web.lists
      .getByTitle("Announcement")
      .items.getById(1)
      .get();
    setAnnouncements(announcementRes);
  };

  return (
    <div className={styles.announcementWp}>
      {announcement ? (
        <div>
          <h1>{announcement.Title}</h1>
          <div dangerouslySetInnerHTML={{ __html: announcement.Description }}></div>
          <Button href={announcement.DocumentLink.Url} target="_blank" color="primary" variant="outlined">
            APPLY HERE
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default Announcement;
