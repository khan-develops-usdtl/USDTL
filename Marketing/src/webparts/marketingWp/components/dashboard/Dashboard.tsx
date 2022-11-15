import * as React from 'react';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists"
import "@pnp/sp/items";
import "@pnp/sp/fields";
import "@pnp/sp/site-users/web";
import styles from './Dashboard.module.scss'
import { IDashboardProps } from './IDashboardProps';
import { IDashboardStates } from './IDashboardStates';
import { Grid, Paper, TablePagination, withStyles } from '@material-ui/core';

const CustomTablePagination = withStyles(theme => ({
    caption: {
        fontSize: 'small',
        fontWeight: 600
    },
    toolbar: {
        fontSize: 'small',
        fontWeight: 600
    }
}))(TablePagination)


export default class Dashboard extends React.Component<IDashboardProps, IDashboardStates> {
    public constructor(props: IDashboardProps) {
        super(props)
        sp.setup({ spfxContext: this.props.context })
        this.state = {
            requests: [],
            statusOptions: [],
            assignedToOptions: [],
            priorityOptions: [],
            categoryOptions: [],
            selected: [],
            searchValue: '',
            currentUserRequestNumber: 0,

            isFormVisible: false,
            formErrorMessage: '',
            page: 0,
            rowsPerPage: 5,

            Title: '',
            Description: '',
            Priority: '',
            Location: '',
            Category: '',
            
            currentUser: {
                Id: 0,
                Email: '',
                LoginName: '',
                Title: ''
            },
            adminIT: {
                Id: 0,
                Email: '',
                LoginName: '',
                Title: ''
            },
            adminMarketing: {
                Id: 0,
                Email: '',
                LoginName: '',
                Title: ''
            }
            
        }
    }
    private async _getRequest() {
        const requests = await sp.web.lists.getByTitle('Requests').items.select("ID", "Title", "Description", "Created", "AssignedTo", 
        "DueBy", "Status", "Priority", "Location", "Category", "Author/Title").expand("Author/Title").get()
        const modifiedRequsts = requests.map(request => ({
            ...request,
            CreatedBy: request.Author.Title,
            Created: new Date(request.Created).toLocaleDateString("en-US"),
            DueBy: new Date(request.DueBy).toLocaleDateString("en-US")
        }))

        const statusOptionsRes: any = await sp.web.lists.getByTitle('Requests').fields.getByTitle('Status').get()
        const assignedToOptionsRes: any = await sp.web.lists.getByTitle('Requests').fields.getByTitle('Assigned To').get()
        const priorityOptionsRes: any = await sp.web.lists.getByTitle('Requests').fields.getByTitle('Priority').get()
        const categoryOptionsRes: any = await sp.web.lists.getByTitle('Requests').fields.getByTitle('Category').get()

        const currentUserRes: any = await sp.web.currentUser()
        const adminMarketingRes: any = await sp.web.getUserById(19).get()
        const adminITRes: any = await sp.web.getUserById(18).get()
        const currentUserRequestNumberRes = modifiedRequsts.filter(request => request.CreatedBy === currentUserRes.Title).length


        this.setState({
            currentUserRequestNumber: currentUserRequestNumberRes,
            adminIT: adminITRes,
            adminMarketing: adminMarketingRes,
            requests: modifiedRequsts,
            currentUser: currentUserRes,
            statusOptions: statusOptionsRes.Choices,
            assignedToOptions: assignedToOptionsRes.Choices,
            priorityOptions: priorityOptionsRes.Choices,
            categoryOptions: categoryOptionsRes.Choices
        })

    }
    handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = this.state.requests.map(request => request.ID);
            this.setState({ selected: newSelecteds });
            return;
        };
        this.setState({ selected: [] });
    }
    isSelected = (ID: number) => {
        return this.state.selected.indexOf(ID) !== -1;
    }
    handleSelectClick = (event: React.MouseEvent<unknown>, ID: number) => {
        const selectedIndex = this.state.selected.indexOf(ID);
        let newSelected: number[] = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(this.state.selected, ID);
          } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(this.state.selected.slice(1));
          } else if (selectedIndex === this.state.selected.length - 1) {
            newSelected = newSelected.concat(this.state.selected.slice(0, -1));
          } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                this.state.selected.slice(0, selectedIndex),
                this.state.selected.slice(selectedIndex + 1),
            );
          };
        this.setState({ selected: newSelected });
    };
    handleDelete = async () => {
        if (this.state.selected.length > 0) {
            await Promise.all(this.state.selected.map(async id => {
                await sp.web.lists.getByTitle('Requests').items.getById(id).delete()
            }))
        };
        this._getRequest();
        this.setState({selected: []})          
    }
    handleAssignedChange = async (e, ID) => {
        await sp.web.lists.getByTitle('Requests').items.getById(ID).update({ AssignedTo: e.target.value })
        this._getRequest()
    };
    private _handleStatusChange = async (e, ID) => {
        await sp.web.lists.getByTitle('Requests').items.getById(ID).update({ Status: e.target.value });
        this._getRequest()
    };
    private _handlePriorityChange = async (e, ID) => {
        await sp.web.lists.getByTitle('Requests').items.getById(ID).update({ Priority: e.target.value });
        this._getRequest()
    }
    private _handleCategoryChange = async (e, ID) => {
        await sp.web.lists.getByTitle('Requests').items.getById(ID).update({ Category: e.target.value });
        this._getRequest()
    }
    private _handleDateChange = async (e, ID) => {
        await sp.web.lists.getByTitle('Requests').items.getById(ID).update({ DueBy: e.target.value });
        this._getRequest()
    }
    public componentDidMount() {
        this._getRequest();
    };
    private _searchRequest = (requests) => {
            const requestKeys = requests[0] && Object.keys(requests[0])
            return requests.filter(request => 
                requestKeys.some(requestKey => String(request[requestKey]).toLowerCase().indexOf(this.state.searchValue.toLowerCase()) > -1))
    };
    private _handleToogleForm = (e) => {
        e.preventDefault()
        if(!this.state.isFormVisible) {
            this.setState({ isFormVisible: true })
        } else {
            this.setState({ isFormVisible: false })
        }
    }
    private _handleFormSubmit = async (e) => {
        e.preventDefault()
        if (!this.state.Title || !this.state.Description) {
            this.setState({formErrorMessage: "Please fill in required fields!"})
        } else {
            await sp.web.lists.getByTitle('Requests').items.add({
                Title: this.state.Title,
                Description: this.state.Description,
                Priority: this.state.Priority,
                Location: this.state.Location,
                Category: this.state.Category
            }).then(res => this.setState({formErrorMessage: '', Title: '', Priority: '', Location: '', Category: '', Description: '', isFormVisible: false}))
            .catch(res => alert("Your list was not created!"))  
        }
        this._getRequest();
    }
    private _handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        this.setState({ page: newPage })
    }
    private _handleChangeRowsPerPage =(e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ rowsPerPage: parseInt(e.target.value, 10) })
    };
    public render() {
        const requestKeys = this.state.requests[0] && Object.keys(this.state.requests[0])
        return(
            <div className={ styles.MarketingWp }>
                <div className={ styles.heading }>REQUESTS</div>
                <div style={{ padding: '0 0.5em' }}>
                <Grid container className={ styles.toolbarGridContainer }>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{ display: 'grid', alignContent: 'center' }}>
                        <Grid container className={styles.searchGridContainer}>
                            <Grid item xs={1} sm={1} md={1} lg={1} xl={1} style={{ display: 'grid', placeSelf: 'center', cursor: 'pointer' }}>
                                <i className="fa fa-search fa-md" aria-hidden="true" style={{ display: 'grid', placeSelf: 'center' }}></i> 
                            </Grid>
                            <Grid item xs={11} sm={1} md={11} lg={11} xl={11} style={{ display: 'grid', alignContent: 'center' }}>
                                <input className={ styles.search } type="text" value={this.state.searchValue} 
                                    placeholder="Search ..." onChange={(e) => this.setState({searchValue: e.target.value})} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4} style={{ display: 'grid', placeSelf: 'center' }}>
                    { this.state.selected.length > 0 && !this.state.isFormVisible && 
                        <Grid container alignItems='center'>
                            <Grid item xs={9} sm={9} md={10} lg={11} xl={11} style={{ display: 'grid', justifyContent: 'end', alignItems: 'center', color: 'white', fontWeight: 700}}>
                                { this.state.selected.length } selected
                            </Grid>
                            <Grid item xs={3} sm={3} md={2} lg={1} xl={1} style={{ display: 'grid', placeSelf: 'center', color: 'white' }}>
                                <i className="fa fa-trash fa-lg" aria-hidden="true" onClick={this.handleDelete} style={{ display: 'grid', placeSelf: 'center' }}></i>
                            </Grid>
                        </Grid>
                    }
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} xl={2} style={{ display: 'grid', alignContent: 'center', justifyContent: 'end' }}>
                        <button className={ styles.toolbarButton } onClick={this._handleToogleForm}>
                            { this.state.isFormVisible ? 
                                <div>EXISTING REQUESTS</div> : 
                                <div><i className="fa fa-plus" aria-hidden="true"></i> NEW REQUEST</div>
                            }
                        </button>
                    </Grid>
                </Grid>
                { !this.state.isFormVisible ?
                <div>
                { this.state.currentUser.Id === this.state.adminMarketing.Id || this.state.currentUser.Id === this.state.adminIT.Id || this.state.currentUser.Id === 965 ?        
                <table>
                    <thead>
                        <tr>
                            <th>
                            <input 
                                type="checkbox" id="ColumnCheckbox" name="ColumnCheckbox" 
                                checked={this.state.requests.length > 0 && this.state.selected.length === this.state.requests.length}
                                onChange={ this.handleSelectAllClick }/>
                            </th>
                            <th>ID</th>
                            <th>Subject</th>
                            <th>Created On</th>
                            <th>Assigned To</th>
                            <th>Created By</th>
                            <th>Due By</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Location</th>
                            <th>Category</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this._searchRequest(this.state.requests).sort((a, b) => b.ID - a.ID).slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage +  this.state.rowsPerPage)
                        .map(request => {
                        const isRequestSelected = this.isSelected(request.ID)

                        return(
                            <tr>
                                <td>
                                    <input type="checkbox" id="ColumnCheckbox" name="ColumnCheckbox" checked={ isRequestSelected } 
                                        onClick={ (event) => this.handleSelectClick(event, request.ID) }
                                    />
                                </td>
                                <td>{ request.ID }</td>
                                <td>{ request.Title }</td>
                                <td>{ request.Created }</td>
                                <td>
                                    <select className={ styles.selection } name='assignTo' id='assignTo' value={ request.AssignedTo } onChange={(e) => {this.handleAssignedChange(e, request.ID)}}>
                                        { this.state.assignedToOptions.map(option => (
                                        <option selected={ request.AssignedTo === option }>{option}</option> ))}
                                    </select>
                                </td>
                                <td>{ request.CreatedBy }</td>
                                <td>
                                    <input className={ styles.selection }  onChange={e => this._handleDateChange(e, request.ID)} min={new Date().toISOString().split("T")[0]} defaultValue={ request.Created } type="date"/>
                                </td>
                                <td>
                                    <select className={ styles.selection } name='status' id='status' value={ request.Status } onChange={(e) => this._handleStatusChange(e, request.ID)}>
                                        { this.state.statusOptions.map(option => (
                                        <option selected={ request.Status === option }>{option}</option> ))}
                                    </select>
                                </td>
                                <td>
                                    <select className={ styles.selection } name='priority' id='priority' value={ request.Priority } onChange={(e) => {this._handlePriorityChange(e, request.ID)}}>
                                        { this.state.priorityOptions.map(option => (
                                        <option selected={ request.Priority === option }>{option}</option> ))}
                                    </select>
                                </td>
                                <td>{ request.Location }</td>
                                <td>
                                    <select className={ styles.selection } name='category' id='category' value={ request.Category } onChange={(e) => {this._handleCategoryChange(e, request.ID)}}>
                                        { this.state.categoryOptions.map(option => (
                                        <option selected={ request.Category === option }>{option}</option> ))}
                                    </select>
                                </td>
                                <td>{ request.Description }</td>
                            </tr>
                        )})}
                    </tbody>
                </table> :
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Subject</th>
                            <th>Created On</th>
                            <th>Assigned To</th>
                            <th>Due By</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Location</th>
                            <th>Category</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this._searchRequest(this.state.requests).sort((a, b) => b.ID - a.ID).slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage +  this.state.rowsPerPage)
                        .filter(request => request.CreatedBy === this.state.currentUser.Title).map(request => {
                        return(
                            <tr>
                                <td>{ request.ID }</td>
                                <td>{ request.Title }</td>
                                <td>{ request.Created }</td>
                                <td>{ request.AssignedTo }</td>
                                <td>{ request.DueBy }</td>
                                <td>{ request.Status }</td>
                                <td>{ request.Priority }</td>
                                <td>{ request.Location }</td>
                                <td>{ request.Category }</td>
                                <td>{ request.Description }</td>
                            </tr>
                        )})}
                    </tbody>
                </table>
                }
                <div style={{ marginTop: '1em' }}>
                    { this.state.currentUserRequestNumber > 0 ?
                        <CustomTablePagination
                            style={{ float: 'right', paddingTop: 20 }}
                            rowsPerPageOptions={[5, 10, 25]}
                            count={this.state.requests.length}
                            page={this.state.page}
                            onChangePage={ this._handleChangePage }
                            rowsPerPage={this.state.rowsPerPage}
                            onChangeRowsPerPage={ this._handleChangeRowsPerPage }
                        /> :
                        <Grid container style={{ padding: 20, minHeight: '12.5em' }}>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: 'grid', alignContent: 'center', justifyItems: 'center' }}>
                                <span>No request(s) found in this view.</span>
                            </Grid>
                        </Grid>
                    }
                </div>

                </div> :
                    <Grid container justify='center' style={{ marginTop: 20 }}>
                        <Grid item xs={12} sm={12} md={10} lg={8} xl={8}>
                            <Grid container spacing={2} style={{ borderRadius: 5, padding: 20 }}>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} spacing={4}>
                                    <label htmlFor="subject">Subject <i style={{ color: 'red', fontSize: 10}} className="fa fa-asterisk fa-xs" aria-hidden="true"></i></label>
                                    <input className={ styles.formInput} value={this.state.Title} onChange={e => this.setState({Title: e.target.value})} type="text" id="subject" name="subject" required/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} spacing={4}>
                                    <label htmlFor="priority">Priority</label>
                                    <select  className={ styles.formInput} value={this.state.Priority} onChange={e => this.setState({Priority: e.target.value})} id="priority" name="priority">
                                        <option>Select an option</option>
                                        { this.state.priorityOptions.map(option => (
                                            <option value={option}>{option}</option>
                                        ))}
                                    </select>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} spacing={4}>
                                    <label htmlFor="location">Location</label>
                                    <input  className={ styles.formInput} value={this.state.Location} onChange={e => this.setState({Location: e.target.value})} type="text" id="location" name="location"/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} spacing={4}>
                                <label htmlFor="category">Category</label>
                                    <select  className={ styles.formInput} value={this.state.Priority} onChange={e => this.setState({Priority: e.target.value})} id="category" name="category">
                                        <option>Select an option</option>
                                        { this.state.categoryOptions.map(option => (
                                            <option value={option}>{option}</option>
                                        ))}
                                    </select>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} spacing={4}>
                                    <label htmlFor="description">Description <i style={{ color: 'red', fontSize: 10}} className="fa fa-asterisk fa-xs" aria-hidden="true"></i></label>
                                    <textarea rows={8} className={ styles.formInput} value={this.state.Description} onChange={e => this.setState({Description: e.target.value})} id="description" name="description" required/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} spacing={4}>
                                    <button className={ styles.formSubmitButton } onClick={this._handleFormSubmit}>Submit</button>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    { this.state.formErrorMessage !== '' &&                             
                                        <div style={{ color: 'red', margin: 5}} >
                                            {this.state.formErrorMessage}
                                        </div>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                }
                </div>
            </div>
        )
    }
}



