

// import jsonServer from "json-server";
// import fs from "fs";

// const server = jsonServer.create();
// const router = jsonServer.router("mock-db.json");
// const middlewares = jsonServer.defaults();

// server.use(middlewares);
// server.use(jsonServer.bodyParser);

// // load custom rewrites
// const routes = JSON.parse(fs.readFileSync("routes.json"));
// server.use(jsonServer.rewriter(routes));


// // LOGIN -------------------------------------------------
// server.post("/interngo/login", (req, res) => {
//   const { email, password } = req.body;

//   const users = router.db.get("users").value();
//   const user = users.find(
//     (u) => u.email === email && u.password === password
//   );

//   if (!user) {
//     return res.status(401).json({ error: "Invalid email or password" });
//   }

//   return res.json({
//     uid: user.uid,
//     email: user.email,
//     role: user.role,
//     token: user.token,
//     profilePicture: user.profilePicture || ""
//   });
// });


// // GET PROFILE -------------------------------------------
// server.get("/interngo/profile/:role/:userId", (req, res) => {
//   const { role, userId } = req.params;
//   const profiles = router.db.get("profiles").value();

//   const found = profiles.find(
//     (p) => p.role === role && p.userId === userId
//   );

//   if (!found) {
//     return res.status(404).json({ error: "Profile not found" });
//   }

//   res.json(found);
// });


// // UPDATE PROFILE ----------------------------------------
// server.put("/interngo/profile/:role/:userId", (req, res) => {
//   const { role, userId } = req.params;
//   const profiles = router.db.get("profiles").value();

//   const existing = profiles.find(
//     (p) => p.role === role && p.userId === userId
//   );

//   if (!existing) {
//     return res.status(404).json({ error: "Profile not found" });
//   }

//   router.db.get("profiles")
//     .find({ id: existing.id })
//     .assign(req.body)
//     .write();

//   res.json({ success: true });
// });


// // CREATE PROFILE ----------------------------------------
// server.post("/interngo/profile", (req, res) => {
//   const newProfile = { ...req.body, id: Date.now() };

//   router.db.get("profiles").push(newProfile).write();

//   res.json({ success: true });
// });


// // GET PROFESSIONAL --------------------------------------
// server.get("/interngo/professional/:userId", (req, res) => {
//   const { userId } = req.params;

//   const list = router.db.get("professionalInfo").value();

//   const found = list.find((p) => p.userId === userId);

//   if (!found) {
//     return res.status(404).json({ error: "Not found" });
//   }

//   res.json(found);
// });


// // UPDATE PROFESSIONAL -----------------------------------
// server.put("/interngo/professional/:userId", (req, res) => {
//   const { userId } = req.params;

//   const list = router.db.get("professionalInfo").value();
//   const existing = list.find((p) => p.userId === userId);

//   if (!existing) {
//     return res.status(404).json({ error: "Not found" });
//   }

//   router.db.get("professionalInfo")
//     .find({ id: existing.id })
//     .assign(req.body)
//     .write();

//   res.json({ success: true });
// });


// // CREATE PROFESSIONAL -----------------------------------
// server.post("/interngo/professional", (req, res) => {
//   const newRec = { ...req.body, id: Date.now() };

//   router.db.get("professionalInfo").push(newRec).write();

//   res.json({ success: true });
// });


// server.use(router);

// server.listen(8080, () => {
//   console.log("🚀 Mock Backend running: http://localhost:8080");
// });






// server.js
import jsonServer from "json-server";
import fs from "fs";

