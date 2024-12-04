import { getData} from "../../../util/api";


const GoogleBtn = () => {

const GoogleBtnStyle = "w-[45%] h-[7%] my-[1%] bg-[#e8ece8e4] text-white rounded-md hover:bg-[#e1af39] transition duration-500 ease-in-out text-[#232222c9]";

const handleClick = async () => {
    try {
        const result = await getData(import.meta.env.VITE_APP_REDIRECT_URL + '/google');
        console.log("result", result);
        // Redirect to Kakao login page
        window.location.href = result.url;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

return (
    <button className={GoogleBtnStyle} onClick={handleClick}>Login with Google</button>
);

}

export default GoogleBtn;