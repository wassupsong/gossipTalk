import { useEffect, useRef, useState } from "react";
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
  const [isGetUserData, setIsGetUserData] = useState("noInit");
  const [authData, setAuthData] = useState({});
  console.log(isLogin);
  console.log(isGetUserData);
  useEffect(() => {
    sizeCheck();
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthData(user);
        setIsLogin(true);
      } else {
        localStorage.removeItem("userData");
        setIsLogin(false);
        setIsGetUserData("noInit");
      }
      setInit(true);
    });

    window.onresize = () => {
      sizeCheck();
    };
  }, []);

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      const data = doc(firebaseStore, "userData", authData.uid);
      onSnapshot(data, (doc) => {
        if (doc.data()) {
          localStorage.setItem("userData", JSON.stringify(doc.data()));
          setIsGetUserData("existData");
        } else {
          setIsGetUserData("noData");
        }
      });
    }
  }, [authData]);

  const sizeCheck = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (width <= 500 && height <= 700) {
      setIsMobileSize(true);
    } else {
      setIsMobileSize(false);
    }
  };

  return (
    <>
      {init ? (
        <>
          {isMobileSize ? (
            <AppRouter
              isLogin={isLogin}
              isGetUserData={isGetUserData}
              authData={authData}
            />
          ) : (
            <div
              style={{
                backgroundColor: "black",
                color: "white",
                textAlign: "center",
                marginTop: "100px",
              }}
            >
              <h1>뒷담을 위해 화면을 작게해주세요.</h1>
              <footer style={{ marginTop: "100px" }}>
                &copy; {new Date().getFullYear()} gossipTalk
              </footer>
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
