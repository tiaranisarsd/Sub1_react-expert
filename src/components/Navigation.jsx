import { Nav } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineLeaderboard, MdLogout } from "react-icons/md";
import { ChatIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";
import { useToast, Spinner } from "@chakra-ui/react";
import { useState } from "react";

export default function Navigation({ signOut }) {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    setLoading(true);

    setTimeout(() => {
      signOut();
      setLoading(false);
      navigate("/login");
    }, 1000);

        toast({
      title: "Berhasil logout.",
      description: "Anda telah keluar dari akun.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <div className="border-top shadow-sm bg-white fixed-bottom">
      <Nav className="justify-content-around nav-underline py-2" variant="underline">
        <Nav.Item>
          <Nav.Link
            as={NavLink}
            to="/"
            className={`d-flex text-hover align-items-center fw-bold ${
              isActive("/") ? "text-blue opacity-50" : "text-blue"
            }`}
          >
            <ChatIcon className="me-1" />
            Thread
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            as={NavLink}
            to="/leaderboards"
            className={`d-flex text-hover align-items-center fw-bold ${
              isActive("/leaderboards") ? "text-blue opacity-50" : "text-blue"
            }`}
          >
            <MdOutlineLeaderboard className="me-1" />
            Leaderboards
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            as="button"
            onClick={handleLogout}
            disabled={loading}
            className="d-flex align-items-center text-danger text-hover fw-bold"
          >
            {loading ? (
              <>
                <Spinner size="sm" className="me-1" />
                Logging out...
              </>
            ) : (
              <>
                <MdLogout className="me-1" />
                Logout
              </>
            )}
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

Navigation.propTypes = {
  signOut: PropTypes.func.isRequired,
};
