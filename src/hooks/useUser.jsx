import { Client, Databases } from "appwrite";

const useUser = () => {
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

  const getUerDetail = async (userId) => {
    try {
      return await databases.getDocument(databaseId, userCollection, userId);
    } catch (error) {
      console.error(error);
      throw new Error("Couldn't get user details from database.");
    }
  };
  return { addUser, getUerDetail };
};

export default useUser;
