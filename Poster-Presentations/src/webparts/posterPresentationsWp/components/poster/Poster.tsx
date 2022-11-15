import { sp } from '@pnp/sp'
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IList } from "@pnp/sp/lists";
import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import { IPoster } from './IPoster'
import styles from './Poster.module.scss';
import { Grid } from '@material-ui/core';

const Poster = ({context}) => {
    const [posters, setPosters] = useState<IPoster[]>([])
    const [categories, setCategories] = useState<string[]>([])
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
    return(
        <div className={ styles.posterWp }>
            <div className={ styles.mainHeading }>
                <i className="fa fa-file-powerpoint-o fa-lg" aria-hidden="true"></i> POSTER-PRESENTATIONS
            </div>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className={ styles.buttonDiv }>
                        <button type='button' className={ styles.button} ref={buttonRef} onClick={e=>{setActiveButton('All'); e.preventDefault(); buttonRef.current.focus()}}>All</button>
                        {categories.map(category => (
                            <button type='button' className={ styles.button} onClick={e=>{setActiveButton(category); e.preventDefault()}}>{category}</button>
                        ))}
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ padding: '10px 20px', borderBottom: '1px solid #dddddd', marginTop: '0.5em' }}>
                    <Grid container spacing={3} style={{ height: '35em', overflowY: 'auto', marginBottom: '1px' }}>
                        { posters.filter(poster=> {
                            if(activeButton==='All') { return poster } 
                            else {return poster.Category === activeButton}
                        }).map(poster => (
                            <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                                <iframe src={poster.Link.Url} className={ styles.posterIframe }></iframe>
                                <div className={ styles.posterTitle }>{ poster.Title.length > 70 ? poster.Title.slice(0, 70) + '...' : poster.Title }</div>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>

    )
}

export default Poster