import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [isJoin, setIsJoin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const inputChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") setEmail(value);
    if (name === "password") setPw(value);
  };
  const login = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    let data;
    try {
      if (isJoin) {
        data = await createUserWithEmailAndPassword(auth, email, pw);
      } else {
        data = await signInWithEmailAndPassword(auth, email, pw);
      }
    } catch (error) {
      console.log(error.code);
      const code = error.code;
      let errorStr;
      if (code == "auth/wrong-password") {
        errorStr = "비밀번호를 잘못 입력했습니다.";
      } else if (code == "auth/user-not-found") {
        errorStr = "존재하지 않는 계정입니다. 가입해주세요!";
      } else if (code == "auth/weak-password") {
        errorStr = "비밀번호는 6자리 이상 입력해주세요.";
      } else if (code == "auth/email-already-in-use") {
        errorStr = "이미 존재하는 사용자입니다. 로그인해주세요.";
      } else if (code == "auth/invalid-email") {
        errorStr = "이메일을 입력해주세요.";
      } else if (code == "auth/internal-error") {
        errorStr = "비밀번호를 입력해주세요.";
      }
      setErrorMessage(errorStr);
    }
  };
  const toggleDo = () => setIsJoin((prev) => !prev);
  return (
    <>
      <div className="login_alert">
        {errorMessage && (
          <Alert
            variant="danger"
            onClose={() => setErrorMessage("")}
            dismissible
          >
            {/* <Alert.Heading></Alert.Heading> */}
            <p>{errorMessage}</p>
          </Alert>
        )}
      </div>
      <Container className="login_container">
        <h1 className="login_title">Gossip Talk</h1>
        <Form onSubmit={login}>
          <Form.Group as={Row} className="mb-3">
            <Col sm>
              <Form.Control
                type="email"
                name="email"
                onChange={inputChange}
                value={email}
                placeholder="이메일"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm>
              <Form.Control
                type="password"
                name="password"
                onChange={inputChange}
                value={pw}
                placeholder="비밀번호"
              />
            </Col>
          </Form.Group>
          <br />
          <div className="d-grid gap-1">
            <Button variant="secondary" type="submit">
              {isJoin ? "뒷담멤버가입" : "뒷담하러가기"}
            </Button>
          </div>
          <br />
          <span className="login_toggle" onClick={toggleDo}>
            {isJoin ? "뒷담하러가기" : "뒷담멤버가입"}
          </span>
        </Form>
      </Container>
    </>
  );
};

export default LoginForm;
