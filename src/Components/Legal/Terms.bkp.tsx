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

function Terms() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6">Terms</Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" className={classes.content}>
                <Paper className={classes.paper}>
                    <img alt="Logo" src={Assets.Logo2} className={classes.logo} />
                    <Typography variant="h4" gutterBottom>
                        Terms and Conditions
                    </Typography>


                    <div>
                        <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'xx-large' }}><u><strong>Who we are?</strong></u></span></span></span></p>
                        <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>IndiaSpeaks is an online survey panel where consumers join hands to shape and develop products and services by voicing their opinions through surveys launched by brand-owners.</span></span></span></p>
                        <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>Over the years, valuable consumer opinions have help shape business decision. You are a customer and have an opinion. Your opinion matters. And now we give you an opportunity to mint your opinion every time you express it. Your valuable opinion and suggestion about products or services will be of immense help to shape the products and services you want and need. On becoming a part of the IndiaSpeaks family, you get:</span></span></span></p>
                        <ol>
                            <li>
                                <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>Power to choose or change - An opportunity to customize the products and services you use</span></span></span></p>
                            </li>
                            <li>
                                <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>Rewards for your opinion - Yes, you earn reward points for each survey you fill.</span></span></span></p>
                            </li>
                        </ol>
                        <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'xx-large' }}><u><strong>Our Commitment</strong></u></span></span></span></p>
                        <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>At Indiaspeaks, one of our main priorities is the privacy of our visitors. We assure you that your response data is stored on our secured server that allows only the panel to call upon those panelists who match specific criteria to participate in surveys. This query is completely automated and panelists are contacted via email by the panel to participate in our secure surveys. All responses are held in aggregate, which means that individual responses are not linked to personally identifiable information. The information you provide will never be used to advertise or selling purposes. You are not responsible for buying any product or service at any time, nor will any company solicit you as a result of joining the panel.</span></span></span></p>
                        <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>We respect your privacy and are committed to protecting your personal data. This privacy notice describes how we collect, use, share and secure personal data you provide on our panel and when you become a member and participate in surveys that we conduct for, and on behalf of our clients. It also explains your privacy rights and how laws that are applicable to you may protect you and is intended to supplement other notices and privacy policies and not to override them.</span></span></span></p>
                        <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Indiaspeaks. This policy is not applicable to any information collected offline or via channels other than this website.</span></span></span></p>
                        <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'xx-large' }}><u><strong>Your Commitments and Association with Indiaspeaks.</strong></u></span></span></span></p>
                        <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>Indiaspeaks techniques your information and, the place applicable, on the basis of your voluntary participation in this market research study. The categorical purpose of our agreement with you is to gain information from and about you and, the place applicable, other contributors of your household, to be used for the functions described in this Notice. When you register for an Account, we can also ask for your contact information, such as objects such as name, enterprise name, address, electronic mail address, and smartphone number.</span></span></span></p>
                        <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>By becoming our panelist, you expressly represent that â€“</span></span></span></p>
                        <ol>
                            <li>
                                <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>You are at least 18years of age and are voluntarily entering into contract.</span></span></span></p>
                            </li>
                            <li>
                                <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>All the data you provide to Indiaspeaks is Accurate and true.</span></span></span></p>
                            </li>
                            <li>
                                <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>Neither you nor any of your family members is an employee of Indiaspeaks.</span></span></span></p>
                            </li>
                            <li>
                                <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>You shall keep confidential and not disclose to any third parties the contents and any information associated with any surveys, except as required by law.</span></span></span></p>
                            </li>
                        </ol>
                        <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>By taking part in a market research study, you are contributing your records to a pool of information from which vast participant data are derived. These information are relied upon through a huge range of different corporations to set pricing, advertising, merchandising, and different key business decisions.</span></span></span></p>
                        <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'xx-large' }}><u><strong>What personal data do we collect about you?</strong></u></span></span></span></p>
                        <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}><strong>Personal data</strong></span></span></span><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>&nbsp;means any information about an individual from which that person can be identified. It does not include data where the identity has been removed (i.e. anonymous data).</span></span></span></p>
                        <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>We may collect, store and transfer different kinds of personal data about you which we have grouped together follows:</span></span></span></p>
                        <ol>
                            <li>
                                <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}><strong>Identity data</strong></span></span></span><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>&nbsp;â€“ name (includes first, last, maiden and married names), date of birth, marital status, gender, panelist id and username.</span></span></span></p>
                            </li>
                            <li>
                                <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}><strong>Contact data</strong></span></span></span><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>&nbsp;â€“ postal address, email address and telephone number.</span></span></span></p>
                            </li>
                            <li>
                                <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}><strong>Special categories of personal data</strong></span></span></span><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>&nbsp;â€“ ethnic/racial origin, health, genetics, political opinion, religion, sexual orientation.</span></span></span></p>
                            </li>
                            <li>
                                <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}><strong>Demographic/Profile data</strong></span></span></span><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>&nbsp;â€“ interests, preferences, feedback and survey responses and including, but not limited to; age, marital status, gender, birthday, household size, income, education and employment status.</span></span></span></p>
                            </li>
                            <li>
                                <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}><strong>Technical data</strong></span></span></span><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>- includes internet protocol (IP) addresses, login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access this website.</span></span></span></p>
                            </li>
                        </ol>
                        <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'xx-large' }}><u><strong>How we use your information</strong></u></span></span></span></p>
                        <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>We use the information we collect in various ways, including:</span></span></span></p>
                        <ul>
                            <li>
                                <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>Send you surveys on the basis of your Profile and interests.</span></span></span></p>
                            </li>
                            <li>
                                <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>Develop new products, services, features, and functionality on the basis of your responses to the surveys.</span></span></span></p>
                            </li>
                            <li>
                                <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>Communicate with you, either directly, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</span></span></span></p>
                            </li>
                            <li>
                                <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>Send you reward points for successful completion of the surveys</span></span></span></p>
                            </li>
                            <li>
                                <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>Find and prevent fraud.</span></span></span></p>
                            </li>
                        </ul>
                        <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'xx-large' }}><u><strong>Use of Digital Fingerprinting</strong></u></span></span></span></p>
                        <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>We also use digital fingerprint technology to gather statistics about your computer, hardware and software, for example, your IP address, the display settings of your monitor, the type of browser used, the kind of operating system, etc. This records is sent to our trusted provider who changes it into a one of a kind serial (the computerized "unique mark") and decides whether it matches past fingerprints. The information accumulated in this procedure and the digital fingerprint created are not tied to any of your non-public information and is stored on secured servers. These informationâ€™s are only used for prevention of fraud functions/duplicity and to help forestall Panelists from finishing the identical survey more than once, and for no other purpose.</span></span></span></p>
                        <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'xx-large' }}><u><strong>Your Choices and legal Rights</strong></u></span></span></span></p>
                        <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>Participation in our research studies is constantly voluntary. You may additionally withdraw from a lookup study or survey at any time. If you cease your participation, we will keep on preparing the information we gathered during the time you were a member .If you want to exercise any of your legal rights described below, you may contact us via method provided at the beginning of this Notice. Your privacy rights include:</span></span></span></p>
                        <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>The right to obtain affirmation as to whether individual information concerning you are being taken care, and, the place that is the case, get entry to a copy of the data we keep about you, and where that is the situation, get to a duplicate of the information we hold about you, and to address it where it is erroneous (note that in order to maintain the accuracy of our consumer records and keep away from conceivable bias, in some cases exercising your right of get entry to may also require finishing your investment in the past, if it is in all likelihood to have an effect on your behavior);</span></span></span></p>
                        <ol>
                            <li>
                                <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>The right to request that certain facts about you should be removed (note that this privilege is no longer absolute, but applies in certain cases).</span></span></span></p>
                            </li>
                            <li>
                                <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>The option to propose different restrictions on the processing of information about you.</span></span></span></p>
                            </li>
                            <li>
                                <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>The right of information portability for records you have provided.</span></span></span></p>
                            </li>
                            <li>
                                <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>The right to rectification â€“ You have the right to request that we right any data you believe is inaccurate. You also have the right to request that we complete the records you trust is deficient.</span></span></span></p>
                            </li>
                            <li>
                                <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>The right to object to processing â€“ You have the right to object the way we do processing of your personal data, beneath certain conditions.</span></span></span></p>
                            </li>
                        </ol>
                        <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'xx-large' }}><u><strong>Children's Information</strong></u></span></span></span></p>
                        <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.<br />
                            Indiaspeaks does not knowingly collect any Personal Identifiable Information from children under the age of 18. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</span></span></span></p>
                        <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'xx-large' }}><u><strong>Changes to Our Privacy Policy</strong></u></span></span></span></p>
                        <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>We keep our privacy policy under regular review and we update this on our website at regular intervals. We will also inform you of any changes via email or when you log-on after any change. Our privacy policy was last updated on 12 June 2020.</span></span></span></p>
                        <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'xx-large' }}><u><strong>Useful Links</strong></u></span></span></span></p>
                        
                        <p><span style={{ color: '#000000' }}><span style={{ fontFamily: 'Times New Roman,serif' }}><span style={{ fontSize: 'large' }}>If you have additional questions or require more information about our Privacy Policy / how we process your data, do not hesitate to contact us at support@indiapolls.com.</span></span></span></p>
                        <p><br />
                            &nbsp;</p>
                    </div>





                </Paper>
            </Container>
        </div>
    );
}

export default Terms;
