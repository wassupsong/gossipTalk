import { firebaseStore } from "Fbase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Image, ListGroup } from "react-bootstrap";
import FriendList_profile from "../component/FriendList_profile";
import defaultUserIcon from "icon/abstract-user-flat-3.png";

const FriendsSearch = () => {
  const [showDetail, setShowDetail] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [userContent, setUserContent] = useState("");
  const [userUid, setUserUid] = useState("");
  const [userList, setUserList] = useState([]);
  const [isFriends, setIsFriends] = useState(false);
  const [userFriends, setUserFriends] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    if (userData) {
      getUserData();
    }
  }, [userData]);

  const onDoubleClick = (e) => {
    const {
      target: {
        attributes: { username, userphoto, usercontent, useruid, friends },
      },
    } = e;
    if (userData.friends.indexOf(useruid.value) > -1) {
      setIsFriends(true);
    } else {
      setIsFriends(false);
    }
    setUserName(username.value);
    setUserPhoto(userphoto.value);
    setUserContent(usercontent.value);
    setUserUid(useruid.value);
    setUserFriends(friends.value);
    setShowDetail(true);
  };

  const getUserData = async () => {
    let users = [];
    const q = query(
      collection(firebaseStore, "userData"),
      where("uid", "!=", userData.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    setUserList(users);
  };

  return (
    <>
      <div className="chatList_main">
        <ListGroup.Item variant="secondary">검색목록</ListGroup.Item>
        <ListGroup variant="flush">
          {userList.map((user) => (
            <ListGroup.Item
              action
              onDoubleClick={onDoubleClick}
              variant="secondary"
              className="d-flex justify-content-between align-items-start"
              username={user.name}
              userphoto={user.photoUrl}
              usercontent={user.profile_content}
              useruid={user.uid}
              friends={user.friends}
              key={user.uid}
            >
              <div className="friend_myProfile">
                <Image
                  src={user.photoUrl ? user.photoUrl : defaultUserIcon}
                  roundedCircle
                  className="friend_myProfile_image"
                />
              </div>
              <div className="ms-2 me-auto">
                <div className="fw-bold">{user.name}</div>
                {user.profile_content}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      <FriendList_profile
        show={showDetail}
        userName={userName}
        userPhoto={userPhoto}
        userContent={userContent}
        userUid={userUid}
        isFriends={isFriends}
        isMe={false}
        userFriends={userFriends}
        myUid={userData.uid}
        onHide={() => setShowDetail(false)}
        userData={userData}
      />
    </>
  );
};

export default FriendsSearch;
