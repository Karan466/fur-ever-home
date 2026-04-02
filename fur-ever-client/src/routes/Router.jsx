import AdoptionRequests from "../pages/AdoptionRequests";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PetListing from "../pages/PetListing";
import PetDetails from "../pages/PetDetails";
import DashboardHome from "../pages/DashboardHome";
import AddPet from "../pages/AddPet";
import MyPets from "../pages/MyPets";
import NotFound from "../pages/NotFound";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "../components/PrivateRoute";
import Campaigns from "../pages/Campaigns";
import AddCampaign from "../pages/AddCampaign";
import CampaignDetails from "../pages/CampaignDetails";
import MyDonations from "../pages/MyDonations";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
  path: "/campaigns",
  element: <Campaigns />,
},
      {
        path: "/pets",
        element: <PetListing />,
      },
      {
  path: "/campaigns/:id",
  element: <CampaignDetails />,
},
      {
        path: "/pets/:id",
        element: <PetDetails />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <DashboardHome />,
      },
      {
  path: "my-donations",
  element: <MyDonations />,
},
      {
        path: "add-pet",
        element: <AddPet />,
      },
      {
  path: "add-campaign",
  element: <AddCampaign />,
},
      {
        path: "my-pets",
        element: <MyPets />,
      },
      {
  path: "adoption-requests",
  element: <AdoptionRequests />,
},
    ],
  },
]);

export default router;