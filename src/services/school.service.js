const { School } = require("../models");
const { Op } = require("sequelize");

const createSchool = async (schoolData) => {
  const school = await School.create(schoolData);
  return { rid: "s-school-1", data: school };
};

const getSchools = async (body, query) => {
  const { page = 1, limit = 10 } = query;
  const { search, ...filters } = body;

  const offset = (page - 1) * limit;

  const where = {
    is_archive: false,
    ...filters,
  };

  if (search) {
    where.name = { [Op.iLike]: `%${search}%` };
  }

  const { count, rows } = await School.findAndCountAll({
    where,
    limit,
    offset,
    order: [["created_at", "DESC"]],
  });

  return {
    rid: "s-school-2",
    data: {
      count,
      rows,
      page: parseInt(page),
      limit: parseInt(limit),
    },
  };
};

const getSchoolById = async (school_id) => {
  const school = await School.findOne({
    where: { school_id, is_archive: false },
  });
  if (!school) throw new Error("e-school-1");
  return { rid: "s-school-3", data: school };
};

const updateSchool = async (school_id, updateData) => {
  const school = await School.findOne({
    where: { school_id, is_archive: false },
  });
  if (!school) throw new Error("e-school-1");

  await school.update(updateData);
  return { rid: "s-school-4", data: school };
};

const deleteSchool = async (school_id) => {
  const school = await School.findOne({
    where: { school_id, is_archive: false },
  });
  if (!school) throw new Error("e-school-1");

  await school.update({ is_archive: true });
  return {
    rid: "s-school-5",
    data: null,
  };
};

module.exports = {
  createSchool,
  getSchools,
  getSchoolById,
  updateSchool,
  deleteSchool,
};
