export default function truncateText(str : string, len : number) {
  if (str.length > len) {
    return str.slice(0, len) + "...";
  } else {
    return str;
  }
}
