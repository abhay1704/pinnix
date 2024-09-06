export const fetchUser = () => {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData) : null;
};

export const FALLBACK_BANNER =
  "https://images.unsplash.com/photo-1568453667945-234d7e521112?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2NTA0ODF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjU2Mjc5MTd8&ixlib=rb-4.0.3&q=85";
