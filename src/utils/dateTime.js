const currentDateAndTime = () => {
  const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  const date = new Date(now);

  const day = date.getDate();
  const monthShort = date.toLocaleString("en-IN", {
    month: "short",
    timeZone: "Asia/Kolkata",
  });
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${day} ${monthShort} ${year}, ${String(hours).padStart(
    2,
    "0"
  )}:${minutes} ${ampm}`;
};

const currentDate = () => {
  const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  const date = new Date(now);

  const day = date.getDate();
  const monthShort = date.toLocaleString("en-IN", {
    month: "short",
    timeZone: "Asia/Kolkata",
  });
  const year = date.getFullYear();

  return `${day} ${monthShort} ${year}`;
};

export { currentDateAndTime, currentDate };
