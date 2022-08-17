import { Badge, Image, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import defaultUserIcon from "icon/abstract-user-flat-3.png";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { firebaseStore } from "Fbase";
import ChatRoom from "component/ChatRoom";

const ChatList = () => {
  const [chatList, setChatList] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [userName, setUserName] = useState("");
  const [userUid, setUserUid] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [roomId, setRoomId] = useState("");
  const [receiveMs, setReceiveMs] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    const que = query(collection(firebaseStore, userData.uid));
    //채팅방 리스트 실시간 업데이트 조회
    onSnapshot(que, (snapShot) => {
      const list = [];
      snapShot.forEach((doc) => {
        list.push(doc.data());
      });
      setChatList(list);
    });
  }, []);

  /*
    채팅방 더블클릭 시, Chats 로 넘길 데이터 세팅
  */
  const onDoubleClick = (item) => {
    const que = query(
      collection(firebaseStore, item.UUid),
      orderBy("regDateMs")
    );
    //더블 클릭 된 채팅방의 uuid로 채팅목록 실시간 업데이트 조회
    onSnapshot(que, (snapShot) => {
      let chats = [];
      snapShot.forEach((doc) => {
        chats.push(doc.data());
      });
      setReceiveMs(chats);
    });

    setUserName(item.userName);
    setUserUid(item.userUid);
    setUserPhoto(item.userPhoto);
    setRoomId(item.UUid);
    setShowChat(true);
  };

  return (
    <>
      <div className="chatList_main">
        <ListGroup>
          {chatList.map((item, index) => (
            <ListGroup.Item
              action
              onDoubleClick={() => onDoubleClick(item)}
              variant="secondary"
              className="d-flex justify-content-between align-items-start"
              key={index}
            >
              <div className="">
                <Image
                  src={item.userPhoto ? item.userPhoto : defaultUserIcon}
                  roundedCircle
                  className="friend_myProfile_image"
                />
              </div>
              <div className="ms-2 me-auto">
                <div className="fw-bold">{item.userName}</div>
                {item.lastChat}
              </div>
              {item.badgeCnt != 0 && (
                <Badge bg="primary" pill>
                  {item.badgeCnt}
                </Badge>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <ChatRoom
        show={showChat}
        onHide={() => setShowChat(false)}
        userName={userName}
        userPhoto={userPhoto}
        userUid={userUid}
        roomId={roomId}
        receiveMs={receiveMs}
      />
    </>
  );
};

export default ChatList;
