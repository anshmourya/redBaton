"use client";
import { Client, Account, ID } from "appwrite";
import useUser from "./useUser";
import { toast } from "sonner";

export const useAccount = () => {
  const { addUser } = useUser();
  const client = new Client();
  const account = new Account(client);

  client
    .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
    .setProject(import.meta.env.VITE_PROJECT_KEY);

  const createSession = async (email, password) => {
    try {
      const newLogin = await account.createEmailSession(email, password);

      localStorage.setItem("user", newLogin.userId);
      return true;
    } catch (error) {
      console.error(error);
      if (error.code === 401) {
        toast.error(
          "Invalid credentials. Please check the username and password."
        );
      } else if (error.code === 429) {
        toast.error(
          "Too Many Requests has been received, please try again later."
        );
      } else if (error.code === 500) {
        toast.error("server issue, refresh the page and try again.");
      }
      return false;
    }
  };

  const createAccount = async (userData) => {
    try {
      const accountCreation = await account.create(
        ID.unique(),
        userData.email,
        userData.password
      );
      // add user to database after creating the account
      // TODO: even though the data is stored in the database it still returns the error. fix this.
      await addUser(accountCreation.$id, { email: userData.email });
      return true;
    } catch (error) {
      if (error.code === 401) {
        toast.error(
          "Invalid credentials. Please check the username and password."
        );
      } else if (error.code === 429) {
        toast.error(
          "Too Many Requests has been received, please try again later."
        );
      } else if (error.code === 500) {
        toast.error("server issue, refresh the page and try again.");
      } else if (error.code === 409) {
        toast.error(
          " A user with the same id, username, already exists in this project."
        );
      }
      return false;
    }
  };
  const getCurrentUser = async () => {
    try {
      const user = await account.get();
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const isLogged = async () => {
    try {
      const data = await getCurrentUser();
      return Boolean(data);
    } catch (error) {
      return false;
    }
  };
  const logout = async () => {
    try {
      await account.deleteSession("current");
      toast.success("you have been logged out.");
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return { createAccount, createSession, isLogged, getCurrentUser, logout };
};
