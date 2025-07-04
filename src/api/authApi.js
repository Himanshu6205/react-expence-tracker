// ✅ /src/api/authApi.js

const AUTH_URL = "https://identitytoolkit.googleapis.com/v1";
const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

export const signUpUser = async (email, password) => {
  const res = await fetch(`${AUTH_URL}/accounts:signUp?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
  });

  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data;
};

export const loginUser = async (email, password) => {
  const res = await fetch(`${AUTH_URL}/accounts:signInWithPassword?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
  });

  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data;
};

export const updateUserProfile = async (idToken, displayName, photoUrl) => {
  const res = await fetch(`${AUTH_URL}/accounts:update?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idToken,
      displayName,
      photoUrl,
    }),
  });

  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data;
};
