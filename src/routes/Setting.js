import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const navigate = useNavigate();
  const clickLogOut = () => {
    const auth = getAuth();
    signOut(auth);
    navigate("/", { replace: true });
  };
  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <h1 onClick={clickLogOut}>Logout</h1>
    </>
  );
};

export default Setting;
