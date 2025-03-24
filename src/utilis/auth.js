export const isAuthenticated = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};

export const login = () => {
  localStorage.setItem("isAuthenticated", true);
  window.location.reload();
};

export const logout = () => {
  localStorage.removeItem("isAuthenticated", false);
  window.location.reload();
};
