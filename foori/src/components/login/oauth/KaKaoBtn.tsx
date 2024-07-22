import { getData } from "../../../util/api";

const KaKaoButton = () => {
    const KakaoButtonStyle = "w-[45%] h-[7%] my-[1%] bg-[#ffea00e4] text-white rounded-md hover:bg-[#e1af39] transition duration-500 ease-in-out text-[#232222c9]";

    const handleClick = async () => {
        try {
            const result = await getData(process.env.REACT_APP_REDIRECT_URL);
            console.log("result", result);

            // 로그인 성공시
            document.location.href = result.url;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    



    return (
        <button className={KakaoButtonStyle} onClick={handleClick}>Login with Kakao</button>
    );
};

export default KaKaoButton;
