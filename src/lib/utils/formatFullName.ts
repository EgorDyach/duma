export function formatFullName(
  lastName: string,
  firstName: string,
  middleName: string
): string {
  const formattedLastName = lastName
    .toLowerCase()
    .split("-")
    .map((part) => (part.charAt(0).toUpperCase() || "") + part.slice(1))
    .join("-");

  const firstInitial = firstName
    ? (firstName.charAt(0) || "").toUpperCase()
    : "";
  const middleInitial = middleName
    ? (middleName.charAt(0) || "").toUpperCase()
    : "";

  return `${formattedLastName} ${firstInitial ? firstInitial + "." : ""} ${middleInitial ? middleInitial + "." : ""}`;
}
