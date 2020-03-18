const db = require("../data/db-config.js");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};

function find() {
  return db("scheme");
}

function findById(id) {
  if (id) {
    return db("scheme")
      .where({ id })
      .first();
  } else {
    return null;
  }
}

function findSteps(scheme_id) {
  return db("steps as s")
    .join("scheme as sch", "sch.id", "s.scheme_id")
    .select("s.id", "sch.scheme_name", "s.step_number", "s.instructions")
    .where("s.scheme_id", scheme_id);
}

function add(scheme) {
  return db("scheme").insert(scheme);
}

function update(changes, id) {
  return db
    .first("scheme")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function remove(id) {
  return db("scheme")
    .where("id", id)
    .del();
}
