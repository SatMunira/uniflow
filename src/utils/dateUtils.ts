/**
 * Calculate the time remaining from now until a target date
 * @param targetDate - The deadline date
 * @returns Formatted string like "3 days left", "5 hours left", "Overdue by 2 days"
 */
export function getTimeRemaining(targetDate: Date | string): string {
  const now = new Date();
  const target = typeof targetDate === "string" ? new Date(targetDate) : targetDate;

  const diffInMs = target.getTime() - now.getTime();
  const diffInSeconds = Math.floor(Math.abs(diffInMs) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);

  const isOverdue = diffInMs < 0;
  const prefix = isOverdue ? "Overdue by " : "";
  const suffix = isOverdue ? "" : " left";

  // Choose appropriate time unit
  if (diffInMonths > 0) {
    return `${prefix}${diffInMonths} ${diffInMonths === 1 ? "month" : "months"}${suffix}`;
  } else if (diffInWeeks > 0) {
    return `${prefix}${diffInWeeks} ${diffInWeeks === 1 ? "week" : "weeks"}${suffix}`;
  } else if (diffInDays > 0) {
    return `${prefix}${diffInDays} ${diffInDays === 1 ? "day" : "days"}${suffix}`;
  } else if (diffInHours > 0) {
    return `${prefix}${diffInHours} ${diffInHours === 1 ? "hour" : "hours"}${suffix}`;
  } else if (diffInMinutes > 0) {
    return `${prefix}${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"}${suffix}`;
  } else {
    return isOverdue ? "Overdue" : "Less than a minute left";
  }
}

/**
 * Format a date as relative time (e.g., "2 days ago", "in 5 hours")
 * @param date - The date to format
 * @returns Formatted relative time string
 */
export function getRelativeTime(date: Date | string): string {
  const now = new Date();
  const target = typeof date === "string" ? new Date(date) : date;

  const diffInMs = target.getTime() - now.getTime();
  const diffInSeconds = Math.floor(Math.abs(diffInMs) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  const isPast = diffInMs < 0;

  if (diffInDays > 0) {
    return isPast
      ? `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`
      : `in ${diffInDays} ${diffInDays === 1 ? "day" : "days"}`;
  } else if (diffInHours > 0) {
    return isPast
      ? `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`
      : `in ${diffInHours} ${diffInHours === 1 ? "hour" : "hours"}`;
  } else if (diffInMinutes > 0) {
    return isPast
      ? `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`
      : `in ${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"}`;
  } else {
    return "just now";
  }
}
