function createUser(
  name: string,
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
    name,
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

const generateUsers = () => {
  const users = [];
  for (let i = 1; i <= 50; i++) {
    const user = createUser(
      `User ${i}`,
      `user${i}@example.com`,
      1234567890 + i,
      i % 2 === 0 ? "Admin" : "User",
      i % 2 === 0 ? "Active" : "Inactive",
      `${i}`,
      `Street ${i}`,
      `Neighborhood ${i}`,
      `City ${i}`,
      `PostalCode ${10000 + i}`,
      `https://randomuser.me/api/portraits/men/${i}.jpg`,
      i % 2 === 0
    );
    users.push(user);
  }
  return users;
};

export const users = generateUsers();
