import axios from "axios";
const useScrap = () => {
  const scrapData = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/scrap`
      );
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("can't scrap the data something went wrong");
    }
  };

  return { scrapData };
};

export default useScrap;
