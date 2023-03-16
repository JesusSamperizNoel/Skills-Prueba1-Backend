import bcrypt from "bcrypt";
const saltRounds = 10;

const hash = (texto: String): string => {
  return bcrypt.hashSync(String(texto), saltRounds);
};

const compare = (texto: String, encrypted: string): boolean => {
  return bcrypt.compareSync(String(texto), encrypted);
};

export { hash, compare };