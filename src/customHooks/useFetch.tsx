import {
    useState,
  } from "react";
import axios from "axios";


const useFetch = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState<string | null>(null);
  
    const callApi = async (url: string) => {
      try {
        const response = await axios.get(url, {});
        const data = await response.data;
        setData(data);
        setError(null);
        return data;
      } catch (error: any) {
        setError(error);
        setData(null);
        return {};
      }
    };
  
    return [data, error, callApi];
  };

  export default useFetch;
