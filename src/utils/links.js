export const getExternalUrl = (value) => {
  if (typeof value !== "string" || !value.trim() || value.trim() === "null") {
    return null;
  }

  try {
    const url = new URL(value.trim());
    return ["http:", "https:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
};
