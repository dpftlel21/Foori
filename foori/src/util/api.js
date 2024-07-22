

export const getData = async (url) => {
    try {
        const response = await fetch(url);
        console.log("url", url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("getError :" , error);
    }
}
