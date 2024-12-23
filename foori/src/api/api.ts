// GET 요청 함수
export const getData = async (url: string) => {
    console.log('url : ', url);
    
    try {
        const response = await fetch(url,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });
        const data = await response.json();
        //console.log("data : ", data);
        return data;
    } catch (error) {
        console.log("에러 발생 :" , error);
    }
}

// POST 요청 함수
export const postData = async (url: string, data: Record<string, unknown>): Promise<any> => {
   //console.log('url', url);
   //console.log('data', data);
   try {
       const response = await fetch(url, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           credentials: 'include',
           body: JSON.stringify(data)
       });
       
       console.log("response", response);


       // 201 상태일 때 응답 본문이 있으면 그것을 반환하고, 없으면 빈 객체 반환
       if (response.status === 201) {
           const text = await response.text();
           return text ? JSON.parse(text) : {};
       }

        return response.json();
       
   } catch (error) {
       console.error("postError:", error);
       throw new Error(error instanceof Error ? error.message : 'An unknown error occurred during the POST request.');
   }
}