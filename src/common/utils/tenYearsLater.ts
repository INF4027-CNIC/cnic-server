export function tenYearsLater(date: Date) {
  const result = new Date(date);
  result.setFullYear(date.getFullYear() + 10);
  return result;
}
