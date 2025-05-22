import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import { useSelector, useDispatch } from "react-redux";
import { asyncUnsetAuthUser } from "../states/authUser/action";
import { useEffect } from "react";
import { asyncPreloadProcess } from "../states/isPreload/action";
import Loading from "../components/Loading";
import { useToast } from "@chakra-ui/react";

export default function RequireAuth() {
  const { authUser = null, isPreload = false } = useSelector((states) => states);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const signOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) return null;

  if (!authUser) {
    toast({
      title: "Silahkan login terlebih dahulu.",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Loading />
      <Header />
      <Outlet />
      <Navigation signOut={signOut} />
    </>
  );
}
