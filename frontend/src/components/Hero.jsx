import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { clearCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logout] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredentials());
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          {userInfo ? (
            <>
              <h1 className="text-center mb-4">Welcome! {userInfo.name}</h1>
              <p className="text-center mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
                ut repellendus exercitationem voluptatum impedit quis ab,
                provident commodi laudantium ducimus officiis modi illum
                voluptates? Vitae tenetur eligendi culpa minima at?
              </p>
              <div className="d-flex">
                <LinkContainer to="/profile">
                  <Button variant="primary" href="/profile" className="me-3">
                    My Profile
                  </Button>
                </LinkContainer>
                <LinkContainer to="/logout">
                  <Button variant="danger" onClick={logoutHandler}>
                    Logout
                  </Button>
                </LinkContainer>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-center mb-4">Pratice App</h1>
              <p className="text-center mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
                ut repellendus exercitationem voluptatum impedit quis ab,
                provident commodi laudantium ducimus officiis modi illum
                voluptates? Vitae tenetur eligendi culpa minima at?
              </p>
              <div className="d-flex">
                <LinkContainer to="/login">
                  <Button variant="primary" href="/login" className="me-3">
                    Sign In
                  </Button>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Button variant="secondary" href="/login" className="">
                    Sign Up
                  </Button>
                </LinkContainer>
              </div>
            </>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
