import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { firebaseStorage, firebaseStore } from "Fbase";
import { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const Profile = ({ authData }) => {
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [content, setContent] = useState("");
  const fileInput = useRef();
  const registUserData = async (e) => {
    e.preventDefault();
    try {
      let download = "";
      if (photoUrl) {
        const storageRef = ref(firebaseStorage, `${authData.uid}/${uuidv4()}`);
        const response = await uploadString(storageRef, photoUrl, "data_url");
        download = await getDownloadURL(storageRef);
      }
      const dataRef = collection(firebaseStore, "userData");
      await setDoc(doc(dataRef, authData.uid), {
        uid: authData.uid,
        name,
        photoUrl: download,
        friends: [],
        chatroom: [],
        profile_content: content,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const inputChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") setName(value);
    if (name === "photoUrl") setPhotoUrl(value);
    if (name === "content") setContent(value);
  };

  const fileChange = (e) => {
    const {
      target: { files },
    } = e;
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setPhotoUrl(result);
    };
    reader.readAsDataURL(file);
  };

  const clearFile = () => {
    setPhotoUrl("");
    fileInput.current.value = "";
  };

  return (
    <>
      <div className="login_alert"></div>
      <Container className="login_container">
        <h1 className="login_title">뒷담 프로필 등록</h1>
        <h6 className="login_title">※ 프로필 등록 후 이용가능합니다.</h6>
        <Form onSubmit={registUserData}>
          <Form.Group as={Row} className="mb-3">
            <Col sm>
              <Form.Control
                type="text"
                name="name"
                onChange={inputChange}
                value={name}
                placeholder="닉네임"
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col sm>
              <Form.Control
                type="text"
                name="content"
                onChange={inputChange}
                value={content}
                placeholder="소개글"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col sm>
              <Form.Control
                type="file"
                name="photoUrl"
                onChange={fileChange}
                accept="image/*"
                ref={fileInput}
              />
            </Col>
          </Form.Group>
          {photoUrl && (
            <Form.Group as={Row} className="mb-3">
              <Col sm>
                <Image
                  src={photoUrl}
                  roundedCircle
                  className="profile_image"
                  onClick={clearFile}
                />
              </Col>
            </Form.Group>
          )}
          <div className="d-grid gap-1">
            <Button variant="secondary" type="submit">
              뒷담 프로필 등록
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Profile;
