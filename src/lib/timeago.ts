export function timeAgo(dateIso: string): string {
  const now = Date.now();
  const d = new Date(dateIso).getTime();
  const diff = Math.max(0, now - d);

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;

  if (diff < hour) {
    const m = Math.round(diff / minute) || 1;
    return `${m} minute${m > 1 ? "s" : ""} ago`;
  }
  if (diff < day) {
    const h = Math.round(diff / hour);
    return `${h} hour${h > 1 ? "s" : ""} ago`;
  }
  if (diff < month) {
    const dnum = Math.round(diff / day);
    return `${dnum} day${dnum > 1 ? "s" : ""} ago`;
  }
  const mon = Math.round(diff / month);
  return `${mon} month${mon > 1 ? "s" : ""} ago`;
}
