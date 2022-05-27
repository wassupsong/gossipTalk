import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "Fbase";
import Spinner from "react-bootstrap/Spinner";
import AppRouter from "component/Router";
import { doc, onSnapshot } from "firebase/firestore";
import { firebaseStore } from "Fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isMobileSize, setIsMobileSize] = useState(false);
  const [userData, setUserData] = useState({});
  const [isGetUserData, setIsGetUserData] = useState("noInit");
  const [authData, setAuthData] = useState({});
  useEffect(() => {
    sizeCheck();
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthData(user);
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
      setInit(true);
    });

    window.onresize = () => {
      sizeCheck();
    };
  }, []);

  useEffect(() => {
    if (isLogin) {
      const data = doc(firebaseStore, "userData", authData.uid);
      onSnapshot(data, (doc) => {
        if (doc.data()) {
          setUserData(doc.data());
          setIsGetUserData("existData");
        } else {
          setIsGetUserData("noData");
        }
      });
    }
  }, [isLogin]);

  const sizeCheck = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (width <= 500 && height <= 700) {
      setIsMobileSize(true);
    } else {
      setIsMobileSize(false);
    }
  };
  console.log(userData);
  return (
    <>
      {init ? (
        <>
          {isMobileSize ? (
            <AppRouter
              userData={userData}
              isLogin={isLogin}
              isGetUserData={isGetUserData}
              setUserData={setUserData}
              authData={authData}
            />
          ) : (
            <div>
              <h1>뒷담을 위해 화면을 작게해주세요.</h1>
            </div>
          )}
        </>
      ) : (
        <div className="spinner">
          <Spinner animation="border" role="status" variant="light" />
        </div>
      )}
    </>
  );
}

export default App;