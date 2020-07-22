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
  return db("schemes");
}

function findById(id) {
  if (id) {
    return db("schemes")
      .where({ id })
      .first();
  } else {
    return null;
  }
}

function findSteps(scheme_id) {
  return db("steps as s")
    .join("schemes as sch", "sch.id", "s.scheme_id")
    .select("s.id", "sch.scheme_name", "s.step_number", "s.instructions")
    .where("s.scheme_id", scheme_id);
}

function add(scheme) {
  return db("schemes").insert(scheme);
}

function update(changes, id) {
  return db
    .first("schemes")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

async function remove(id) {
  try {
    const scheme = await findById(id);
    if (id) {
      db("schemes")
        .where("id", id)
        .del();
      return scheme;
    } else {
      return null;
    }
  } catch (err) {
    console.log("You are getting an error of:", err)
  }
}
