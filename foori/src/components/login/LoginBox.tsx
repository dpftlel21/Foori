import Logo from "../common/Logo";
import Email from "../../assets/images/email.png";
import Lock from "../../assets/images/lock.png";
import { Link } from "react-router-dom";
import KaKaoBtn from "./oauth/KaKaoBtn";
import NaverBtn from "./oauth/NaverBtn";
import GoogleBtn from "./oauth/GoogleBtn";
import { useFormValidation, } from "../../hooks/useFormValidation";
import { authService } from "../../util/auth";
const Login = () => {
  const LoginBox =
    "w-[35%] h-[60%] flex flex-col justify-center items-center bg-gray-100 bg-opacity-40 border border-gray-400 rounded-md shadow-md text-sm";

  const InputContainer =
    "w-full flex flex-col justify-center items-center my-[1%]";
  const InputStyle = "w-[45%] h-[3vh] rounded-md";
  const InputTitle = "w-[45%] flex justify-start items-center mb-[1%]";

  const ButtonStyle =
    "w-[45%] h-[7%] my-[1%] bg-[#FF800B] text-white rounded-md hover:bg-[#fcb69f] transition duration-500 ease-in-out";


  const { formData, errors, handleChange, validateForm } = useFormValidation({
    email: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log('formData', formData);

    try {

      console.log('validateForm', validateForm());

      if (!validateForm()) {
        console.log('현재 에러 상태:', errors);
        return;
      }

      const loginData = {
        email: formData.email,
        password: formData.password
      };

      console.log('loginData', loginData);

      await authService.login(loginData);

    } catch (error) {
      console.log(error instanceof Error ? error.message : '로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <Logo />
      <form onSubmit={handleSubmit} className={LoginBox}>
        {/* 아이디 */}
        <div className={InputContainer}>
          <div className={InputTitle}>
            <img src={Email} alt="" className="w-10" />
            <label htmlFor="username" className="ml-[1%]">
              Email
            </label>
          </div>
          <input
            className={`${InputStyle} ${errors.email ? 'border-red-500' : ''}`}
            name="email"
            type="email"
            placeholder="이메일을 입력하세요."
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>
        {/* 비밀번호 */}
        <div className={InputContainer}>
          <div className={InputTitle}>
            <img src={Lock} alt="" className="w-10" />
            <label htmlFor="username" className="ml-[1%]">
              Password
            </label>
          </div>
          <input
            className={`${InputStyle} ${errors.password ? 'border-red-500' : ''}`}
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요."
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
        </div>
        {/* 아이디 비밀번호 찾기, 회원가입 */}
        <div className="w-[45%] flex justify-between text-[#4446] my-[1%]">
          <Link to="/findid"><h1>아이디 찾기</h1></Link>
          <Link to="/findpw"><h1>비밀번호 찾기</h1></Link>
          <Link to="/signup"><h1>회원가입</h1></Link>
        </div>
        {/* 로그인 버튼 */}
        <button type="submit" className={ButtonStyle}>Login</button>
        {/* 카카오 로그인 버튼 */}
        <KaKaoBtn />
        <NaverBtn />
        <GoogleBtn />
      </form>
    </>
  );
};

export default Login;
