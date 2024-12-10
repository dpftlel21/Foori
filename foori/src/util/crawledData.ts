import { useQuery } from "react-query";
import { getData } from "./api";

interface CrawledDataType {
    id: string;
    place_name: string;
    category: string;
    address: string;
    open_days: string;
    open_time: string;
    close_time: string;
    phone: string;
    x: string;
    y: string;
}

// 크롤링 데이터 전체 조회
export const useCrawledData = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['crawledData'],
        queryFn: () => getData('api/crawled-data'),
    });

    return { data, isLoading, error };
}


// 가게 상세 조회
export const useCrawledDataDetail = (id: string) => {
    const { data, isLoading, error } = useQuery({
      queryKey: ['crawledDataDetail', id],
      queryFn: () => getData(`api/place/${id}`),
    });

    return { data, isLoading, error };
}
