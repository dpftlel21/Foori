// GET 요청 함수
export const getData = async (url: string) => {
    
    try {
        const response = await fetch(url);
        console.log("url : ", url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("에러 발생 :" , error);
    }
}

// POST 요청 함수
export const postData = async (url: string, data: Record<string, unknown>): Promise<any> => {
   console.log('url', url);
   console.log('data', data);
   try {
       const response = await fetch(url, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(data)
       });
       
       if (!response.ok) {
           throw new Error(`HTTP error! status: ${response.status}`);
       }
       
       const resData = await response.json();
       console.log('resData', resData);
       return resData;
       
   } catch (error) {
       console.error("postError:", error);
       throw new Error(error instanceof Error ? error.message : 'An unknown error occurred during the POST request.');
   }
}