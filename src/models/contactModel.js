const { object, string } = require("zod");

class Contact {
  constructor(data) {
    this.name = data.name;
    this.email = data.email;
    this.subject = data.subject;
    this.message = data.message;
  }

  validate() {
    const schema = object({
      name: string()
        .min(3, { message: "Name must be at least 3 characters long" })
        .max(50, { message: "Name must be at most 50 characters long" }),
      email: string().email({ message: "Invalid email address" }),
      subject: string()
        .min(3, { message: "Subject name must be at least 3 characters long" })
        .max(50, {
          message: "Subject name must be at most 50 characters long",
        }),
      message: string()
        .min(10, { message: "Message must be at least 10 characters long" })
        .max(500, { message: "Message must be at most 500 characters long" }),
    });

    const validation = schema.safeParse(this);
    if (!validation.success) {
      return validation.error.issues.map((issue) => issue.message);
    }
    return [];
  }
}

module.exports = Contact;
