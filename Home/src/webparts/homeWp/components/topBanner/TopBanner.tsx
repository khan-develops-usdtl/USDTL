import * as React from 'react'
import { useState, useEffect } from 'react'
import styles from './TopBanner.module.scss'
import { sp } from '@pnp/sp'
import "@pnp/sp/webs";
import "@pnp/sp/items";
import "@pnp/sp/folders";
import "@pnp/sp/files";
import "@pnp/sp/lists";
import { IImagesSpfx } from './IState';
import { ImageFit } from '@fluentui/react/lib/Image';
import { Carousel, CarouselButtonsDisplay, CarouselButtonsLocation } from '@pnp/spfx-controls-react/lib/Carousel';
import { IContextInfo } from '@pnp/sp/sites';

const TopBanner = ({context}) => {
  const [images, setImages] = useState<IImagesSpfx[]>([])
  useEffect(() => {
    sp.setup({ spfxContext: context })
    _getImages()
  }, [])
  const _getImages = async () => {
    const siteContext: IContextInfo = await sp.site.getContextInfo();
    const imagesRes = await sp.web.getFolderByServerRelativePath('Top Banner Images').files()
    const modifiedImages = imagesRes.map(result => 
      ({ ...result,
        imageSrc: `https://usdtl.sharepoint.com/${result.ServerRelativeUrl}`,
        title: '',
        description: '',
        showDetailsOnHover: false,
        Url: `https://usdtl.sharepoint.com/${result.ServerRelativeUrl}`,
        imageFit: ImageFit.centerContain
      })
    )
    setImages(modifiedImages)
  }
  return(
    <div className={ styles.topBanner }>
      <Carousel
        buttonsLocation={CarouselButtonsLocation.top}
        buttonsDisplay={CarouselButtonsDisplay.block}
        contentContainerStyles={ styles.carouselContent }
        indicators={false}
        isInfinite={true}
        element={images}
        pauseOnHover={true}
        containerButtonsStyles={ styles.carouselButtonsContainer }
        onMoveNextClicked={(index: number) => { console.log(`Next button clicked: ${index}`); }}
        onMovePrevClicked={(index: number) => { console.log(`Prev button clicked: ${index}`); }}
      />
    </div>
  )
}

export default TopBanner



// import * as React from 'react'
// import styles from './TopBanner.module.scss'
// import { ITopBannerProps } from './ITopBannerProps'
// import * as jquery from 'jquery'
// import { Carousel, CarouselButtonsDisplay, CarouselButtonsLocation } from "@pnp/spfx-controls-react/lib/Carousel";
// import { ImageFit } from 'office-ui-fabric-react/lib/Image';

// export interface ITopBannerStates {
//     sliders: [
//       {
//         imageSrc: "",
//         title: "",
//         description: "",
//         showDetailsOnHover: boolean,
//         url: ""
//         imageFit: any
//       }
//     ]
// }

// export default class TopBanner extends React.Component<ITopBannerProps, ITopBannerStates> {
//     static siteUrl: string
//     public constructor(props: ITopBannerProps, states: ITopBannerStates) {
//       super(props)
//       this.state = {
//         sliders: [
//           {
//             imageSrc: "",
//             title: "",
//             description: "",
//             showDetailsOnHover: false,
//             url: "",
//             imageFit: ImageFit.contain
//           }
//         ]
//       }
//       TopBanner.siteUrl = this.props.siteUrl
//     }
//     private getSliders() {
//         const reactContextHandler = this
    
//         jquery.ajax({
//           url: `${TopBanner.siteUrl}/_api/web/lists/getbytitle('Top Banner Slider')/items`,
//           type: "GET",
//           headers: { 'Accept': 'application/json; odata=verbose' },
//           success: function (resultData) {
//             const modifiedResult = resultData.d.results.map(result => 
//               ({ ...result,
//                 imageSrc: result.ImageLink.Url,
//                 title: '',
//                 description: '',
//                 showDetailsOnHover: false,
//                 Url: result.ImageLink.Url,
//                 imageFit: ImageFit.contain
//               })
//             )
//             reactContextHandler.setState({
//               sliders: modifiedResult
//             })
//           },
//           error: function (jqXHR, textStatus, errorThrown) { }
//         })
//       }
    
//       public componentDidMount() {
//         this.getSliders()
//       }

//     public render() {
//         return(
//           <div className={styles.pnpImageCarousel}>
//               <Carousel
//                 buttonsLocation={CarouselButtonsLocation.top}
//                 buttonsDisplay={CarouselButtonsDisplay.block}
//                 contentContainerStyles={ styles.carouselContent }
//                 indicators={false}
//                 isInfinite={true}
//                 element={this.state.sliders}
//                 pauseOnHover={true}
//                 containerButtonsStyles={ styles.carouselButtonsContainer }
//                 onMoveNextClicked={(index: number) => { console.log(`Next button clicked: ${index}`); }}
//                 onMovePrevClicked={(index: number) => { console.log(`Prev button clicked: ${index}`); }}
//               />
//           </div>
//         )
//     }
// }