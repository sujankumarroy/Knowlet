function getId(name: string): string {
  const firstName: string = name.split(" ")[0] || "";
  if (!firstName) return "";
  const specialChar: string = "@";
  const randomNumber: number = Math.floor(Math.random() * 9000 + 1000);
  const id: string = firstName + specialChar + randomNumber;
  return id;
}

export default getId;
