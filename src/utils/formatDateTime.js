const formatLoginTime = (dateStr) => {
  const now = new Date();
  const date = new Date(
    new Date(dateStr).toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  const isToday = now.toDateString() === date.toDateString();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = yesterday.toDateString() === date.toDateString();

  const hours = date.getHours() % 12 || 12;
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "PM" : "AM";
  const timePart = `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;

  if (isToday) return `Today at ${timePart}`;
  if (isYesterday) return `Yesterday at ${timePart}`;

  const day = date.getDate();
  const month = date.toLocaleString("en-IN", { month: "short" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}, ${timePart}`;
};

const formatJoinedDate = (dateStr) => {
  const now = new Date();
  const joinedDate = new Date(
    new Date(dateStr).toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  // Remove time part for comparison
  const startOfNow = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfJoined = new Date(
    joinedDate.getFullYear(),
    joinedDate.getMonth(),
    joinedDate.getDate()
  );

  const msInDay = 1000 * 60 * 60 * 24;
  const diffDays = Math.floor((startOfNow - startOfJoined) / msInDay);

  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays <= 7) return `${diffDays} days ago`;

  const day = joinedDate.getDate();
  const month = joinedDate.toLocaleString("en-IN", { month: "short" });
  const year = joinedDate.getFullYear();

  return `${day} ${month} ${year}`;
};

export { formatLoginTime, formatJoinedDate };
