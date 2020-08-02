module.exports = {
  mapErrors(joiDetails) {
    if (!joiDetails) return [];

    return joiDetails.map((detail) => ({
      key: detail.context.key,
      message: detail.message,
      type: detail.type,
    }));
  },
};
