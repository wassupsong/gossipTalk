import { firebaseStore } from "Fbase";
import { useState } from "react";
import { Image, ListGroup } from "react-bootstrap";
import FriendList_profile from "../component/FriendList_profile";
import defaultUserIcon from "icon/abstract-user-flat-3.png";
import ChatRoom from "component/ChatRoom";

const FriendList = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  const [showDetail, setShowDetail] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [userContent, setUserContent] = useState("");
  const [userUid, setUserUid] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [receiveMs, setReceiveMs] = useState([]);

  // 더블 클릭 시, 각 데이터 세팅
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
          {userData.friends.map((fr) => (
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

      {/* 프로필 Modal */}
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
      {/* 채팅방 Modal */}
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
