"use client";
import { createContext, useContext, useEffect, useState } from "react";

const UserDataContext = createContext();

export function UserDataProvider({ children }) {
  const [user, setUser] = useState(null);
  const [likes, setLikes] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("uzum-user");
    if (!stored) {
      setLoading(false);
      return;
    }

    const parsedUser = JSON.parse(stored);
    setUser(parsedUser);

    const fetchUserData = async () => {
      try {
        const res = await fetch("http://localhost:3001/users");
        const users = await res.json();
        const found = users.find((u) => u.id === parsedUser.id);
        if (found) {
          setLikes(found.likes || []);
          setCart(found.cart || []);
        }
      } catch (err) {
        console.error("Error loading user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const refreshUserData = async () => {
    if (!user) return;
    const res = await fetch(`http://localhost:3001/users`);
    const users = await res.json();
    const current = users.find((u) => u.id === user.id);
    setLikes(current?.likes || []);
    setCart(current?.cart || []);
  };

  return (
    <UserDataContext.Provider
      value={{ user, setUser, likes, setLikes, cart, setCart, loading, refreshUserData }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export const useUserData = () => useContext(UserDataContext);
