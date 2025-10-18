const BASE_URL = "http://localhost:3002/users";

const fakeFetch = (delay = 500) =>
  new Promise((resolve) => setTimeout(resolve, delay));

export const login = async (user) => {
  await fakeFetch();

  const res = await fetch(BASE_URL);
  const users = await res.json();

  const foundUser = users.find(
    (u) => u.email === user.email && u.password === user.password
  );

  if (!foundUser) {
    return { message: "Invalid email or password", user: null };
  }

  localStorage.setItem("userId", foundUser.id);

  return { user: foundUser };
};

export const register = async (user) => {
  await fakeFetch();

  const res = await fetch(BASE_URL);
  const users = await res.json();

  const existingUser = users.find((u) => u.email === user.email);
  if (existingUser) {
    return { message: "User already exists", user: null };
  }

  const newUser = { ...user, id: Date.now().toString() };

  await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });

  localStorage.setItem("userId", newUser.id);

  return { user: newUser };
};

export const logout = () => {
  localStorage.removeItem("userId");
};

export const getCurrentUserId = () => {
  return localStorage.getItem("userId");
};
