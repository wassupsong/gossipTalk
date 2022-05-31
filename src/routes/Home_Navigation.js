import { Container, Navbar, Row, Col, Button, Dropdown } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaRegSun,
  FaComment,
  FaSistrix,
  FaUserFriends,
  FaEllipsisH,
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
    if (pathname === "/search") title = "뒷담친구 검색";
    if (pathname === "/") title = "뒷담친구";
    if (pathname === "/chatList") title = "뒷담방";
    if (pathname === "/etc") title = "기타";
    if (pathname === "/profile_edit") title = "프로필 관리";
    setNavTitle(title);
  }, [location]);
  const clickLogOut = () => {
    const auth = getAuth();
    signOut(auth);
    window.location.replace("/");
  };
  const moveToTab = (e) => {
    const {
      target: { id },
    } = e;

    if (id === "friendList") {
      navigate("/", { replace: true });
    } else if (id === "chatList") {
      navigate("/chatList", { replace: true });
    } else if (id === "etc") {
      navigate("/etc", { replace: true });
    } else if (id === "setting") {
      navigate("/setting");
    } else if (id === "search") {
      navigate("/search");
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
                뒷담 프로필
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item id="2" onClick={dropMenuClick}>
                뒷담 그만두기
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
