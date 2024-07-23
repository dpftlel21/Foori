import { useEffect, useState } from 'react';
import { getData, postData } from "../../../util/api";

const KaKaoButton = () => {
    const KakaoButtonStyle = "w-[45%] h-[7%] my-[1%] bg-[#ffea00e4] text-white rounded-md hover:bg-[#e1af39] transition duration-500 ease-in-out text-[#232222c9]";

    const [code, setCode] = useState(null);

    const handleClick = async () => {
        try {
            const result = await getData(process.env.REACT_APP_REDIRECT_URL);
            // Redirect to Kakao login page
            window.location.href = result.url;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const params = new URL(window.location.href);
        const codeParam = params.searchParams.get("code");
        if (codeParam) {
            setCode(codeParam);
        }
    }, []);

    useEffect(() => {
        const fetchToken = async () => {
            if (code) {
                try {
                    const response = await postData(process.env.REACT_APP_API_URL, { code });
                    console.log('Token response:', response);
                    // Handle token response (e.g., store user info, redirect, etc.)
                } catch (error) {
                    console.error('Error fetching token:', error);
                }
            }
        };

        fetchToken();
    }, [code]);

    return (
        <button className={KakaoButtonStyle} onClick={handleClick}>Login with Kakao</button>
    );
};

export default KaKaoButton;
