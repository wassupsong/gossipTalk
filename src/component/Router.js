import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home_Nav from "routes/Home_Navigation";
import FriendList from "routes/FriendList";
import ChatList from "routes/ChatList";
import Etc from "routes/Etc";
import LoginForm from "routes/LoginForm";
import Profile from "routes/Profile";
import ChatRoom from "./ChatRoom";
import { Spinner } from "react-bootstrap";
import Setting from "routes/Setting";
import FriendsSearch from "routes/FriendsSearch";
import Profile_edit from "routes/Profile_edit";

const AppRouter = ({ isLogin, isGetUserData, authData }) => {
  return (
    <Router>
      {isLogin && isGetUserData == "existData" && <Home_Nav />}
      {isGetUserData == "noInit" ? (
        <div className="spinner">
          <Spinner animation="border" role="status" variant="light" />
        </div>
      ) : (
        <Routes>
          {isLogin ? (
            <>
              {isGetUserData == "noData" ? (
                <Route path="/" element={<Profile authData={authData} />} />
              ) : (
                <Route path="/" element={<FriendList />} />
              )}

              <Route path="/chatList" element={<ChatList />} />
              <Route path="/chatRoom/:id" element={<ChatRoom />} />
              <Route path="/etc" element={<Etc />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/search" element={<FriendsSearch />} />
              <Route path="/profile_edit" element={<Profile_edit />} />
            </>
          ) : (
            <Route path="/" element={<LoginForm />} />
          )}
        </Routes>
      )}
    </Router>
  );
};

export default AppRouter;
