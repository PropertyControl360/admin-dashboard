import axios, { endpoints } from "src/utils/axios";


export const toggleUserActiveStatus = async (userId: string) => {
    try {
      const response = await axios.patch(`${endpoints.users}/${userId}/toggle-active`);
      return response.data;
    } catch (error) {
      console.error('Error toggling user active status', error);
      throw error;
    }
  };
export const deleteUser = async (userId: string) => {
  try {
    const response = await axios.patch(`${endpoints.users}/${userId}/delete`);
    return response.data;
  } catch (error) {
    console.error('Error toggling user active status', error);
    throw error;
  }
};