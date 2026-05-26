import { API_URL } from "../config/api";

export type SessionUser = {
  id: number;
  username: string;
  email: string;
};

export type SessionResponse = {
  loggedIn: boolean;
  user: SessionUser | null;
};

export const getCurrentSession = async (): Promise<SessionResponse> => {
  const response = await fetch(`${API_URL}/users/me`, {
    credentials: "include",
  });

  return response.json();
};

export const logoutUser = async (): Promise<void> => {
  await fetch(`${API_URL}/users/logout`, {
    method: "POST",
    credentials: "include",
  });
};