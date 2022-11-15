import * as React from "react";
import { useEffect, useState } from "react";
import { sp } from "@pnp/sp";
import "@pnp/sp/site-users/web";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/folders";
import "@pnp/sp/files";
import { IContextInfo } from "@pnp/sp/sites";
import styles from "./GemAward.module.scss";
import { IGemAward } from "./IGemAward";
import { ImageFit } from "office-ui-fabric-react";
import {
  Carousel,
  CarouselButtonsLocation,
  CarouselButtonsDisplay,
  CarouselIndicatorShape,
  CarouselIndicatorsDisplay,
} from "@pnp/spfx-controls-react/lib/Carousel";

const GemAward = ({ context }) => {
  const [gemAwards, setGemAwards] = useState<IGemAward[]>([]);

  useEffect(() => {
    sp.setup({ spfxContext: context });
    _getGemAwards();
  }, []);

  const _getGemAwards = async () => {
    const siteContext: IContextInfo = await sp.site.getContextInfo();
    const imagesRes = await sp.web.getFolderByServerRelativePath("Gem Awards").files();
    const images = imagesRes.map((image) => {
      const imageSrc = siteContext.SiteFullUrl + image.ServerRelativeUrl;
      const email = image.Name.split(" ")[0].toLowerCase() + "." + image.Name.split(" ")[1].toLowerCase() + "@usdtl.com";
      const title = image.Name.split(" ")[0] + " " + image.Name.split(" ")[1]
      const showDetailsOnHover = false;
      const imageFit = ImageFit.centerContain;
      return {
        ...image,
        Email: email,
        imageSrc: imageSrc,
        title: title,
        showDetailsOnHover: showDetailsOnHover,
        imageFit: imageFit,
      };
    });
    images.map(async (image) => {
      const user = await sp.web.siteUsers.getByEmail(image.Email).get();
      const profileRes = await sp.profiles.getPropertiesFor(user.LoginName);
      const profileUrl = profileRes.UserUrl;
      const newEmp = { ...image, url: profileUrl };
      setGemAwards((gemAwards) => [...gemAwards, newEmp]);
    });
  };

  return (
    <div className={styles.gameAwardWp}>
      <div className={styles.heading}>
        <i className="fa fa-trophy fa-lg" aria-hidden="true"></i> GEM AWARDS
      </div>
      <div className={styles.container}>
      <Carousel
          buttonsLocation={CarouselButtonsLocation.center}
          buttonsDisplay={CarouselButtonsDisplay.buttonsOnly}
          contentContainerStyles={styles.carouselContent}
          indicators={false}
          isInfinite={true}
          pauseOnHover={true}
          element={gemAwards}
          containerButtonsStyles={styles.carouselButtonsContainer}
        />
      </div>
    </div>
  );
};

export default GemAward;
