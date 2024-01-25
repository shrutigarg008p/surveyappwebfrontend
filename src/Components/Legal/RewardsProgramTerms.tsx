import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Paper,
} from '@material-ui/core';

import { Assets } from 'enums';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        marginBottom: theme.spacing(3),
    },
    content: {
        padding: theme.spacing(3),
        textAlign: 'left',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        maxWidth: '400px', // Adjust the maximum width as needed
    },
}));

function RewardsProgramTerms() {
    const classes = useStyles();
    const headingStyle = { color: '#5a5a5a', fontSize: '22.5pt' };
    const subHeadingStyle = { color: '#5a5a5a', fontSize: '13pt' };
    const emphasizedStyle = {}; //{ color: '#5a5a5a', backgroundColor: '#ffff00', fontSize: '13pt' };
    const strongHeadingStyle = { color: '#5a5a5a', fontSize: '16.5pt' };
    const listStyle = { listStyleType: 'disc', color: '#5a5a5a', fontSize: '13pt' };
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6"> Privacy Policy</Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" className={classes.content}>
                <Paper className={classes.paper}>
                    <img alt="Logo" src={Assets.Logo2} className={classes.logo} />
                    <Typography variant="h4" gutterBottom>
                        Rewards Program Terms
                    </Typography>
                 <div>
  <p style={{marginTop: '15pt', marginBottom: '7.5pt', fontSize: '19pt', backgroundColor: '#ffffff'}}>
    <strong><span style={{fontFamily: 'filson_softlight', textTransform: 'uppercase', color: '#455a64'}}>INDIAPOLLS REWARDS PROGRAM TERMS</span></strong>
  </p>
  <p style={{fontSize: '11.5pt'}}>
    <span style={{fontFamily: 'Lato', color: '#001627', backgroundColor: '#ffffff'}}>&nbsp;</span>
  </p>
  <p style={{marginTop: '7.5pt', marginBottom: '7.5pt', fontSize: '15pt', backgroundColor: '#ffffff'}}>
    <strong><span style={{fontFamily: 'Lato'}}>IndiaPolls Rewards Program Terms</span></strong>
  </p>
  <ol style={{margin: '0pt', paddingLeft: '0pt'}}>
    <li style={{marginLeft: '35.65pt', paddingLeft: '0.35pt', fontFamily: 'Lato', fontSize: '11.5pt', color: '#001627', backgroundColor: '#ffffff'}}>
      These IndiaPolls Rewards Program Terms ("Rules") apply to all promotions run by DataXing, including, but not limited to, the Points Program, as promoted on the IndiaPolls panel Site ("Site"). IndiaPolls ("IndiaPolls") is the name of the panel operated by DataXing.
    </li>
  </ol>
  <p style={{marginTop: '7.5pt', marginBottom: '7.5pt', fontSize: '15pt', backgroundColor: '#ffffff'}}>
    <strong><span style={{fontFamily: 'Lato'}}>Accumulation Of IndiaPolls Points</span></strong>
  </p>
  <ol style={{margin: '0pt', paddingLeft: '0pt'}}>
    <li style={{marginTop: '14pt', marginLeft: '35.65pt', paddingLeft: '0.35pt', fontFamily: 'Lato', fontSize: '11.5pt', color: '#001627', backgroundColor: '#ffffff'}}>
      Once you have joined IndiaPolls, you will be offered incentives in the form of points (“Points”) or other IndiaPolls types of incentives will be awarded when you undertake various Activities on the Site.
    </li>
    <li style={{marginLeft: '35.65pt', paddingLeft: '0.35pt', fontFamily: 'Lato', fontSize: '11.5pt', color: '#001627', backgroundColor: '#ffffff'}}>
      When you register with IndiaPolls, your Account will have the status “Active”, you can participate in all Activities you are invited to by DataXing and you can enjoy all IndiaPolls benefits such as access our Services, your incentives, and contacting DataXing Personnel. To keep your account “Active” means that you have joined IndiaPolls and participated in a survey or other activity on the Site within 30 days from your initial registration or within any 90 day period.
    </li>
    <li style={{marginLeft: '35.65pt', paddingLeft: '0.35pt', fontFamily: 'Lato', fontSize: '11.5pt', color: '#001627', backgroundColor: '#ffffff'}}>
      Currently, you can earn Points by completing most surveys. Where a survey does not carry Points, this will be clearly stated on the Site at the beginning of the survey or in the survey invitation email that you will receive from us.
    </li>
    <li style={{marginLeft: '35.65pt', marginBottom: '14pt', paddingLeft: '0.35pt', fontFamily: 'Lato', fontSize: '11.5pt', color: '#001627', backgroundColor: '#ffffff'}}>
      Your Account can also be suspended if one of the following situations arises:<br /><br />• No participation after you have joined IndiaPolls<br />• No participation in a survey within your first 30 days from joining IndiaPolls<br />• No participation in a survey within any 90-day period
    </li>
  </ol>
  <p style={{marginLeft: '36pt', fontSize: '11.5pt', backgroundColor: '#ffffff'}}>
    <span style={{fontFamily: 'Lato', color: '#001627'}}>If your Account has been suspended or closed, you have the right to ask DataXing to investigate the situation. You should contact our support team for that. If you feel your account has been incorrectly suspended or closed, you must contact DataXing by email within sixty (60) days following the alleged error and explain in full the basis of your dispute, attaching any relevant information which offers evidence of the discrepancy. Upon receipt of your notice, we will investigate your claim and notify you of our decision within thirty (30) days. If we need additional time to decide your claim, we will notify you and will endeavour to render a decision as soon as reasonably practicable. Any decision by us with regard to such a claim will be final.</span>
  </p>
  <ol start={5} style={{margin: '0pt', paddingLeft: '0pt'}}>
    <li style={{marginTop: '14pt', marginLeft: '35.65pt', paddingLeft: '0.35pt', fontFamily: 'Lato', fontSize: '11.5pt', color: '#001627', backgroundColor: '#ffffff'}}>
      DataXing will not provide you with any notice of the cancellation and forfeiture of any of your Points. DataXing reserves the right to amend these cancellation and forfeiture rules in its sole discretion.
    </li>
    <li style={{marginLeft: '35.65pt', paddingLeft: '0.35pt', fontFamily: 'Lato', fontSize: '11.5pt', color: '#001627', backgroundColor: '#ffffff'}}>
      You may cancel your account at any time by going to our Site in your account section and click on “cancel my account” and your account will immediately be cancelled. If you have any issues cancelling your account please contact the support team. The support team will respond to you as soon as reasonably practicable. Immediately upon deletion or your withdrawal from IndiaPolls your account will be closed. You understand and agree that, as noted above, upon suspension, cancellation or closing of your account, your right to access the Services will cease and all Points credited to your account at such time, however and whenever accumulated, will be forfeited. DataXing may terminate your account at any time for any reason.
    </li>
    <li style={{marginLeft: '35.65pt', marginBottom: '14pt', paddingLeft: '0.35pt', fontFamily: 'Lato', fontSize: '11.5pt', color: '#001627', backgroundColor: '#ffffff'}}>
      Points awarded will be posted to your account no later than 30 days following survey completion and will be available for redemption as soon as they are posted to your account. DataXing takes reasonable care to ensure Points are accurately deposited in your account. However, you are responsible for ensuring that your Points are correctly deposited and you should notify DataXing within 2 months of completion of a survey if IndiaPolls have not been correctly posted to your account.
    </li>
  </ol>
  <p style={{marginTop: '7.5pt', marginBottom: '7.5pt', fontSize: '15pt', backgroundColor: '#ffffff'}}>
    <strong><span style={{fontFamily: 'Lato'}}>IndiaPolls Points Values</span></strong>
  </p>
  <ol style={{margin: '0pt', paddingLeft: '0pt'}}>
    <li style={{marginTop: '14pt', marginLeft: '35.65pt', paddingLeft: '0.35pt', fontFamily: 'Lato', fontSize: '11.5pt', color: '#001627', backgroundColor: '#ffffff'}}>
      You will receive a certain number of IndiaPolls Points per completed activity (dependent on complexity). The number of IndiaPolls Points available for any activity will be stated on the Website
    </li>
    <li style={{marginLeft: '35.65pt', paddingLeft: '0.35pt', fontFamily: 'Lato', fontSize: '11.5pt', color: '#001627', backgroundColor: '#ffffff'}}>
      You can view your total number of IndiaPolls Points online on the Website.
    </li>
    <li style={{marginLeft: '35.65pt', marginBottom: '14pt', paddingLeft: '0.35pt', fontFamily: 'Lato', fontSize: '11.5pt', color: '#001627', backgroundColor: '#ffffff'}}>
      IndiaPolls Points are personal to you and are not transferable without DataXing's written permission. They are not considered to be property, and as such, you cannot sell, transfer or assign your Points to any other person without DataXing's written permission.
    </li>
  </ol>
  <p style={{marginTop: '7.5pt', marginBottom: '7.5pt', fontSize: '15pt', backgroundColor: '#ffffff'}}>
    <strong><span style={{fontFamily: 'Lato'}}>Redemption Of IndiaPolls Points</span></strong>
  </p>
  <ol style={{margin: '0pt', paddingLeft: '0pt'}}>
    <li style={{marginTop: '14pt', marginLeft: '35.65pt', paddingLeft: '0.35pt', fontFamily: 'Lato', fontSize: '11.5pt', color: '#001627', backgroundColor: '#ffffff'}}>
      You can only redeem your Points if you have enough points to redeem the lowest points amount prize on the Website and if your account is in good standing.
    </li>
    <li style={{marginLeft: '35.65pt', paddingLeft: '0.35pt', fontFamily: 'Lato', fontSize: '11.5pt', color: '#001627', backgroundColor: '#ffffff'}}>
      All IndiaPolls Points must be redeemed online. To redeem Points, you should follow the process shared on the website.
    </li>
    <li style={{marginLeft: '35.65pt', paddingLeft: '0.35pt', fontFamily: 'Lato', fontSize: '11.5pt', color: '#001627', backgroundColor: '#ffffff'}}>
      The value of one IndiaPolls Point varies depending on the prize you choose. DataXing reserves the right to change this value without notice, and any change will be set out on the Website or within these Rules.
    </li>
    <li style={{marginLeft: '35.65pt', paddingLeft: '0.35pt', fontFamily: 'Lato', fontSize: '11.5pt', color: '#001627', backgroundColor: '#ffffff'}}>
      IndiaPolls Points can currently be redeemed for gift vouchers mentioned on the website.
    </li>
    <li style={{marginLeft: '35.65pt', paddingLeft: '0.35pt', fontFamily: 'Lato', fontSize: '11.5pt', color: '#001627', backgroundColor: '#ffffff'}}>
      The IndiaPolls Points can be redeemed on the Website. Further details of this arrangement can be found on the Website. DataXing reserves the right to change merchandise and gift certificate offers on the Website at its discretion and without notice. You acknowledge that DataXing is not responsible for any actions taken by our incentive partners in connection with the redemption of IndiaPolls Points.
    </li>
    <li style={{marginLeft: '35.65pt', paddingLeft: '0.35pt', fontFamily: 'Lato', fontSize: '11.5pt', color: '#001627', backgroundColor: '#ffffff'}}>
      The value of your selected reward may not exceed the number of IndiaPolls Points in your account. However, you may select a reward of lesser value. Any unused DataXing Points will remain in your account for future use and once you redeem IndiaPolls Points, the appropriate number of Points will be deducted from your account.
    </li>
    <li style={{marginLeft: '35.65pt', paddingLeft: '0.35pt', fontFamily: 'Lato', fontSize: '11.5pt', color: '#001627', backgroundColor: '#ffffff'}}>
      IndiaPolls Points are non-negotiable and may only be redeemed on the Website.
    </li>
    <li style={{marginLeft: '35.65pt', paddingLeft: '0.35pt', fontFamily: 'Lato', fontSize: '11.5pt', color: '#001627', backgroundColor: '#ffffff'}}>
      Rewards received as a result of redemption of IndiaPolls Points cannot be exchanged, returned or redeemed for cash value.
    </li>
    <li style={{marginLeft: '35.65pt', paddingLeft: '0.35pt', fontFamily: 'Lato', fontSize: '11.5pt', color: '#001627', backgroundColor: '#ffffff'}}>
      The rewards pictured on the Website may not necessarily reflect the exact colours or models of actual rewards, due to printing variations and manufacturers' updates.
    </li>
    <li style={{marginLeft: '36pt', marginBottom: '14pt', textIndent: '-18pt', fontFamily: 'Lato', fontSize: '11.5pt', color: '#001627', backgroundColor: '#ffffff', listStylePosition: 'inside'}}>
      <span style={{width: '30.03pt', font: '7pt "Times New Roman"', display: 'inline-block'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>DataXing reserves the right to substitute any reward for a reward of equivalent or higher value if a reward is not available.
    </li>
  </ol>
  <p style={{marginTop: '7.5pt', marginBottom: '7.5pt', fontSize: '15pt', backgroundColor: '#ffffff'}}>
    <strong><span style={{fontFamily: 'Lato'}}>Administration Of Rewards</span></strong>
  </p>
  <ol style={{margin: '0pt', paddingLeft: '0pt'}}>
    <li style={{marginTop: '14pt', marginLeft: '35.65pt', paddingLeft: '0.35pt', fontFamily: 'Lato', fontSize: '11.5pt', color: '#001627', backgroundColor: '#ffffff'}}>
      DataXing reserves the right to appoint a third party to administer its Points Program and rewards. You should read the&nbsp;<a id="_cmntref1"><strong><span style={{color: '#3f51b5'}}>Privacy Policy</span></strong>&nbsp;</a><a href="#_cmnt1" style={{textDecoration: 'none'}}><span className="CommentReference" style={{fontFamily: 'Calibri'}}>[AK1]</span></a>regarding information that will be passed to third parties in order to administer the Points Program and rewards.
    </li>
    <li style={{marginLeft: '35.65pt', marginBottom: '14pt', paddingLeft: '0.35pt', fontFamily: 'Lato', fontSize: '11.5pt', color: '#001627', backgroundColor: '#ffffff'}}>
      DataXing does not accept any liability for any losses suffered by you due to any error or omission by the third party in the administration or delivery of rewards.
    </li>
  </ol>
</div>


                </Paper>
            </Container>
        </div>
    );
}

export default RewardsProgramTerms;
