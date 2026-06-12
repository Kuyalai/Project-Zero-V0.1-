export function formatThaiDate(value: string) {
  return new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export function formatThaiDateTime(value: string) {
  return new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function daysUntil(value: string) {
  const today = new Date();
  const target = new Date(`${value}T00:00:00`);
  const diff = target.getTime() - new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  return Math.round(diff / 86400000);
}

export function relativeDeadlineLabel(value: string) {
  const days = daysUntil(value);
  if (days < 0) {
    return `เลยกำหนด ${Math.abs(days)} วัน`;
  }
  if (days === 0) {
    return "ครบกำหนดวันนี้";
  }
  if (days === 1) {
    return "ครบกำหนดพรุ่งนี้";
  }
  return `เหลืออีก ${days} วัน`;
}
