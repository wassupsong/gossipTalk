import { Button, FormControl, Image, InputGroup, Modal } from "react-bootstrap";
import defaultUserIcon from "icon/abstract-user-flat-3.png";
import { useEffect, useRef, useState } from "react";
import { firebaseStore } from "Fbase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import Chats from "./Chats";
const ChatRoom = ({
  show,
  userName,
  userPhoto,
  userUid,
  onHide,
  roomId,
  receiveMs,
}) => {
  useEffect(() => {
    scrollToBottom();
  }, []);
  const [sendMs, setSendMs] = useState("");
  const messageBoxRef = useRef();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };
  const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "오후" : "오전";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const strTime = ampm + " " + hours + ":" + minutes;
    return strTime;
  };

  const inputChange = (e) => {
    const {
      target: { value },
    } = e;
    setSendMs(value);
  };
  const sendMessage = async (e) => {
    e.preventDefault();
    const add = await addDoc(collection(firebaseStore, roomId), {
      message: sendMs,
      regDate: formatAMPM(new Date()),
      senderId: userData.uid,
      senderName: userData.name,
      senderPhoto: userData.photoUrl,
      regDateMs: Date.now(),
    });

    const myRef = collection(firebaseStore, userData.uid);
    await updateDoc(doc(myRef, userUid), {
      UUid: roomId,
      userName,
      userPhoto,
      userUid,
      lastChat: sendMs,
      badgeCnt: 0,
    });
    const userRef = collection(firebaseStore, userUid);
    await updateDoc(doc(userRef, userData.uid), {
      UUid: roomId,
      userName: userData.name,
      userPhoto: userData.photoUrl,
      userUid: userData.uid,
      lastChat: sendMs,
      badgeCnt: 0,
    });

    setSendMs("");
    scrollToBottom();
  };

  const pressEnter = (e) => {
    if (window.event.keyCode == 13) sendMessage(e);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
    >
      <Modal.Header style={{ padding: "10px" }} closeButton>
        <Modal.Title style={{ fontWeight: "bold" }}>
          <Image
            src={userData.photoUrl ? userData.photoUrl : defaultUserIcon}
            roundedCircle
            className="friend_myProfile_image"
            style={{ marginRight: "10px" }}
          />
          {userName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        ref={messageBoxRef}
        style={{
          textAlign: "center",
          // backgroundImage: `url(${userPhoto})`,
          height: "300px",
          paddingTop: "120px",
          backgroundColor: "#292929",
        }}
      >
        {receiveMs.map((value, index) => (
          <Chats
            key={index}
            message={value.message}
            regDate={value.regDate}
            senderId={value.senderId}
            senderName={value.senderName}
            senderPhoto={value.senderPhoto}
            userData={userData}
          />
        ))}
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#696969" }}>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="뒷담을 적어주세요"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            as="textarea"
            onChange={inputChange}
            value={sendMs}
            onKeyDown={pressEnter}
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            style={{ backgroundColor: "black", color: "white" }}
            onClick={sendMessage}
          >
            뒷담까기
          </Button>
        </InputGroup>
      </Modal.Footer>
    </Modal>
  );
};

export default ChatRoom;
