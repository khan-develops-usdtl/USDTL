import * as React from "react";
import { useState, useEffect, useRef } from "react";
import styles from "./TopBanner.module.scss";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/items";
import "@pnp/sp/folders";
import "@pnp/sp/files";
import "@pnp/sp/lists";
import { ITopBanner } from "./ITopBanner";
import { IContextInfo } from "@pnp/sp/sites";
import { ImageFit } from '@fluentui/react/lib/Image';
import { Carousel, CarouselButtonsDisplay, CarouselButtonsLocation } from '@pnp/spfx-controls-react/lib/Carousel';

const TopBanner = ({ context }) => {
  const [images, setImages] = useState<ITopBanner[]>([]);

  useEffect(() => {
    sp.setup({ spfxContext: context });
    _getImages();
  }, []);

  const _getImages = async () => {
    const siteContext: IContextInfo = await sp.site.getContextInfo();
    const imagesRes = await sp.web.getFolderByServerRelativePath('Top Banner Images').files()
    const images = imagesRes.map(result => 
      ({ ...result,
        imageSrc: `https://usdtl.sharepoint.com/${result.ServerRelativeUrl}`,
        title: null,
        description: null,
        showDetailsOnHover: false,
        Url: `https://usdtl.sharepoint.com/${result.ServerRelativeUrl}`,
        imageFit: ImageFit.centerContain
      })
    )
    setImages(images)
  };

  return (
    <div className={ styles.topBanner }>
      <Carousel
        buttonsLocation={CarouselButtonsLocation.top}
        buttonsDisplay={CarouselButtonsDisplay.block}
        contentContainerStyles={ styles.carouselContent }
        indicators={false}
        isInfinite={true}
        element={images}
        pauseOnHover={true}
        containerButtonsStyles={styles.carouselButtonsContainer}
      />
    </div>
  )

};

export default TopBanner;

