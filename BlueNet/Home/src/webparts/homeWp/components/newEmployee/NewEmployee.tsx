import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { sp } from "@pnp/sp";
import "@pnp/sp/site-users/web";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/folders";
import "@pnp/sp/files";
import { INewEmployee } from "./INewEmployee";
import { IContextInfo } from "@pnp/sp/sites";
import styles from "./NewEmployee.module.scss";
import { FontSizes, ImageFit } from "office-ui-fabric-react";
import {
  Carousel,
  CarouselButtonsLocation,
  CarouselButtonsDisplay,
  CarouselIndicatorShape,
  CarouselIndicatorsDisplay,
} from "@pnp/spfx-controls-react/lib/Carousel";

const NewEmployees = ({ context }) => {
  const [newEmployees, setNewEmployees] = useState<INewEmployee[]>([]);

  useEffect(() => {
    sp.setup({ spfxContext: context });
    _getNewEmployees();
  }, []);

  const _getNewEmployees = async () => {
    const siteContext: IContextInfo = await sp.site.getContextInfo();
    const imagesRes = await sp.web.getFolderByServerRelativePath("New Employees Images").files();
    const images = imagesRes.map((image) => ({
        ...image,
        Email: image.Name.split(".")[0].split(" ").join(".").toLowerCase() + "@usdtl.com",
        imageSrc: siteContext.SiteFullUrl + image.ServerRelativeUrl,
        title: image.Name.split(".")[0],
        showDetailsOnHover: false,
        imageFit: ImageFit.centerContain
    }));
    images.map(async (image) => {
      const user = await sp.web.siteUsers.getByEmail(image.Email).get();
      const profileRes = await sp.profiles.getPropertiesFor(user.LoginName);
      const position = profileRes.Title
      const department = profileRes.UserProfileProperties.find(properties => properties.Key === 'Department').Value
      const profileUrl = profileRes.UserUrl;
      const newEmp = { ...image, url: profileUrl, description: <div style={{display: 'flex', flexDirection: 'column', width: '100%', textAlign: 'center'}}><div>{position}</div><div>{department}</div></div> };
      setNewEmployees((newEmployees) => [...newEmployees, newEmp]);
    });
  };

  return (
    <div className={styles.newEmployeeWp}>
      <div className={styles.heading}>
        <i className="fa fa-users fa-lg" aria-hidden="true"></i> NEW EMPLOYEES
      </div>
      <div className={styles.container}>
        <Carousel
          buttonsLocation={CarouselButtonsLocation.top}
          buttonsDisplay={CarouselButtonsDisplay.block}
          contentContainerStyles={ styles.carouselContent }
          indicators={false}
          isInfinite={true}
          element={newEmployees}
          pauseOnHover={true}
          containerButtonsStyles={styles.carouselButtonsContainer}
        />
      </div>
    </div>
  );
};

export default NewEmployees;
