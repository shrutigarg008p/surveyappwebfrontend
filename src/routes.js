// import Dashboard from "@material-ui/icons/Dashboard";
import DashboardPage from "views/Dashboard/Dashboard.js";
import {RedemptionRouter} from "./Components/Redemptions";
import {List} from "./Components/Redemptions/List";
import {RewardsList} from "./Components/Rewards/RewardsList";
import UserProfile from "./views/UserProfile/UserProfile";
import {ReferralsList} from "./Components/Referrals/RefferalsList";
import {Countries} from "./Components/Countries/Countries";
import {States} from "./Components/States/States";
import {City} from "./Components/Cities/City";
import {RedemptionMode} from "./Components/RedemptionMode/RedemptionMode";
import {PartnersList} from "./Components/Partners/PartnersList";
import {LabelsList} from "./Components/Labels/LabelsList";
import {MarketingLinksList} from "./Components/MarketingLinks/MarketingLinksList";
import {SecList} from "./Components/Sec/SecList";
import {ProfileManagement} from "./Components/ProfileManagement/ProfileManagement";
import {Surveys} from "./Components/Surveys/Surveys";
import {Samples} from "./Components/Samples/Samples";
import {RegisteredOnly} from "./Components/Panelists/RegisteredOnly";
// import {
//   ArrowBack,
//   ArrowBackIosTwoTone,
//   ArrowDownward,
//   ArrowDropDown,
//   ArrowForward,
//   ArrowLeft, ArrowRight
// } from "@material-ui/icons";
import { Dashboard, AccountCircle, ListAlt, Redeem, CardGiftcard, Group, Apps, Description, HowToReg, Person, Cancel, DeleteForever, Block, Category, Email, Message, Help as HelpIcon, Settings, LocalOffer, Public, LocationCity, LocationOn, Business, AccountBox, Label, Link, Security, Info, AttachMoney, ShoppingCart, Flight, Favorite, Home, SportsEsports, Theaters, Work, Devices, SmokingRooms, DriveEta, Fastfood } from "@material-ui/icons";
import {BasicProfileOnly} from "./Components/Panelists/BasicProfileOnly";
import {UnsubscribedPanelistOnly} from "./Components/Panelists/UnsubscribedPanelistsOnly";
import {DeletedPanelistsOnly} from "./Components/Panelists/DeletedPanelistsOnly";
import {Bounces} from "./Components/Panelists/BouncePenlistsOnly";
import {AllPanelists} from "./Components/Panelists/AllPanelists";
import PenalistDetails from "Components/Panelists/PenalistDetails";
import {NewsLetters} from "./Components/NewsLetters/NewsLetters";
import {Messages} from "./Components/Messsages/Messages";
import {Help} from "./Components/Help/Help";
import {MessageForm} from "./Components/Messsages/MessageForm";
import {DashboardSurvey} from "./Components/Surveys/DashboardSurvey";
import {PanelistSurveys} from "./Components/PanelistSurveys/PanelistsSurveys";
import {About} from "./Components/PanelistProfile/About";
import {PersonalFinance} from "./Components/PanelistProfile/FinancialFinance";
import {Shopping} from "./Components/PanelistProfile/Shoppings";
import {Travels} from "./Components/PanelistProfile/Travels";
import {HealthAndWellness} from "./Components/PanelistProfile/HealthAndWellness";
import {HouseHold} from "./Components/PanelistProfile/HouseHold";
import {LeisureActivity} from "./Components/PanelistProfile/LeisureAndActivity";
import {Medias} from "./Components/PanelistProfile/Media";
import {Professional} from "./Components/PanelistProfile/Professional";
import {Electronics} from "./Components/PanelistProfile/Electronics";
import {Smokers} from "./Components/PanelistProfile/Smokers";
import {Auto} from "./Components/PanelistProfile/Auto";
import {FoodAndBeverage} from "./Components/PanelistProfile/FoodAndBeverage";
import {Profiles} from "./Components/PanelistProfile/Profiles";
import MyRequests from "Components/Requests/MyRequests";
import MyRewards from "./Components/Rewards/MyRewards";
import MyReferralsList from "./Components/Referrals/MyReferralsList";
import {MySettings} from "./Components/My Settings/MySettings";
import DashboardOld from "./views/Dashboard/DashboardOld";
import AdminDashboard from "./views/Dashboard/AdminDashboard";

