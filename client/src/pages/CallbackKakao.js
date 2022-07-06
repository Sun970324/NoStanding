import axios from "axios";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getUserInfo, getUserLogin } from "../store/store";

function CallbackKakao({ getUserLogin, getUserInfo }) {
  const navigate = useNavigate();
  const url = new URL(window.location.href);
  console.log(url);
  const authorizationCode = url.searchParams.get("code");
    //url에서 authorizationCode를 추출하여 변수에 할당
  const callbackCheck = useCallback(async () => {
    try {
      if (authorizationCode) {
        await axios
          .post(
            `${process.env.REACT_APP_API_URL}/oauth/kakao`,
            { authorizationCode },
            { headers: { accept: "application/json" }, withCredentials: true }
          )
          .then((resp) => {
            const userInfo = resp.data.data.userInfo;
            getUserLogin();
            getUserInfo(userInfo);
            alert("카카오로그인성공");
            navigate("/");
          });
      }
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  }, []);
  //서버에 oauth authorizationCode를 담아 요청을 보내고 유저정보를 가져옴.
  useEffect(() => {
    callbackCheck();
  }, [callbackCheck]);

  return <div>카카오로그인</div>;
}

function mapDispatchToProps(dispatch) {
  return {
    getUserLogin: () => {
      dispatch(getUserLogin());
    },
    getUserInfo: (userInfo) => {
      dispatch(getUserInfo(userInfo));
    },
  };
}
export default connect(null, mapDispatchToProps)(CallbackKakao);
