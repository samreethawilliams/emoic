export function timestampToMillis(timestamp) {
  const [hours, minutes, seconds] = timestamp.split(":");
  const [secs, millis] = seconds.split(".").map(Number);
  return (
    Number(hours) * 3600000 + Number(minutes) * 60000 + secs * 1000 + millis
  );
}
