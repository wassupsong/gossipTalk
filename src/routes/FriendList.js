import { firebaseStore } from "Fbase";
import { useEffect, useState } from "react";
import { Image, ListGroup } from "react-bootstrap";
import FriendList_profile from "../component/FriendList_profile";
import defaultUserIcon from "icon/abstract-user-flat-3.png";
import ChatRoom from "component/ChatRoom";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";

const FriendList = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  const [showDetail, setShowDetail] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [userContent, setUserContent] = useState("");
  const [userUid, setUserUid] = useState("");
  const [friends, setFriends] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [receiveMs, setReceiveMs] = useState([]);

  const myProfileEvent = () => {
    setUserName(userData.name);
    setUserPhoto(userData.photoUrl);
    setUserContent(userData.profile_content);
    setUserUid(userData.uid);
    setShowDetail(true);
  };

  const userProfileEvent = (fr) => {
    setUserName(fr.name);
    setUserPhoto(fr.photoUrl);
    setUserContent(fr.profile_content);
    setUserUid(fr.uid);
    setShowDetail(true);
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
            variant="secondary"
            className="d-flex justify-content-between align-items-start"
            onDoubleClick={myProfileEvent}
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
              onDoubleClick={() => userProfileEvent(fr)}
              variant="secondary"
              className="d-flex justify-content-between align-items-start"
              key={fr.uid}
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
        setRoomId={setRoomId}
        setReceiveMs={setReceiveMs}
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
        roomId={roomId}
        setRoomId={setRoomId}
        receiveMs={receiveMs}
      />
    </>
  );
};

export default FriendList;
