
import { redirect } from "react-router";

export async function loginUser(formData) {
  const response = await fetch(
    "https://dummyjson.com/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}

export async function userLoggedIn() {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw redirect("/login");
  }

  try {
    const response = await fetch(
      "https://dummyjson.com/auth/me",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);

    if (!response.ok) {
      throw new Error("Invalid or expired token");
    }

    return response.json();
  } catch (error) {
    throw redirect("/login");
  }
}

