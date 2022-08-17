import { Container, Navbar, Row, Col, Button, Dropdown } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaRegSun,
  FaComment,
  FaSistrix,
  FaUserFriends,
  FaEllipsisH,
  FaSignOutAlt,
  FaUserAlt,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
const Home_Nav = () => {
  const [navTitle, setNavTitle] = useState("");
  const [dropMenu, setDropMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const { pathname } = location;
    let title = "";
    switch (pathname) {
      case "/search":
        title = "뒷담친구 검색";
        break;
      case "/":
        title = "뒷담친구";
        break;
      case "/chatList":
        title = "뒷담방";
        break;
      case "/etc":
        title = "기타";
        break;
      case "/profile_edit":
        title = "프로필 관리";
        break;
    }
    setNavTitle(title);
  }, [location]);
  const clickLogOut = () => {
    const auth = getAuth();
    signOut(auth);
  };
  const moveToTab = (e) => {
    const {
      target: { id },
    } = e;

    switch (id) {
      case "friendList":
        navigate("/", { replace: true });
        break;
      case "chatList":
        navigate("/chatList", { replace: true });
        break;
      case "etc":
        navigate("/etc", { replace: true });
        break;
      case "setting":
        navigate("/setting");
        break;
      case "search":
        navigate("/search");
        break;
    }
  };
  const dropMenuClick = (e) => {
    const {
      target: { id },
    } = e;
    if (id == "1") navigate("/profile_edit");
    if (id == "2") clickLogOut();
    setDropMenu((prev) => !prev);
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand>{navTitle}</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Button
              variant="dark"
              className="home_navbar_icon"
              onClick={moveToTab}
              id="search"
            >
              <FaSistrix />
            </Button>
            <Button
              variant="dark"
              className="home_navbar_icon"
              id="setting"
              onClick={() => setDropMenu((prev) => !prev)}
            >
              <FaRegSun />
            </Button>
            <Dropdown.Menu show={dropMenu} align="end" rootCloseEvent="click">
              <Dropdown.Item id="1" onClick={dropMenuClick}>
                <FaUserAlt /> 뒷담 프로필
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item id="2" onClick={dropMenuClick}>
                <FaSignOutAlt /> 뒷담 그만두기
              </Dropdown.Item>
            </Dropdown.Menu>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Navbar bg="light" variant="light" fixed="bottom">
        <Container fluid style={{ display: "block" }}>
          <Row className="home_navbar_bottom">
            <Col
              className="home_navbar_bottom_btn"
              onClick={moveToTab}
              id="friendList"
            >
              <FaUserFriends />
            </Col>
            <Col
              className="home_navbar_bottom_btn"
              onClick={moveToTab}
              id="chatList"
            >
              <FaComment />
            </Col>
            <Col
              className="home_navbar_bottom_btn"
              onClick={moveToTab}
              id="etc"
            >
              <FaEllipsisH />
            </Col>
          </Row>
        </Container>
      </Navbar>
    </>
  );
};

export default Home_Nav;
