const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");
// console.log("🚀 ~ contactsPath:", contactsPath);

const getAll = async () => {
  const data = await fs.readFile(contactsPath);
  // console.log("🚀 ~ getAll ~ data:", data);
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const contactId = String(id);
  const contacts = await getAll();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
};

const addContact = async (data) => {
  const contacts = await getAll();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const deleteById = async (id) => {
  const contactId = String(id);
  const contacts = await getAll();

  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  // console.log("🚀 ~ deleteById ~ contacts:", contacts);

  return result;
};

module.exports = { getAll, getContactById, addContact, deleteById };

const arr = [1, 2, 3, 4];
const removed = arr.splice(1, 2);
