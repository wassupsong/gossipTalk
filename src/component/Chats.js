import { Card, Col, Image, Row } from "react-bootstrap";

const Chats = ({ message, regDate, senderName, senderPhoto, senderId }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  return (
    <>
      {userData.uid !== senderId ? (
        <Row style={{ marginTop: "10px" }}>
          <Col xs={{ order: "last" }}></Col>
          <Col
            xs={{ order: "first" }}
            style={{ textAlign: "left", color: "white" }}
          >
            <Image
              src={senderPhoto}
              style={{ width: "30px", height: "30px", marginBottom: "10px" }}
              roundedCircle
            />
            <span style={{ marginLeft: "10px", fontWeight: "bold" }}>
              {senderName}
            </span>
            <span
              style={{
                color: "white",
                fontSize: "10px",
                padding: "10px",
              }}
            >
              {regDate}
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
                  {message}
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
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
              {regDate}
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
                    backgroundColor: "#ffff66",
                    padding: "10px",
                    borderRadius: "10px",
                    maxWidth: "200px",
                  }}
                >
                  {message}
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={{ order: "first" }}></Col>
        </Row>
      )}
    </>
  );
};

export default Chats;
