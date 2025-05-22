import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Layout from "./layout/Layout";
import RequireAuth from "./layout/RequireAuth";
import NotFound from "./components/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Leaderboards from "./pages/Leaderboards";
import AddThread from "./pages/AddThread";
import DetailPage from "./pages/DetailPage";
import Profile from "./pages/Profile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<NotFound />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route element={<RequireAuth />}>
        <Route index element={<Homepage />} />
        <Route path="thread/:id" element={<DetailPage />} />
        <Route path="add" element={<AddThread />} />
        <Route path="leaderboards" element={<Leaderboards />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
