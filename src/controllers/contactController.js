const Contact = require("../models/contactModel");
const { sendContactEmail } = require("../utils/emailSender");

exports.submitContactForm = async (req, res) => {
  try {
    const contactData = new Contact(req.body);
    const validationErrors = contactData.validate();
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }
    await sendContactEmail(contactData);
    res.status(200).json({ message: "Contact Form Submitted Successfully" });
  } catch (error) {
    console.error("Erorr submitting contact form : ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
