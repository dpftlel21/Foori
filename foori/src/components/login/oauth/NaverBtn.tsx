import { getData} from "../../../util/api";

const NaverBtn = () => {
    const NaverBtnStyle = "w-[45%] h-[7%] my-[1%] bg-[#09ff00e4] text-white rounded-md hover:bg-[#e1af39] transition duration-500 ease-in-out text-[#232222c9]";

    const handleClick = async () => {
        try {
            const result = await getData(process.env.REACT_APP_REDIRECT_URL + '/naver');
            console.log("result", result);
            // Redirect to Kakao login page
            window.location.href = result.url;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <button className={NaverBtnStyle} onClick={handleClick}>Login with Naver</button>
    );
};

export default NaverBtn;
