import * as React from 'react'
import { useEffect, useState } from 'react'
import { sp } from '@pnp/sp';
import "@pnp/sp/sites";
import "@pnp/sp/webs";
import "@pnp/sp/items";
import "@pnp/sp/folders";
import "@pnp/sp/files";
import "@pnp/sp/lists";
import "@pnp/sp/site-users/web"
import "@pnp/sp/profiles";
import styles from './StaffDirectory.module.scss';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { Grid } from '@material-ui/core';
import { IProfile } from './IStaffDirectory';
import { IContextInfo } from '@pnp/sp/sites';
SPComponentLoader.loadCss('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

const StaffDirectory = ({ context }) => {
  const [profiles, setProfiles] = useState<any>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [siteUrl, setSiteUrl] = useState<string>('')
  useEffect(() => {
    sp.setup({ spfxContext: context})
    _getUsers()
    _siteContext()
  }, [])
  const _siteContext = async () => {
    const siteContext: IContextInfo = await sp.site.getContextInfo();
    setSiteUrl(siteContext.SiteFullUrl)
  }
  const _getUsers = async () => {
    const usersRes = await sp.web.siteUserInfoList.items.top(5000).get()
    usersRes.filter(userRes => userRes.EMail && userRes.UserName && userRes.Deleted === false && userRes.EMail.split('@')[1] === 'usdtl.com').map(userRes => ({
      ...userRes,
      Picture: siteUrl + "/_layouts/15/userphoto.aspx?size=M&username=" + userRes.EMail
    })).map(async userRes => {
      const profileRes = await sp.profiles.getPropertiesFor(userRes.Name);
      const UserUrl = profileRes.UserUrl
      const profile = {...userRes, UserUrl}
      setProfiles(profiles => [...profiles, profile])
    })
  }
  const _handleChange = (event) => {
    setSearchValue(event.target.value)
  }
  const _search = (profiles: IProfile[]) => {
    const profileKeys = profiles[0] && Object.keys(profiles[0])
    return profiles.filter(profile => 
      profileKeys.some(profileKey => String(profile[profileKey]).toLowerCase().indexOf(searchValue.toLowerCase()) > -1))
  }
  return(
    <div className={ styles.staffDirectoryWp}>
      <div className={ styles.mainHeading }>
          <i className="fa fa-users fa-lg" aria-hidden="true"></i> STAFF DIRECTORY
      </div>
      <div className={ styles.searchDiv }>
          <input className={ styles.field } type="search" placeholder="Search" onChange={ _handleChange }/>
      </div>
      <div className={ styles.innerDiv }>
          { _search(profiles).sort((a, b) => a.ID - b.ID).map(profile => (
            <Grid container className={ styles.gridContainer }>
            <Grid item xs={12} sm={3} md={3} lg={2} xl={2} style={{ textAlign: 'center' }}>
              <a href={ profile.UserUrl } target="_blank">
                  <img  src={ profile.Picture } className={ styles.profileImage }/>
              </a>
            </Grid>
            <Grid item xs={12} sm={9} md={9} lg={10} xl={10} justify='center'>
              <div>
                <div>
                    <a href={ profile.UserUrl } target="_blank">{ profile.Title }</a>
                </div>
                { profile.JobTitle && <div><i className="fa fa-briefcase fa-lg paddingRight"></i> { profile.JobTitle }</div> }
                <div><i className="fa fa-envelope-o fa-lg paddingRight"></i> { profile.EMail }</div>
                { profile.WorkPhone && <div><i className="fa fa-phone fa-lg paddingRight"></i> { profile.WorkPhone }</div> }
                { profile.MobilePhone && <div><i className="fa fa-mobile fa-lg paddingRight"></i> { profile.MobilePhone }</div> }
              </div>
            </Grid>
          </Grid>
          ))
          }
      </div>
    </div>
  )
}

export default StaffDirectory