

export const getData = async (url) => {
    
    try {
        const response = await fetch(url);
        console.log("url : ", url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("에러 발생 :" , error);
    }
}


export const postData = async (url, data) => {
   try {
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
