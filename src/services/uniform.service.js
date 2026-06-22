const { Uniform } = require("../models");
const { Op } = require("sequelize");

const createUniform = async (uniformData) => {
  const uniform = await Uniform.create(uniformData);
  return { rid: "s-uniform-1", data: uniform };
};

const getUniforms = async (body, query) => {
  const { page = 1, limit = 10 } = query;
  const { search, school_id, category, ...filters } = body;

  const offset = (page - 1) * limit;

  const where = {
    is_archive: false,
    ...filters,
  };

  if (school_id) where.school_id = school_id;
  if (category) where.category = category;

  if (search) {
    where.name = { [Op.iLike]: `%${search}%` };
  }

  const { count, rows } = await Uniform.findAndCountAll({
    where,
    limit,
    offset,
    order: [["created_at", "DESC"]],
  });

  return {
    rid: "s-uniform-2",
    data: {
      count,
      rows,
      page: parseInt(page),
      limit: parseInt(limit),
    },
  };
};

const getUniformById = async (uniform_id) => {
  const uniform = await Uniform.findOne({
    where: { uniform_id, is_archive: false },
  });
  if (!uniform) throw new Error("e-uniform-1");
  return { rid: "s-uniform-3", data: uniform };
};

const updateUniform = async (uniform_id, updateData) => {
  const uniform = await Uniform.findOne({
    where: { uniform_id, is_archive: false },
  });
  if (!uniform) throw new Error("e-uniform-1");

  await uniform.update(updateData);
  return { rid: "s-uniform-4", data: uniform };
};

const deleteUniform = async (uniform_id) => {
  const uniform = await Uniform.findOne({
    where: { uniform_id, is_archive: false },
  });
  if (!uniform) throw new Error("e-uniform-1");

  await uniform.update({ is_archive: true });
  return {
    rid: "s-uniform-5",
    data: null,
  };
};

module.exports = {
  createUniform,
  getUniforms,
  getUniformById,
  updateUniform,
  deleteUniform,
};
