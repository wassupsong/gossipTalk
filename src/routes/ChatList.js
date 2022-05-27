import { Badge, Image, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import defaultUserIcon from "icon/abstract-user-flat-3.png";

const ChatList = ({ userData }) => {
  const navigate = useNavigate();
  const onDoubleClick = (e) => {
    navigate("/chatRoom/:12");
  };
  return (
    <div className="chatList_main">
      <ListGroup>
        <ListGroup.Item
          action
          onDoubleClick={onDoubleClick}
          variant="secondary"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="">
            <Image
              src={defaultUserIcon}
              roundedCircle
              className="friend_myProfile_image"
            />
          </div>
          <div className="ms-2 me-auto">
            <div className="fw-bold">Subheading</div>
            Cras justo odio
          </div>
          <Badge bg="primary" pill>
            14
          </Badge>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default ChatList;
