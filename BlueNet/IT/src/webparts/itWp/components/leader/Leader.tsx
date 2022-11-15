import * as React from 'react'
import { useState, useEffect } from 'react'
import { IBio, IProfile } from './IStates';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/profiles";
import "@pnp/sp/site-users/web";
import styles from './Leader.module.scss'
import { Card, CardContent, CardMedia } from '@material-ui/core';

const Leader = ({context}) => {
    const [profile, setProfile] = useState<IProfile>({ UserUrl: ''})
    const [bio, setBio] = useState<IBio>({ Title: '', EmployeeImage: { Url: '' }, Position: '', EMail: '' }) 

    useEffect(() => {
        sp.setup({ spfxContext: context})
        _getBiography()
    }, [])
    const _getBiography = async () => {
        const bioRes: IBio[] = await sp.web.lists.getByTitle('Team Biography').items.get()
        const leaderRes = await sp.web.siteUsers.getByEmail(bioRes[0].EMail).get()
        const profileRes = await sp.profiles.getPropertiesFor(leaderRes.LoginName)
        setProfile(profileRes)
        setBio(bioRes[0])
    } 
    return(
        <div className={ styles.leader } style={{ borderBottom: '0.125em solid #e1e1e1' }}>
            <div className={ styles.heading }>DEPARTMENT LEADER</div>
            <div className={ styles.container }>
                <Card style={{ border: "none", boxShadow: "none" }}>
                    <CardMedia>
                        <a href={ profile.UserUrl } target="_blank">
                            <img className={ styles.image } src={ bio.EmployeeImage.Url } alt="leader image"/>
                        </a>
                    </CardMedia>
                    <CardContent style={{ padding: '0.2em' }}>
                        <div className={ styles.title }>{ bio.Title }</div>
                        <div className={ styles.position }>{ bio.Position }</div> 
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Leader