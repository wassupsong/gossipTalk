import { Button, Col, Image, Modal, Row } from "react-bootstrap";
import { FaComment, FaPen, FaUserPlus } from "react-icons/fa";
import { doc, updateDoc } from "firebase/firestore";
import { firebaseStore } from "Fbase";
import defaultUserIcon from "icon/abstract-user-flat-3.png";
import { useNavigate } from "react-router-dom";
const FriendList_profile = ({
  show,
  userName,
  userPhoto,
  userContent,
  userUid,
  onHide,
  isFriends,
  myUid,
  userData,
  setShowChat,
}) => {
  const navigate = useNavigate();
  const addFriends = async () => {
    const my = doc(firebaseStore, "userData", myUid);
    try {
      await updateDoc(my, {
        name: userData.name,
        photoUrl: userData.photoUrl,
        uid: userData.uid,
        profile_content: userData.profile_content,
        friends: [...userData.friends, userUid],
      });

      alert("친구 추가가 완료되었습니다.");
    } catch (error) {
      console.log(error.message);
    }
  };
  const startChat = () => {
    setShowChat(true);
    onHide();
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
