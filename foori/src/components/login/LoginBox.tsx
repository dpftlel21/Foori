import Logo from "../common/Logo";
import Email from "../../assets/images/email.png";
import Lock from "../../assets/images/lock.png";
import { Link } from "react-router-dom";
import { useFormValidation, } from "../../hooks/useFormValidation";
import { useAuth } from "../../util/auth";
import { useNavigate } from "react-router-dom";
import OauthLogin from "./oauthLogin/OauthLogin";

const Login = () => {
  const LoginBox =
    "w-[35%] h-[60%] flex flex-col justify-center items-center bg-gray-100 bg-opacity-40 border border-gray-400 rounded-md shadow-md text-sm";
  const InputContainer =
    "w-full flex flex-col justify-center items-center my-[1%]";
  const InputStyle = "w-[45%] h-[3.5vh] p-[1%] rounded-md";
  const InputTitle = "w-[45%] flex justify-start items-center mb-[1%]";
  const ButtonStyle =
    "w-[45%] h-[3.5vh] my-[1%] bg-[#FF800B] text-white rounded-md hover:bg-[#fcb69f] transition duration-500 ease-in-out";

  const navigate = useNavigate();
  const { loginMutation, userInfoQuery } = useAuth();
  const { formData, errors, handleChange, validateForm } = useFormValidation({
    email: "",
    password: ""
  }, "login");

  // 로그인 버튼 클릭 시 실행되는 함수
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //console.log('formData', formData);
    try {
      //console.log('validateForm', validateForm());
      if (!validateForm()) {
        console.log('현재 에러 상태:', errors);
        return;
      }
      const loginData = {
        email: formData.email,
        password: formData.password
      };
      //console.log('loginData', loginData);
      await loginMutation.mutateAsync(loginData);

      await userInfoQuery.refetch();

      console.log(userInfoQuery.data);

      navigate('/');

    } catch (error) {
      console.log(error instanceof Error ? error.message : '로그인 중 오류가 발생했습니다.');
    }

  };

  return (
    <>
      <Logo />
      <div className={LoginBox}>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          {/* 아이디 입력 */}
          <div className={InputContainer}>
            <div className={InputTitle}>
              <img
                src={Email}
                alt="email"
                className="w-[1.2rem] h-[1.2rem] mr-2"
              />
              <span>이메일</span>
            </div>
            <input
              type="email"
              name="email"
              placeholder="이메일을 입력하세요. ex) foori@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className={InputStyle}
            />
          </div>

          {/* 비밀번호 입력 */}
          <div className={InputContainer}>
            <div className={InputTitle}>
              <img
                src={Lock}
                alt="lock"
                className="w-[1.2rem] h-[1.2rem] mr-2"
              />
              <span>비밀번호</span>
            </div>
            <input
              type="password"
              name="password"
              placeholder="비밀번호를 입력하세요."
              value={formData.password}
              onChange={handleChange}
              className={InputStyle}
            />
          </div>

          {/* 아이디 비밀번호 찾기, 회원가입 */}
          <div className="w-[45%] flex justify-between text-[#4446] my-[1%]">
            <Link to="/find-account">아이디/비밀번호 찾기</Link>
            <Link to="/signup">회원가입</Link>
          </div>

          {/* 로그인 버튼 */}
          <button type="submit" className={ButtonStyle}>
            Login
          </button>
        </form>

        {/* 구분선 */}
        <div className="w-full flex items-center justify-center my-4">
          <div className="w-1/3 h-[1px] bg-gray-300"></div>
          <span className="mx-4 text-gray-500">또는</span>
          <div className="w-1/3 h-[1px] bg-gray-300"></div>
        </div>

        {/* 소셜 로그인 버튼들 */}
        <OauthLogin actionType='login' />
      </div>
    </>
  );
};
export default Login
