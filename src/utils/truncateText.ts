export default function truncateText(str : string, len : 15) {
  if (str.length > len) {
    return str.slice(0, len) + "...";
  } else {
    return str;
  }
}