{/* <form onSubmit={this._handleFormSubmit}>
<label htmlFor="subject">Subject <i style={{ color: 'red', fontSize: 10}} className="fa fa-asterisk fa-xs" aria-hidden="true"></i></label>
<input className={ styles.formInput} type="text" id="subject" name="subject" required onChange={e => console.log(e.target.value)}/>

<label htmlFor="assignTo">Assign To <i style={{ color: 'red', fontSize: 10}} className="fa fa-asterisk fa-xs" aria-hidden="true"></i></label>
<select className={ styles.formInput} id="assignTo" name="assignTo" required>
    <option>Select an option</option>
    { this.state.assignedToOptions.map(option => (
        <option>{option}</option>
    ))}
</select>

<label htmlFor="dueBy">Due By <i style={{ color: 'red', fontSize: 10}} className="fa fa-asterisk fa-xs" aria-hidden="true"></i></label>
<input className={ styles.formInput} type="date" id="dueBy" name="dueBy" required/>

<label htmlFor="priority">Priority <i style={{ color: 'red', fontSize: 10}} className="fa fa-asterisk fa-xs" aria-hidden="true"></i></label>
<select  className={ styles.formInput}id="priority" name="priority" required>
    <option>Select an option</option>
    { this.state.statusOptions.map(option => (
        <option>{option}</option>
    ))}
</select>

<label htmlFor="location">Location</label>
<input  className={ styles.formInput}type="text" id="location" name="location"/>

<label htmlFor="category">Category</label>
<input  className={ styles.formInput}type="text" id="category" name="category"/>

<label htmlFor="description">Description <i style={{ color: 'red', fontSize: 10}} className="fa fa-asterisk fa-xs" aria-hidden="true"></i></label>
<textarea  className={ styles.formInput} id="description" name="description" required/>

<input className={ styles.formSubmitButton } type="submit" value="Submit"/>
</form>             */}


