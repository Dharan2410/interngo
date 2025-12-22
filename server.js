





import jsonServer from "json-server";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

const db = router.db;



// LOGIN
server.post("/interngo/login", (req, res) => {
  const { email, password } = req.body;

  const user = db
    .get("users")
    .find({ email, password })
    .value();

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  res.json({
    uid: user.uid,
    name: user.name,
    email: user.email,
    role: user.role,
    profileImage: user.profileImage || "",
  });
});

// RESTORE SESSION (MOCK)
server.get("/interngo/me", (req, res) => {
  const user = db.get("users").value()[0];

  if (!user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  res.json({
    user: {
      uid: user.uid,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage || "",
    },
  });
});

// LOGOUT (MOCK)
server.post("/interngo/logout", (_, res) => {
  res.json({ success: true });
});

// ==================================================
// PROFILE
// ==================================================
server.get("/interngo/profile/:userId", (req, res) => {
  const user = db
    .get("users")
    .find({ uid: req.params.userId })
    .value();

  if (!user) return res.status(404).json({ error: "User not found" });

  res.json(user);
});

server.put("/interngo/profile/:userId", (req, res) => {
  const users = db.get("users");
  const existing = users.find({ uid: req.params.userId }).value();

  if (!existing) return res.status(404).json({ error: "User not found" });

  users.find({ uid: req.params.userId }).assign(req.body).write();
  res.json({ success: true });
});

// ==================================================
// PHONE CHECK
// ==================================================
server.get("/interngo/check-phone/:phone", (req, res) => {
  const found = db
    .get("users")
    .filter({ phone: req.params.phone })
    .value();

  res.json(found);
});

// ==================================================
// DAILY UPDATE (USING TASKS COLLECTION)
// ==================================================

// INTERN — GET DAILY
server.get("/interngo/tasks/:userId/:date", (req, res) => {
  const { userId, date } = req.params;

  const rows = db
    .get("tasks")
    .filter({ userId, taskDate: date })
    .value();

  if (!rows.length) return res.status(404).json(null);

  const tasks = rows.map((t) => ({
    id: String(t.id),
    topic: t.taskName,
    plannedActivities: t.plannedActivities,
    completedActivities: t.completedActivities || "",
    estimatedTime: String(t.estimatedHours),
    actualTime: t.actualHours ? String(t.actualHours) : "",
    status: t.taskStatus === "Completed" ? "Completed" : "Pending",
  }));

  const totalMinutes = rows.reduce((acc, t) => {
    if (t.taskStatus === "Completed" && t.actualHours) {
      return acc + Math.round(t.actualHours * 60);
    }
    return acc;
  }, 0);

  res.json({
    userId,
    date,
    totalTime: `${Math.floor(totalMinutes / 60)}h ${(
      totalMinutes % 60
    )
      .toString()
      .padStart(2, "0")}m`,
    tasks,
  });
});

// INTERN — SAVE DAILY (UPSERT)
server.put("/interngo/tasks/:userId/:date", (req, res) => {
  const { userId, date } = req.params;
  const { tasks } = req.body;

  db.get("tasks").remove({ userId, taskDate: date }).write();

  tasks.forEach((t) => {
    db.get("tasks")
      .push({
        id: Date.now() + Math.random(),
        userId,
        taskDate: date,
        taskName: t.topic,
        plannedActivities: t.plannedActivities,
        completedActivities: t.completedActivities,
        estimatedHours: Number(t.estimatedTime),
        actualHours: t.actualTime ? Number(t.actualTime) : null,
        taskStatus:
          t.status === "Completed" ? "Completed" : "Pending",
      })
      .write();
  });

  res.json({ success: true });
});

// ==================================================
// ADMIN / MENTOR — BATCH VIEW
// ==================================================
server.get("/interngo/tasks/batch/:year/:date", (req, res) => {
  const { year, date } = req.params;

  const users = db.get("users").value();
  const tasks = db.get("tasks").value();

  const interns = users.filter(
    (u) => String(u.year) === String(year)
  );

  const result = interns.map((u) => {
    const rows = tasks.filter(
      (t) => t.userId === u.uid && t.taskDate === date
    );

    const totalMinutes = rows.reduce((acc, t) => {
      if (t.taskStatus === "Completed" && t.actualHours) {
        return acc + Math.round(t.actualHours * 60);
      }
      return acc;
    }, 0);

    return {
      userId: u.uid,
      internName: u.name,
      date,
      totalTime: `${Math.floor(totalMinutes / 60)}h ${(
        totalMinutes % 60
      )
        .toString()
        .padStart(2, "0")}m`,
      tasks: rows.map((t) => ({
        id: String(t.id),
        topic: t.taskName,
        plannedActivities: t.plannedActivities,
        completedActivities: t.completedActivities || "",
        estimatedTime: String(t.estimatedHours),
        actualTime: t.actualHours ? String(t.actualHours) : "",
        status:
          t.taskStatus === "Completed" ? "Completed" : "Pending",
      })),
    };
  });

  res.json(result);
});

server.get("/interngo/users", (req, res) => {
  res.json(router.db.get("users").value());
});


// ==================================================
// ATTENDANCE (MOCK – MATCHES REAL BACKEND MODEL)
// ==================================================

// GET attendance by year + batch + date
// server.get("/interngo/attendance", (req, res) => {
//   const { year, batch, date } = req.query;

//   if (!year || !batch || !date) {
//     return res.status(400).json([]);
//   }

//   const users = db
//     .get("users")
//     .filter({ year, batch, role: "intern" })
//     .value();

//   const attendance = db.get("attendance").value();

//   const result = users.map((u) => {
//     const record = attendance.find(
//       (a) => a.userId === u.uid && a.date === date
//     );

//     return {
//       userId: u.uid,
//       name: u.name,
//       session1: record?.session1 || "Present",
//       session2: record?.session2 || "Present",
//     };
//   });

//   res.json(result); // ✅ ALWAYS ARRAY
// });



// GET attendance by DATE (REAL BACKEND FORMAT)
server.get("/interngo/attendance/:date", (req, res) => {
  const { date } = req.params;

  const records = db
    .get("attendance")
    .filter({ date })
    .value();

  res.json({
    message: "Attendance fetched successfully",
    attendance: records,
  });
});

// ===============================
// SAVE ATTENDANCE — BULK
// ===============================
// server.post("/interngo/attendance/bulk", (req, res) => {
//   const { year, batch, date, attendance } = req.body;

//   if (!year || !batch || !date || !Array.isArray(attendance)) {
//     return res.status(400).json({
//       message: "Invalid payload",
//     });
//   }

//   attendance.forEach((a) => {
//     const existing = db
//       .get("attendance")
//       .find({ userId: a.userId, date })
//       .value();

//     if (existing) {
//       db.get("attendance")
//         .find({ userId: a.userId, date })
//         .assign({
//           session1: a.session1,
//           session2: a.session2,
//         })
//         .write();
//     } else {
//       db.get("attendance")
//         .push({
//           id: Date.now() + Math.random(),
//           userId: a.userId,
//           year,
//           batch,
//           date,
//           session1: a.session1,
//           session2: a.session2,
//         })
//         .write();
//     }
//   });

//   res.json({
//     message: "Attendance saved successfully",
//     count: attendance.length,
//   });
// });



server.post("/interngo/attendance/bulk", (req, res) => {
  const { year, batch, date, markedBy, attendance } = req.body;

  if (!year || !batch || !date || !markedBy || !Array.isArray(attendance)) {
    return res.status(400).json({
      message: "Invalid payload",
    });
  }

  attendance.forEach((a) => {
    const existing = db
      .get("attendance")
      .find({ userId: a.userId, date })
      .value();

    if (existing) {
      db.get("attendance")
        .find({ userId: a.userId, date })
        .assign({
          session1: a.session1,
          session2: a.session2,
          markedBy,               // ✅ UPDATE
          markedAt: new Date().toISOString(),
        })
        .write();
    } else {
      db.get("attendance")
        .push({
          id: Date.now() + Math.random(),
          userId: a.userId,
          year,
          batch,
          date,
          session1: a.session1,
          session2: a.session2,
          markedBy,               // ✅ SAVE
          markedAt: new Date().toISOString(),
        })
        .write();
    }
  });

  res.json({
    message: "Attendance saved successfully",
    markedBy,
    count: attendance.length,
  });
});


// CREATE (ADMIN)
server.post("/interngo/announcements", (req, res) => {
  const { title, message, priority } = req.body;

  if (!title || !message) {
    return res.status(400).json({ error: "Title & message required" });
  }

  const announcement = {
    id: Date.now(),
    title,
    message,
    priority: priority || "normal",
    createdAt: new Date().toISOString(),
  };

  db.get("announcements").push(announcement).write();

  res.json({ success: true, announcement });
});


// GET (ALL USERS)
server.get("/interngo/announcements", (req, res) => {
  const announcements = db
    .get("announcements")
    .orderBy("createdAt")
    .reverse()
    .value();

  res.json(announcements);
});


// ==================================================
// HELP DESK
// ==================================================

// CREATE HELP TICKET (INTERN)
server.post("/interngo/help-tickets", (req, res) => {
  const {
    fromUserId,
    fromName,
    role,
    subject,
    priority,
    recipientRole,
    recipientUserId,
    message,
  } = req.body;

  if (!fromUserId || !subject || !priority || !recipientRole || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const ticket = {
    id: Date.now(),
    fromUserId,
    fromName,
    role,
    subject,
    priority,
    recipientRole,          // Admin | Mentor
    recipientUserId: recipientUserId || null,
    message,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  db.get("helpTickets").push(ticket).write();

  res.json({ success: true, ticket });
});

// GET MY HELP REQUESTS (INTERN)
server.get("/interngo/help-tickets/my/:userId", (req, res) => {
  const { userId } = req.params;

  const tickets = db
    .get("helpTickets")
    .filter({ fromUserId: userId })
    .orderBy("createdAt")
    .reverse()
    .value();

  res.json(tickets);
});

// GET PENDING TICKETS (ADMIN)
server.get("/interngo/help-tickets/admin", (req, res) => {
  const tickets = db
    .get("helpTickets")
    .filter({ recipientRole: "Admin", status: "pending" })
    .orderBy("createdAt")
    .reverse()
    .value();

  res.json(tickets);
});

// GET PENDING TICKETS (MENTOR)
server.get("/interngo/help-tickets/mentor/:mentorId", (req, res) => {
  const { mentorId } = req.params;

  const tickets = db
    .get("helpTickets")
    .filter({
      recipientRole: "Mentor",
      recipientUserId: mentorId,
      status: "pending",
    })
    .orderBy("createdAt")
    .reverse()
    .value();

  res.json(tickets);
});

// UPDATE TICKET STATUS (ADMIN / MENTOR)
server.patch("/interngo/help-tickets/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const existing = db
    .get("helpTickets")
    .find({ id: Number(id) })
    .value();

  if (!existing) {
    return res.status(404).json({ error: "Ticket not found" });
  }

  db.get("helpTickets")
    .find({ id: Number(id) })
    .assign({ status })
    .write();

  res.json({ success: true });
});

server.use(router);

server.listen(4000, () => {
  console.log("🚀 Mock Backend running at http://localhost:4000");
});
