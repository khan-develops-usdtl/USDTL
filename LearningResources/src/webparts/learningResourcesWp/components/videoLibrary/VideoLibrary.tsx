import * as React from 'react'
import { useEffect, useState } from 'react'
import { sp } from '@pnp/sp'
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IVideo } from './IVideo';
import { Grid } from '@material-ui/core';
import styles from './VideoLibrary.module.scss';
import YouTubeIcon from '@material-ui/icons/YouTube';


const VideoLibrary = ({context}) => {
    const [categories, setCategories] = useState<string[]>([]);
    const [videos, setVideos] = useState<IVideo[]>([]);
    const [topVideos, setTopVideos] = useState<number>(4)
    const [readMore, setReadMore] = useState<boolean>(true)
    const [activeButton, setActiveButton] = useState<string>('All')

    useEffect(() => {
        sp.setup({ spfxContext: context });
        _getVideo();
    }, []);
    const _getVideo = async () => {
        const videos: IVideo[] = await sp.web.lists.getByTitle('Video Library').items.get();
        const temp: string[] = [];
        videos.map(video => { temp.push(video.Category) });
        const categories = temp.filter((category, index) => { return temp.indexOf(category) === index });
        setCategories(categories);
        setVideos(videos); 
    };
    const _handleReadMore = () => {
        setTopVideos(videos.length)
        setReadMore(false)
    }
    const _handleReadLess = () => {
        setTopVideos(4)
        setReadMore(true)
    }
    return(
        <Grid container spacing={1} className={ styles.videoLibraryWp } style={{ padding: '0 5px' }}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className={ styles.videoLibraryHeading }>
                    <i className="fa fa-file-video-o fa-lg" aria-hidden="true"></i> VIDEO LIBRARY
                </div>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ paddingBottom: 10, borderBottom: '1px solid #dddddd' }}>
                <button className={ styles.button } onClick={e=>{setActiveButton('All'); e.preventDefault()}}>All</button>
                { categories.map(category => (
                    <button className={ styles.button } onClick={e=>{setActiveButton(category); e.preventDefault()}}>{category}</button>
                ))}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ padding: '10px 20px', borderBottom: '1px solid #dddddd' }}>
                <Grid container spacing={3} style={{ maxHeight: 680, overflowY: 'auto', marginBottom: 10 }}>
                    { videos.filter(video => {
                        if(activeButton==='All'){return video}
                        else { return video.Category===activeButton}
                    }).slice(0, topVideos).map(video => (
                        <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                            <a href={ video.VideoLink.Url } target="_blank" className={ styles.videoLink }>
                                <i className="fa fa-play-circle fa-lg" aria-hidden="true"></i> Watch Video
                            </a>
                            <div className={ styles.videoLink }>
                                <a href={ video.VideoLink.Url } target="_blank">
                                   
                                    <YouTubeIcon className={ styles.playButton }></YouTubeIcon>
                                    <img className={ styles.videoImage } src={ video.VideoImage.Url } alt={ video.Title }/> 
                                </a>
                                <div className={ styles.videoTitle }>{ video.Title }</div>
                            </div>
                        </Grid>
                    ))}
                </Grid>
                <p >
                    { readMore ?
                        <a href="javascript:;" onClick={_handleReadMore}><i className="fa fa-plus-circle fa-lg marginRight" aria-hidden="true"></i> View More</a> :
                        <a href="javascript:;" onClick={_handleReadLess}><i className="fa fa-plus-circle fa-lg marginRight" aria-hidden="true"></i> View Less</a>
                    }
                </p>
            </Grid>
        </Grid>
    );
};

export default VideoLibrary