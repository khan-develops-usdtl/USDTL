import { sp } from '@pnp/sp'
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import { IPoster } from './IPoster'
import styles from './Poster.module.scss';
import { Grid } from '@material-ui/core';

const Poster = ({context}) => {
    const [posters, setPosters] = useState<IPoster[]>([])
    const [categories, setCategories] = useState<string[]>([])
    const [readMore, setReadMore] = useState<boolean>(true)
    const [topPosters, setTopPosters] = useState<number>(4)
    const [activeButton, setActiveButton] =useState<string>('All')

    const buttonRef = useRef<HTMLButtonElement>()

    useEffect(() => {
        sp.setup({
            spfxContext: context
        })
        _getPoster()
    }, [])

    const _getPoster = async () => {
        const posters = await sp.web.lists.getByTitle("Poster").items.get()
        setPosters(posters)
        const temp = []
        posters.map(poster => {temp.push(poster.Category)})
        const categories = temp.filter((category, index) => {
            return temp.indexOf(category) === index
        })
        setCategories(categories)
    }   
    const _handleReadMore = () => {
        setTopPosters(posters.length)
        setReadMore(false)
    }
    const _handleReadLess = () => {
        setTopPosters(4)
        setReadMore(true)
    }
    return(
        <Grid container spacing={1} className={ styles.posterWp }>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className={ styles.posterHeading }>
                    <i className="fa fa-file-powerpoint-o fa-lg" aria-hidden="true"></i> POSTER-PRESENTATIONS
                </div>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className={ styles.buttonDiv }>
                    <button type='button' className={ styles.button} ref={buttonRef} onClick={e=>{setActiveButton('All'); e.preventDefault(); buttonRef.current.focus()}}>All</button>
                    {categories.map(category => (
                        <button type='button' className={ styles.button} onClick={e=>{setActiveButton(category); e.preventDefault()}}>{category}</button>
                    ))}
                </div>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ padding: '10px 20px', borderBottom: '1px solid #dddddd' }}>
                <Grid container spacing={3} style={{ maxHeight: 680, overflowY: 'auto', marginBottom: 10 }}>
                        { posters.filter(poster=> {
                            if(activeButton==='All') { return poster } 
                            else {return poster.Category === activeButton}
                        }).slice(0, topPosters).map(poster => (
                            <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                                <iframe src={poster.Link.Url} className={ styles.posterIframe }></iframe>
                                <div className={ styles.posterTitle }>{ poster.Title.length > 70 ? poster.Title.slice(0, 70) + '...' : poster.Title }</div>
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
    )
}

export default Poster