const dashboardRoutes = [
  {
    path: "/dashboard-admin",
    name: "Admin Dashboard",
    icon: Dashboard,
    component: AdminDashboard,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Schedule Survey",
    icon: Dashboard,
    component: DashboardSurvey,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "User Profile",
    icon: AccountCircle,
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/surveys",
    name: "Surveys",
    icon: ListAlt,
    component: Surveys,
    layout: "/admin",
  },
  {
    path: "/redemption",
    name: "Redemption Request",
    icon: Redeem,
    component: List,
    layout: "/admin",
  },
  {
    path: "/rewards",
    name: "Rewards",
    icon: CardGiftcard,
    component: RewardsList,
    layout: "/admin",
  },
  {
    path: "/referrals",
    name: "Referrals",
    icon: Group,
    component: ReferralsList,
    layout: "/admin",
  },
  {
    path: "/",
    name: "PANELISTS",
    icon: Group,
    component: '',
    layout: "",
  },
  {
    path: "/panelistDashboard",
    name: "All",
    icon: Apps,
    component: AllPanelists,
    layout: "/admin",
  },
  {
    path: "/panelistDetails/:userId",
    name: "Details",
    icon: Description,
    component: PenalistDetails,
    layout: "/admin",
    isVisible : false
  },
  {
    path: "/registeredOnlyPanelists",
    name: "Registered Only",
    icon: HowToReg,
    component: RegisteredOnly,
    layout: "/admin",
  },
  {
    path: "/basicProfileOnly",
    name: "Basic Profile Only",
    icon: Person,
    component: BasicProfileOnly,
    layout: "/admin",
  },
  {
    path: "/unsubscribeRequests",
    name: "Unsubscribe Requests",
    icon: Cancel,
    component: UnsubscribedPanelistOnly,
    layout: "/admin",
  },
  {
    path: "/deleteRequests",
    name: "Delete Requests",
    icon: DeleteForever,
    component: DeletedPanelistsOnly,
    layout: "/admin",
  },
  {
    path: "/bounces",
    name: "Bounces",
    icon: Block,
    component: Bounces,
    layout: "/admin",
  },
  {
    path: "/samples",
    name: "Samples",
    icon: Category,
    component: Samples,
    layout: "/admin",
  },
  {
    path: "/newsletters",
    name: "Newsletters",
    icon: Email,
    component: NewsLetters,
    layout: "/admin",
  },
  {
    path: "/messages",
    name: "Messages",
    icon: Message,
    component: Messages,
    layout: "/admin",
  },
  {
    path: "/help",
    name: "Help",
    icon: HelpIcon,
    component: Help,
    layout: "/admin",
  },
  {
    path: "/MASTER SETTINGS",
    name: "MASTER SETTINGS",
    icon: Settings,
    component: '',
    layout: "",
  },
  {
    path: "/redemption-mode",
    name: "Redemption Mode",
    icon: LocalOffer,
    component: RedemptionMode,
    layout: "/master",
  },
  {
    path: "/country",
    name: "Country",
    icon: Public,
    component: Countries,
    layout: "/master",
  },
  {
    path: "/states",
    name: "States",
    icon: LocationCity,
    component: States,
    layout: "/master",
  },
  {
    path: "/cities",
    name: "Cities",
    icon: LocationOn,
    component: City,
    layout: "/master",
  },
  {
    path: "/partners",
    name: "Partners",
    icon: Business,
    component: PartnersList,
    layout: "/master",
  },
  {
    path: "/profile-management",
    name: "Profiles",
    icon: AccountBox,
    component: ProfileManagement,
    layout: "/master",
  },
  {
    path: "/labels",
    name: "Labels",
    icon: Label,
    component: LabelsList,
    layout: "/master",
  },
  {
    path: "/marketing-links",
    name: "Marketing Links",
    icon: Link,
    component: MarketingLinksList,
    layout: "/admin",
  },
  {
    path: "/SEC",
    name: "SEC",
    icon: Security,
    component: SecList,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/profile",
    name: "User Profile",
    icon: AccountBox,
    component: UserProfile,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/my-rewards",
    name: "My Rewards",
    icon: CardGiftcard,
    component: MyRewards,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/my-requests",
    name: "My Requests",
    icon: Redeem,
    component: MyRequests,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/my-referrals",
    name: "My Referrals",
    icon: Group,
    component: MyReferralsList,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/panelist-surveys",
    name: "My Surveys",
    icon: ListAlt,
    component: PanelistSurveys,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/settings",
    name: "My Setting",
    icon: Settings,
    component: MySettings,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/panelist-message",
    name: "Contact Us",
    icon: Message,
    component: MessageForm,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/profile-overview",
    name: "PROFILE",
    icon: AccountBox,
    component: Profiles,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/about",
    name: "About",
    icon: Info,
    component: About,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/personal-finance",
    name: "Personal Finance",
    icon: AttachMoney,
    component: PersonalFinance,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/shopping",
    name: "Shopping",
    icon: ShoppingCart,
    component: Shopping,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/travels",
    name: "Travel",
    icon: Flight,
    component: Travels,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/health-wellness",
    name: "Health And Wellness",
    icon: Favorite,
    component: HealthAndWellness,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/household",
    name: "House Hold",
    icon: Home,
    component: HouseHold,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/Leisure-activity",
    name: "Leisure And Activity",
    icon: SportsEsports,
    component: LeisureActivity,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/media",
    name: "Media",
    icon: Theaters,
    component: Medias,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/professionals",
    name: "Professional",
    icon: Work,
    component: Professional,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/electronics",
    name: "Electronics",
    icon: Devices,
    component: Electronics,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/smokers",
    name: "Smokers",
    icon: SmokingRooms,
    component: Smokers,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/auto",
    name: "Auto",
    icon: DriveEta,
    component: Auto,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/food-beverage",
    name: "Food And Beverage",
    icon: Fastfood,
    component: FoodAndBeverage,
    layout: "/panelist",
    type: 'panelist'
  },
];


export default dashboardRoutes;
