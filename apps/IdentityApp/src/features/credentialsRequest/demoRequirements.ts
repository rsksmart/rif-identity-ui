// This file is the sample requirements for the different credential types

const requirements = {
  ID: ['fullName', 'phone', 'birthdate'],
  PASSPORT: ['fullName', 'idNumber', 'civilStatus'],
  AUTO: ['fullName', 'email'],
};

export default requirements;
