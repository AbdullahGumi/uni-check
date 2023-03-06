export function fieldValidator(name: string) {
  if (!name) return "This field can't be empty.";
  return "";
}