{/* <div className={ styles.toolbarSearch }>
{ this.state.selected.length > 0 ?
    <div className={ styles.toolbarDelete }>
        { this.state.selected.length } selected
        <i className="fa fa-trash fa-lg" style={{ paddingRight: 10, paddingLeft: 10, cursor: 'pointer' }} aria-hidden="true" onClick={this.handleDelete}></i>
    </div>:
    <div className={ styles.searchDiv }>
        <i className="fa fa-search fa-md" aria-hidden="true" style={{ paddingRight: 10, paddingLeft: 10 }}></i> 
        <input className={ styles.search } type="text" value={this.state.searchValue} placeholder="Search ..." onChange={this._handleSearch} />
    </div>
}
<div className={ styles.newRequestButtonDiv }>
    <button className={ styles.toolbarButton } onClick={this._handleToogleForm}>
        { this.state.isFormVisible ? 
            <div>EXISTING REQUESTS</div> : 
            <div><i className="fa fa-plus" aria-hidden="true"></i> NEW REQUEST</div>
        }
    
    </button>
</div>
<div className={ styles.paginationDiv }>
    <select className={ styles.toolbarSelection } name="" id="">
        <option value="">5</option>               
        <option value="">10</option>               
        <option value="">15</option>               
    </select>
    <button className={ styles.pageNumber }>0-0 of 0</button>
    <button className={ styles.paginationButton }><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
    <button className={ styles.paginationButton }><i className="fa fa-arrow-right" aria-hidden="true"></i></button>
</div>
</div> */}


