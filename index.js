const contacts = require("./contacts");
const { program } = require("commander");
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.getAll();
      console.log("allContacts :>> ", allContacts);
      break;

    case "get":
      const oneContact = await contacts.getContactById(id);
      console.log("🚀 ~ invokeAction ~ oneContact:", oneContact);
      break;

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      console.log("🚀 ~ invokeAction ~ newContact:", newContact);
      break;

    case "remove":
      const deleteContact = await contacts.deleteById(id);
      console.log("🚀 ~ invokeAction ~ deleteContact:", deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);

const a = 5;
const b = 8;
const result = a + b;

const arr = [1, 2, 3, 4];
const removed = arr.splice(1, 2);

arr;
removed;
