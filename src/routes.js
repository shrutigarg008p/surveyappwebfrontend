import Dashboard from "@material-ui/icons/Dashboard";
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


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/profilr",
    name: "Profile",
    icon: Dashboard,
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/redemption",
    name: "Redemption",
    icon: Dashboard,
    component: List,
    layout: "/admin",
  },
  {
    path: "/rewards",
    name: "Rewards",
    icon: Dashboard,
    component: RewardsList,
    layout: "/admin",
  },
  {
    path: "/referrals",
    name: "Referrals",
    icon: Dashboard,
    component: ReferralsList,
    layout: "/admin",
  },
  {
    path: "/country",
    name: "Country",
    icon: Dashboard,
    component: Countries,
    layout: "/master",
  },
  {
    path: "/states",
    name: "States",
    icon: Dashboard,
    component: States,
    layout: "/master",
  },
  {
    path: "/cities",
    name: "Cities",
    icon: Dashboard,
    component: City,
    layout: "/master",
  },
  {
    path: "/redemption-mode",
    name: "Redemption",
    icon: Dashboard,
    component: RedemptionMode,
    layout: "/master",
  },
];

export default dashboardRoutes;
