import { Client, Databases } from "appwrite";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
const useUser = () => {
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData(["userData"]);
  const user = localStorage.getItem("user");
  const databaseId = import.meta.env.VITE_DATABASE_ID;
  const userCollection = import.meta.env.VITE_USER_ID;

  const client = new Client();
  const databases = new Databases(client);
  client
    .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
    .setProject(import.meta.env.VITE_PROJECT_KEY);

  const addUser = async (userId, userData) => {
    try {
      await databases.createDocument(
        databaseId,
        userCollection,
        userId,
        userData
      );
      return true;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getUerDetail = async () => {
    try {
      return await databases.getDocument(databaseId, userCollection, user);
    } catch (error) {
      console.error(error);
      throw new Error("Couldn't get user details from database.");
    }
  };

  const markDelete = async (data) => {
    try {
      if (!user) {
        toast.error("please login first");
        return false;
      }
      toast.success("Deleteing the post");
      await databases.updateDocument(databaseId, userCollection, user, {
        deletedPost: [...userData.deletedPost, data],
      });
      await queryClient.invalidateQueries({
        queryKey: ["userData"],
        exact: true,
      });
      await queryClient.invalidateQueries({
        queryKey: ["scrapData"],
        exact: true,
      });
      toast.success("post has been deleted successfully");
      return true;
    } catch (error) {
      console.error(error);
      toast.error(
        "you might not be logged in, or please refresh the page once."
      );
      throw new Error("Couldn't mark delete something went wrong.");
    }
  };
  return { addUser, getUerDetail, markDelete };
};

export default useUser;
