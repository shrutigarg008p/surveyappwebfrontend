import React, { Component } from 'react';
import './Help.css'
export class Help extends Component<any, any> {

    render() {
        return (
            <div className="panel panel-default ng-scope">
                <div className="panel-heading">
                    Project Details
                    {/*<span class="pull-right" ng-if="vm.surveys.totalCount">Total: {{vm.surveys.totalCount}}</span>*/}
                </div>
                <div>
                    <p>&nbsp;This is help</p>
                    <p>
                        &nbsp; First login page will open. Admin will land on login page the first time site loads.
                    </p>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/rsz_screenshot_6.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    {/*<div className="row">*/}
                    {/*    <p>*/}
                    {/*        &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; Here he will give username and password and login to the site.</p> <br />*/}
                    {/*    <p>*/}
                    {/*        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Upon login admin will land on the dashboard page*/}
                    {/*    </p>*/}
                    {/*    <br />*/}
                    {/*    <h3>&nbsp;&nbsp;&nbsp;Dashboard Screen</h3>*/}
                    {/*</div>*/}
                    {/*<div className="row">*/}
                    {/*    <div className="col-md-3" />*/}
                    {/*    <div className="col-md-6">*/}
                    {/*        <img src="../../assets/img/rsz_screenshot_7.png" />*/}
                    {/*    </div>*/}
                    {/*    <div className="col-md-3" />*/}
                    {/*</div>*/}
                    <br />
                    <p>&nbsp; We have screen named surveys which can be accessed by clicking on surveys in the navigation bar. The screen looks like this</p>
                    <h3>Surveys Screen</h3>
                    <div className="row">
                        <div />
                        <div className="size-sm">
                            <img src="../../assets/img/surveyscreen.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; The main section of the survey dashboard will be a grid, which will display the following information</p>
                    <p>&nbsp; </p><ol style={{listStyleType: 'decimal'}}><li>Id</li><li>Name</li><li>Client</li><li>Publish Date</li><li>Expiry Date</li><li>Type</li><li>User Limit Cutoff</li><li>User Limit Committed</li><li>Points Allocation</li><li>CEGG Points</li></ol><p />
                    <p>&nbsp; This gives us a list of all surveys present in the system. </p>
                    <p>&nbsp; On click of export button admin will have the ability to export the data displayed in grid in form of a csv file</p>
                    <p>&nbsp; Admin can filter surveys on basis of Publish Date , Expiry Date , Survey Name , Client Name and Survey Type</p>
                    <p>&nbsp; By default filters are set as follows:-</p>
                    <p /><ol style={{listStyleType: 'decimal'}}><li>Publish date is set from 1 year before today's date to today's date</li><li>Expiry Date is set from 6 months before today's date to 6 months after today's date</li><li>Admin can change these filters according to requirements</li></ol>
                    <p />
                    <p>&nbsp; On clicking clear filters button any value set in Survey Name or Client Name or Survey Type field will be removed</p>
                    <p>&nbsp; On clicking survey details button next to a particular survey admin will land on the survey details page of that particular survey.</p>
                    <p>&nbsp; The explanation regarding this screen has been given at top. Go to survey details page section for it</p>
                    {/*<p>&nbsp; <a ng-click="gotoTop()">Go to top</a></p>*/}
                    <p>&nbsp; Now admin can also create new survey by clicking on create survey button. On clicking this button new screen appears which looks like this</p>
                    <h3>Create Survey Screen</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/surveyCreate.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; Here all fields marked with asterik(*) sign are mandatory to fill while creating surveys</p>
                    <p>&nbsp; Now admin has the option to either use unique links or create a common survey url for all the panelists to which this particular survey will be sent</p>
                    <p>&nbsp; If he marks the checkbox of use unique links then an option will be provided to upload a csv file containing unique links</p>
                    <p>&nbsp; Blacklist surveys contains list of all those surveys whose completed panelists will be excluded from this survey</p>
                    <br />
                    <p>&nbsp; Now we have another screen named redemptions which can be accessed by clicking on redemptions in the navigation bar. The screen looks like this</p>
                    <h3>Redemptions Screen</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/RedemptionRequest.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; The main section of the redemption dashboard will be a grid, which will display the following information</p>
                    <p>&nbsp; </p><ol style={{listStyleType: 'decimal'}}><li>User</li><li>Request Date</li><li>Mode</li><li>Status</li><li>Points Requested</li><li>Points Redeemed</li><li>Notes</li></ol><p />
                    <p>&nbsp; This screen gives us alist of all redemptions requested by the user on the basis of their points earned via completing surveys or referring somebody else to the website</p>
                    <p>&nbsp; By default filter are set as follows:-</p>
                    <p>&nbsp; </p><ol style={{listStyleType: 'decimal'}}> <li>Request date is set from today's date to six months after today's date</li><li>Request status is set to new</li></ol>
                    <p />
                    <p>&nbsp; Now we have a filter request button which is used to filter requests on the basis of request date , user email , redemption mode and request status</p>
                    <p>&nbsp; When we click on the export button all data available on the grid will be exported in form of a csv file</p>
                    <p>&nbsp; On clicking clear filters button any data set in redemption mode or user email or request date or request status filter will be removed and we will be shown all requests with default filter values</p>
                    <p>&nbsp; Now we have another button approve redemptions. It's working is as follows:-</p>
                    <p>&nbsp; </p><ol style={{listStyleType: 'decimal'}}><li>First according to our requirements we will filter the data and then we will export it</li><li>Now in the csv file we have a column named manual approve. Here we will set the value to true for all those panelists whose redemptions we want to approve</li><li>After that we click on approve redemptions button and choose file we have just modified and theb click on upload approvals button</li></ol>
                    <p />
                    <p>&nbsp; In the data displayed in grid form we also have a details button fr every particular request. On clicking it admin will be taken to redemption request details of a particular panelist</p>
                    <p>&nbsp; From here admin can either approve or cancel request for that particular panelist by clicking on approve or cancel request button</p>
                    <p>&nbsp; Admin can also go back to entire list of redemption requests by clicking on go to redemption requests button</p>
                    <p>&nbsp; Now we have another screen named rewards which can be accessed by clicking on rewards in the navigation bar. The screen looks like this</p>
                    <h3>Rewards Screen</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/RewardsScreen.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; The main section of the reward dashboard will be a grid, which will display the following information</p>
                    <p>&nbsp; </p><ol style={{listStyleType: 'decimal'}}><li>Reward Date</li><li>Type</li><li>User</li><li>Referred User</li><li>Survey</li><li>Points Requested</li></ol><p />
                    <p>&nbsp; By default filters are set as follows:-</p>
                    <p>&nbsp; </p><ol style={{listStyleType: 'decimal'}}><li>Reward date is set from 6 months before today's date to 6 months after today's date</li></ol>
                    <p />
                    <p>&nbsp; We can filter rewards on the basis of reward date or reward type by clicking on filter rewards button.
                        By clicking on clear filters button default value in reward date filter will be set</p>
                    <p>&nbsp; On clicking export button all data displayed in grid will be downloaded in form of a csv file.
                        We have a details button. On clicking it admin will be taken to another screen showing details of that particular reward </p>
                    <h3>Reward Details Screen</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/rewardsDetails.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; Now we have a revoke button. On clicking it reward status of that particular reward will be set from approved to revoked</p>
                    <p>&nbsp; Now we have another screen named referrals which can be accessed by clicking on referrals in the navigation bar. The screen looks like this</p>
                    <h3>Referrals Screen</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/referralsscreen.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; The main section of the referral dashboard will be a grid, which will display the following information</p>
                    <p>&nbsp; </p><ol style={{listStyleType: 'decimal'}}><li>Signup Ip</li><li>Referral Email</li><li>User Email</li><li>Referral Phone</li><li>Referral Date</li><li>Status</li><li>Method</li></ol><p />
                    <p>&nbsp; The referrals workflow will be as follows:-</p>
                    <p>&nbsp; </p><ol style={{listStyleType: 'decimal'}}><li>When a panelist refers someone through any of the various provided options first of all referral status is captured as pending</li><li>When the email has been sent to that particular panelist regarding joining this website then status changes to invited</li><li>When the referred panelist registers on the website the status is captured as accepted</li><li>When the user completes the signup two process then status is captured as pending approval</li><li>Now admin has ability to approve or reject all the pending approval statuses</li></ol><p />
                    <p>&nbsp; By default filters are set as follows:-</p>
                    <p>
                        &nbsp; </p><ol style={{listStyleType: 'decimal'}}><li>Creation date is set from 6 months before today's date to 6 months after today's date</li></ol>
                    <p />
                    <p>&nbsp; Admin can filter referrals on the basis of referral status , referral method , referral email , user email , creation date and signup ip by setting any particular value in these fields and then clicking on filter referrals button</p>
                    <p>&nbsp; When we click on the export button all data available on the grid will be exported in form of a csv file</p>
                    <p>&nbsp; On clicking clear filters button any data set in any filter will be removed and we will be shown all requests with default filter values</p>
                    <p>&nbsp; We have a details button. On clicking it admin will be taken to another screen showing details of that particular referral </p>
                    <h3>Referrals Details Screen</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/referralsscreen.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; On this screen we have a go to referrals button. On clicking it we will be taken back to our referrals screen</p>
                    <p>&nbsp; Now we have another button approve referrals. It's working is as follows:-</p>
                    <p>
                        &nbsp; </p><ol style={{listStyleType: 'decimal'}}><li>First according to our requirements we will filter the data and then we will export it</li><li>Now in the csv file we have a column named manual approve. Here we will set the value to true for all those panelists whose referrals we want to approve</li><li>After that we click on approve referrals button and choose file we have just modified and theb click on upload approvals button</li></ol>
                    <p />
                    <p>&nbsp; Now we have another screen named panelists which can be accessed by clicking on panelists in the navigation bar.</p>
                    <p>&nbsp; On clicking it we will be shown a list of different type of panelists:-</p>
                    <p>&nbsp; </p><ol style={{listStyleType: 'decimal'}}><li>All</li><li>Registered Only</li><li>Basic Profile Only</li><li>Unsubscribe Requests</li><li>Delete Requests</li></ol>
                    <p />
                    <p>&nbsp; On clicking any of these we will be taken to a screen for that particular type of panelist</p>
                    <h3>All Panelists Screen</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/panelists.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; The main section of the all panelists dashboard will be a grid, which will display the following information</p>
                    <p>&nbsp; </p><ol style={{listStyleType: 'decimal'}}><li>Name</li><li>Email</li><li>Phone Number</li><li>Date of Birth</li><li>City</li></ol><p />
                    <p>&nbsp; Here admin will be shown list of all the panelists in our system</p>
                    <p>&nbsp; Here we can filter panelists on the basis of email , phone number , state , city , tier , gender , age , registration date , surveys and userids.</p>
                    <p>&nbsp; In addition to these primary filters the admin will also be able to filter on advanced filter criteria based on profile questions as answered by the panelists. The workflow for the same would be as follows:-</p>
                    <p>&nbsp; </p><ol style={{listStyleType: 'decimal'}}><li>Admin will click on add profile question button</li><li>Admin will then select profile name from a dropdown</li><li>Admin will then selectrelevant profile question from the profile selected above</li><li>Admin will then select the desired answer for the profile question selected </li></ol>
                    <p />
                    <p>&nbsp; By clicking on clear filters button any value set in any filter will be removed. Admin can also create a sample by clicking on create panelist sample button</p>
                    <p>&nbsp; Admin can see all the details for a particular panelist by clicking on details button for that particular panelist</p>
                    <h3>Panelist Details Screen</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/panelisDetails.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; Admin has the ability to take following actions on this screen:-</p>
                    <p>&nbsp; </p><ol style={{listStyleType: 'decimal'}}><li>Change password by clicking on change password button</li><li>Update any of the 10 profioes information through profiles tab</li><li>Temporary or permanently suspend panelist by clicking on temporary delete or permanent delete button</li><li>Revoke or grant referral points</li><li>Add label to the profile by clicking on assign labels button</li><li>Subscribe or unsubscribe panelist from recieving further survey invitations by clicking on unsubscribe button</li><li>Export profile details or survey details or reward details for that particular panelist by clicking on export details button on profile , survey and reward tab respectively</li><li>Admin can also see reward , redemptions and referrals details for that particular panelist on this screen</li><li>Admin can also resend verifcation email to that particular panelist by clicking on resend verification email button</li></ol>
                    <p />
                    <h3>Registered Only Panelists Screen</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/registeredOnly.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; The main section of the registered panelists dashboard will be a grid, which will display the following information</p>
                    <p>&nbsp; </p><ol style={{listStyleType: 'decimal'}}><li>Email</li><li>Phone Number</li><li>Created Date</li></ol><p />
                    <p>&nbsp; These are the panelists who have not filled signup two page which is regarding the details about gender , city , state and date of birth of the panelist </p>
                    <p>&nbsp; Admin can filter panelists on basis of email or phone number by clicking on filter panelists button</p>
                    <p>&nbsp; On clicking export button all data displayed in grid will be downloaded in form of a csv file</p>
                    <p>&nbsp; On clicking clear filters button any data set in any filter will be removed and admin will be shown list of all registered panelists</p>
                    <p>&nbsp; Admin can see all the details for a particular panelist by clicking on details button for that particular panelist</p>
                    <p>&nbsp; The explanation regarding this screen has been given at top. Go to panelist details screen section for it</p>
                    <h3>Basic Profile Only Panelists Screen</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/basicProfile.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; The main section of the basic profile only panelists dashboard will be a grid, which will display the following information</p>
                    <p>&nbsp; </p><ol style={{listStyleType: 'decimal'}}><li>Name</li><li>Email</li><li>Phone Number</li><li>Date of Birth</li><li>City</li></ol><p />
                    <p>&nbsp; These are the panelists who have filled the signup two page. They have not filled there profiles. They have just given their basic profile details which are asked on signup two page after confirmation of account</p>
                    <p>&nbsp; Admin can filter panelists on basis of name or email or phone number by clicking on filter panelists button</p>
                    <p>&nbsp; On clicking export button all data displayed in grid will be downloaded in form of a csv file</p>
                    <p>&nbsp; On clicking clear filters button any data set in any filter will be removed and admin will be shown list of all basic profile only panelists</p>
                    <p>&nbsp; Admin can see all the details for a particular panelist by clicking on details button for that particular panelist</p>
                    <p>&nbsp; The explanation regarding this screen has been given at top. Go to panelist details screen section for it</p>
                    <h3>Unsubscribe Request Panelists</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/unsubscriber.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; The main section of the unsubscribed panelists dashboard will be a grid, which will display the following information</p>
                    <p>&nbsp; </p><ol style={{listStyleType: 'decimal'}}><li>Name</li><li>Email</li><li>Phone Number</li><li>Date of Birth</li><li>City</li></ol><p />
                    <p>&nbsp; These are those panelists who have requested for unsubscription from IndiaPolls</p>
                    <p>&nbsp; Admin can filter panelists on basis of name or email or phone number by clicking on filter panelists button</p>
                    <p>&nbsp; On clicking export button all data displayed in grid will be downloaded in form of a csv file</p>
                    <p>&nbsp; On clicking clear filters button any data set in any filter will be removed and admin will be shown list of all unsubscribed request panelists</p>
                    <p>&nbsp; Admin can see all the details for a particular panelist by clicking on details button for that particular panelist</p>
                    <p>&nbsp; The explanation regarding this screen has been given at top. Go to panelist details screen section for it</p>
                    <p>&nbsp; On clicking include unsubscribed checkbox admin has the ability to see those panelists who have been permanently unsubscribed from IndiaPolls</p>
                    <p>&nbsp; To permanently unsubscribe some panelist admin can click on unsubscribe button in front of that particular panelist</p>
                    <h3>Delete Request Panelists</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/deleteRequest.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; The main section of the delete request panelists dashboard will be a grid, which will display the following information</p>
                    <p>&nbsp; </p><ol style={{listStyleType: 'decimal'}}><li>Name</li><li>Email</li><li>Phone Number</li><li>Date of Birth</li><li>City</li></ol><p />
                    <p>&nbsp; These are those panelists who have requested for deletion of their account from IndiaPolls</p>
                    <p>&nbsp; Admin can filter panelists on basis of name or email or phone number by clicking on filter panelists button</p>
                    <p>&nbsp; On clicking export button all data displayed in grid will be downloaded in form of a csv file</p>
                    <p>&nbsp; On clicking clear filters button any data set in any filter will be removed and admin will be shown list of all unsubscribed request panelists</p>
                    <p>&nbsp; Admin can see all the details for a particular panelist by clicking on details button for that particular panelist</p>
                    <p>&nbsp; The explanation regarding this screen has been given at top. Go to panelist details screen section for it</p>
                    <p>&nbsp; On clicking include deleted checkbox admin has the ability to see those panelists who have been permanently deleted from IndiaPolls</p>
                    <p>&nbsp; To permanently delete some panelist admin can click on delete button in front of that particular panelist</p>
                    <p>&nbsp; Now we have another screen named samples which can be accessed by clicking on samples in the navigation bar. The screen looks like this</p>
                    <h3>Samples Screen</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/sample.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; The main section of the samples dashboard will be a grid, which will display the following information</p>
                    <p>&nbsp; </p><ol style={{listStyleType: 'decimal'}}><li>Name</li><li>Description</li><li>Last Updated</li><li>Stats</li><li>Status</li></ol>
                    <p />
                    <p>&nbsp; Last updated section shows admin when was that particular sample last updated and stats section shows all information regarding panelists in that sample</p>
                    <p>&nbsp; Here list of all samples will be shown </p>
                    <p>&nbsp; Admin can filter samples on the basis of name by clicking on filter samples button</p>
                    <p>&nbsp; On clicking clear filters button any data set in any filter will be removed and admin will be shown list of all samples</p>
                    <p>&nbsp; On clicking create sample button a pop up appears looking like this</p>
                    <h3>Create Sample Popup</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/samplecreate.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; Here only name field is mandatory. Admin can create sample according to his requirements by filling any other field and then click on create sample button</p>
                    <p>&nbsp; If admin decides to give only name then this particular sample will contain list of all the panelists presently in our system.</p>
                    <p>&nbsp; Similarly if he selects male from gender dropdown then this particular sample will contain list of all male panelists and so on</p>
                    <p>&nbsp; By clicking on edit button a popup appears like this</p>
                    <h3>Edit Sample Popup</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/samplecreate.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; From here admin can edit sample according to the requirements and then click on edit sample button</p>
                    <p>&nbsp; Admin also has the abilty to create samples on basis of questions answered by panelists for questions asked in 10 profiles </p>
                    <p>&nbsp; On clicking questions button admin is redirected to sample questions screen.</p>
                    <h3>Samples Question Screen</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/QUestionsSec.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; From here admin has the ability to add question by clicking on add question button</p>
                    <p>&nbsp; Clicking on add question shows a popup like this</p>
                    <h3>Add Sample Question Popup</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/createQuestions.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; From here admin can select a particular profile and then a particular question and he can choose any particluar option for that question and then click on add question button </p>
                    <p>&nbsp; Now this particular sample will also contain those panelists who have answered those particular options for those particular questions for that specific profile</p>
                    <p>&nbsp; By clicking on remove button admin can also delete that particular question from that sample</p>
                    <h3>Delete Sample Question Popup</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/deleteQuestion.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; Now admin can delete that particular question from sample by clicking on yes button or not by clicking on no button</p>
                    <p>&nbsp; Now we have another screen named newsletters which can be accessed by clicking on newsletters in the navigation bar. The screen looks like this</p>
                    <h3>Newsletter Screen</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/newsletter.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; The main section of the newsletter dashboard will be a grid, which will display the following information</p>
                    <p>&nbsp; </p><ol style={{listStyleType: 'decimal'}}><li>Name</li><li>Send Date</li><li>Body</li><li>Status</li></ol><p />
                    <p>&nbsp; Here list of all newsletters will be shown</p>
                    <p>&nbsp; On clicking create newsletter a popup appears like this</p>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/createnewsletter.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; Here all field except emails is mandatory</p>
                    <p>&nbsp; Admin can fill this popup according to the requirements and then create newsletter by clicking on create newsletter button</p>
                    <p>&nbsp; In the emails section admin can write email of that particular panelist to whom this newsletter email has to be sent</p>
                    <p>&nbsp; By clicking on details button admin can see details of that particular newsletter</p>
                    <h3>Newsletter Details Screen</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/detailsnewsletter.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>Admin can go back to entire list of newsletters by clicking on go to newsletters button</p>
                    <p>&nbsp; To send newsletter emails admin has to select particular sample from dropdown and then click on attach samples button</p>
                    <p>&nbsp; Now this email will be sent to all the panelists included in this sample</p>
                    {/*<p>&nbsp; Now we have another screen named sweepstakes which can be accessed by clicking on samples in the navigation bar. The screen looks like this</p>*/}
                    {/*<h3>Sweepstakes Screen</h3>*/}
                    {/*<div className="row">*/}
                    {/*    <div className="col-md-3" />*/}
                    {/*    <div className="col-md-6">*/}
                    {/*        <img src="../../assets/img/rsz_screenshot_29.png" />*/}
                    {/*    </div>*/}
                    {/*    <div className="col-md-3" />*/}
                    {/*</div>*/}
                    {/*<p>&nbsp; The main section of the sweepstake dashboard will be a grid, which will display the following information</p>*/}
                    {/*<p>&nbsp; </p><ol style={{listStyleType: 'decimal'}}><li>Name</li><li>Sweepstake Date</li><li>Approval Date</li></ol><p />*/}
                    {/*<p>&nbsp; Here list of all sweepstakes will be shown </p>*/}
                    {/*<p>&nbsp; On clicking create sweepstake button a popup appears like this</p>*/}
                    {/*<div className="row">*/}
                    {/*    <div className="col-md-3" />*/}
                    {/*    <div className="col-md-6">*/}
                    {/*        <img src="../../assets/img/rsz_screenshot_30.png" />*/}
                    {/*    </div>*/}
                    {/*    <div className="col-md-3" />*/}
                    {/*</div>*/}
                    {/*<p>&nbsp; Admin can select a particular date according to his requirements and then click on create sweepstake button and then sweepstake will be created</p>*/}
                    {/*<p>&nbsp; A sweepstake will be conducted every month where panelist who have been disqualified or overquota in previous month closed surveys shall be considered for a reward. The condition for such sweepstake will be as follows:- </p>*/}
                    {/*<p>&nbsp; </p><ol style={{listStyleType: 'decimal'}}><li>The sweepstake will be conducted on 5th of every month</li><li>The pool for sweepstake will consist of panelists who have eiher been disqualified or overquota for surveys conducted in previous month</li><li>Only closed surveys shall be considered for creating swepstake pool</li><li>Any panelist who has won any sweepsatke in the last 6 months will not be cinsidered for that particular month sweepstake</li><li>The algorithm will randomly select 20 panelists for 200 reward points and a single panelist for 1000 reward points</li></ol>*/}
                    {/*<p />*/}
                    {/*<p>&nbsp; Now we have another screen named messages which can be accessed by clicking on messages in the navigation bar. The screen looks like this</p>*/}
                    <h3>Messages Screen</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/message.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; The main section of the message dashboard will be a grid, which will display the following information</p>
                    <p>&nbsp; </p><ol style={{listStyleType: 'decimal'}}><li>User Email</li><li>Query Type</li><li>Query Status</li><li>Body</li></ol><p />
                    <p>&nbsp; Here list of all queries asked by the panelists will be shown </p>
                    <p>&nbsp; Admin can filter these queries on the basis of query type or email or query status by clicking on filter messages button</p>
                    <p>&nbsp; On clicking clear filters button any data set in any filter will be removed and admin will be shown list of all queries</p>
                    <p>&nbsp; There is no chat facility in this website. The queries asked by the panelists have to be solved offline by the Admin</p>
                    <p>&nbsp; When a particular query has been resolved admin can click on mark resolved button for that query. This will give admin an idea regarding what queries have been solved</p>
                    <p>&nbsp; To see the actual query asked by the panelist admin has to click on the click here to view text under that </p>
                    <br />
                    <p>&nbsp; There is a master settings section. It includes:-</p>
                    <p>&nbsp; </p><ol style={{listStyleType: 'decimal'}}><li>Redemption Modes</li><li>Places</li><li>Partners</li><li>Profiles</li><li>Labels</li><li>Marketing Links</li><li>SEC</li></ol>
                    <p />
                    <h3>Redemption Modes Screen</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/redemptionMode.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; The main section of the redemption mode dashboard will be a grid, which will display the following information</p>
                    <p>&nbsp; </p><ol style={{listStyleType: 'decimal'}}><li>Name</li><li>Minimum Points</li><li>Use Name</li><li>Use Phone</li><li>Use Address</li><li>Description</li></ol><p />
                    <p>&nbsp; This is a list of all the redemption modes against which users can redeem their points earned through completing surveys or referring someone else</p>
                    <p>&nbsp; On clicking edit button admin can edit already existing redemption mode. </p>
                    <h3>Edit Redemption Mode Popup</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/RedemptionModeCreate.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; Now admin can update the redemption mode according to his requirements and then click on update redemption mode button and redemption mode will be updated</p>
                    <p>&nbsp; Admin can create a new redemption mode by clicking on create redemption mode button</p>
                    <h3>Create Redemption Mode Popup</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/RedemptionModeCreate.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; Here name field is madatory. The rest of the popup can be filled by admin according to the requirements and then click on create redemption mode button to create new redemption mode</p>
                    <h3>Places Screen</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/Country.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; This page shows admin list of all the countries , states and cities</p>
                    <p>&nbsp; Admin has the ability to add a new country by clicking on add country button</p>
                    <h3>Add Country Popup</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/createCOuntry.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; Now admin has to write a name and then click on add country button and that country will be added</p>
                    <p>&nbsp; When admin moves the mouse cursor around the name of the country he can see a edit button in front of that country , clicking on which gives admin the ability to edit that particular country</p>
                    <h3>Edit Country Popup</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/createCOuntry.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; Now admin can change the name of the country accordingly and then click on edit country button and that particular country will be updated</p>
                    <p>&nbsp; When admin clicks on any particular country all states in it are shown under states section</p>
                    <p>&nbsp; Admin has the ability to add a new state by clicking on add state button</p>
                    <h3>Add State Popup</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/createstate.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; Now admin has to select a country from the dropdown in which he wants to add this state and then write name of that state and then click on add state button and new state in that particular country will be added</p>
                    <p>&nbsp; When admin moves the mouse cursor around the name of the state he can see a edit button in front of that state , clicking on which gives admin the ability to edit that particular state</p>
                    <h3>Edit State Popup</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/createstate.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; Now admin can change the name of the state accordingly and then click on edit state button and that particular state will be updated</p>
                    <p>&nbsp; When admin clicks on any particular state all cities in it are shown under cities section</p>
                    <p>&nbsp; Admin has the ability to add a new city by clicking on add city button</p>
                    <h3>Add City Popup</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/createcity.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; Now admin can choose the country and state from choose country and state dropdown respectively in which he wants to add the new city and then write the name of he new city and give tier number and then click on add city button to add new city</p>
                    <p>&nbsp; Cities are numbered from tiers 1 to 5</p>
                    <p>&nbsp; When admin moves the mouse cursor around the name of the city he can see a edit button in front of that city , clicking on which gives admin the ability to edit that particular city</p>
                    <h3>Edit City Popup</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/createcity.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; Now admin can change the name of the city or tier number accordingly and then click on edit city button and that particular city will be updated</p>
                    <h3>Partners Screen</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/partners.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; The main section of the partner dashboard will be a grid, which will display the following information</p>
                    <p>&nbsp; </p><ol style={{listStyleType: 'decimal'}}><li>Name</li><li>Description</li><li>Success Url</li><li>Overquota Url</li><li>Disqualified Url</li></ol><p />
                    <p>&nbsp; Admin can create new partner by clicking on add partner button</p>
                    <h3>Add Partner Popup</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/createPartner.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; Here all the fields are mandatory. Admin has to fill all the fields and then click on create partner button and a new partner will be created</p>
                    <p>&nbsp; Admin also has the ability to edit a articular partner by clicking on edit button in front of that particular partner</p>
                    <h3>Edit Partner Popup</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/createPartner.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; Now admin can change the fields according to the requirements and then click on edit partner button and that particular partner will be updated</p>
                    <h3>Profiles Screen</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/profile.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; The main section of the profile dashboard will be a grid, which will display the following information</p>
                    <p>&nbsp; </p><ol style={{listStyleType: 'decimal'}}><li>Name</li><li>Description</li><li>Display Order</li></ol><p />
                    <p>&nbsp; This screen shows list of all the profiles in the system. These profiles contain list of questions in them which have to be answered by the panelists. </p>
                    <p>&nbsp; Admin has the ability to create a new profile by clicking on the create profile button</p>
                    <h3>Create Profile Popup</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/profileCreate.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; Here admin has to give name description and display order and click on create profile button and a new profile button will be created</p>
                    <p>&nbsp; Display Order referrs to the order in which this profile will appear with respect to all other profiles</p>
                    <p>&nbsp; Now admin also has the ability to edit profile according to requirements</p>
                    <h3>Edit Profile Popup</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/profileCreate.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; Now admin can edit profile accordingly and click on edit profile button and that particular profile will be updated</p>
                    <p>&nbsp; Admin can also delete a particular profile by clicking on delete button in front of that particular profile</p>
                    <h3>Delete Profile Popup</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/profiledetails.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; Now admin can delete that profile by clicking on yes button or not by clicking on no button</p>
                    <p>&nbsp; To add questions to that profile admin has to click on questions button in front of that profile</p>
                    <h3>Profile Questions Screen</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/QUestionsSec.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; The main section of the profile questions dashboard will be a grid, which will display the following information</p>
                    <p>&nbsp; </p><ol style={{listStyleType: 'decimal'}}><li>Question</li><li>Display Order</li><li>Display Type</li><li>Is Active</li></ol><p />
                    <p>&nbsp; This screen shows list of already existing questions in that profile. These can also be edited or deleted</p>
                    <p>&nbsp; To edit a particular question admin has to click on edit button in front of that question</p>
                    <h3>Edit Profile Question Screen</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/createQuestions.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; Now admin can change any of the fields accordingly or even add new options for that question and then click on edit profile question button and that particular question will be updated</p>
                    <p>&nbsp; To delete a particular question admin has to click on delete button in front of that question</p>
                    <h3>Delete Profile Question Popup</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/deleteQuestion.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; Now admin can delete that profile question by clicking on yes button or not by clicking on no button</p>
                    <p>&nbsp; Details regarding that profile question can be seen by admin by clicking on details button in front of that question</p>
                    <h3>Profile Question Details Screen</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/questiondetails.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; From here also admin can edit profile question by clicking on edit profile question button or clickon go to questions button to go the screen containing all the questions for that particular profile</p>
                    <p>&nbsp; Admin can also add a question to a particular profile</p>
                    <h3>Add Profile Question Popup</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/createQuestions.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; Now admin create a question by filling all the fields and he can choose type of question to be checkbox or radio or dropdown by selecting from display type dropdown and then he can add the options accordingly for that question and click on create profile question button and new question for thta particular profile will be created</p>
                    <h3>Labels Screen</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/labels.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; The main section of the partner dashboard will be a grid, which will display the following information</p>
                    <p>&nbsp; </p><ol style={{listStyleType: 'decimal'}}><li>Name</li><li>Description</li><li>User Count</li></ol><p />
                    <p>&nbsp; This screen gives admin list of all the labels existing in the system</p>
                    <p>&nbsp; Admin has the ability to create a new label by clicking on create label button</p>
                    <h3>Create Label Popup</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/CreateLabel.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; Here admin has to give name and description and click on create label button and label will be created</p>
                    <p>&nbsp; Now admin can also edit label according to requirements by clicking on edit button</p>
                    <h3>Edit Label Popup</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/CreateLabel.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; Now admin can edit the name or description according to requirements and then click on edit button and then label will be updated successfully</p>
                    <p>&nbsp; Admin can also delete a particular label by clicking on delete button in front of that label</p>
                    <h3>Delete Label Popup</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/labelsDetails.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; Now admin can delete that label by clicking on yes button or not by clicking on no button</p>
                    <h3>Marketing Links</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/marketinglinks.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; The main section of the marketing link dashboard will be a grid, which will display the following information</p>
                    <p>&nbsp; </p><ol style={{listStyleType: 'decimal'}}><li>Name</li><li>Description</li><li>Url</li><li>Clicks</li></ol><p />
                    <p>&nbsp; This screen contains list of all marketing links</p>
                    <p>&nbsp; The concept of marketing links is as follows:-</p>
                    <p>&nbsp; New users can join this site through various possible ways. Admin can send email invite or sms invite or advertisement on facebook and other various ways. </p>
                    <p>&nbsp; Now admin can create a unique marketing link and post this link on facebook or send it through email invite. This screen will let the admin know how many users joined the site through this link. There is a clicks tab in the grid which increases on every click on that link</p>
                    <p>&nbsp; Admin also has the ability to create a new marketing link by clicking on create button</p>
                    <h3>Create Marketing Link Popup</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/createmarketing.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; Here both the fields are mandatory. After giving name and description admin has to click on create marketing link and new marketing link will be created</p>
                    <p>&nbsp; Admin also has the ability to edit existing marketing link by clicking on edit button in front of that link</p>
                    <h3>Edit Marketing Link Popup</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/createmarketing.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; Now admin can change the name or description according to the requirements and then click on edit marketing link button and that link will be edited</p>
                    <p>&nbsp; Admin can also delete a particular marketing link by clicking on delete button in front of that marketing link</p>
                    <h3>Delete Marketing Link Popup</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/markwtinglinksdetails.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; Now admin can delete that marketing link by clicking on yes button or not by clicking on no button</p>
                    <p>&nbsp; Admin also has the ability to view users for a particular marketing link by clicking on view users button in front of that link</p>
                    <p>&nbsp; Basically this screen lets admin know basic profile information of that particular user who joined the site through that particular link</p>
                    <h3>Marketing Link Users Screen</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/marketinglinks.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <h3>SEC Screen</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/sec.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; The main section of the marketing link users dashboard will be a grid, which will display the following information</p>
                    <p>&nbsp; </p><ol style={{listStyleType: 'decimal'}}><li>Name</li><li>Email</li><li>Phone NUmber</li><li>Date ofBirth</li><li>City</li></ol><p />
                    <p>&nbsp; This screen shows list of all the secs present in the system</p>
                    <p>&nbsp; SEC referrs to socio-economic categorization.</p>
                    <p>&nbsp; The concept of SEC is as follows:-</p>
                    <p>&nbsp; A grading system is followed. Admin can decide what criteria to be set for each grade. For eg:- Grade A contain users with salary more than 5 lacs and living in tier one. Similarly admin has to once set criteria for every grade. As in samples admin can also set criteria for grade on basis of how users answered questions asked in their ten profiles</p>
                    <p>&nbsp; Now these grades will contain users on the basis of criteria set by admin.</p>
                    <p>&nbsp; Admin can filter secs on the basis of name by clicking on filter secs button</p>
                    <p>&nbsp; On clicking clear filters button any data set in any filter will be removed and admin will be shown list of all secs</p>
                    <p>&nbsp; On clicking create sec button a pop up appears looking like this</p>
                    <h3>Create Sec Popup</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/createSec.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; Here only name field is mandatory. Admin can create sec according to his requirements by filling any other field as well and then click on create sec button</p>
                    <p>&nbsp; By clicking on edit button a popup appears like this</p>
                    <h3>Edit Sec Popup</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/createSec.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; From here admin can edit sec according to the requirements and then click on edit sec button</p>
                    <p>&nbsp; Admin also has the abilty to create secs on basis of questions answered by panelists for questions asked in 10 profiles </p>
                    <p>&nbsp; On clicking questions button admin is redirected to sec questions screen.</p>
                    <h3>SEC Question Screen</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/QUestionsSec.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; From here admin has the ability to add question by clicking on add question button</p>
                    <p>&nbsp; Clicking on add question shows a popup like this</p>
                    <h3>Add SEC Question Popup</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/createQuestions.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; From here admin can select a particular profile and then a particular question and he can choose any particluar option for that question and then click on add question button </p>
                    <p>&nbsp; Now this particular sec will also contain those panelists who have answered those particular options for those particular questions for that specific profile</p>
                    <p>&nbsp; By clicking on remove button admin can also delete that particular question from that sec</p>
                    <h3>Delete SEC Question Popup</h3>
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <img src="../../assets/img/deleteRequest.png" />
                        </div>
                        <div className="col-md-3" />
                    </div>
                    <p>&nbsp; Now admin can delete that particular question from sec by clicking on yes button or not by clicking on no button</p>
                    <h3>Background Emails</h3>
                    <p>&nbsp; There will be certain emails that will be fired in the background without any user interaction. Following is a complete list of such emails</p>
                    <p>&nbsp; </p><ol style={{listStyleType: 'decimal'}}><li>Email confirmation when a user completes Step 1 of the registration process</li><li>Welcome email to the user when he/she completes Step 2 of the registration process</li><li>Password reset email</li><li>Survey invitation mail</li><li>Survey reminder mail triggered by admin</li><li>Mail notification for point allocation for a survey</li><li>Mail notification when reward points are allocated for a referral</li><li>Mail confirmation of Account Deletion</li><li>Successful request placed for redemption of reward points</li><li>Status change for redemption requests : For completed or failed status update</li><li>Congratulation email to sweepstake winners</li><li>Reminder mail, every three months, to users who have only completed Step 1 of registration</li><li>Reminder mail, every three months, to users who have only completed Step1 &amp; 2 of registration and no other profile.
                </li></ol><p />
                </div>
            </div>
        );
    }
}
