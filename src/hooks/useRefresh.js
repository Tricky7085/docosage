import axios from "@/pages/api/axios";
import useAuth from "./useAuth";

const useRefresh = () => {
  const { userAuth, setUserAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.post("refresh/", { "refresh": userAuth?.refresh }, {
        withCredentials: true, headers: { "Content-Type": "application/json" }
      });

      if (response.status === 200) {
        const newAccessToken = response.data?.access;
        setUserAuth(prev => ({ ...prev, ["access"]: newAccessToken }));
        return newAccessToken; 
      }
    } catch (error) {
      console.error(error);
    }
  };

  return refresh;
};

export default useRefresh;
