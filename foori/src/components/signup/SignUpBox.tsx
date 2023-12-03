import Logo from "../common/Logo";
import Email from "../../assets/images/email.png";
import Lock from "../../assets/images/lock.png";
import Person from "../../assets/images/person.png";
import Calendar from "../../assets/images/calendar.png";

const SignUpBox = () => {
  const SignUpBox =
    "w-[35%] h-[60%] flex flex-col justify-center items-center bg-gray-100 bg-opacity-40 border border-gray-400 rounded-md shadow-md text-sm";
  const InputContainer =
    "w-full flex flex-col justify-center items-center my-[1%]";
  const InputStyle = "w-[45%] h-[3vh] rounded-md";
  const InputTitle = "w-[45%] flex justify-start items-center mb-[1%]";
  const ButtonStyle =
    "w-[25%] h-[5vh] mt-[4%] bg-[#FF800B] text-white rounded-md hover:bg-[#fcb69f] transition duration-500 ease-in-out";

  // 상수 데이터
  // 년
  const YEAR = [];

  const nowYear = new Date().getFullYear();
  for (let i = 1960; i <= nowYear; i++) {
    YEAR.push(i);
  }

  // 월
  const MONTH = [];

  for (let i = 1; i <= 12; i++) {
    let m = String(i).padStart(2, "0");
    MONTH.push(m);
  }

  // 일
  const DAY = [];
  for (let i = 1; i <= 31; i++) {
    let d = String(i).padStart(2, "0");
    DAY.push(d);
  }

  return (
    <>
      <Logo />
      <div className={SignUpBox}>
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
        {/* 비밀번호 */}
        <div className={InputContainer}>
          <div className={InputTitle}>
            <img src={Lock} alt="" className="w-10" />
            <label htmlFor="username" className="ml-[1%]">
              Password
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
            <img src={Person} alt="" className="w-10" />
            <label htmlFor="username" className="ml-[1%]">
              NickName
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
            <img src={Calendar} alt="사람 모양" className="w-10" />
            <label htmlFor="birth" className="ml-[1%]">
              Your Birth
            </label>
          </div>
          <div className="w-[43%] flex justify-start">
            <select name="year" id="">
              {YEAR.map((y) => {
                return <option key={y}>{y}</option>;
              })}
            </select>
            <select className="mx-[4%]" name="month" id="">
              {MONTH.map((m) => {
                return <option key={m}>{m}</option>;
              })}
            </select>
            <select name="day" id="">
              {DAY.map((d) => {
                return <option key={d}>{d}</option>;
              })}
            </select>
          </div>
          {/* 로그인 버튼 */}
          <button className={ButtonStyle}>완료하기</button>
        </div>
      </div>
    </>
  );
};

export default SignUpBox;
