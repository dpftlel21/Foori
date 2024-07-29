import { useState } from "react";
import Logo from "../common/Logo";
import Email from "../../assets/images/email.png";
import Lock from "../../assets/images/lock.png";
import Person from "../../assets/images/person.png";
import Calendar from "../../assets/images/calendar.png";
import { postData, getData } from "../../util/api";

const SignUpBox = () => {
  const SignUpBox = "w-[35%] h-[60%] flex flex-col justify-center items-center bg-gray-100 bg-opacity-40 border border-gray-400 rounded-md shadow-md text-sm";
  const InputContainer = "w-full flex flex-col justify-center items-center my-[1%]";
  const InputStyle  = "w-[45%] h-[5vh] p-[1%] rounded-md ";
  const InputTitle  = "w-[45%] flex justify-start items-center mb-[1%]";
  const ButtonStyle = "w-[25%] h-[5vh] mt-[4%] bg-[#FF800B] text-white rounded-md hover:bg-[#fcb69f] transition duration-500 ease-in-out";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nickname: "",
    birth: "",
  });

  // INPUT 값 변경
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleCertify = async () => {
     try{
        const result = await postData(process.env.REACT_APP_EMAIL_LINK, { email: formData.email });
        console.log("result", result);
     }
     catch(error){
        console.error('Error fetching data:', error);
     }
  }

  return (
    <>
      <Logo />
      <form className={SignUpBox}>
        {/* 아이디 */}
        <div className={InputContainer}>
          <div className={InputTitle}>
            <img src={Email} alt="" className="w-[12%]" />
            <label htmlFor="username" className="ml-[1%]">
              이메일
            </label>
            {/* 인증하기 버튼 */}
            <button
            type="submit" 
            className="w-[25%] h-[3vh] ml-[1%] bg-[#FF800B] text-white text-xs  rounded-md hover:bg-[#fcb69f] transition duration-500 ease-in-out"
            onClick={handleCertify}
            >
              인증하기
            </button>
          </div>
          <input
            className={InputStyle}
            type="email"
            name="email"
            value={formData.email}
            placeholder="이메일을 입력하세요."
            onChange={handleChange}
          />
        </div>
        {/* 비밀번호 */}
        <div className={InputContainer}>
          <div className={InputTitle}>
            <img src={Lock} alt="" className="w-[12%]" />
            <label htmlFor="username" className="ml-[1%]">
              비밀번호
            </label>
          </div>
          <input
            className={InputStyle}
            type="text"
            placeholder="비밀번호를 입력하세요."
          />
        </div>
        {/* 닉네임 */}
        <div className={InputContainer}>
          <div className={InputTitle}>
            <img src={Person} alt="" className="w-[12%]" />
            <label htmlFor="username" className="ml-[1%]">
              닉네임
            </label>
          </div>
          <input
            className={InputStyle}
            type="text"
            placeholder="닉네임을 입력하세요."
          />
        </div>
        {/* 생년월일 */}
        <div className={InputContainer}>
          <div className={InputTitle}>
            <img src={Calendar} alt="사람 모양" className="w-[12%]" />
            <label htmlFor="birth" className="ml-[1%]">
              생년월일
            </label>
          </div>
            <input className={InputStyle} type="date" />
          {/* 로그인 버튼 */}
          <button type="submit" className={ButtonStyle}>완료하기</button>
        </div>
      </form>
    </>
  );
};

export default SignUpBox;
