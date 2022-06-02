import { Button, Col, Image, Modal, Row } from "react-bootstrap";
import { FaComment, FaPen, FaUserPlus } from "react-icons/fa";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firebaseStore } from "Fbase";
import defaultUserIcon from "icon/abstract-user-flat-3.png";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const FriendList_profile = ({
  show,
  userName,
  userPhoto,
  userContent,
  userUid,
  onHide,
  isFriends,
  myUid,
  setShowChat,
  setRoomId,
  setReceiveMs,
}) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const addFriends = async () => {
    const my = doc(firebaseStore, "userData", myUid);
    try {
      await updateDoc(my, {
        name: userData.name,
        photoUrl: userData.photoUrl,
        uid: userData.uid,
        profile_content: userData.profile_content,
        friends: [
          ...userData.friends,
          {
            name: userName,
            uid: userUid,
            photoUrl: userPhoto,
            profile_content: userContent,
          },
        ],
      });

      alert("친구 추가 되었습니다.");
      onHide();
    } catch (error) {
      console.log(error.message);
    }
  };
  const startChat = async () => {
    const getRoomId = await getDoc(doc(firebaseStore, userData.uid, userUid));
    let roomId = null;
    if (getRoomId.exists()) {
      setRoomId(getRoomId.data().UUid);
      roomId = getRoomId.data().UUid;
    } else {
      const uuid = uuidv4();
      setRoomUUid(uuid);
      setRoomId(uuid);
      roomId = uuid;
    }
    const que = query(collection(firebaseStore, roomId), orderBy("regDateMs"));
    onSnapshot(que, (snapShot) => {
      let chatList = [];
      snapShot.forEach((doc) => {
        chatList.push(doc.data());
      });
      setReceiveMs(chatList);
    });
    setShowChat(true);
    onHide();
  };

  const setRoomUUid = async (uuid) => {
    const myRef = collection(firebaseStore, userData.uid);
    await setDoc(doc(myRef, userUid), {
      UUid: uuid,
      userName,
      userPhoto,
      userUid,
      lastChat: "",
      badgeCnt: 0,
    });
    const userRef = collection(firebaseStore, userUid);
    await setDoc(doc(userRef, userData.uid), {
      UUid: uuid,
      userName: userData.name,
      userPhoto: userData.photoUrl,
      userUid: userData.uid,
      lastChat: "",
      badgeCnt: 0,
    });
  };

  const fixProfile = () => {
    navigate("/profile_edit");
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body
        style={{
          textAlign: "center",
          // backgroundImage: `url(${userPhoto})`,
          height: "300px",
          paddingTop: "120px",
        }}
      >
        <Image
          src={userPhoto ? userPhoto : defaultUserIcon}
          roundedCircle
          style={{ width: "100px", height: "100px" }}
        />
        <h2>{userName}</h2>
        <h6>{userContent}</h6>
      </Modal.Body>
      <Modal.Footer style={{ textAlign: "center", display: "block" }}>
        <Button
          variant="outline-secondary"
          onClick={startChat}
          style={{ border: "none" }}
        >
          <FaComment />
          <p style={{ margin: "0" }}>채팅하기</p>
        </Button>
        {userData.uid === userUid && (
          <Button
            variant="outline-secondary"
            onClick={fixProfile}
            style={{ border: "none" }}
          >
            <FaPen />
            <p style={{ margin: "0" }}>프로필 관리</p>
          </Button>
        )}

        {!isFriends && (
          <Button
            variant="outline-secondary"
            onClick={addFriends}
            style={{ border: "none" }}
          >
            <FaUserPlus />
            <p style={{ margin: "0" }}>친구추가</p>
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default FriendList_profile;
