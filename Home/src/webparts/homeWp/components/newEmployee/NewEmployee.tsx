import * as React from 'react';
import {useEffect, useState} from 'react'
import styles from './NewEmployee.module.scss';
import { Carousel, CarouselButtonsDisplay, CarouselButtonsLocation } from "@pnp/spfx-controls-react/lib/Carousel";
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import { sp } from '@pnp/sp';
import "@pnp/sp/site-users/web"
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/folders";
import "@pnp/sp/files";
import { INewEmployee } from './INewEmployee';
import { IContextInfo } from '@pnp/sp/sites';

const NewEmployees = ({context}) => {
  const [newEmployees, setNewEmployees] = useState<INewEmployee[]>([])
  useEffect(() => {
    sp.setup({ spfxContext: context })
    _getNewEmployees()
  },[])
  const _getNewEmployees = async () => {
    const siteContext: IContextInfo = await sp.site.getContextInfo();
    const imagesRes = await sp.web.getFolderByServerRelativePath('New Employees Images').files()
    const images = imagesRes.map(image => {
      const EMail = image.Name.split('.')[0].split(' ').join('.').toLowerCase() + '@usdtl.com'
      return {...image, EMail}
    })
    images.map(image => ({
      ...image,
      imageSrc: siteContext.SiteFullUrl + image.ServerRelativeUrl,
      title: image.Name.split('.')[0],
      description: null,
      showDetailsOnHover: true,
      imageFit: ImageFit.centerContain
    })).map(async image => {
      const user = await sp.web.siteUsers.getByEmail(image.EMail).get()
      const profileRes = await sp.profiles.getPropertiesFor(user.LoginName);
      const url = profileRes.UserUrl
      const newEmp = {...image, url}
      setNewEmployees(newEmployees => [...newEmployees, newEmp])
    })
  }
  return(
    <div>
      <div className={ styles.webpartDivHeading }>
          <i className="fa fa-users fa-lg" aria-hidden="true"></i> NEW EMPLOYEES
      </div>
      <div className={styles.pnpImageCarousel}>
        <Carousel
          buttonsLocation={CarouselButtonsLocation.top}
          buttonsDisplay={CarouselButtonsDisplay.block}
          contentContainerStyles={ styles.carouselContent}
          isInfinite={true}
          element={newEmployees}
          containerButtonsStyles={ styles.carouselButtonsContainer }
          onMoveNextClicked={(index: number) => { console.log(`Next button clicked: ${index}`); }}
          onMovePrevClicked={(index: number) => { console.log(`Prev button clicked: ${index}`); }}
        />
      </div>
    </div>
  )
}

export default NewEmployees