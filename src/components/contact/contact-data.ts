export const contactInfo = {
  email: "kevinchung523@outlook.com",
  location: "California, USA",
  timezone: "PST (UTC-8)",
  availability: "Open to opportunities",
  responseTime: "Usually within 24 hours",
};

export const socialLinks = [
  {
    name: "Email",
    handle: "kevinchung523@outlook.com",
    url: "mailto:kevinchung523@outlook.com",
    icon: "mail",
    color: "#EA4335",
  },
];

export const formFields = [
  {
    name: "name",
    label: "Your Name",
    type: "text",
    placeholder: "John Doe",
    required: true,
    validation: {
      minLength: 2,
      maxLength: 100,
      pattern: /^[a-zA-Z\s'-]+$/,
      message: "Please enter a valid name",
    },
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "john@example.com",
    required: true,
    validation: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address",
    },
  },
  {
    name: "subject",
    label: "Subject",
    type: "text",
    placeholder: "Project Inquiry",
    required: true,
    validation: {
      minLength: 5,
      maxLength: 200,
      message: "Subject must be between 5-200 characters",
    },
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "Tell me about your project...",
    required: true,
    validation: {
      minLength: 20,
      maxLength: 5000,
      message: "Message must be between 20-5000 characters",
    },
  },
];
