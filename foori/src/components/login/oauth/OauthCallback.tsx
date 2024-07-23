import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../../../util/api";

const OauthCallback = () => {
    const [code, setCode] = useState<string>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URL(window.location.href);
        const codeParam = params.searchParams.get("code");
        if (codeParam) {
            setCode(codeParam);
        } else {
            console.error("No code parameter found in URL");
        }
    }, []);

    const fetchLogin = useCallback(
        async (code: string) => {
            try {
                const param = { code };
                const response = await fetch(process.env.REACT_APP_API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(param),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data); // { nickname: '#######' }

                // Handle the response as needed, e.g., store user info
                navigate("/"); // Navigate to the main page
            } catch (error) {
                alert("Function fetchLogin error!");
                console.error("Error fetching login:", error);
            }
        },
        [navigate]
    );

    useEffect(() => {
        if (code) {
            fetchLogin(code);
        }
    }, [code, fetchLogin]);

    return <div>OauthCallback</div>;
};

export default OauthCallback;
