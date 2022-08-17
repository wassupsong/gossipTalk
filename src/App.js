import { useEffect, useRef, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "Fbase";
import Spinner from "react-bootstrap/Spinner";
import AppRouter from "component/Router";
import { doc, onSnapshot } from "firebase/firestore";
import { firebaseStore } from "Fbase";
import { FaRegGrinTongueSquint } from "react-icons/fa";

function App() {
  const [init, setInit] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isMobileSize, setIsMobileSize] = useState(false);
  const [isGetUserData, setIsGetUserData] = useState("noInit");
  const [authData, setAuthData] = useState({});
  useEffect(() => {
    sizeCheck();
    const auth = getAuth();
    //로그인 혹은 로그아웃 등 회원데이터가 바뀌면 동작
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //로그인
        setAuthData(user);
        setIsLogin(true);
      } else {
        //로그아웃
        localStorage.removeItem("userData");
        setIsLogin(false);
        setIsGetUserData("noInit");
      }
      setInit(true);
    });

    //브라우저 화면 사이즈 체크 이벤트
    window.onresize = () => {
      sizeCheck();
    };
  }, []);

  /*
    useRef 를 활용하여 authData가 변경될 때에만 mount되도록 설정
    (초기 mount 막음)
  */
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      const data = doc(firebaseStore, "userData", authData.uid);
      //실시간 업데이트 확인(auth 데이터로 db상의 user 추가 데이터 조회-프로필 변경 감지)
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

  //사이즈 체크 fn
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
              <h1>
                뒷담을 위해 화면을 작게해주세요
                <FaRegGrinTongueSquint />
              </h1>
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
