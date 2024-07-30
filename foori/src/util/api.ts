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
export const postData = async (url: string, data: object) => {
   try {
    // console.log("url : ", url);
    // console.log("data : ", data);
       const response = await fetch(url, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(data)
       });
       
       const resData = await response.json();
       
       return resData;
   } catch (error) {
         console.log("postError :" , error);   
    }
}
