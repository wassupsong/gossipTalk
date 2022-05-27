import {
  Button,
  Card,
  Col,
  FormControl,
  Image,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { FaComment, FaPen, FaUserPlus } from "react-icons/fa";
import { doc, updateDoc } from "firebase/firestore";
import { firebaseStore } from "Fbase";
import defaultUserIcon from "icon/abstract-user-flat-3.png";
import { useNavigate } from "react-router-dom";
const ChatRoom = ({
  show,
  userName,
  userPhoto,
  userContent,
  userUid,
  onHide,
  isFriends,
  myUid,
  userData,
}) => {
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
        style={{
          textAlign: "center",
          // backgroundImage: `url(${userPhoto})`,
          height: "300px",
          paddingTop: "120px",
          backgroundColor: "#292929",
        }}
      >
        <Row style={{ marginTop: "10px" }}>
          <Col xs={{ order: "last" }}></Col>
          <Col
            xs={{ order: "first" }}
            style={{ textAlign: "left", color: "white" }}
          >
            <Image
              src={userPhoto}
              style={{ width: "30px", height: "30px", marginBottom: "10px" }}
              roundedCircle
            />
            <span style={{ marginLeft: "10px", fontWeight: "bold" }}>
              {userName}
            </span>
            <span
              style={{
                color: "white",
                fontSize: "10px",
                padding: "10px",
              }}
            >
              오후 5:51
            </span>
            <Card style={{ border: "none" }}>
              <Card.Body
                style={{
                  textAlign: "left",
                  color: "black",
                  backgroundColor: "#292929",
                  padding: "0",
                  paddingLeft: "16px",
                }}
              >
                <p
                  style={{
                    backgroundColor: "white",
                    padding: "10px",
                    borderRadius: "10px",
                    maxWidth: "200px",
                  }}
                >
                  hiasffasdsfasdfasfsdfdasfawdfasdfasdfasfasdfdsafsdaf
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col
            xs={{ order: "last" }}
            style={{ textAlign: "right", color: "white" }}
          >
            <span
              style={{
                color: "white",
                fontSize: "10px",
                padding: "10px",
              }}
            >
              오후 5:51
            </span>
            <Card style={{ border: "none" }}>
              <Card.Body
                style={{
                  textAlign: "left",
                  color: "black",
                  backgroundColor: "#292929",
                  padding: "0",
                  paddingRight: "16px",
                }}
              >
                <p
                  style={{
                    backgroundColor: "white",
                    padding: "10px",
                    borderRadius: "10px",
                    maxWidth: "200px",
                  }}
                >
                  hiasffasdsfasdfasfsdfdasfawdfasdfasdfasfasdfdsafsdaf
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={{ order: "first" }}></Col>
        </Row>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#696969" }}>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="뒷담을 적어주세요"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            as="textarea"
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            style={{ backgroundColor: "black", color: "white" }}
          >
            뒷담까기
          </Button>
        </InputGroup>
      </Modal.Footer>
    </Modal>
  );
};

export default ChatRoom;
