const Local = require("../models/local");

async function checkUserCanDeleteLocal(req, res, next) {
  const localId = req.params.id;
  const userId = req.currentId;

  try {
    const local = await Local.findOne({
      where: { id: localId, userId: userId },
    });
    if (!local) {
      return res.status(404).json({
        error: `Local with id ${localId} not found for the current user`,
      });
    }

    next();
  } catch (error) {
    console.error("Error checking local ownership:", error);
    return res.status(500).json({ error: "Server had an internal error" });
  }
}

module.exports = checkUserCanDeleteLocal;
