import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OauthCallback = () => {
    const [code, setCode] = useState<string>(null);
    const [kind, setKind] = useState<string>(null); // kind를 상태로 추가
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URL(window.location.href);
        console.log("params", params);
        const codeParam = params.searchParams.get("code");
        const kindParam = params.pathname.split("/")[2]; // kind 값을 추출
        if (codeParam) {
            setCode(codeParam);
        } else {
            console.error("No code parameter found in URL");
        }
        if (kindParam) {
            setKind(kindParam); // kind 값을 상태로 설정
        } else {
            console.error("No kind parameter found in URL");
        }
    }, []);

    const fetchLogin = useCallback(
        async (code: string, kind: string) => { // kind를 매개변수로 추가
            try {
                const param = { code };
                const response = await fetch(`${process.env.REACT_APP_API_URL}/${kind}`, {
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
                console.log(data); 

                navigate("/"); 
            } catch (error) {
                alert("Function fetchLogin error!");
                console.error("Error fetching login:", error);
            }
        },
        [navigate]
    );

    useEffect(() => {
        if (code && kind) { // code와 kind 모두 존재할 때만 호출
            fetchLogin(code, kind);
        }
    }, [code, kind, fetchLogin]); // kind를 의존성 배열에 추가

    return <div>OauthCallback</div>;
};

export default OauthCallback;
