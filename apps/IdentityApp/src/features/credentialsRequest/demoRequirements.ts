// This file is the sample requirements for the different credential types

const requirements = {
  ID: ['fullName', 'phone', 'birthdate'],
  PASSPORT: ['fullName', 'idNumber', 'civilStatus'],
  AUTO: ['fullName', 'phone', 'birthdate', 'email', 'idNumber', 'civilStatus'],
};

export default requirements;
