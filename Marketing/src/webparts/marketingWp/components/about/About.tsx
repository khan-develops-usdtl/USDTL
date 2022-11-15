import * as React from 'react'
import { useState, useEffect } from 'react'
import { IAbout } from './IStates';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import styles from './About.module.scss';
import { Grid } from '@material-ui/core';

const About = ({context}) => {
    const [about, setAbout] = useState<IAbout>({Title: '', About: ''})
    useEffect(() => {
        sp.setup({ spfxContext: context })
        _getAbout()
    }, [])
    const _getAbout = async () => {
        const aboutRes = await sp.web.lists.getByTitle("About").items.get()
        setAbout(aboutRes[0])
    }
    return(
        <div className={ styles.about } style={{ borderBottom: '0.125em solid #e1e1e1' }}>
            <div className={ styles.heading }>{about.Title.toUpperCase()}</div>
            <div className={ styles.container } dangerouslySetInnerHTML={{ __html: about.About }}>
                
            </div>
        </div>
    )
}

export default About