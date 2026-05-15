function generateUsername(name: string): string {
  const firstName: string = name.split(" ")[0] || "";
  if (!firstName) return "";
  const specialChar: string = "@";
  const randomNumber: number = Math.floor(Math.random() * 9000 + 1000);
  const username: string = firstName + specialChar + randomNumber;
  return username;
}

export default generateUsername;
