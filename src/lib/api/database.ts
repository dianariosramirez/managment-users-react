function createUser(
  id: string,
  firstName: string,
  lastName: string,
  middleName: string,
  email: string,
  phoneNumber: number,
  role: string,
  status: string,
  number: string,
  street: string,
  neighborhood: string,
  city: string,
  postalCode: string,
  photo: string,
  actions: boolean
) {
  return {
    id,
    firstName,
    lastName,
    middleName,
    email,
    phoneNumber,
    role,
    status,
    number,
    street,
    neighborhood,
    city,
    postalCode,
    photo,
    actions,
  };
}

// Generate 50 random users
const generateUsers = () => {
  const users = [];
  for (let i = 1; i <= 50; i++) {
    const user = createUser(
      crypto.randomUUID(),
      `User ${i}`,
      `Lastname ${i}`,
      "",
      `user${i}@example.com`,
      123456789 + i,
      i % 2 === 0 ? "Admin" : "User",
      i % 2 === 0 ? "Active" : "Inactive",
      `${i}`,
      `Street ${i}`,
      `Neighborhood ${i}`,
      `City ${i}`,
      "1000" + i,
      `https://robohash.org/${i}`,
      i % 2 === 0
    );
    users.push(user);
  }
  return users;
};

export const users = generateUsers();
