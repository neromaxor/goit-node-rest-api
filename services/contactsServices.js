import ContactModel from "../contactModel/contactModel.js";

// Метод для отримання всіх контактів з бази даних
export async function listContacts() {
  try {
    const contacts = await ContactModel.find();
    return contacts;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
}

// Метод для отримання контакту за його id
export async function getContactById(contactId) {
  try {
    const contact = await ContactModel.findById(contactId);
    return contact;
  } catch (error) {
    console.error("Error fetching contact by id:", error);
    throw error;
  }
}

// Метод для видалення контакту за його id
export async function removeContact(contactId) {
  try {
    const removedContact = await ContactModel.findByIdAndRemove(contactId);
    return removedContact;
  } catch (error) {
    console.error("Error deleting contact:", error);
    throw error;
  }
}

// Метод для створення нового контакту
export async function addContact(name, email, phone) {
  try {
    const newContact = await ContactModel.create({ name, email, phone });
    return newContact;
  } catch (error) {
    console.error("Error adding contact:", error);
    throw error;
  }
}

// Метод для оновлення контакту за його id
export async function updateContact(id, newData) {
  try {
    const updatedContact = await ContactModel.findByIdAndUpdate(id, newData, {
      new: true,
    });
    return updatedContact;
  } catch (error) {
    console.error("Error updating contact:", error);
    throw error;
  }
}
