module.exports = {
  twitter: {
    type: "array",
    items: {
      properties: {
        username: { type: "string" },
        tweet: { type: "string" },
      },
      required: ["tweet"],
    },
    transform: (items) => {
      return { twitter: items.map((i) => i.tweet) };
    },
  },
  facebook: {
    type: "array",
    items: {
      properties: {
        name: { type: "string" },
        status: { type: "string" },
      },
      required: ["status"],
    },
    transform: (items) => {
      return { facebook: items.map((i) => i.status) };
    },
  },
  instagram: {
    type: "array",
    items: {
      properties: {
        username: { type: "string" },
        picture: { type: "string" },
      },
      required: ["picture"],
    },
    transform: (items) => {
      return { instagram: items.map((i) => i.picture) };
    },
  },
};
