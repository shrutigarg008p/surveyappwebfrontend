import Dashboard from "@material-ui/icons/Dashboard";
import DashboardPage from "views/Dashboard/Dashboard.js";
import {RedemptionRouter} from "./Components/Redemptions";
import {List} from "./Components/Redemptions/List";
import {RewardsList} from "./Components/Rewards/RewardsList";
import UserProfile from "./views/UserProfile/UserProfile";
import {ReferralsList} from "./Components/Referrals/RefferalsList";


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
];

export default dashboardRoutes;
