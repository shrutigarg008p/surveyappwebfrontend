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
 
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>These Terms of Use (this "Agreement") describe the terms and conditions applicable to your use of DataXing Digital Services. You should read it, understand it, and review it periodically for updates. If you have any questions that our&nbsp;</span><a href="/#/faq"><strong><span style={{color: '#3f51b5', fontSize: '11.5pt'}}>Frequently Asked Questions</span></strong></a><strong><span style={{color: '#001627', fontSize: '11.5pt'}}>&nbsp;</span></strong><span style={{color: '#001627', fontSize: '11.5pt'}}>&nbsp;cannot answer, please contact&nbsp;</span><a href="/#/support"><strong><span style={{color: '#3f51b5', fontSize: '11.5pt'}}>Support Team</span></strong></a><span style={{color: '#001627', fontSize: '11.5pt'}}>. If you do not agree to this Agreement, do not use our web site or services. We reserve the right to change, modify, add or remove portions of this Agreement at any time, at our sole discretion. Your continued use of our site will always indicate your acceptance of this Agreement and any changes to it.</span></p>
  
  <p><strong><span style={{fontSize: '15pt'}}>1. User Agreement Acceptance</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>This Agreement applies to your access to, and use of, DataXing's web sites (the "Site") and the services provided by DataXing, including DataXing's IndiaPolls and survey services. The Site, the service, and any other services DataXing provides are referred to in this Agreement collectively as the "Services"</span></p>
  
  <p><strong><span style={{fontSize: '15pt'}}>2. Services</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>The Services allow persons who meet eligibility requirements to take surveys or register for our user panel (the "Panel"). Panel members may be eligible to participate in surveys on the Site. Panel members may receive Points or other incentives for participation in services that DataXing may make available from time to time.</span></p>
  
  <p><strong><span style={{fontSize: '15pt'}}>3. Redemption Points; Active Status</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Once you have joined the Panel, IndiaPolls will offer incentives in the form of points (“Points”) or other IndiaPolls types of incentives will be awarded when you undertake various Activities on the Site, in line with the&nbsp;</span><strong><span style={{color: '#3f51b5', fontSize: '11.5pt'}}><a href="/#/rewards-program-terms">IndiaPolls Rewards Program Terms</a></span></strong><span style={{color: '#001627', fontSize: '11.5pt'}}>. Points are credited to your Account only through your participation in Activities authorized by DataXing and are available for you to redeem as long as your Account is Active.</span></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>When you register to the Panel, your Account will have the status “Active”, you can participate in all Activities you are invited to by DataXing and you can enjoy all Panel benefits such as access our Services, your incentives, and contacting DataXing Personnel. To keep your account “Active” means that you have joined the Panel and participated in a Survey or other activity on the Site within 30 days from your initial registration or within any 90 day period.</span></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>DataXing will not provide you with any notice of the cancellation and forfeiture of any of your Points. DataXing reserves the right to amend these cancellation and forfeiture rules in its sole discretion.</span></p>
  
  <p><strong><span style={{fontSize: '15pt'}}>4. Suspension of Account; Cancellation Account</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Your Account can also be suspended if one of the following situations arises:</span></p>
  <ul>
    <li style={{listStyleType: 'disc', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>No participation after you have joined the Panel</span></p>
    </li>
    <li style={{listStyleType: 'disc', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>No participation in a Survey within your first 30 days in the Panel</span></p>
    </li>
    <li style={{listStyleType: 'disc', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>No participation in a Survey within any 90-day period</span></p>
    </li>
  </ul>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>If your Account has been suspended or closed, you have the right to ask DataXing to investigate the situation. You should contact our Support team for that. If you feel your account has been incorrectly suspended or closed, you must contact DataXing by email within sixty (60) days following the alleged error and explain in full the basis of your dispute, attaching any relevant information which offers evidence of the discrepancy. Upon receipt of your notice, we will investigate your claim and notify you of our decision within thirty (30) days. If we need additional time to decide your claim, we will notify you and will endeavour to render a decision as soon as reasonably practicable. Any decision by us with regard to such a claim will be final.</span></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>You may cancel your account at any time by going to our Site in your account section and click on “cancel my account” and your account will immediately be cancelled. If you have any issues cancelling your account please contact the support team. The support team will respond to you as soon as reasonably practicable. Immediately upon deletion or your withdrawal from the Panel, your account will be closed. You understand and agree that, as noted above, upon suspension, cancellation or closing of your account, your right to access the Services will cease and all Points credited to your account at such time, however and whenever accumulated, will be forfeited. DataXing may terminate your account at any time for any reason.</span></p>
  
  <p><strong><span style={{fontSize: '15pt'}}>5. Service Eligibility and Registration</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>The Services may be used only by persons who are at least 16 years of age. The Services are not intended for the use of children under 16 years of age. Use of the Services is void where prohibited.</span></p>
  
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>BY ACCESSING OR USING THE SERVICES, YOU REPRESENT AND WARRANT THAT YOU MEET THE ELIGIBILITY REQUIREMENTS AND WILL ABIDE BY THE TERMS OF THIS AGREEMENT.</span></p>
  
  <p><strong><span style={{fontSize: '15pt'}}>6. Service Fee</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>There is no fee for users to participate in the Services. DataXing may, in its sole discretion, elect to charge fees for participating in the Services, or to use or access any other services, at any time. If it does, it will update this Agreement to reflect any such changes.</span></p>
  
  <p><strong><span style={{fontSize: '15pt'}}>7. Participation Requirements</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Your ability to participate in the Services is expressly conditioned upon your compliance with this Agreement and with all policies and guidelines applicable to the Services that DataXing may make available from time to time. In the event of your noncompliance, fraud or other inappropriate activity (as determined by DataXing in its sole discretion), DataXing may cancel or invalidate your eligibility, accounts, registrations and Points, deny redemption of Points, or restrict, block, limit, and prevent your access to and use of the Services and, further, all Points, incentives and rewards shall be subject to forfeiture. Without limiting the generality of the foregoing, the following requirements apply to your use of the Services:</span></p>
  <ul>
    <li style={{listStyleType: 'disc', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Non-Use and Nondisclosure. Information and content made available to you in the Services may contain trade secrets or other confidential or proprietary information of DataXing's suppliers or licensors. You must hold in strict confidence and not disclose to any other person any information and content that you access or learn in connection with your participation in any survey, project, questionnaire, or other market research activity related to the Services. You must not use any such information or content for any purpose other than your participation in the Services in accordance with this Agreement. You hereby agree to notify DataXing immediately if you learn of or suspect any use or disclosure of, or access to, any such information or content other than as specifically authorized in this Agreement.</span></p>
    </li>
    <li style={{listStyleType: 'disc', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Registration Information. You agree to (a) provide accurate, current and complete information about you as may be prompted by any registration forms on the Services; (b) maintain the security of your password and login credentials; and (c) maintain and promptly update your registration information and any other information you provide to DataXing, so as to keep it accurate, current and complete. Registration requires information that includes without limitation your full legal name, your date of birth, the address of your primary residence, your phone number and your functioning email address.</span></p>
    </li>
    <li style={{listStyleType: 'disc', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Multiple Accounts. You may have only one active account at any time. Only one account per mailing address is allowed. Multiple accounts for any person or mailing address are subject to termination and forfeiture of all Points, incentives and rewards.</span></p>
    </li>
    <li style={{listStyleType: 'disc', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Compliance with Laws. You must at all times comply with all applicable laws, rules, regulations, and orders, and not cause DataXing to violate any laws, rules, regulations, or orders.</span></p>
    </li>
    <li style={{listStyleType: 'disc', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Good-Faith Participation. You agree to participate in good faith and to the best of your ability in any market research activities in which you participate in connection with the Services. You will not provide false or misleading data, including without limitation, survey responses that are inconsistent with prior responses or statistically improbable.</span></p>
    </li>
    <li style={{listStyleType: 'disc', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Appropriate Communications. If you communicate with our Support Team or other DataXing or IndiaPolls personnel ("Personnel"), you agree to do so in a respectful and appropriate manner. You shall not send, upload, share or otherwise distribute to Personnel, Personnel affiliates or other users of the Services any rude or offensive communications or any content that is obscene, vulgar, sexually-oriented, shock-oriented, threatening, hateful, illegal or otherwise inappropriate.</span></p>
    </li>
    <li style={{listStyleType: 'disc', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>User Content. You may provide information to DataXing in connection with your participation in market research or otherwise in connection with the Services, including survey responses, ideas, feedback, or other information or content ("User Content"). If you provide any User Content, unless DataXing expressly indicates otherwise, you grant DataXing and its affiliates a nonexclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, perform and display such User Content throughout the world in any media, without acknowledgement or compensation to you.</span></p>
    </li>
  </ul>
  
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>By providing any User Content, you represent and warrant that you have the lawful right to provide it, and that it is accurate and complete. You must not provide any User Content that:</span></p>
  <ul>
    <li style={{listStyleType: 'disc', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Is unlawful, libellous, defamatory, obscene, pornographic, indecent, lewd, suggestive, harassing, threatening, invasive of privacy or publicity rights, abusive, inflammatory, false, inaccurate, misleading, fraudulent, or impersonates or misrepresents an affiliation with any person or entity;</span></p>
    </li>
    <li style={{listStyleType: 'disc', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Would violate an obligation of confidentiality or the rights of any person or entity, or that would otherwise create liability or violate any local, state, national, or international law, including, without limitation, the regulations of the U.S. Securities and Exchange Commission or any rules of a securities exchange such as SEBI, the New York Stock Exchange, the American Stock Exchange, or the NASDAQ;</span></p>
    </li>
    <li style={{listStyleType: 'disc', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>May infringe any patent, trademark, trade secret, copyright, or other intellectual or proprietary right of any person or entity;</span></p>
    </li>
    <li style={{listStyleType: 'disc', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Contains any private information of any person or entity, including, without limitation, addresses, phone numbers, email addresses, Aadhar Numbers, Social Security numbers, and credit card numbers;</span></p>
    </li>
    <li style={{listStyleType: 'disc', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Contains any viruses, corrupted data or other harmful, disruptive, or destructive files or information; or</span></p>
    </li>
    <li style={{listStyleType: 'disc', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>In the sole judgment of DataXing, is objectionable, does not reflect your good faith efforts to be responsive to survey or market research questions, or which may expose DataXing or its licensors or suppliers to liability of any type.</span></p>
    </li>
  </ul>
  
  <p><strong><span style={{fontSize: '15pt'}}>8. Copyright and Limited License</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>The Services and other materials contained on the Site or within the Services, including, without limitation, the DataXing and IndiaPolls marks, logos, and all information, content, designs, text, graphics, information, data, software, other files, and the selection and arrangement thereof (collectively, the "Content"), are the property of DataXing and its suppliers and licensors and are protected by U.S. and international copyright laws.</span></p>
  
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>As long as you comply with this Agreement, DataXing grants you a limited, revocable, non-transferable, and non-exclusive license to access and use the Services, solely for your personal, non-commercial purposes. Except for those rights expressly granted in this Agreement, no other rights are granted, either express or implied, to you under this Agreement. Unless explicitly stated in this Agreement, nothing in this Agreement will be construed as conferring any license to intellectual property rights, whether by estoppel, implication or otherwise. This license is revocable at any time.</span></p>
  
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Any use of the Services or any Content other than as specifically authorized in this Agreement, without the prior written permission of DataXing, is strictly prohibited and will terminate the license granted in this section. Unauthorized use may also violate applicable laws and regulations, including, without limitation, copyright and trademark laws and applicable communications regulations and statutes, and the rights of DataXing and of third parties.</span></p>
  
  <p><strong><span style={{fontSize: '15pt'}}>9. Trademarks</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>IndiaPolls and DataXing marks and logos, the DataXing globe design and other product or service names or slogan contained in any Content or otherwise within the Services are property of DataXing, its suppliers or licensors, and may not be copied, imitated or used, in whole or in part, without the prior written permission of DataXing or the applicable right holder. All other trademarks, registered trademarks, product names and company names or logos appearing in the Services or in any Content are the property of their respective owners. Reference to any products, services, processes or other information, by trade name, trademark, manufacturer, supplier or otherwise does not constitute or imply endorsement, sponsorship or recommendation thereof by DataXing. All rights are reserved.</span></p>
  
  <p><strong><span style={{fontSize: '15pt'}}>10. Disclaimer of Warranties</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>YOUR USE OF THE SERVICES, INCLUDING, WITHOUT LIMITATION, YOUR USE OF ANY CONTENT, IS AT YOUR SOLE RISK. THE SERVICES AND ALL CONTENT ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. DataXing, ITS AFFILIATES, LICENSORS, AND SUPPLIERS, AND THEIR RESPECTIVE MEMBERS, DIRECTORS, OFFICERS, AGENTS, AND EMPLOYEES (COLLECTIVELY, THE "PROVIDERS") EXPRESSLY DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. NEITHER DataXing NOR ANY OTHER PROVIDERS WARRANT UNINTERRUPTED USE, OPERATION, OR AVAILABILITY OF THE SERVICES OR ANY CONTENT, OR THAT ANY SUBMISSION OR TRANSACTION REQUEST YOU ATTEMPT USING THE SERVICES WILL BE SUCCESSFUL, UNCORRUPTED, OR COMPLETED WITHIN A REASONABLE AMOUNT OF TIME. YOU WILL BE SOLELY RESPONSIBLE FOR ANY DELAY OR LOSS OF ANY KIND THAT RESULTS FROM YOUR ACCESS TO, OR USE OF, THE SERVICES AND THE CONTENT. NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM DataXing OR ANY OTHER PROVIDER THROUGH OR FROM THE SERVICES, WILL CREATE ANY WARRANTY REGARDING THE SERVICES THAT IS NOT EXPRESSLY STATED IN THIS AGREEMENT. SOME JURISDICTIONS MAY PROHIBIT A DISCLAIMER OF WARRANTIES AND YOU MAY HAVE OTHER RIGHTS THAT VARY FROM JURISDICTION TO JURISDICTION.</span></p>
  
  <p><strong><span style={{fontSize: '15pt'}}>11. Limitation of Liability</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>TO THE FULLEST EXTENT ALLOWED BY LAW, YOU AGREE THAT NEITHER DataXing NOR ANY OF OUR AFFILIATES OR AGENTS WILL BE LIABLE TO YOU AND/OR ANY OTHER PERSON FOR ANY SPECIAL, INCIDENTAL, PUNITIVE, CONSEQUENTIAL OR SIMILAR GENERAL DAMAGES, OR FOR DAMAGES FOR LOST PROFITS, LOSS OR IMPAIRMENT OF PRIVACY, SECURITY OF DATA, FAILURE TO MEET ANY DUTY (INCLUDING BUT NOT LIMITED TO ANY DUTY OF GOOD FAITH, WORKMANLIKE EFFORT OR OF LACK OF NEGLIGENCE), OR FOR ANY OTHER SIMILAR DAMAGES WHATSOEVER THAT ARISE OUT OF OR ARE RELATED TO ANY BREACH OR OTHER ASPECT OF THE ENTIRE AGREEMENT OR THIS SITE, EVEN IF DataXing HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES AND EVEN IN THE EVENT OF FAULT, TORT (INCLUDING NEGLIGENCE) OR STRICT OR PRODUCT LIABILITY OR MISREPRESENTATION.</span></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>IN NO EVENT SHALL THE LIABILITY OF DataXing, ITS CORPORATE PARENTS OR AFFILIATES, SUCCESSORS OR ASSIGNS, SUPPLIERS OR AGENTS EXCEED THE ACTUAL RETAIL VALUE OF AN APPLICABLE REWARD AT ISSUE, OR IF A DISPUTE RELATES GENERALLY TO YOUR USE OF THE POINTS PROGRAM, TO THE FAIR MARKET RETAIL VALUE OF THE REWARDS WHICH YOUR UNUSED, UNEXPIRED, NON-CANCELED POINTS ARE CONVERTIBLE INTO.</span></p>
  <p><br /></p>
  
  <p><strong><span style={{fontSize: '15pt'}}>12. Indemnification</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>You will indemnify and hold harmless DataXing and all other Providers from and against any costs, damages, expenses, and liabilities (including, but not limited to, reasonable attorneys' fees) arising out of or related to any User Content, your use of the Services or any Content, your violation of this Agreement, or your violation of any rights of a third party.</span></p>
  
  <p><strong><span style={{fontSize: '15pt'}}>13. Third-Party Content</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Services may contain links or references to information, content, and services provided by third parties (collectively, "Third-Party Content"). DataXing does not monitor or have any control over Third-Party Content. DataXing does not endorse or adopt any Third-Party Content and can make no guarantee as to its accuracy or completeness. DataXing undertakes no responsibility to update or review any Third-Party Content, and does not represent or warrant the accuracy of any information contained in any Third Party Content. You use any Third Party Content contained therein at your own risk. Views expressed in Third Party Content are not endorsed by DataXing.</span></p>
  
  <p><strong><span style={{fontSize: '15pt'}}>14. Privacy</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>DataXing may collect registration data and obtain other information about you through the Services. Please see our&nbsp;</span><a href="/#/privacy-policy"><strong><span style={{color: '#3f51b5', fontSize: '11.5pt'}}>Privacy Policy</span></strong></a><span style={{color: '#001627', fontSize: '11.5pt'}}>&nbsp;for information regarding DataXing's collection, use, and disclosure of such information.</span></p>
  
  <p><strong><span style={{fontSize: '15pt'}}>15. Feedback</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>You acknowledge and agree that any questions, comments, suggestions, ideas, feedback, original or creative materials, or other information or content provided by you to DataXing, to the extent it is not User Content, will become the sole property of DataXing. DataXing will own exclusive rights, including all intellectual property rights, and shall be entitled to the unrestricted use and dissemination of such information and content for any purpose, commercial or otherwise, without acknowledgment or compensation to you. Further, you hereby grant to DataXing a perpetual and irrevocable license to use such information and content for any purpose.</span></p>
  
  <p><strong><span style={{fontSize: '15pt'}}>16. Independent Contractors</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>You and DataXing are independent contractors for all purposes. No agency, partnership, joint venture, employee-employer or franchisor-franchisee relationship is intended or created by this Agreement or by your access to or use of the Services.</span></p>
  
  <p><strong><span style={{fontSize: '15pt'}}>17. General</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Termination</span></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Notwithstanding any term of this Agreement, DataXing reserves the right, without notice and in its sole discretion, to discontinue or terminate any of the Services, to terminate your license to use the Services, to delete any Panel registrations or other accounts, to delete Points without redemption, and to restrict, block, limit, and prevent your access to and use of the Services. Any termination or other action by DataXing described in this paragraph will not limit any other remedies available to DataXing at law, equity or otherwise.</span></p>
  
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Updates to this Agreement</span></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>DataXing may update this Agreement from time to time. When it does, it will revise the "updated" date on this Agreement. You are responsible for reviewing and adhering to the most recent update of this Agreement.</span></p>
  
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>General Legal Notices</span></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>By accessing or using the Services, you consent to receiving electronic communications from DataXing. These communications may include notices about your account and information concerning or related to the Services. You agree that any notices, agreements, disclosures, or other communications that DataXing sends to you electronically will satisfy any legal communication requirements, including any requirement that communications be in writing.</span></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>DataXing's failure to act in a particular circumstance does not waive its ability to act with respect to that circumstance or similar circumstances. Any provision of this Agreement that is found to be invalid, unlawful, or unenforceable will be severed from this Agreement, and the remaining provisions of this Agreement will continue to be in full force and effect. The section headings and titles in this Agreement are for convenience only and have no legal or contractual effect. Any provisions in this Agreement that by their nature should survive the termination of this Agreement (including, without limitation, provisions governing indemnification, limitations on liability, disclaimers of warranty, and ownership of intellectual property) will continue to remain in full force and effect after the termination of this Agreement.</span></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>This Agreement is governed by the laws of the State of New Delhi India, excluding conflicts of law principles. Any controversy or claim arising out of or relating to the Services or this Agreement must be commenced within one year after the claim arose and will be settled by binding arbitration in accordance with the commercial arbitration rules of India. Any such controversy or claim will be arbitrated on an individual basis, and will not be consolidated in any arbitration with any claim or controversy of any other party. The arbitration will be conducted in Delhi, and judgment on the arbitration award may be entered into any court of competent jurisdiction. The award of the arbitrator will be final and binding upon the parties without appeal or review except as permitted by state law. Either party may seek any interim or preliminary injunctive relief from any court of competent jurisdiction, as necessary to protect the party's rights or property pending the completion of arbitration.</span></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>This Agreement, including all terms, policies, and guidelines referenced in this Agreement, is the entire agreement between you and DataXing concerning the Services. This Agreement supersedes all prior agreements or communications between you and DataXing regarding the subject matter of this Agreement.</span></p>
  
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Contacting DataXing</span></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>If you wish to contact us regarding any questions or concerns about this Agreement or the Services, please view our&nbsp;</span><a href="/#/support"><strong><span style={{color: '#3f51b5', fontSize: '11.5pt'}}>Contact Us</span></strong></a><span style={{color: '#001627', fontSize: '11.5pt'}}>.</span></p>
  <p><br /></p>
  <p><br /></p>
</div>

                </Paper>
            </Container>
        </div>
    );
}

export default Terms;
