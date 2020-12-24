module.exports = {
  reactStrictMode: true,
  env: {
    useMock: ["1", "true", "yes"].includes((process.env.USE_MOCK || "0").toLowerCase()),
  },
};
