import * as React from 'react'
import { useState, useEffect } from 'react'
import { IBio, IProfile } from './IStates';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/profiles";
import "@pnp/sp/site-users/web";
import styles from './Supervisors.module.scss'
import { Card, CardContent, CardMedia, Grid } from '@material-ui/core';

const Supervisors = ({context}) => {
    const [bios, setBios] = useState<IBio[]>([]) 

    useEffect(() => {
        sp.setup({ spfxContext: context})
        _getBiography()
    }, [])
    const _getBiography = async () => {
        const biosRes: IBio[] = await sp.web.lists.getByTitle('Supervisors').items.get()
        biosRes.map(async bio => {
            const leaderRes = await sp.web.siteUsers.getByEmail(bio.EMail).get()
            const profileRes = await sp.profiles.getPropertiesFor(leaderRes.LoginName)
            const newBio = {...bio, ...profileRes}
            console.log(newBio)
            setBios(bios => [...bios, newBio])
        })
        
    } 
    return(
        <div className={ styles.leader } style={{ borderBottom: '0.125em solid #e1e1e1' }}>
            <div className={ styles.heading }>DEPARTMENT SUPERVISORS</div>
            <Grid container spacing={2} justify='space-evenly' style={{ padding: '1em' }}>
                { bios.map(bio => (
                    bios.length > 3 ?
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
                        <Card style={{ border: "none", boxShadow: "none", display:'grid', justifyContent:'center' }}>
                            <CardMedia style={{ border: "none", boxShadow: "none", display:'grid', justifyContent:'center' }}>
                                <a href={ bio.UserUrl } target="_blank">
                                    <img className={ styles.image } src={ bio.EmployeeImage.Url } alt="leader image"/>
                                </a>
                            </CardMedia>
                            <CardContent style={{ padding: '0.2em' }}>
                                <div className={ styles.title }>{ bio.DisplayName }</div>
                                <div className={ styles.position }>{ bio.Position }</div> 
                            </CardContent>
                        </Card>
                    </Grid> :
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                        <Card style={{ border: "none", boxShadow: "none", display:'grid', justifyContent:'center'  }}>
                            <CardMedia style={{ border: "none", boxShadow: "none", display:'grid', justifyContent:'center' }}>
                                <a href={ bio.UserUrl } target="_blank">
                                    <img className={ styles.image } src={ bio.EmployeeImage.Url } alt="leader image"/>
                                </a>
                            </CardMedia>
                            <CardContent style={{ padding: '0.2em' }}>
                                <div className={ styles.title }>{ bio.DisplayName }</div>
                                <div className={ styles.position }>{ bio.Position }</div> 
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default Supervisors