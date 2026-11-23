export default function formatRelativeTime(createdAt: string | Date): string {
  const date = new Date(createdAt);
  const diff = Date.now() - date.getTime();

  if (Number.isNaN(diff)) return "Unknown date";
  if (diff < 0) return date.toLocaleDateString("en-US");

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 5) return "Just now";
  if (seconds < 60) return `${seconds}s ago`;
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;

  return `${Math.floor(days / 365)}y ago`;
}