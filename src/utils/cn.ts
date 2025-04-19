import clsx, { ClassValue } from "clsx";

export default function cn(...classes: ClassValue[]) {
  return clsx(classes.filter(Boolean));
}
