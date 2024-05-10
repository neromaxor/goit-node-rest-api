import ContactModel from "../contactModel/contactModel.js"; // Додайте імпорт моделі

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await ContactModel.find(); // Використовуйте модель для отримання контактів
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error getting all contacts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getOneContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await ContactModel.findById(id); // Використовуйте модель для отримання контакту за id
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error("Error fetching contact by id:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await ContactModel.findByIdAndRemove(id); // Використовуйте модель для видалення контакту за id
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await ContactModel.create({ name, email, phone }); // Використовуйте модель для створення нового контакту
    res.status(201).json(newContact);
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const updatedContact = await ContactModel.findByIdAndUpdate(id, newData, {
      new: true,
    }); // Використовуйте модель для оновлення контакту за id
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
