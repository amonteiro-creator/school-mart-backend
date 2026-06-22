const pingServer = async () => {
  try {
    return {
      rid: "s-ping-1",
      data: null,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  pingServer,
};
