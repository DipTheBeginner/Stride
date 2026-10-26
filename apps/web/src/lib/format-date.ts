export default function formatInvitationDate(createdAt: string): string {
  const date = new Date(createdAt);
  const diff = Date.now() - date.getTime();

  if (Number.isNaN(diff)) return "Unknown date";

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (diff < 0) return date.toLocaleDateString("en-US");

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  
  if (days < 7) {
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }
  
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}