{/* <div className={ styles.formDiv }>
<Grid container spacing={2} justify='center'>
    <Grid item xs={12} sm={12} md={6} lg={4} xl={3} spacing={4}>
        <label htmlFor="subject">Subject <i style={{ color: 'red', fontSize: 10}} className="fa fa-asterisk fa-xs" aria-hidden="true"></i></label>
        <input className={ styles.formInput} value={this.state.Title} onChange={e => this.setState({Title: e.target.value})} type="text" id="subject" name="subject" required/>
    </Grid>
    <Grid item xs={12} sm={12} md={6} lg={4} xl={4} spacing={4}>
        <label htmlFor="assignTo">Assign To <i style={{ color: 'red', fontSize: 10}} className="fa fa-asterisk fa-xs" aria-hidden="true"></i></label>
        <select className={ styles.formInput} value={this.state.AssignedTo} onChange={e => this.setState({AssignedTo: e.target.value})} id="assignTo" name="assignTo" required>
            <option>Select an option</option>
            { this.state.assignedToOptions.map(option => (
                <option value={option}>{option}</option>
            ))}
        </select>
    </Grid>
    <Grid item xs={12} sm={12} md={6} lg={4} xl={4} spacing={4}>
        <label htmlFor="dueBy">Due By <i style={{ color: 'red', fontSize: 10}} className="fa fa-asterisk fa-xs" aria-hidden="true"></i></label>
        <input className={ styles.formInput} value={this.state.DueBy} onChange={e => this.setState({DueBy: e.target.value})} type="date" id="dueBy" name="dueBy" required/>
    </Grid>
    <Grid item xs={12} sm={12} md={6} lg={4} xl={4} spacing={4}>
        <label htmlFor="priority">Priority <i style={{ color: 'red', fontSize: 10}} className="fa fa-asterisk fa-xs" aria-hidden="true"></i></label>
        <select  className={ styles.formInput} value={this.state.Priority} onChange={e => this.setState({Priority: e.target.value})} id="priority" name="priority" required>
            <option>Select an option</option>
            { this.state.priorityOptions.map(option => (
                <option value={option}>{option}</option>
            ))}
        </select>
    </Grid>
    <Grid item xs={12} sm={12} md={6} lg={4} xl={4} spacing={4}>
        <label htmlFor="location">Location</label>
        <input  className={ styles.formInput} value={this.state.Location} onChange={e => this.setState({Location: e.target.value})} type="text" id="location" name="location"/>
    </Grid>
    <Grid item xs={12} sm={12} md={6} lg={4} xl={4} spacing={4}>
        <label htmlFor="category">Category</label>
        <input  className={ styles.formInput} value={this.state.Category} onChange={e => this.setState({Category: e.target.value})} type="text" id="category" name="category"/>
    </Grid>
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} spacing={4}>
        <label htmlFor="description">Description <i style={{ color: 'red', fontSize: 10}} className="fa fa-asterisk fa-xs" aria-hidden="true"></i></label>
        <textarea  className={ styles.formInput} value={this.state.Description} onChange={e => this.setState({Description: e.target.value})} id="description" name="description" required/>
    </Grid>
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} spacing={4}>
        <input className={ styles.formSubmitButton } type="submit" value="Submit" onClick={this._handleFormSubmit}/>
    </Grid>
</Grid>
</div> */}