const server = jsonServer.create();
const router = jsonServer.router("mock-db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// load custom rewrites
const routes = JSON.parse(fs.readFileSync("routes.json"));
server.use(jsonServer.rewriter(routes));

// small helper
const getDailyUpdates = () =>
  router.db.get("dailyUpdates").value() || [];

// LOGIN -------------------------------------------------
server.post("/interngo/login", (req, res) => {
  const { email, password } = req.body;

  const users = router.db.get("users").value();
  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  return res.json({
    uid: user.uid,
    email: user.email,
    role: user.role,
    token: user.token,
    profilePicture: user.profilePicture || ""
  });
});


// GET PROFILE -------------------------------------------
server.get("/interngo/profile/:role/:userId", (req, res) => {
  const { role, userId } = req.params;
  const profiles = router.db.get("profiles").value();

  const found = profiles.find(
    (p) => p.role === role && p.userId === userId
  );

  if (!found) {
    return res.status(404).json({ error: "Profile not found" });
  }

  res.json(found);
});


// UPDATE PROFILE ----------------------------------------
server.put("/interngo/profile/:role/:userId", (req, res) => {
  const { role, userId } = req.params;
  const profiles = router.db.get("profiles").value();

  const existing = profiles.find(
    (p) => p.role === role && p.userId === userId
  );

  if (!existing) {
    return res.status(404).json({ error: "Profile not found" });
  }

  router.db.get("profiles")
    .find({ id: existing.id })
    .assign(req.body)
    .write();

  res.json({ success: true });
});


// CREATE PROFILE ----------------------------------------
server.post("/interngo/profile", (req, res) => {
  const newProfile = { ...req.body, id: Date.now() };

  router.db.get("profiles").push(newProfile).write();

  res.json({ success: true });
});


// GET PROFESSIONAL --------------------------------------
// server.get("/interngo/professional/:userId", (req, res) => {
//   const { userId } = req.params;

//   const list = router.db.get("professionalInfo").value();

//   const found = list.find((p) => p.userId === userId);

//   if (!found) {
//     return res.status(404).json({ error: "Not found" });
//   }

//   res.json(found);
// });


// GET PROFESSIONAL (ALL)
server.get("/interngo/professional", (req, res) => {
  const list = router.db.get("professionalInfo").value() || [];
  res.json(list);
});

// GET PROFESSIONAL (BY USER)
server.get("/interngo/professional/:userId", (req, res) => {
  const { userId } = req.params;

  const list = router.db.get("professionalInfo").value();

  const found = list.find((p) => p.userId === userId);

  if (!found) {
    return res.status(404).json({ error: "Not found" });
  }

  res.json(found);
});


// UPDATE PROFESSIONAL -----------------------------------
server.put("/interngo/professional/:userId", (req, res) => {
  const { userId } = req.params;

  const list = router.db.get("professionalInfo").value();
  const existing = list.find((p) => p.userId === userId);

  if (!existing) {
    return res.status(404).json({ error: "Not found" });
  }

  router.db.get("professionalInfo")
    .find({ id: existing.id })
    .assign(req.body)
    .write();

  res.json({ success: true });
});


// CREATE PROFESSIONAL -----------------------------------
server.post("/interngo/professional", (req, res) => {
  const newRec = { ...req.body, id: Date.now() };

  router.db.get("professionalInfo").push(newRec).write();

  res.json({ success: true });
});


// =======================================================
//       DAILY UPDATE ENDPOINTS  (backend data flow)
// =======================================================

// 🔹 1. GET single intern's daily update for a date
//    GET /interngo/dailyupdate/:userId/:date
server.get("/interngo/dailyupdate/:userId/:date", (req, res) => {
  const { userId, date } = req.params;

  const list = getDailyUpdates();
  const found = list.find(
    (d) => d.userId === userId && d.date === date
  );

  if (!found) {
    return res.status(404).json({ error: "Not found" });
  }

  res.json(found);
});


// 🔹 2. UPSERT (create / update) intern's daily update for a date
//    PUT /interngo/dailyupdate/:userId/:date
server.put("/interngo/dailyupdate/:userId/:date", (req, res) => {
  const { userId, date } = req.params;
  const { totalTime, tasks } = req.body || {};

  const list = getDailyUpdates();
  const existing = list.find(
    (d) => d.userId === userId && d.date === date
  );

  if (existing) {
    router.db
      .get("dailyUpdates")
      .find({ id: existing.id })
      .assign({
        ...existing,
        totalTime: totalTime ?? existing.totalTime,
        tasks: tasks ?? existing.tasks,
      })
      .write();

    return res.json({ success: true, mode: "updated" });
  }

  const newRec = {
    id: Date.now(),
    userId,
    date,
    totalTime: totalTime || "0h 00m",
    tasks: tasks || [],
  };

  router.db.get("dailyUpdates").push(newRec).write();
  return res.json({ success: true, mode: "created" });
});


// 🔹 3. BATCH VIEW for admin / mentor / interviewer
//    GET /interngo/dailyupdate/batch/:batch/:date
//    batch = "2025"  (we match professionalInfo.year === "2025")
server.get("/interngo/dailyupdate/batch/:batch/:date", (req, res) => {
  const { batch, date } = req.params;
  const batchKey = batch.toString();

  const profList = router.db.get("professionalInfo").value() || [];
  const profiles = router.db.get("profiles").value() || [];
  const dailyList = getDailyUpdates();

  // interns for that batch/year
  const internsForBatch = profList.filter((p) =>
    p.year === batchKey ||
    p.batch === batchKey ||
    p.batch === `Batch ${batchKey}`
  );

  const result = internsForBatch.map((p) => {
    const du = dailyList.find(
      (d) => d.userId === p.userId && d.date === date
    );

    const profProfile = profiles.find(
      (pr) => pr.userId === p.userId && pr.role === "intern"
    );

    return {
      userId: p.userId,
      internName: profProfile?.user?.name || "",
      date,
      totalTime: du?.totalTime || "0h 00m",
      tasks: du?.tasks || [],
    };
  });

  res.json(result);
});


// -------------------------------------------------------
// Default JSON-server router
// -------------------------------------------------------
server.use(router);

server.listen(8080, () => {
  console.log("🚀 Mock Backend running: http://localhost:8080");
});
