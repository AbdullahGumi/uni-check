export function pinValidator(pin: string) {
  if (!pin) return "Pin can't be empty.";
  if (pin.length !== 6) return "Pin must be of length 6";
  return "";
}
