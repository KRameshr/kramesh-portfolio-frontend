const FALLBACK_CONTACT_EMAIL = "krameshr348@gmail.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const getContactEmail = (value) => {
  const email = typeof value === "string" ? value.trim() : "";
  return EMAIL_PATTERN.test(email) ? email : FALLBACK_CONTACT_EMAIL;
};
