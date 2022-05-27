import { firebaseStore } from "Fbase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Image, ListGroup } from "react-bootstrap";
import FriendList_profile from "../component/FriendList_profile";
import defaultUserIcon from "icon/abstract-user-flat-3.png";
import ChatRoom from "component/ChatRoom";

const FriendList = ({ userData }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [userContent, setUserContent] = useState("");
  const [userUid, setUserUid] = useState("");
  const [friends, setFriends] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const onDoubleClick = (e) => {
    e.stopPropagation();
    console.log(e);
    const {
      target: { id },
    } = e;
    if (id === "myprofile") {
      setUserName(userData.name);
      setUserPhoto(userData.photoUrl);
      setUserContent(userData.profile_content);
      setUserUid(userData.uid);
      setShowDetail(true);
    } else {
      const {
        target: {
          attributes: { username, userphoto, usercontent, useruid },
        },
      } = e;
      setUserName(username.value);
      setUserPhoto(userphoto.value);
      setUserContent(usercontent.value);
      setUserUid(useruid.value);
      setShowDetail(true);
    }
  };

  useEffect(() => {
    if (userData.friends) {
      getFriendsData();
    }
  }, [userData.friends]);

  const getFriendsData = async () => {
    let friendsList = [];
    const promise = userData.friends.map(async (value) => {
      const docRef = doc(firebaseStore, "userData", value);
      const docSnap = await getDoc(docRef);
      friendsList.push(docSnap.data());
    });
    await Promise.all(promise);
    setFriends(friendsList);
  };

  return (
    <>
      <div className="chatList_main">
        <ListGroup variant="flush">
          <ListGroup.Item variant="secondary">뒷담 프로필</ListGroup.Item>
          <ListGroup.Item
            action
            onDoubleClick={onDoubleClick}
            variant="secondary"
            className="d-flex justify-content-between align-items-start"
            id="myprofile"
          >
            <div className="friend_myProfile">
              <Image
                src={userData.photoUrl ? userData.photoUrl : defaultUserIcon}
                roundedCircle
                className="friend_myProfile_image"
              />
            </div>
            <div className="ms-2 me-auto">
              <div className="fw-bold">{userData.name}</div>
              {userData.profile_content}
            </div>
          </ListGroup.Item>
          <ListGroup.Item variant="secondary">뒷담친구</ListGroup.Item>
          {friends.map((fr) => (
            <ListGroup.Item
              action
              onDoubleClick={onDoubleClick}
              variant="secondary"
              className="d-flex justify-content-between align-items-start"
              username={fr.name}
              userphoto={fr.photoUrl}
              usercontent={fr.profile_content}
              useruid={fr.uid}
              key={fr.uid}
              id="userProfile"
            >
              <div className="friend_myProfile">
                <Image
                  src={fr.photoUrl ? fr.photoUrl : defaultUserIcon}
                  roundedCircle
                  className="friend_myProfile_image"
                />
              </div>
              <div className="ms-2 me-auto">
                <div className="fw-bold">{fr.name}</div>
                {fr.profile_content}
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
        isFriends={true}
        userData={userData}
        onHide={() => setShowDetail(false)}
        setShowChat={setShowChat}
      />

      <ChatRoom
        show={showChat}
        onHide={() => setShowChat(false)}
        userName={userName}
        userPhoto={userPhoto}
        userContent={userContent}
        userUid={userUid}
        isFriends={true}
        userData={userData}
      />
    </>
  );
};

export default FriendList;
