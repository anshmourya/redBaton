import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
const useScrap = () => {
  const queryClient = useQueryClient();
  const scrapData = async () => {
    try {
      const deletePost = queryClient.getQueryData(["userData"])?.deletedPost;

      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/scrap`
      );
      const filteredData = deletePost
        ? data.filter((item) => !deletePost.includes(Number(item.id)))
        : data;
      return filteredData;
    } catch (error) {
      console.error(error);
      throw new Error("can't scrap the data something went wrong");
    }
  };

  return { scrapData };
};

export default useScrap;
