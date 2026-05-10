import { createReadStream, existsSync, statSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { DatabaseSync } from "node:sqlite";
import { dirname, extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const seedPath = join(root, "database.json");
const sqlitePath = join(root, "traveloop.sqlite");
const port = Number(process.env.PORT || 4173);
const db = new DatabaseSync(sqlitePath);

// ── Session store (in-memory; cleared on restart) ──────────────────────────
const sessions = new Map(); // token → userId

function generateToken() {
  return crypto.randomUUID();
}

function parseCookies(header) {
  const cookies = {};
  for (const part of (header || "").split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k) cookies[k.trim()] = decodeURIComponent(v.join("="));
  }
  return cookies;
}

function getSessionUser(request) {
  const token = parseCookies(request.headers.cookie).tl_session;
  if (!token || !sessions.has(token)) return null;
  return db.prepare("SELECT * FROM users WHERE id = ?").get(sessions.get(token)) || null;
}

function setSessionCookie(response, token) {
  response.setHeader("Set-Cookie", `tl_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=604800`);
}

function clearSessionCookie(response) {
  response.setHeader("Set-Cookie", "tl_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0");
}

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

await initDatabase();

async function initDatabase() {
  db.exec(`
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      initials TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      active_loops INTEGER DEFAULT 0,
      privacy TEXT DEFAULT 'private',
      language TEXT DEFAULT 'English',
      avatar TEXT DEFAULT '',
      total_trips INTEGER DEFAULT 0,
      total_days INTEGER DEFAULT 0,
      total_activities INTEGER DEFAULT 0,
      countries INTEGER DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS trips (
      id TEXT PRIMARY KEY,
      user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      route TEXT NOT NULL,
      dates TEXT NOT NULL,
      start_date TEXT DEFAULT '',
      people TEXT DEFAULT '1 traveler',
      status TEXT DEFAULT 'Draft',
      visibility TEXT DEFAULT 'private',
      budget REAL DEFAULT 0,
      spent REAL DEFAULT 0,
      description TEXT DEFAULT '',
      cover_photo TEXT DEFAULT ''
    );
    CREATE TABLE IF NOT EXISTS itinerary_items (
      id TEXT PRIMARY KEY,
      trip_id TEXT REFERENCES trips(id) ON DELETE CASCADE,
      day INTEGER NOT NULL,
      date TEXT DEFAULT '',
      time TEXT DEFAULT 'Flexible',
      item TEXT NOT NULL,
      city TEXT DEFAULT '',
      cost REAL DEFAULT 0,
      position INTEGER DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS activities (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      city TEXT NOT NULL,
      country TEXT DEFAULT '',
      region TEXT DEFAULT '',
      detail TEXT NOT NULL,
      cost REAL DEFAULT 0,
      duration TEXT DEFAULT '',
      image TEXT DEFAULT '',
      popularity INTEGER DEFAULT 0,
      cost_index TEXT DEFAULT '$$'
    );
    CREATE TABLE IF NOT EXISTS activity_tags (
      activity_id TEXT REFERENCES activities(id) ON DELETE CASCADE,
      tag TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS budget (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      planned REAL DEFAULT 0,
      limit_amount REAL DEFAULT 0,
      completion INTEGER DEFAULT 0,
      tip TEXT DEFAULT ''
    );
    CREATE TABLE IF NOT EXISTS budget_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      amount REAL NOT NULL,
      color TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS budget_daily (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      day TEXT NOT NULL,
      amount REAL NOT NULL
    );
    CREATE TABLE IF NOT EXISTS packing_items (
      id TEXT PRIMARY KEY,
      trip_id TEXT REFERENCES trips(id) ON DELETE CASCADE,
      item TEXT NOT NULL,
      category TEXT NOT NULL,
      done INTEGER DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS packing_templates (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      name TEXT,
      saved_at TEXT
    );
    CREATE TABLE IF NOT EXISTS map_pins (
      id TEXT PRIMARY KEY,
      trip_id TEXT REFERENCES trips(id) ON DELETE CASCADE,
      city TEXT NOT NULL,
      country TEXT DEFAULT '',
      country_code TEXT DEFAULT '',
      lat REAL NOT NULL,
      lng REAL NOT NULL,
      day INTEGER DEFAULT 1,
      summary TEXT DEFAULT ''
    );
    CREATE TABLE IF NOT EXISTS popular_cities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      city TEXT NOT NULL,
      country TEXT NOT NULL,
      country_code TEXT DEFAULT '',
      region TEXT DEFAULT '',
      cost_index TEXT DEFAULT '$$',
      popularity INTEGER DEFAULT 0,
      image TEXT DEFAULT ''
    );
    CREATE TABLE IF NOT EXISTS recent_activities (
      id TEXT PRIMARY KEY,
      label TEXT NOT NULL,
      detail TEXT NOT NULL,
      time TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS weather (
      city TEXT PRIMARY KEY,
      temp INTEGER,
      condition TEXT
    );
    CREATE TABLE IF NOT EXISTS weather_packing (
      city TEXT REFERENCES weather(city) ON DELETE CASCADE,
      item TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS group_poll (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      question TEXT
    );
    CREATE TABLE IF NOT EXISTS group_poll_options (
      id TEXT PRIMARY KEY,
      label TEXT NOT NULL,
      votes INTEGER DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS notes (
      id TEXT PRIMARY KEY,
      trip_id TEXT REFERENCES trips(id) ON DELETE CASCADE,
      day INTEGER,
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS saved_destinations (
      id TEXT PRIMARY KEY,
      user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
      city TEXT NOT NULL,
      country TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS analytics (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      trips_created TEXT,
      shared_publicly TEXT,
      average_cities TEXT,
      average_build_time TEXT
    );
    CREATE TABLE IF NOT EXISTS analytics_usage (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      label TEXT,
      height INTEGER
    );
  `);

  const count = db.prepare("SELECT COUNT(*) AS total FROM users").get().total;
  if (!count) await seedDatabase();
}

async function seedDatabase() {
  const seed = JSON.parse(await readFile(seedPath, "utf8"));
  const userId = "demo-user";
  const insertUser = db.prepare(`
    INSERT INTO users (id, name, initials, email, password, active_loops, privacy, total_trips, total_days, total_activities, countries)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const insertTrip = db.prepare(`
    INSERT INTO trips (id, user_id, name, route, dates, start_date, people, status, visibility, budget, spent)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const insertItinerary = db.prepare(`
    INSERT INTO itinerary_items (id, trip_id, day, date, time, item, city, cost, position)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const insertActivity = db.prepare(`
    INSERT INTO activities (id, title, city, country, region, detail, cost, duration, image, popularity, cost_index)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const insertActivityTag = db.prepare("INSERT INTO activity_tags (activity_id, tag) VALUES (?, ?)");
  const insertBudget = db.prepare("INSERT INTO budget (id, planned, limit_amount, completion, tip) VALUES (1, ?, ?, ?, ?)");
  const insertBudgetCategory = db.prepare("INSERT INTO budget_categories (name, amount, color) VALUES (?, ?, ?)");
  const insertBudgetDaily = db.prepare("INSERT INTO budget_daily (day, amount) VALUES (?, ?)");
  const insertPacking = db.prepare("INSERT INTO packing_items (id, trip_id, item, category, done) VALUES (?, ?, ?, ?, ?)");
  const insertTemplate = db.prepare("INSERT INTO packing_templates (id, name, saved_at) VALUES (1, ?, ?)");
  const insertPin = db.prepare(`
    INSERT INTO map_pins (id, trip_id, city, country, country_code, lat, lng, day, summary)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const insertCity = db.prepare(`
    INSERT INTO popular_cities (city, country, country_code, region, cost_index, popularity, image)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const insertRecent = db.prepare("INSERT INTO recent_activities (id, label, detail, time) VALUES (?, ?, ?, ?)");
  const insertWeather = db.prepare("INSERT INTO weather (city, temp, condition) VALUES (?, ?, ?)");
  const insertWeatherPacking = db.prepare("INSERT INTO weather_packing (city, item) VALUES (?, ?)");
  const insertPoll = db.prepare("INSERT INTO group_poll (id, question) VALUES (1, ?)");
  const insertPollOption = db.prepare("INSERT INTO group_poll_options (id, label, votes) VALUES (?, ?, ?)");
  const insertNote = db.prepare(`
    INSERT INTO notes (id, trip_id, day, title, body, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const insertSaved = db.prepare("INSERT INTO saved_destinations (id, user_id, city, country) VALUES (?, ?, ?, ?)");
  const insertAnalytics = db.prepare(`
    INSERT INTO analytics (id, trips_created, shared_publicly, average_cities, average_build_time)
    VALUES (1, ?, ?, ?, ?)
  `);
  const insertUsage = db.prepare("INSERT INTO analytics_usage (label, height) VALUES (?, ?)");

  db.exec("BEGIN");
  try {
    insertUser.run(
      userId,
      seed.user.name,
      seed.user.initials,
      seed.user.email,
      "traveloop",
      seed.user.activeLoops,
      seed.user.privacy,
      seed.user.stats.totalTrips,
      seed.user.stats.totalDays,
      seed.user.stats.totalActivities,
      seed.user.stats.countries
    );
    // Seed extra demo users
    (seed.extraUsers || []).forEach((u) => {
      insertUser.run(u.id, u.name, u.initials, u.email, u.password, u.activeLoops, u.privacy, u.totalTrips, u.totalDays, u.totalActivities, u.countries);
    });
    seed.trips.forEach((trip) =>
      insertTrip.run(trip.id, userId, trip.name, trip.route, trip.dates, trip.startDate, trip.people, trip.status, trip.visibility, trip.budget, trip.spent)
    );
    seed.itinerary.forEach((entry, index) =>
      insertItinerary.run(entry.id, entry.tripId, entry.day, entry.date, entry.time, entry.item, entry.city, entry.cost, index)
    );
    const activityImages = [
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=900&q=80"
    ];
    seed.activities.forEach((activity, index) => {
      const region = ["Europe", "Europe", "Europe", "Europe", "Europe", "Europe"][index] || "Global";
      insertActivity.run(
        activity.id,
        activity.title,
        activity.city,
        activity.city === "Barcelona" ? "Spain" : activity.city === "Nice" ? "France" : "Italy",
        region,
        activity.detail,
        activity.cost,
        activity.tags.find((tag) => tag.includes("hr")) || "",
        activityImages[index] || "",
        80 - index * 4,
        activity.cost <= 20 ? "$" : activity.cost <= 50 ? "$$" : "$$$"
      );
      activity.tags.forEach((tag) => insertActivityTag.run(activity.id, tag));
    });
    insertBudget.run(seed.budget.planned, seed.budget.limit, seed.budget.completion, seed.budget.tip);
    seed.budget.categories.forEach((category) => insertBudgetCategory.run(category.name, category.amount, category.color));
    seed.budget.daily.forEach((day) => insertBudgetDaily.run(day.day, day.amount));
    seed.packing.forEach((item) => insertPacking.run(item.id, "mediterranean-sprint", item.item, item.category, item.done ? 1 : 0));
    insertTemplate.run(seed.packingTemplate.name, seed.packingTemplate.savedAt);
    seed.mapPins.forEach((pin) =>
      insertPin.run(pin.id, pin.tripId, pin.city, pin.country, pin.countryCode, pin.lat, pin.lng, pin.day, pin.summary)
    );
    const extraCities = [
      { city: "Barcelona", country: "Spain", countryCode: "ES", region: "Europe", costIndex: "$$", popularity: 94, image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=900&q=80" },
      { city: "Rome", country: "Italy", countryCode: "IT", region: "Europe", costIndex: "$$", popularity: 96, image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=900&q=80" },
      { city: "Tokyo", country: "Japan", countryCode: "JP", region: "Asia", costIndex: "$$$", popularity: 97, image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80" },
      { city: "Kochi", country: "India", countryCode: "IN", region: "Asia", costIndex: "$", popularity: 78, image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80" }
    ];
    const regionMap = { PT: "Europe", JP: "Asia", IS: "Europe", TR: "Europe", NL: "Europe", CZ: "Europe", MA: "Inspiration", ZA: "Inspiration", AU: "Inspiration", AE: "Asia", US: "Inspiration" };
    const popMap = { PT: 91, JP: 97, IS: 85, TR: 93, NL: 92, CZ: 89, MA: 86, ZA: 84, AU: 90, AE: 88, US: 96 };
    const costMap = { PT: "$$", JP: "$$$", IS: "$$$", TR: "$$", NL: "$$$", CZ: "$$", MA: "$", ZA: "$$", AU: "$$$", AE: "$$$", US: "$$$" };
    const mappedSeedCities = seed.popularCities.map((city) => ({ ...city, region: regionMap[city.countryCode] || "Inspiration", costIndex: costMap[city.countryCode] || "$$", popularity: popMap[city.countryCode] || 85 }));
    [...mappedSeedCities, ...extraCities].forEach((city) =>
      insertCity.run(city.city, city.country, city.countryCode, city.region, city.costIndex, city.popularity, city.image)
    );
    seed.recentActivities.forEach((activity) => insertRecent.run(activity.id, activity.label, activity.detail, activity.time));
    seed.weather.forEach((weather) => {
      insertWeather.run(weather.city, weather.temp, weather.condition);
      weather.packing.forEach((item) => insertWeatherPacking.run(weather.city, item));
    });
    insertPoll.run(seed.groupPoll.question);
    seed.groupPoll.options.forEach((option) => insertPollOption.run(option.id, option.label, option.votes));
    const now = new Date().toISOString();
    seed.notes.forEach((note, index) => insertNote.run(note.id, "mediterranean-sprint", index + 1, note.title, note.body, now, now));
    [
      ["saved-lisbon", "Lisbon", "Portugal"],
      ["saved-kyoto", "Kyoto", "Japan"],
      ["saved-rome", "Rome", "Italy"]
    ].forEach(([id, city, country]) => insertSaved.run(id, userId, city, country));
    insertAnalytics.run(seed.analytics.tripsCreated, seed.analytics.sharedPublicly, seed.analytics.averageCities, seed.analytics.averageBuildTime);
    seed.analytics.usage.forEach((usage) => insertUsage.run(usage.label, usage.height));
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

function getUser() {
  const row = db.prepare("SELECT * FROM users LIMIT 1").get();
  return serializeUser(row);
}

function serializeUser(row) {
  return {
    name: row.name,
    initials: row.initials,
    email: row.email,
    activeLoops: row.active_loops,
    privacy: row.privacy,
    language: row.language,
    avatar: row.avatar,
    stats: {
      totalTrips: row.total_trips,
      totalDays: row.total_days,
      totalActivities: row.total_activities,
      countries: row.countries
    }
  };
}

function readDatabase() {
  const user = getUser();
  const trips = db.prepare(`
    SELECT id, name, route, dates, start_date AS startDate, people, status, visibility, budget, spent, description, cover_photo AS coverPhoto
    FROM trips ORDER BY rowid DESC
  `).all();
  const itinerary = db.prepare(`
    SELECT id, trip_id AS tripId, day, date, time, item, city, cost
    FROM itinerary_items ORDER BY day, position, time
  `).all();
  const activities = db.prepare(`
    SELECT id, title, city, country, region, detail, cost, duration, image, popularity, cost_index AS costIndex
    FROM activities ORDER BY popularity DESC, title
  `).all().map((activity) => ({
    ...activity,
    tags: db.prepare("SELECT tag FROM activity_tags WHERE activity_id = ?").all(activity.id).map((row) => row.tag)
  }));
  const budget = db.prepare('SELECT planned, limit_amount AS "limit", completion, tip FROM budget WHERE id = 1').get();
  budget.categories = db.prepare("SELECT name, amount, color FROM budget_categories ORDER BY id").all();
  budget.daily = db.prepare("SELECT day, amount FROM budget_daily ORDER BY id").all();
  const packing = db.prepare("SELECT id, item, category, done FROM packing_items ORDER BY category, item").all().map((item) => ({ ...item, done: Boolean(item.done) }));
  const packingTemplateRow = db.prepare("SELECT name, saved_at AS savedAt FROM packing_templates WHERE id = 1").get();
  const mapPins = readMapPins();
  const popularCities = db.prepare(`
    SELECT city, country, country_code AS countryCode, region, cost_index AS costIndex, popularity, image
    FROM popular_cities ORDER BY popularity DESC
  `).all();
  const recentActivities = db.prepare("SELECT id, label, detail, time FROM recent_activities ORDER BY rowid").all();
  const weather = db.prepare("SELECT city, temp, condition FROM weather ORDER BY rowid").all().map((entry) => ({
    ...entry,
    packing: db.prepare("SELECT item FROM weather_packing WHERE city = ?").all(entry.city).map((row) => row.item)
  }));
  const groupPoll = {
    question: db.prepare("SELECT question FROM group_poll WHERE id = 1").get()?.question || "",
    options: db.prepare("SELECT id, label, votes FROM group_poll_options ORDER BY rowid").all()
  };
  const notes = db.prepare(`
    SELECT id, trip_id AS tripId, day, title, body, created_at AS createdAt, updated_at AS updatedAt
    FROM notes ORDER BY updated_at DESC
  `).all();
  const savedDestinations = db.prepare("SELECT id, city, country FROM saved_destinations ORDER BY city").all();
  const analytics = db.prepare(`
    SELECT trips_created AS tripsCreated, shared_publicly AS sharedPublicly, average_cities AS averageCities, average_build_time AS averageBuildTime
    FROM analytics WHERE id = 1
  `).get();
  analytics.usage = db.prepare("SELECT label, height FROM analytics_usage ORDER BY id").all();
  analytics.topCities = db.prepare("SELECT city, country, popularity FROM popular_cities ORDER BY popularity DESC LIMIT 5").all();
  analytics.userCount = db.prepare("SELECT COUNT(*) AS count FROM users").get().count;

  return {
    user,
    trips,
    itinerary,
    activities,
    budget,
    packing,
    packingTemplate: packingTemplateRow,
    mapPins,
    popularCities,
    recentActivities,
    weather,
    groupPoll,
    notes,
    savedDestinations,
    analytics
  };
}

function readMapPins() {
  return db.prepare(`
    SELECT id, trip_id AS tripId, city, country, country_code AS countryCode, lat, lng, day, summary
    FROM map_pins ORDER BY day, city
  `).all();
}

async function readBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  const text = Buffer.concat(chunks).toString("utf8");
  return text ? JSON.parse(text) : {};
}

function sendJson(response, status, data) {
  response.writeHead(status, { "Content-Type": types[".json"] });
  response.end(JSON.stringify(data));
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function initials(name) {
  return String(name || "Traveler")
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function cityCoordinates(city) {
  const known = {
    barcelona: [41.3851, 2.1734], nice: [43.7102, 7.262], rome: [41.9028, 12.4964],
    florence: [43.7696, 11.2558], paris: [48.8566, 2.3522], tokyo: [35.6762, 139.6503],
    kyoto: [35.0116, 135.7681], osaka: [34.6937, 135.5023], kochi: [9.9312, 76.2673],
    lisbon: [38.7223, -9.1393], delhi: [28.6139, 77.209], istanbul: [41.0082, 28.9784],
    amsterdam: [52.3676, 4.9041], prague: [50.0755, 14.4378], marrakech: [31.6295, -7.9811],
    dubai: [25.2048, 55.2708], "cape town": [-33.9249, 18.4241], sydney: [-33.8688, 151.2093],
    "new york": [40.7128, -74.006], singapore: [1.3521, 103.8198], bangkok: [13.7563, 100.5018],
    "chiang mai": [18.7883, 98.9853], bali: [-8.3405, 115.0920], fez: [34.0181, -5.0078],
    "el calafate": [-50.3379, -72.2648], "buenos aires": [-34.6037, -58.3816]
  };
  const value = known[String(city).trim().toLowerCase()];
  if (value) return value;
  return [35 + Math.random() * 18, -8 + Math.random() * 24];
}

async function handleApi(request, response, url) {
  const pathname = url.pathname;

  if (request.method === "GET" && pathname === "/api/bootstrap") {
    const sessionUser = getSessionUser(request);
    if (!sessionUser) return sendJson(response, 200, { authenticated: false });
    return sendJson(response, 200, { authenticated: true, ...readDatabase() });
  }

  if (request.method === "GET" && pathname === "/api/auth/me") {
    const sessionUser = getSessionUser(request);
    if (!sessionUser) return sendJson(response, 200, { authenticated: false });
    return sendJson(response, 200, { authenticated: true, user: serializeUser(sessionUser) });
  }

  if (request.method === "POST" && pathname === "/api/auth/logout") {
    const token = parseCookies(request.headers.cookie).tl_session;
    if (token) sessions.delete(token);
    clearSessionCookie(response);
    return sendJson(response, 200, { ok: true });
  }

  if (request.method === "POST" && pathname === "/api/auth/login") {
    const body = await readBody(request);
    const user = db.prepare("SELECT * FROM users WHERE email = ? AND password = ?").get(String(body.email || "").toLowerCase(), String(body.password || ""));
    if (!user) return sendJson(response, 401, { error: "Invalid email or password. Check your credentials and try again." });
    const token = generateToken();
    sessions.set(token, user.id);
    setSessionCookie(response, token);
    return sendJson(response, 200, { authenticated: true, user: serializeUser(user) });
  }

  if (request.method === "POST" && pathname === "/api/auth/signup") {
    const body = await readBody(request);
    const email = String(body.email || "").trim().toLowerCase();
    const name = String(body.name || email.split("@")[0] || "Traveler").trim();
    const password = String(body.password || "").trim();
    if (!email || !password) return sendJson(response, 400, { error: "Email and password are required." });
    if (password.length < 6) return sendJson(response, 400, { error: "Password must be at least 6 characters." });
    if (db.prepare("SELECT id FROM users WHERE email = ?").get(email)) return sendJson(response, 409, { error: "An account with this email already exists." });
    const id = slugify(`${name}-${Date.now()}`);
    db.prepare(`INSERT INTO users (id, name, initials, email, password, active_loops, privacy, language, total_trips, total_days, total_activities, countries) VALUES (?, ?, ?, ?, ?, 0, 'private', 'English', 0, 0, 0, 0)`).run(id, name, initials(name), email, password);
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
    const token = generateToken();
    sessions.set(token, user.id);
    setSessionCookie(response, token);
    return sendJson(response, 201, { authenticated: true, user: serializeUser(user) });
  }

  if (request.method === "GET" && pathname === "/api/trips") {
    return sendJson(response, 200, readDatabase().trips);
  }

  if (request.method === "POST" && pathname === "/api/trips") {
    const body = await readBody(request);
    const name = body.name || "Untitled Trip";
    const trip = {
      id: slugify(`${name}-${Date.now()}`),
      userId: "demo-user",
      name,
      route: body.route || body.destination || "Destination pending",
      dates: body.dates || "Dates pending",
      startDate: body.startDate || "",
      people: body.people || body.travelers || "1 traveler",
      status: "Draft",
      visibility: "private",
      budget: Number(body.budget || 0),
      spent: 0,
      description: body.description || "",
      coverPhoto: body.coverPhoto || ""
    };
    db.prepare(`
      INSERT INTO trips (id, user_id, name, route, dates, start_date, people, status, visibility, budget, spent, description, cover_photo)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(trip.id, trip.userId, trip.name, trip.route, trip.dates, trip.startDate, trip.people, trip.status, trip.visibility, trip.budget, trip.spent, trip.description, trip.coverPhoto);
    return sendJson(response, 201, trip);
  }

  if (request.method === "PATCH" && pathname.startsWith("/api/trips/")) {
    const id = pathname.split("/").pop();
    const existing = db.prepare("SELECT * FROM trips WHERE id = ?").get(id);
    if (!existing) return sendJson(response, 404, { error: "Trip not found" });
    const body = await readBody(request);
    const trip = {
      id,
      name: body.name || existing.name,
      route: body.route || body.destination || existing.route,
      dates: body.dates || existing.dates,
      startDate: body.startDate || existing.start_date,
      people: body.people || body.travelers || existing.people,
      status: existing.status,
      visibility: existing.visibility,
      budget: Number(body.budget || existing.budget || 0),
      spent: existing.spent,
      description: body.description || existing.description,
      coverPhoto: body.coverPhoto || existing.cover_photo
    };
    db.prepare(`
      UPDATE trips
      SET name = ?, route = ?, dates = ?, start_date = ?, people = ?, budget = ?, description = ?, cover_photo = ?
      WHERE id = ?
    `).run(trip.name, trip.route, trip.dates, trip.startDate, trip.people, trip.budget, trip.description, trip.coverPhoto, id);
    return sendJson(response, 200, trip);
  }

  if (request.method === "DELETE" && pathname.startsWith("/api/trips/")) {
    const id = pathname.split("/").pop();
    const result = db.prepare("DELETE FROM trips WHERE id = ?").run(id);
    if (!result.changes) return sendJson(response, 404, { error: "Trip not found" });
    return sendJson(response, 200, { id });
  }

  if (request.method === "GET" && pathname === "/api/itinerary") {
    return sendJson(response, 200, readDatabase().itinerary);
  }

  if (request.method === "POST" && pathname === "/api/itinerary") {
    const body = await readBody(request);
    const item = body.item || body.title || "New itinerary item";
    const maxPosition = db.prepare("SELECT COALESCE(MAX(position), 0) AS position FROM itinerary_items WHERE day = ?").get(Number(body.day || 1)).position;
    const entry = {
      id: slugify(`${item}-${Date.now()}`),
      tripId: body.tripId || "mediterranean-sprint",
      day: Number(body.day || 1),
      date: body.date || "",
      time: body.time || "Flexible",
      item,
      city: body.city || "",
      cost: Number(body.cost || 0),
      position: maxPosition + 1
    };
    db.prepare(`
      INSERT INTO itinerary_items (id, trip_id, day, date, time, item, city, cost, position)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(entry.id, entry.tripId, entry.day, entry.date, entry.time, entry.item, entry.city, entry.cost, entry.position);
    return sendJson(response, 201, entry);
  }

  if (request.method === "PATCH" && pathname.startsWith("/api/itinerary/") && pathname.endsWith("/move")) {
    const id = pathname.split("/").at(-2);
    const body = await readBody(request);
    const item = db.prepare("SELECT * FROM itinerary_items WHERE id = ?").get(id);
    if (!item) return sendJson(response, 404, { error: "Itinerary item not found" });
    const direction = body.direction === "down" ? 1 : -1;
    const neighbor = db.prepare(`
      SELECT * FROM itinerary_items
      WHERE day = ? AND position ${direction > 0 ? ">" : "<"} ?
      ORDER BY position ${direction > 0 ? "ASC" : "DESC"} LIMIT 1
    `).get(item.day, item.position);
    if (neighbor) {
      db.prepare("UPDATE itinerary_items SET position = ? WHERE id = ?").run(neighbor.position, item.id);
      db.prepare("UPDATE itinerary_items SET position = ? WHERE id = ?").run(item.position, neighbor.id);
    }
    return sendJson(response, 200, readDatabase().itinerary);
  }

  if (request.method === "DELETE" && pathname.startsWith("/api/itinerary/")) {
    const id = pathname.split("/").pop();
    const result = db.prepare("DELETE FROM itinerary_items WHERE id = ?").run(id);
    if (!result.changes) return sendJson(response, 404, { error: "Itinerary item not found" });
    return sendJson(response, 200, { id });
  }

  if (request.method === "GET" && pathname === "/api/activities") {
    return sendJson(response, 200, readDatabase().activities);
  }

  if (request.method === "GET" && pathname === "/api/cities") {
    const q = String(url.searchParams.get("q") || "").toLowerCase();
    const region = String(url.searchParams.get("region") || "all");
    const cities = readDatabase().popularCities.filter((city) => {
      const matchesQuery = !q || `${city.city} ${city.country}`.toLowerCase().includes(q);
      const matchesRegion = region === "all" || city.region === region;
      return matchesQuery && matchesRegion;
    });
    return sendJson(response, 200, cities);
  }

  if (request.method === "GET" && pathname === "/api/budget") {
    return sendJson(response, 200, readDatabase().budget);
  }

  if (request.method === "GET" && pathname === "/api/packing") {
    return sendJson(response, 200, readDatabase().packing);
  }

  if (request.method === "POST" && pathname === "/api/packing") {
    const body = await readBody(request);
    const item = String(body.item || "").trim();
    if (!item) return sendJson(response, 400, { error: "Packing item is required" });
    const entry = {
      id: slugify(`${item}-${Date.now()}`),
      item,
      category: body.category || "Misc",
      done: Boolean(body.done)
    };
    db.prepare("INSERT INTO packing_items (id, trip_id, item, category, done) VALUES (?, ?, ?, ?, ?)")
      .run(entry.id, "mediterranean-sprint", entry.item, entry.category, entry.done ? 1 : 0);
    return sendJson(response, 201, entry);
  }

  if (request.method === "PATCH" && pathname.startsWith("/api/packing/")) {
    const id = pathname.split("/").pop();
    const body = await readBody(request);
    const result = db.prepare("UPDATE packing_items SET done = ? WHERE id = ?").run(body.done ? 1 : 0, id);
    if (!result.changes) return sendJson(response, 404, { error: "Packing item not found" });
    const item = db.prepare("SELECT id, item, category, done FROM packing_items WHERE id = ?").get(id);
    return sendJson(response, 200, { ...item, done: Boolean(item.done) });
  }

  if (request.method === "DELETE" && pathname.startsWith("/api/packing/")) {
    const id = pathname.split("/").pop();
    const result = db.prepare("DELETE FROM packing_items WHERE id = ?").run(id);
    if (!result.changes) return sendJson(response, 404, { error: "Packing item not found" });
    return sendJson(response, 200, { id });
  }

  if (request.method === "GET" && pathname === "/api/map-pins") {
    return sendJson(response, 200, readMapPins());
  }

  if (request.method === "POST" && pathname === "/api/map-pins") {
    const body = await readBody(request);
    const city = String(body.city || "").trim();
    if (!city) return sendJson(response, 400, { error: "City is required" });
    const [lat, lng] = body.lat && body.lng ? [Number(body.lat), Number(body.lng)] : cityCoordinates(city);
    const pin = {
      id: slugify(`${city}-${Date.now()}`),
      tripId: body.tripId || "mediterranean-sprint",
      city,
      country: body.country || "Planned stop",
      countryCode: body.countryCode || "",
      lat,
      lng,
      day: Number(body.day || 1),
      summary: body.summary || "New place added to the route."
    };
    db.prepare(`
      INSERT INTO map_pins (id, trip_id, city, country, country_code, lat, lng, day, summary)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(pin.id, pin.tripId, pin.city, pin.country, pin.countryCode, pin.lat, pin.lng, pin.day, pin.summary);
    return sendJson(response, 201, pin);
  }

  if (request.method === "DELETE" && pathname.startsWith("/api/map-pins/")) {
    const id = pathname.split("/").pop();
    const result = db.prepare("DELETE FROM map_pins WHERE id = ?").run(id);
    if (!result.changes) return sendJson(response, 404, { error: "Map pin not found" });
    return sendJson(response, 200, { id });
  }

  if (request.method === "PATCH" && pathname === "/api/user/privacy") {
    const body = await readBody(request);
    const privacy = body.privacy === "public" ? "public" : "private";
    db.prepare("UPDATE users SET privacy = ?").run(privacy);
    return sendJson(response, 200, { privacy });
  }

  if (request.method === "PATCH" && pathname === "/api/user/profile") {
    const body = await readBody(request);
    const name = String(body.name || "").trim() || "Traveler";
    const email = String(body.email || "").trim() || "traveler@example.com";
    const language = String(body.language || "English").trim();
    const avatar = String(body.avatar || "").trim();
    db.prepare("UPDATE users SET name = ?, initials = ?, email = ?, language = ?, avatar = ?")
      .run(name, initials(name), email, language, avatar);
    return sendJson(response, 200, getUser());
  }

  if (request.method === "GET" && pathname === "/api/notes") {
    return sendJson(response, 200, readDatabase().notes);
  }

  if (request.method === "POST" && pathname === "/api/notes") {
    const body = await readBody(request);
    const title = String(body.title || "").trim();
    const bodyText = String(body.body || "").trim();
    if (!title || !bodyText) return sendJson(response, 400, { error: "Note title and body are required" });
    const now = new Date().toISOString();
    const note = {
      id: slugify(`${title}-${Date.now()}`),
      tripId: body.tripId || "mediterranean-sprint",
      day: Number(body.day || 1),
      title,
      body: bodyText,
      createdAt: now,
      updatedAt: now
    };
    db.prepare(`
      INSERT INTO notes (id, trip_id, day, title, body, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(note.id, note.tripId, note.day, note.title, note.body, note.createdAt, note.updatedAt);
    return sendJson(response, 201, note);
  }

  if (request.method === "PATCH" && pathname.startsWith("/api/notes/")) {
    const id = pathname.split("/").pop();
    const body = await readBody(request);
    const existing = db.prepare("SELECT * FROM notes WHERE id = ?").get(id);
    if (!existing) return sendJson(response, 404, { error: "Note not found" });
    const updatedAt = new Date().toISOString();
    db.prepare("UPDATE notes SET title = ?, body = ?, day = ?, updated_at = ? WHERE id = ?")
      .run(body.title || existing.title, body.body || existing.body, Number(body.day || existing.day || 1), updatedAt, id);
    const note = db.prepare(`
      SELECT id, trip_id AS tripId, day, title, body, created_at AS createdAt, updated_at AS updatedAt
      FROM notes WHERE id = ?
    `).get(id);
    return sendJson(response, 200, note);
  }

  if (request.method === "DELETE" && pathname.startsWith("/api/notes/")) {
    const id = pathname.split("/").pop();
    const result = db.prepare("DELETE FROM notes WHERE id = ?").run(id);
    if (!result.changes) return sendJson(response, 404, { error: "Note not found" });
    return sendJson(response, 200, { id });
  }

  if (request.method === "GET" && pathname === "/api/analytics") {
    return sendJson(response, 200, readDatabase().analytics);
  }

  return sendJson(response, 404, { error: "API route not found" });
}

createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://localhost:${port}`);

  try {
    if (url.pathname.startsWith("/api/")) {
      await handleApi(request, response, url);
      return;
    }
  } catch (error) {
    sendJson(response, 500, { error: "Server error", detail: error.message });
    return;
  }

  const safePath = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, "");
  let filePath = join(root, safePath === "/" ? "index.html" : safePath);

  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    filePath = join(root, "index.html");
  }

  response.setHeader("Content-Type", types[extname(filePath)] || "application/octet-stream");
  createReadStream(filePath).pipe(response);
}).listen(port, () => {
  console.log(`Traveloop frontend running at http://localhost:${port}`);
  console.log(`SQLite database: ${sqlitePath}`);
});
