import Logo from "../../common/Logo";
import Email from "../../../assets/images/email.png";

const FindPwBox = () => {
  const Container =
    "w-[35%] h-[60%] flex flex-col justify-center items-center bg-gray-100 bg-opacity-40 border border-gray-400 rounded-md shadow-md text-sm";
  const InputContainer =
    "w-full flex flex-col justify-center items-center my-[1%]";
  const InputStyle = "w-[45%] h-[3vh] rounded-md p-[1%]";
  const InputTitle = "w-[45%] flex justify-start items-center mb-[1%]";
  const ButtonStyle =
    "w-[23%] h-[3vh] ml-[1%] bg-[#FF800B] text-white rounded-md hover:bg-[#fcb69f] transition duration-500 ease-in-out";
  return (
    <>
      <Logo />
      <div className={Container}>
        {/* 아이디 */}
        <div className={InputContainer}>
          <div className={InputTitle}>
            <img src={Email} alt="" className="w-10" />
            <label htmlFor="username" className="ml-[1%]">
              Email
            </label>
          </div>
          <input
            className={InputStyle}
            type="text"
            placeholder="이메일을 입력하세요."
          />
        </div>

        {/* 휴대폰 인증 */}
        <div className={InputContainer}>
          <div className={InputTitle}>
            <img src={Email} alt="" className="w-10" />
            <label htmlFor="username" className="ml-[1%]">
              휴대폰 번호
            </label>
            <button className={ButtonStyle}>인증하기</button>
          </div>
          <input
            className={InputStyle}
            type="text"
            placeholder="이메일을 입력하세요."
          />
        </div>

        {/* 비밀번호 */}
        <div className={InputContainer}>
          <div className={InputTitle}>
            <img src={Email} alt="" className="w-10" />
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

        {/* 비밀번호 확인 */}
        <div className={InputContainer}>
          <div className={InputTitle}>
            <img src={Email} alt="" className="w-10" />
            <label htmlFor="username" className="ml-[1%]">
              비밀번호
            </label>
          </div>
          <input
            className={InputStyle}
            type="text"
            placeholder="비밀번호를 재입력하세요."
          />
        </div>
      </div>
    </>
  );
};

export default FindPwBox;
