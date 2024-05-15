import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import Contact from "../models/contact.js";
import { Types } from "mongoose";

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error getting all contacts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid _id" });
  }

  try {
    const contact = await Contact.findById(id);

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
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);

    if (contact) {
      res.status(200).json({ contact });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.log(("Error delete contact by id:", error));
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createContact = async (req, res) => {
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  };

  try {
    const { error } = createContactSchema.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.message });
    }
    const result = await Contact.create(contact);

    if (result) {
      res.status(201).json(result);
    } else {
      res.status(500).json("Failed to add contact");
    }
  } catch (error) {
    console.error("Error creating contact:", error);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

export const updateContact = async (req, res) => {
  const { id } = req.params;

  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  };

  try {
    const { name, email, phone, favorite } = req.body;

    if (!name & !email & !phone & !favorite) {
      res.status(400).json("Body must have at least one field");
    }

    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      res.status(400, error.message);
    }

    const updatedContact = await Contact.findByIdAndUpdate(id, contact, {
      new: true,
    });

    if (!updatedContact) {
      res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    console.error("Error updating contact:", error);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

export const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  try {
    if (!favorite) {
      return res.status(400).json({ message: "Field favorite is required" });
    }
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite: favorite },
      { new: true }
    );

    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error("Error updating contact status:", error);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};
