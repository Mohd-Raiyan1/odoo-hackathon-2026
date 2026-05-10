// ======================= MOCK DATABASE (from database.json) =======================
const MOCK_DB = {
  user: {
    name: "Mohd",
    initials: "MR",
    email: "mohd@example.com",
    activeLoops: 3,
    privacy: "private",
    language: "English",
    stats: {
      totalTrips: 12,
      totalDays: 84,
      totalActivities: 147,
      countries: 9
    }
  },
  trips: [
    {
      id: "mediterranean-sprint",
      name: "Mediterranean Sprint",
      route: "Barcelona - Nice - Rome",
      dates: "Jun 14 - Jun 21",
      startDate: "2026-06-14",
      people: "6 travelers",
      status: "82% planned",
      visibility: "public",
      budget: 4200,
      spent: 2840
    },
    {
      id: "japan-autumn-loop",
      name: "Japan Autumn Loop",
      route: "Tokyo - Kyoto - Osaka",
      dates: "Oct 12 - Oct 21",
      startDate: "2026-10-12",
      people: "4 travelers",
      status: "Draft",
      visibility: "private",
      budget: 5600,
      spent: 1320
    },
    {
      id: "kerala-slow-week",
      name: "Kerala Slow Week",
      route: "Kochi - Munnar - Alleppey",
      dates: "Aug 3 - Aug 9",
      startDate: "2026-08-03",
      people: "2 travelers",
      status: "Shared",
      visibility: "public",
      budget: 1800,
      spent: 1165
    },
    {
      id: "nordic-rail-run",
      name: "Nordic Rail Run",
      route: "Copenhagen - Stockholm - Oslo",
      dates: "Dec 4 - Dec 12",
      startDate: "2026-12-04",
      people: "5 travelers",
      status: "Ideas",
      visibility: "private",
      budget: 6400,
      spent: 980
    }
  ],
  itinerary: [
    {
      id: "arrival",
      tripId: "mediterranean-sprint",
      day: 1,
      date: "Jun 14",
      time: "09:30",
      item: "Arrive in Barcelona, check in, and leave bags at the hotel.",
      city: "Barcelona",
      cost: 0
    },
    {
      id: "gothic-quarter",
      tripId: "mediterranean-sprint",
      day: 1,
      date: "Jun 14",
      time: "12:00",
      item: "Gothic Quarter walk with cafe stops and flexible photo time.",
      city: "Barcelona",
      cost: 28
    },
    {
      id: "sagrada-familia",
      tripId: "mediterranean-sprint",
      day: 2,
      date: "Jun 15",
      time: "15:30",
      item: "Sagrada Familia entry with audio guide and transit buffer.",
      city: "Barcelona",
      cost: 34
    },
    {
      id: "nice-train",
      tripId: "mediterranean-sprint",
      day: 3,
      date: "Jun 16",
      time: "10:20",
      item: "Train to Nice, old town walk, and beach hour.",
      city: "Nice",
      cost: 88
    },
    {
      id: "rome-pasta",
      tripId: "mediterranean-sprint",
      day: 6,
      date: "Jun 19",
      time: "19:00",
      item: "Rome pasta workshop and night stroll.",
      city: "Rome",
      cost: 62
    }
  ],
  activities: [
    {
      id: "gothic-quarter-walk",
      title: "Gothic Quarter Walk",
      city: "Barcelona",
      detail: "Historic lanes, plazas, local guide, and easy transit access.",
      cost: 28,
      tags: ["Culture", "2 hr", "$28", "Near transit"]
    },
    {
      id: "sunset-ferry",
      title: "Sunset Ferry",
      city: "Nice",
      detail: "Low-effort scenic break with strong group-photo potential.",
      cost: 34,
      tags: ["Scenic", "Relaxed", "$34", "Family"]
    },
    {
      id: "pasta-workshop",
      title: "Pasta Workshop",
      city: "Rome",
      detail: "Hands-on dinner activity that doubles as the evening meal.",
      cost: 62,
      tags: ["Food", "3 hr", "$62", "Evening"]
    },
    {
      id: "market-breakfast",
      title: "Market Breakfast",
      city: "Barcelona",
      detail: "Budget-friendly food crawl near morning sightseeing.",
      cost: 18,
      tags: ["Food", "1 hr", "$18", "Family"]
    },
    {
      id: "old-town-ramble",
      title: "Old Town Ramble",
      city: "Nice",
      detail: "Flexible walk with backup indoor stops if weather turns.",
      cost: 0,
      tags: ["Free", "Transit", "Rain safe"]
    },
    {
      id: "night-stroll",
      title: "Night Stroll",
      city: "Rome",
      detail: "Trevi, Pantheon, gelato, and a low-pressure final evening.",
      cost: 0,
      tags: ["Night", "Free", "Iconic"]
    }
  ],
  budget: {
    planned: 2840,
    limit: 4200,
    completion: 68,
    categories: [
      { name: "Flights", amount: 940, color: "#0F766E" },
      { name: "Hotels", amount: 1120, color: "#14B8A6" },
      { name: "Food", amount: 430, color: "#F59E0B" },
      { name: "Activities", amount: 350, color: "#60A5FA" }
    ],
    daily: [
      { day: "Day 1", amount: 315 },
      { day: "Day 2", amount: 420 },
      { day: "Day 3", amount: 610 },
      { day: "Day 4", amount: 290 },
      { day: "Day 5", amount: 380 },
      { day: "Day 6", amount: 525 },
      { day: "Day 7", amount: 300 }
    ],
    tip: "You are $1,360 under budget. You could add a food tour or keep the buffer for taxis.",
    expenses: [],
    payers: []
  },
  packing: [
    { id: "passport", item: "Passport", category: "Documents", done: true },
    { id: "insurance", item: "Travel insurance", category: "Documents", done: true },
    { id: "bookings", item: "Printed bookings", category: "Documents", done: false },
    { id: "shirts", item: "Breathable shirts", category: "Clothing", done: true },
    { id: "rain-jacket", item: "Rain jacket", category: "Clothing", done: false },
    { id: "shoes", item: "Comfortable shoes", category: "Clothing", done: true },
    { id: "adapter", item: "Power adapter", category: "Electronics", done: true },
    { id: "portable-charger", item: "Portable charger", category: "Electronics", done: false },
    { id: "camera", item: "Camera", category: "Electronics", done: false },
    { id: "medication", item: "Medication", category: "Health", done: true },
    { id: "sunscreen", item: "Sunscreen", category: "Health", done: false },
    { id: "travel-pillow-1778389119102", item: "Travel pillow", category: "Clothing", done: false }
  ],
  packingTemplate: { name: "Mediterranean city break", savedAt: "May 10, 2026" },
  mapPins: [
    {
      id: "barcelona",
      tripId: "mediterranean-sprint",
      city: "Barcelona",
      country: "Spain",
      countryCode: "ES",
      lat: 41.3851,
      lng: 2.1734,
      day: 1,
      summary: "Arrival, Gothic Quarter, Sagrada Familia, and tapas dinner."
    },
    {
      id: "nice",
      tripId: "mediterranean-sprint",
      city: "Nice",
      country: "France",
      countryCode: "FR",
      lat: 43.7102,
      lng: 7.262,
      day: 3,
      summary: "Old town walk, beach break, and sunset ferry."
    },
    {
      id: "rome",
      tripId: "mediterranean-sprint",
      city: "Rome",
      country: "Italy",
      countryCode: "IT",
      lat: 41.9028,
      lng: 12.4964,
      day: 6,
      summary: "Classic sights, pasta workshop, and night stroll."
    },
    {
      id: "delhi-1778390976627",
      tripId: "mediterranean-sprint",
      city: "delhi",
      country: "India",
      countryCode: "",
      lat: 42.06541904417826,
      lng: 3.586566908796229,
      day: 4,
      summary: "New place added to the route."
    }
  ],
  popularCities: [
    {
      city: "Lisbon",
      country: "Portugal",
      countryCode: "PT",
      image: "https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?auto=format&fit=crop&w=900&q=80"
    },
    {
      city: "Kyoto",
      country: "Japan",
      countryCode: "JP",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80"
    },
    {
      city: "Reykjavik",
      country: "Iceland",
      countryCode: "IS",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
    }
  ],
  recentActivities: [
    { id: "recent-budget", label: "Budget updated", detail: "Hotel split approved for Mediterranean Sprint.", time: "12 min ago" },
    { id: "recent-activity", label: "Activity added", detail: "Market Breakfast added to Day 2.", time: "1 hr ago" },
    { id: "recent-pack", label: "Packing changed", detail: "Portable charger added to Electronics.", time: "Yesterday" }
  ],
  weather: [
    { city: "Barcelona", temp: 24, condition: "Sunny", packing: ["Sunscreen", "Sunglasses"] },
    { city: "Nice", temp: 27, condition: "Warm breeze", packing: ["Swimwear", "Light shirt"] },
    { city: "Rome", temp: 29, condition: "Hot afternoon", packing: ["Water bottle", "Sun hat"] }
  ],
  groupPoll: {
    question: "What should we add to the free afternoon?",
    options: [
      { id: "food-tour", label: "Food tour", votes: 4 },
      { id: "museum-pass", label: "Museum pass", votes: 2 },
      { id: "beach-time", label: "Beach time", votes: 3 }
    ]
  },
  notes: [
    { id: "barcelona-arrival", title: "Barcelona arrival", body: "Keep first evening relaxed. Everyone wants a slow dinner after the flight.", day: 1 },
    { id: "food-shortlist", title: "Food shortlist", body: "Prioritize market lunches, one tasting menu, and a neighborhood bakery run.", day: 2 },
    { id: "group-preference", title: "Group preference", body: "Two museum mornings, more open afternoons, no activity before 9 AM.", day: 3 }
  ],
  analytics: {
    tripsCreated: "1.2k",
    sharedPublicly: "41%",
    averageCities: "3.7",
    averageBuildTime: "9m",
    usage: [
      { label: "Search", height: 72 },
      { label: "Budget", height: 58 },
      { label: "Builder", height: 84 },
      { label: "Packing", height: 46 },
      { label: "Sharing", height: 63 }
    ]
  }
};

// Helper to simulate network delay
const delay = (ms = 200) => new Promise(resolve => setTimeout(resolve, ms));

// ======================= ORIGINAL APP CODE (with mock API) =======================
let store = {
  user: null,
  trips: [],
  itinerary: [],
  activities: [],
  budget: null,
  packing: [],
  packingTemplate: null,
  mapPins: [],
  galleryPhotos: [],
  popularCities: [],
  recentActivities: [],
  weather: [],
  groupPoll: null,
  notes: [],
  savedDestinations: [],
  analytics: null
};

let selectedMapPin = null;
let selectedDay = 1;
let selectedItineraryView = "list";
let searchTerm = "";
let citySearchTerm = "";
let selectedRegion = "all";
const collapsedDays = new Set();
const collapsedPacking = new Set();
let flashId = "";
let votedPoll = localStorage.getItem("traveloop_poll_vote") || "";
let signedIn = false;
let leafletMap = null;
let leafletRouteLayer = null;
let editingTripId = "";
let selectedGalleryTripId = "all";

const views = [...document.querySelectorAll("[data-view]")];
const sidebar = document.querySelector(".sidebar");
const toast = document.getElementById("toast");

// ---------- MOCK API FUNCTION (replaces real fetch) ----------
async function api(path, options = {}) {
  await delay(); // simulate network latency

  // ---- AUTHENTICATION ----
  if (path === "/api/auth/me") {
    const isLoggedIn = localStorage.getItem("traveloop_logged_in") === "true";
    if (isLoggedIn && MOCK_DB.user) {
      return { user: MOCK_DB.user };
    } else {
      throw new Error("Not authenticated");
    }
  }

  if (path === "/api/auth/login" && options.method === "POST") {
    const body = JSON.parse(options.body);
    if (body.email === "mohd@example.com" && body.password === "traveloop") {
      localStorage.setItem("traveloop_logged_in", "true");
      return { user: MOCK_DB.user };
    }
    throw new Error("Invalid email or password");
  }

  if (path === "/api/auth/signup" && options.method === "POST") {
    localStorage.setItem("traveloop_logged_in", "true");
    // For demo, just return the existing user
    return { user: MOCK_DB.user };
  }

  if (path === "/api/auth/logout" && options.method === "POST") {
    localStorage.removeItem("traveloop_logged_in");
    return {};
  }

  // ---- DATA ENDPOINTS ----
  if (path === "/api/bootstrap") {
    return MOCK_DB;
  }

  if (path === "/api/map-pins") {
    if (!options.method || options.method === "GET") {
      return MOCK_DB.mapPins;
    }
    if (options.method === "POST") {
      const newPin = {
        id: `mock-pin-${Date.now()}`,
        tripId: "mediterranean-sprint",
        ...JSON.parse(options.body),
        lat: 41 + Math.random() * 5,
        lng: 2 + Math.random() * 11
      };
      MOCK_DB.mapPins.push(newPin);
      return newPin;
    }
  }

  if (path === "/api/trips") {
    if (!options.method || options.method === "GET") {
      return MOCK_DB.trips;
    }
    if (options.method === "POST") {
      const newTrip = {
        id: `mock-trip-${Date.now()}`,
        ...JSON.parse(options.body),
        status: "Draft",
        visibility: "private",
        spent: 0
      };
      MOCK_DB.trips.unshift(newTrip);
      return newTrip;
    }
  }

  if (path.match(/^\/api\/trips\/.+/)) {
    // For PATCH, DELETE – just return success
    return { success: true };
  }

  if (path === "/api/itinerary") {
    if (options.method === "POST") {
      const newItem = {
        id: `mock-itin-${Date.now()}`,
        tripId: "mediterranean-sprint",
        ...JSON.parse(options.body)
      };
      MOCK_DB.itinerary.push(newItem);
      return newItem;
    }
  }

  if (path.match(/^\/api\/itinerary\/.+\/move$/)) {
    // Return updated itinerary array
    return MOCK_DB.itinerary;
  }

  if (path.match(/^\/api\/itinerary\/.+/)) {
    if (options.method === "DELETE") {
      // In a real app we'd remove; here just return success
      return {};
    }
  }

  if (path === "/api/packing") {
    if (options.method === "POST") {
      const newItem = {
        id: `mock-pack-${Date.now()}`,
        ...JSON.parse(options.body),
        done: false
      };
      MOCK_DB.packing.push(newItem);
      return newItem;
    }
  }

  if (path.match(/^\/api\/packing\/.+/)) {
    if (options.method === "PATCH") {
      const { done } = JSON.parse(options.body);
      // We'll just return an updated item (no need to persist in mock)
      return { id: path.split("/").pop(), done };
    }
    if (options.method === "DELETE") {
      return {};
    }
  }

  if (path === "/api/packing/template" && options.method === "PATCH") {
    const { name } = JSON.parse(options.body);
    MOCK_DB.packingTemplate = { name, savedAt: new Date().toLocaleString() };
    return MOCK_DB.packingTemplate;
  }

  if (path === "/api/budget" && options.method === "PATCH") {
    const { limit } = JSON.parse(options.body);
    MOCK_DB.budget.limit = limit;
    MOCK_DB.budget.planned = Math.min(limit, MOCK_DB.budget.planned);
    return MOCK_DB.budget;
  }

  if (path === "/api/budget/expenses" && options.method === "POST") {
    const expense = {
      id: `exp-${Date.now()}`,
      ...JSON.parse(options.body)
    };
    MOCK_DB.budget.expenses = MOCK_DB.budget.expenses || [];
    MOCK_DB.budget.expenses.push(expense);
    // Recalculate planned amount
    MOCK_DB.budget.planned = MOCK_DB.budget.categories.reduce((sum, cat) => sum + cat.amount, 0) +
      expense.amount;
    return MOCK_DB.budget;
  }

  if (path.match(/^\/api\/budget\/expenses\/.+/)) {
    if (options.method === "DELETE") {
      // Simulate removal
      return MOCK_DB.budget;
    }
  }

  if (path === "/api/gallery" && options.method === "POST") {
    const photo = {
      id: `mock-photo-${Date.now()}`,
      ...JSON.parse(options.body),
      createdAt: new Date().toISOString()
    };
    MOCK_DB.galleryPhotos = MOCK_DB.galleryPhotos || [];
    MOCK_DB.galleryPhotos.unshift(photo);
    return photo;
  }

  if (path.match(/^\/api\/gallery\/.+/)) {
    if (options.method === "DELETE") {
      return {};
    }
  }

  if (path === "/api/notes" && options.method === "POST") {
    const note = {
      id: `mock-note-${Date.now()}`,
      ...JSON.parse(options.body),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    MOCK_DB.notes.unshift(note);
    return note;
  }

  if (path.match(/^\/api\/notes\/.+/)) {
    if (options.method === "PATCH") {
      const update = JSON.parse(options.body);
      return { id: path.split("/").pop(), ...update, updatedAt: new Date().toISOString() };
    }
    if (options.method === "DELETE") {
      return {};
    }
  }

  if (path === "/api/user/profile" && options.method === "PATCH") {
    Object.assign(MOCK_DB.user, JSON.parse(options.body));
    return MOCK_DB.user;
  }

  if (path === "/api/user/privacy" && options.method === "PATCH") {
    const { privacy } = JSON.parse(options.body);
    MOCK_DB.user.privacy = privacy;
    return { privacy };
  }

  if (path === "/api/user/account" && options.method === "DELETE") {
    localStorage.removeItem("traveloop_logged_in");
    return {};
  }

  if (path === "/api/group-poll/vote" && options.method === "POST") {
    const { id, previousId } = JSON.parse(options.body);
    // Update votes in the mock poll
    const poll = MOCK_DB.groupPoll;
    if (previousId) {
      const prevOpt = poll.options.find(o => o.id === previousId);
      if (prevOpt) prevOpt.votes = Math.max(0, prevOpt.votes - 1);
    }
    const newOpt = poll.options.find(o => o.id === id);
    if (newOpt) newOpt.votes += 1;
    return poll;
  }

  // Fallback for any other endpoints – return empty object
  console.warn("Unhandled API call:", path, options);
  return {};
}

// ---------- THE REST OF THE ORIGINAL APP.JS (unchanged) ----------
function showSkeletons() {
  const skeleton = '<div class="skeleton-card"></div><div class="skeleton-card"></div><div class="skeleton-card"></div>';
  document.querySelector(".trip-card-row").innerHTML = skeleton;
  document.querySelector(".trip-list").innerHTML = skeleton;
  document.getElementById("activityCards").innerHTML = skeleton;
}

async function loadData() {
  applyTheme(localStorage.getItem("traveloop_theme") || "ocean");
  showSkeletons();
  const bootstrap = await api("/api/bootstrap");
  const mapPins = await api("/api/map-pins").catch(() => bootstrap.mapPins || []);
  store = { ...bootstrap, mapPins };
  mergeLocalCollections();
  selectedMapPin = store.mapPins[0]?.id || null;
  renderAll();
}

async function checkSession() {
  applyTheme(localStorage.getItem("traveloop_theme") || "ocean");
  try {
    const result = await api("/api/auth/me");
    signedIn = true;
    store.user = result.user;
    document.body.classList.remove("auth-screen");
    document.body.classList.add("authenticated");
    return true;
  } catch {
    signedIn = false;
    document.body.classList.add("auth-screen");
    document.body.classList.remove("authenticated");
    return false;
  }
}

function setRoute(route) {
  const requested = route || "dashboard";
  const next = !signedIn && requested !== "login" ? "login" : requested;
  views.forEach((view) => view.classList.toggle("active", view.dataset.view === next));
  document.querySelectorAll("[data-route]").forEach((item) => {
    item.classList.toggle("active", item.dataset.route === next);
  });
  document.body.classList.remove("nav-open");
  if (location.hash.slice(1) !== next) {
    history.replaceState(null, "", `#${next}`);
  }
  if (next === "map") {
    window.setTimeout(() => leafletMap?.invalidateSize(), 80);
  }
}

document.addEventListener("click", async (event) => {
  const routeButton = event.target.closest("[data-route]");
  if (routeButton) {
    event.preventDefault();
    setRoute(routeButton.dataset.route);
    return;
  }

  const chip = event.target.closest("[data-chip]");
  if (chip) {
    chip.classList.toggle("selected");
    return;
  }

  const themeButton = event.target.closest("[data-theme-choice]");
  if (themeButton) {
    applyTheme(themeButton.dataset.themeChoice);
    showToast(`${themeButton.textContent} theme applied.`);
    return;
  }

  const itineraryView = event.target.closest("[data-itinerary-view]");
  if (itineraryView) {
    selectedItineraryView = itineraryView.dataset.itineraryView;
    renderItinerary();
    showToast(`${itineraryView.textContent} view enabled.`);
    return;
  }

  const dayButton = event.target.closest("[data-day]");
  if (dayButton) {
    selectedDay = Number(dayButton.dataset.day);
    showToast(`New activities will be added to Day ${selectedDay}.`);
    renderItinerary();
    return;
  }

  const toggleDay = event.target.closest("[data-toggle-day]");
  if (toggleDay) {
    toggleSet(collapsedDays, Number(toggleDay.dataset.toggleDay));
    renderItinerary();
    return;
  }

  const togglePacking = event.target.closest("[data-toggle-packing]");
  if (togglePacking) {
    toggleSet(collapsedPacking, togglePacking.dataset.togglePacking);
    renderPacking();
    return;
  }

  const bulkPack = event.target.closest("[data-bulk-pack]");
  if (bulkPack) {
    await bulkUpdatePacking(bulkPack.dataset.category, bulkPack.dataset.bulkPack === "check");
    return;
  }

  const addSuggestion = event.target.closest("[data-add-itinerary]");
  if (addSuggestion) {
    await addItineraryItem(addSuggestion.dataset.addItinerary);
    return;
  }

  const addActivity = event.target.closest("[data-add-activity]");
  if (addActivity) {
    const activity = store.activities.find((entry) => entry.id === addActivity.dataset.addActivity);
    if (activity) await addItineraryItem(activity.title, activity.cost, activity.city);
    return;
  }

  const addCity = event.target.closest("[data-add-city]");
  if (addCity) {
    const city = store.popularCities.find((entry) => entry.city === addCity.dataset.addCity);
    if (city) {
      await addMapPinFromCity(city);
      await addItineraryItem(`Explore ${city.city} highlights`, 0, city.city, "Flexible", selectedDay);
    }
    return;
  }

  const weatherPack = event.target.closest("[data-weather-pack]");
  if (weatherPack) {
    await addWeatherPacking(weatherPack.dataset.weatherPack);
    return;
  }

  const pollVote = event.target.closest("[data-poll-vote]");
  if (pollVote) {
    votePoll(pollVote.dataset.pollVote);
    return;
  }

  const assistantAction = event.target.closest("[data-assistant-action]");
  if (assistantAction) {
    runAssistantAction(assistantAction.dataset.assistantAction);
    return;
  }

  const removePacking = event.target.closest("[data-remove-packing]");
  if (removePacking) {
    await removePackingItem(removePacking.dataset.removePacking);
    return;
  }

  const deleteTrip = event.target.closest("[data-delete-trip]");
  if (deleteTrip) {
    await removeTrip(deleteTrip.dataset.deleteTrip);
    return;
  }

  const removeExpense = event.target.closest("[data-remove-expense]");
  if (removeExpense) {
    await removeBudgetExpense(removeExpense.dataset.removeExpense);
    return;
  }

  const editTrip = event.target.closest("[data-edit-trip]");
  if (editTrip) {
    startTripEdit(editTrip.dataset.editTrip);
    return;
  }

  const removeItinerary = event.target.closest("[data-remove-itinerary]");
  if (removeItinerary) {
    await removeItineraryItem(removeItinerary.dataset.removeItinerary);
    return;
  }

  const moveItinerary = event.target.closest("[data-move-itinerary]");
  if (moveItinerary) {
    await moveItineraryItem(moveItinerary.dataset.moveItinerary, moveItinerary.dataset.direction);
    return;
  }

  const editNoteButton = event.target.closest("[data-edit-note]");
  if (editNoteButton) {
    startNoteEdit(editNoteButton.dataset.editNote);
    return;
  }

  const removeNoteButton = event.target.closest("[data-remove-note]");
  if (removeNoteButton) {
    await removeNote(removeNoteButton.dataset.removeNote);
    return;
  }

  const removePin = event.target.closest("[data-remove-pin]");
  if (removePin) {
    await removeMapPin(removePin.dataset.removePin);
    return;
  }

  const removeGalleryPhoto = event.target.closest("[data-remove-gallery-photo]");
  if (removeGalleryPhoto) {
    await removeGalleryPhotoItem(removeGalleryPhoto.dataset.removeGalleryPhoto);
    return;
  }

  const tripGallery = event.target.closest("[data-trip-gallery]");
  if (tripGallery) {
    selectedGalleryTripId = tripGallery.dataset.tripGallery;
    renderGallery();
    setRoute("gallery");
    return;
  }

  const mapPin = event.target.closest("[data-map-pin]");
  if (mapPin) {
    selectedMapPin = mapPin.dataset.mapPin;
    renderMap();
    return;
  }

  if (event.target.closest("[data-print-page]")) {
    window.print();
    return;
  }

  if (event.target.closest("[data-save-template]")) {
    await savePackingTemplate();
    return;
  }

  if (event.target.closest("[data-reset-packing]")) {
    await resetPackingChecklist();
    return;
  }

  if (event.target.closest("[data-copy-trip]")) {
    await copyPublicTrip();
    return;
  }

  if (event.target.closest("[data-share-social]")) {
    const shareData = { title: "Traveloop itinerary", text: "Check out this multi-city trip plan.", url: `${location.origin}${location.pathname}#share` };
    if (navigator.share) await navigator.share(shareData).catch(() => {});
    else navigator.clipboard?.writeText(shareData.url).catch(() => {});
    showToast("Share link ready.");
    return;
  }

  if (event.target.closest("[data-show-notifications]")) {
    showToast("3 reminders: review budget, confirm Rome dinner, finish documents.");
    return;
  }

  if (event.target.closest("[data-logout]")) {
    await logout();
    return;
  }

  const authAction = event.target.closest("[data-auth-action]");
  if (authAction && authAction.dataset.authAction === "signup") {
    await submitAuth("signup");
    return;
  }

  if (event.target.closest("[data-forgot-password]")) {
    await requestPasswordReset();
    return;
  }

  if (event.target.closest("[data-cancel-note-edit]")) {
    resetNoteForm();
    return;
  }

  if (event.target.closest("#deleteAccountButton")) {
    await deleteAccount();
    return;
  }

  if (document.body.classList.contains("nav-open") && !sidebar.contains(event.target) && event.target.id !== "menuButton") {
    document.body.classList.remove("nav-open");
  }
});

document.getElementById("menuButton").addEventListener("click", () => {
  document.body.classList.toggle("nav-open");
});

document.querySelector(".global-search input").addEventListener("input", (event) => {
  searchTerm = event.target.value.trim().toLowerCase();
  renderTrips();
  renderCities();
  renderActivities();
  renderGallery();
});

document.querySelector(".global-search input").addEventListener("keydown", (event) => {
  if (event.key === "Enter") setRoute("search");
});

document.querySelectorAll("[data-activity-filter]").forEach((input) => {
  input.addEventListener("change", renderActivities);
});

document.getElementById("citySearchInput").addEventListener("input", (event) => {
  citySearchTerm = event.target.value.trim().toLowerCase();
  renderCities();
});

document.getElementById("regionFilter").addEventListener("change", (event) => {
  selectedRegion = event.target.value;
  renderCities();
});

document.getElementById("authForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  await submitAuth("login");
});

document.getElementById("createTripForm").addEventListener("submit", (event) => event.preventDefault());

document.querySelector("[data-create-trip]").addEventListener("click", async () => {
  const field = (name) => document.querySelector(`[data-trip-field="${name}"]`).value.trim();
  const name = field("name");
  const destination = field("destination");
  const dates = field("dates");
  const travelers = field("travelers");
  const budget = field("budget");
  const startDate = field("startDate");
  const description = field("description");
  const coverPhoto = await fileToDataUrl(document.getElementById("coverPhotoInput").files[0]);
  const button = document.querySelector("[data-create-trip]");

  if (name.length < 3 || destination.length < 3 || dates.length < 3) {
    showToast("Please add a trip name, destination, and dates.");
    markInvalidFields();
    return;
  }

  button.textContent = "Saving...";
  button.disabled = true;

  try {
    const trip = await api(editingTripId ? `/api/trips/${editingTripId}` : "/api/trips", {
      method: editingTripId ? "PATCH" : "POST",
      body: JSON.stringify({ name, destination, dates, travelers, budget, startDate, description, coverPhoto })
    });
    if (editingTripId) {
      store.trips = store.trips.map((entry) => (entry.id === editingTripId ? trip : entry));
    } else {
      store.trips.unshift(trip);
    }
    flashId = trip.id;
    editingTripId = "";
    renderDashboard();
    renderTrips();
    showToast(`${trip.name} saved to My trips.`);
    setRoute("trips");
    clearFlashSoon();
  } finally {
    button.textContent = "Generate itinerary";
    button.disabled = false;
  }
});

document.getElementById("profileForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const avatar = await fileToDataUrl(document.getElementById("avatarUpload").files[0]);
  const user = await api("/api/user/profile", {
    method: "PATCH",
    body: JSON.stringify({
      name: document.getElementById("profileName").value,
      email: document.getElementById("profileEmail").value,
      language: document.getElementById("profileLanguage").value,
      avatar: avatar || store.user.avatar || ""
    })
  });
  store.user = user;
  renderUser();
  renderProfile();
  showToast("Profile saved.");
});

document.getElementById("budgetLimitForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const limit = Number(document.getElementById("budgetLimitInput").value || 0);
  if (limit <= 0) return showToast("Add a valid budget limit.");
  store.budget = await api("/api/budget", {
    method: "PATCH",
    body: JSON.stringify({ limit })
  });
  renderBudget();
  renderDashboard();
  showToast("Budget limit updated.");
});

document.getElementById("budgetExpenseForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const payload = {
    title: document.getElementById("expenseTitle").value.trim(),
    category: document.getElementById("expenseCategory").value,
    amount: Number(document.getElementById("expenseAmount").value || 0),
    payer: document.getElementById("expensePayer").value.trim() || store.user?.name || "Group",
    day: Number(document.getElementById("expenseDay").value || 1),
    splitCount: Number(document.getElementById("expenseSplit").value || 1)
  };
  if (!payload.title || payload.amount <= 0) return showToast("Add an expense name and amount.");
  store.budget = await api("/api/budget/expenses", {
    method: "POST",
    body: JSON.stringify(payload)
  });
  event.target.reset();
  document.getElementById("expenseDay").value = String(payload.day);
  document.getElementById("expenseSplit").value = String(payload.splitCount);
  renderBudget();
  renderDashboard();
  showToast(`${payload.title} added to budget.`);
});

document.getElementById("packingForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const input = document.getElementById("packingInput");
  const category = document.getElementById("packingCategory").value;
  const item = input.value.trim();
  if (!item) return;

  const entry = await api("/api/packing", {
    method: "POST",
    body: JSON.stringify({ item, category })
  });

  store.packing.push(entry);
  flashId = entry.id;
  input.value = "";
  renderPacking();
  showToast(`${entry.item} added to ${entry.category}.`);
  clearFlashSoon();
});

document.getElementById("itineraryForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const item = document.getElementById("itineraryItem").value.trim();
  const day = Number(document.getElementById("itineraryDay").value || selectedDay);
  const time = document.getElementById("itineraryTime").value.trim() || "Flexible";
  const date = document.getElementById("itineraryDate").value.trim();
  const city = document.getElementById("itineraryCity").value.trim();
  const cost = Number(document.getElementById("itineraryCost").value || 0);
  if (!item) return showToast("Add an itinerary item first.");
  selectedDay = day;
  await addItineraryItem(item, cost, city, time, day, date);
  document.getElementById("itineraryItem").value = "";
});

document.getElementById("mapPinForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = document.getElementById("pinCity").value.trim();
  const country = document.getElementById("pinCountry").value.trim();
  const day = Number(document.getElementById("pinDay").value || 1);
  const summary = document.getElementById("pinSummary").value.trim();
  if (!city) return showToast("Add a city for the map pin.");
  const pin = await saveWithFallback(
    "/api/map-pins",
    { city, country, day, summary },
    {
      id: `local-pin-${Date.now()}`,
      tripId: "mediterranean-sprint",
      city,
      country: country || "Planned stop",
      countryCode: "",
      lat: 41 + Math.random() * 5,
      lng: 2 + Math.random() * 11,
      day,
      summary: summary || "New place added to the route."
    },
    "mapPins"
  );
  store.mapPins.push(pin);
  selectedMapPin = pin.id;
  renderMap();
  renderDashboard();
  showToast(`${pin.city} added to the map.`);
  event.target.reset();
  document.getElementById("pinDay").value = String(day + 1);
});

document.getElementById("galleryTripSelect").addEventListener("change", (event) => {
  selectedGalleryTripId = event.target.value;
  renderGallery();
});

document.getElementById("galleryForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const file = document.getElementById("galleryImageInput").files[0];
  const tripId = document.getElementById("galleryTripSelect").value === "all"
    ? store.trips[0]?.id
    : document.getElementById("galleryTripSelect").value;
  if (!tripId) return showToast("Create a trip before adding gallery photos.");
  if (!file) return showToast("Choose a tour photo first.");
  if (file.size > 2.5 * 1024 * 1024) return showToast("Use an image under 2.5MB for this demo.");
  const image = await fileToDataUrl(file);
  const photo = await api("/api/gallery", {
    method: "POST",
    body: JSON.stringify({
      tripId,
      image,
      caption: document.getElementById("galleryCaption").value.trim(),
      location: document.getElementById("galleryLocation").value.trim(),
      capturedAt: document.getElementById("galleryDate").value
    })
  });
  store.galleryPhotos.unshift(photo);
  selectedGalleryTripId = photo.tripId;
  flashId = photo.id;
  event.target.reset();
  renderGallery();
  showToast("Tour photo saved to gallery.");
  clearFlashSoon();
});

document.getElementById("noteForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const id = document.getElementById("noteId").value;
  const day = Number(document.getElementById("noteDay").value || 1);
  const title = document.getElementById("noteTitle").value.trim();
  const body = document.getElementById("noteBody").value.trim();
  if (!title || !body) return showToast("Add a note title and body.");
  if (id) {
    const note = await api(`/api/notes/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ title, body, day })
    });
    store.notes = store.notes.map((entry) => (entry.id === id ? note : entry));
    flashId = note.id;
    renderNotes();
    resetNoteForm();
    showToast("Note updated.");
    clearFlashSoon();
    return;
  }
  const note = await saveWithFallback(
    "/api/notes",
    { title, body, day },
    { id: `local-note-${Date.now()}`, tripId: "mediterranean-sprint", day, title, body, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    "notes"
  );
  store.notes.unshift(note);
  flashId = note.id;
  renderNotes();
  showToast("Note added.");
  event.target.reset();
  clearFlashSoon();
});

document.getElementById("privacyToggle").addEventListener("change", async (event) => {
  const privacy = event.target.checked ? "public" : "private";
  const result = await api("/api/user/privacy", {
    method: "PATCH",
    body: JSON.stringify({ privacy })
  });
  store.user.privacy = result.privacy;
  renderProfile();
  showToast(`Default trips are now ${result.privacy}.`);
});

document.getElementById("deleteConfirm").addEventListener("input", (event) => {
  document.getElementById("deleteAccountButton").disabled = event.target.value !== "DELETE";
});

async function submitAuth(action) {
  const payload = {
    name: document.getElementById("authName").value.trim(),
    email: document.getElementById("authEmail").value.trim(),
    password: document.getElementById("authPassword").value.trim()
  };
  if (!payload.email || !payload.password) return showToast("Email and password are required.");
  const endpoint = action === "signup" ? "/api/auth/signup" : "/api/auth/login";
  try {
    const result = await api(endpoint, { method: "POST", body: JSON.stringify(payload) });
    store.user = result.user;
    signedIn = true;
    document.body.classList.remove("auth-screen");
    document.body.classList.add("authenticated");
    await loadData();
    setRoute("dashboard");
    showToast(action === "signup" ? "Account created." : "Signed in.");
  } catch (error) {
    showToast(error.message || "Authentication failed.");
  }
}

async function logout() {
  await api("/api/auth/logout", { method: "POST" }).catch(() => null);
  signedIn = false;
  store = {
    user: null,
    trips: [],
    itinerary: [],
    activities: [],
    budget: null,
    packing: [],
    packingTemplate: null,
    mapPins: [],
    galleryPhotos: [],
    popularCities: [],
    recentActivities: [],
    weather: [],
    groupPoll: null,
    notes: [],
    savedDestinations: [],
    analytics: null
  };
  document.body.classList.add("auth-screen");
  document.body.classList.remove("authenticated", "nav-open");
  setRoute("login");
  showToast("Logged out securely.");
}

async function requestPasswordReset() {
  const email = document.getElementById("authEmail").value.trim();
  if (!email) return showToast("Add your email first.");
  await api("/api/auth/forgot", {
    method: "POST",
    body: JSON.stringify({ email })
  });
  showToast("If that email exists, a reset link is prepared.");
}

async function deleteAccount() {
  const confirmation = document.getElementById("deleteConfirm").value;
  if (confirmation !== "DELETE") return showToast("Type DELETE to confirm account removal.");
  document.getElementById("deleteAccountButton").disabled = true;
  await api("/api/user/account", { method: "DELETE" });
  signedIn = false;
  store = {
    user: null,
    trips: [],
    itinerary: [],
    activities: [],
    budget: null,
    packing: [],
    packingTemplate: null,
    mapPins: [],
    galleryPhotos: [],
    popularCities: [],
    recentActivities: [],
    weather: [],
    groupPoll: null,
    notes: [],
    savedDestinations: [],
    analytics: null
  };
  localStorage.removeItem("traveloop_poll_vote");
  document.body.classList.add("auth-screen");
  document.body.classList.remove("authenticated", "nav-open");
  setRoute("login");
  showToast("Account deleted. You can create a new one anytime.");
}

function fileToDataUrl(file) {
  if (!file) return Promise.resolve("");
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function addMapPinFromCity(city) {
  const pin = await saveWithFallback(
    "/api/map-pins",
    {
      city: city.city,
      country: city.country,
      countryCode: city.countryCode,
      day: selectedDay,
      summary: `${city.city} added from city search. Popularity ${city.popularity || "high"}, cost index ${city.costIndex || "$$"}.`
    },
    {
      id: `local-pin-${Date.now()}`,
      tripId: "mediterranean-sprint",
      city: city.city,
      country: city.country,
      countryCode: city.countryCode,
      lat: 41 + Math.random() * 5,
      lng: 2 + Math.random() * 11,
      day: selectedDay,
      summary: `${city.city} added from city search.`
    },
    "mapPins"
  );
  store.mapPins.push(pin);
  selectedMapPin = pin.id;
  renderMap();
  renderDashboard();
  showToast(`${city.city} added to the trip map.`);
}

async function addItineraryItem(item, cost = 0, city = "", time = "Flexible", day = selectedDay, date = "") {
  const entry = await saveWithFallback(
    "/api/itinerary",
    { item, day, date, time, cost, city },
    { id: `local-itinerary-${Date.now()}`, tripId: "mediterranean-sprint", day, date, time, item, city, cost },
    "itinerary"
  );
  store.itinerary.push(entry);
  flashId = entry.id;
  renderItinerary();
  renderPublicPlan();
  renderDashboard();
  showToast(`${entry.item} added to Day ${entry.day}.`);
  setRoute("itinerary");
  clearFlashSoon();
}

async function moveItineraryItem(id, direction) {
  const moved = await api(`/api/itinerary/${id}/move`, {
    method: "PATCH",
    body: JSON.stringify({ direction })
  });
  store.itinerary = moved;
  renderItinerary();
  showToast("Itinerary order updated.");
}

async function removeItineraryItem(id) {
  await api(`/api/itinerary/${id}`, { method: "DELETE" }).catch(() => removeLocalItem("itinerary", id));
  store.itinerary = store.itinerary.filter((entry) => entry.id !== id);
  renderItinerary();
  renderPublicPlan();
  showToast("Itinerary stop removed.");
}

async function removeNote(id) {
  await api(`/api/notes/${id}`, { method: "DELETE" }).catch(() => removeLocalItem("notes", id));
  store.notes = store.notes.filter((note) => note.id !== id);
  renderNotes();
  showToast("Note removed.");
}

function startNoteEdit(id) {
  const note = store.notes.find((entry) => entry.id === id);
  if (!note) return;
  document.getElementById("noteId").value = note.id;
  document.getElementById("noteDay").value = note.day || 1;
  document.getElementById("noteTitle").value = note.title;
  document.getElementById("noteBody").value = note.body;
  document.getElementById("noteSubmitButton").textContent = "Save note";
  document.getElementById("noteTitle").focus();
}

function resetNoteForm() {
  document.getElementById("noteId").value = "";
  document.getElementById("noteDay").value = "1";
  document.getElementById("noteTitle").value = "";
  document.getElementById("noteBody").value = "";
  document.getElementById("noteSubmitButton").textContent = "Add note";
}

async function removeMapPin(id) {
  await api(`/api/map-pins/${id}`, { method: "DELETE" }).catch(() => removeLocalItem("mapPins", id));
  store.mapPins = store.mapPins.filter((pin) => pin.id !== id);
  selectedMapPin = store.mapPins[0]?.id || null;
  renderMap();
  renderDashboard();
  showToast("Map pin removed.");
}

async function removeGalleryPhotoItem(id) {
  await api(`/api/gallery/${id}`, { method: "DELETE" });
  store.galleryPhotos = store.galleryPhotos.filter((photo) => photo.id !== id);
  renderGallery();
  showToast("Gallery photo removed.");
}

async function saveWithFallback(path, payload, fallback, localKey) {
  try {
    return await api(path, {
      method: "POST",
      body: JSON.stringify(payload)
    });
  } catch {
    addLocalItem(localKey, fallback);
    return fallback;
  }
}

function mergeLocalCollections() {
  for (const key of ["itinerary", "notes", "mapPins"]) {
    const localItems = readLocalItems(key);
    const ids = new Set(store[key].map((item) => item.id));
    store[key] = [...store[key], ...localItems.filter((item) => !ids.has(item.id))];
  }
}

function readLocalItems(key) {
  try {
    return JSON.parse(localStorage.getItem(`traveloop_${key}`) || "[]");
  } catch {
    return [];
  }
}

function addLocalItem(key, item) {
  const next = [...readLocalItems(key), item];
  localStorage.setItem(`traveloop_${key}`, JSON.stringify(next));
}

function removeLocalItem(key, id) {
  const next = readLocalItems(key).filter((item) => item.id !== id);
  localStorage.setItem(`traveloop_${key}`, JSON.stringify(next));
}

async function bulkUpdatePacking(category, done) {
  const items = store.packing.filter((entry) => entry.category === category);
  await Promise.all(
    items.map((entry) =>
      api(`/api/packing/${entry.id}`, {
        method: "PATCH",
        body: JSON.stringify({ done })
      })
    )
  );
  items.forEach((entry) => {
    entry.done = done;
  });
  renderPacking();
  showToast(`${category} marked ${done ? "packed" : "unpacked"}.`);
}

async function resetPackingChecklist() {
  await Promise.all(
    store.packing.map((entry) =>
      api(`/api/packing/${entry.id}`, {
        method: "PATCH",
        body: JSON.stringify({ done: false })
      })
    )
  );
  store.packing.forEach((entry) => {
    entry.done = false;
  });
  renderPacking();
  showToast("Checklist reset for reuse.");
}

async function savePackingTemplate() {
  const source = store.trips[0]?.name || "Last used";
  const template = await api("/api/packing/template", {
    method: "PATCH",
    body: JSON.stringify({ name: `${source} checklist` })
  });
  store.packingTemplate = template;
  renderPacking();
  showToast(`${template.name} saved for future trips.`);
}

async function removeBudgetExpense(id) {
  store.budget = await api(`/api/budget/expenses/${id}`, { method: "DELETE" });
  renderBudget();
  renderDashboard();
  showToast("Expense removed and totals updated.");
}

async function removeTrip(id) {
  await api(`/api/trips/${id}`, { method: "DELETE" });
  store.trips = store.trips.filter((trip) => trip.id !== id);
  store.galleryPhotos = store.galleryPhotos.filter((photo) => photo.tripId !== id);
  if (selectedGalleryTripId === id) selectedGalleryTripId = "all";
  renderDashboard();
  renderTrips();
  renderGallery();
  showToast("Trip deleted.");
}

async function copyPublicTrip() {
  const source = store.trips[0];
  if (!source) return showToast("No public trip to copy yet.");
  const trip = await api("/api/trips", {
    method: "POST",
    body: JSON.stringify({
      name: `${source.name} Copy`,
      destination: source.route,
      dates: source.dates,
      travelers: source.people,
      budget: source.budget,
      startDate: source.startDate,
      description: source.description || "Copied from a public Traveloop itinerary.",
      coverPhoto: source.coverPhoto || ""
    })
  });
  store.trips.unshift(trip);
  flashId = trip.id;
  renderDashboard();
  renderTrips();
  setRoute("trips");
  showToast("Trip copied into My trips.");
  clearFlashSoon();
}

function startTripEdit(id) {
  const trip = store.trips.find((entry) => entry.id === id);
  if (!trip) return;
  const setField = (name, value) => {
    const input = document.querySelector(`[data-trip-field="${name}"]`);
    if (input) input.value = value || "";
  };
  setField("name", trip.name);
  setField("destination", trip.route);
  setField("dates", trip.dates);
  setField("travelers", trip.people);
  setField("budget", trip.budget);
  setField("startDate", trip.startDate);
  setField("description", trip.description);
  editingTripId = id;
  setRoute("create");
  showToast("Trip details loaded. Save to update this trip.");
}

async function removePackingItem(id) {
  await api(`/api/packing/${id}`, { method: "DELETE" });
  store.packing = store.packing.filter((entry) => entry.id !== id);
  renderPacking();
  showToast("Packing item removed.");
}

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  localStorage.setItem("traveloop_theme", theme);
  document.querySelectorAll("[data-theme-choice]").forEach((button) => {
    button.classList.toggle("active", button.dataset.themeChoice === theme);
  });
}

async function addWeatherPacking(city) {
  const weather = store.weather.find((entry) => entry.city === city);
  if (!weather) return;
  const existing = new Set(store.packing.map((entry) => entry.item.toLowerCase()));
  const added = [];

  for (const item of weather.packing) {
    if (existing.has(item.toLowerCase())) continue;
    const entry = await api("/api/packing", {
      method: "POST",
      body: JSON.stringify({ item, category: "Weather" })
    });
    store.packing.push(entry);
    added.push(entry.item);
  }

  renderPacking();
  showToast(added.length ? `${added.join(", ")} added for ${city}.` : `${city} suggestions are already packed.`);
}

async function votePoll(id) {
  const previousId = votedPoll;
  const poll = await api("/api/group-poll/vote", {
    method: "POST",
    body: JSON.stringify({ id, previousId })
  });
  store.groupPoll = poll;
  votedPoll = id;
  localStorage.setItem("traveloop_poll_vote", id);
  renderDashboard();
  showToast("Vote saved for the group.");
}

function runAssistantAction(action) {
  if (action === "packing") {
    setRoute("packing");
    showToast("Opened packing. Weather suggestions are ready.");
  }
  if (action === "budget") {
    setRoute("budget");
    showToast("Opened budget with savings tip.");
  }
  if (action === "share") {
    const url = `${location.origin}${location.pathname}#share`;
    navigator.clipboard?.writeText(url).catch(() => {});
    showToast("Share link copied.");
  }
}

function renderAll() {
  renderUser();
  renderDashboard();
  renderTrips();
  renderItinerary();
  renderCities();
  renderActivities();
  renderBudget();
  renderPacking();
  renderMap();
  renderGallery();
  renderPublicPlan();
  renderNotes();
  renderProfile();
  renderAdmin();
}

function renderUser() {
  if (!store.user) return;
  document.querySelector(".avatar").textContent = store.user.initials;
  document.querySelector(".profile-card strong").textContent = store.user.name;
  document.querySelector(".profile-card small").textContent = `${store.user.activeLoops} active loops`;
}

function renderDashboard() {
  const upcoming = getUpcomingTrip();
  document.getElementById("welcomeTitle").textContent = `Welcome back, ${store.user?.name || "traveler"}.`;
  document.getElementById("featuredTrip").innerHTML = upcoming ? featuredTrip(upcoming) : emptyState("No upcoming trips yet.");
  document.getElementById("dashboardMetrics").innerHTML = dashboardMetrics().map(metricCard).join("");
  document.getElementById("popularCities").innerHTML = store.popularCities.map(cityCard).join("");
  document.getElementById("recentActivities").innerHTML = store.recentActivities.map(activityLog).join("");
  document.getElementById("weatherPanel").innerHTML = weatherPanel();
  document.getElementById("pollPanel").innerHTML = pollPanel();
  document.getElementById("assistantPanel").innerHTML = assistantPanel();
  document.querySelector(".trip-card-row").innerHTML =
    store.trips.slice(0, 3).map(tripCard).join("") || emptyState("No trips yet. Create your first trip.");
}

function weatherPanel() {
  return `
    <div class="panel-heading">
      <h2>Weather-aware packing</h2>
      <span class="status-pill">Live plan</span>
    </div>
    <div class="weather-list">
      ${store.weather
        .map(
          (day) => `
          <div class="weather-card">
            <strong>${escapeHtml(day.city)}</strong>
            <span>${day.temp} C - ${escapeHtml(day.condition)}</span>
            <button class="text-button" data-weather-pack="${escapeHtml(day.city)}">Add suggestions</button>
          </div>
        `
        )
        .join("")}
    </div>
  `;
}

function pollPanel() {
  const poll = store.groupPoll;
  if (!poll) return emptyState("No group poll yet.");
  const total = poll.options.reduce((sum, option) => sum + option.votes, 0) + (votedPoll ? 1 : 0);
  return `
    <h2>Group vote</h2>
    <p>${escapeHtml(poll.question)}</p>
    <div class="poll-list">
      ${poll.options
        .map((option) => {
          const votes = option.votes + (votedPoll === option.id ? 1 : 0);
          const width = total ? Math.round((votes / total) * 100) : 0;
          return `
            <button class="poll-option ${votedPoll === option.id ? "selected" : ""}" data-poll-vote="${escapeHtml(option.id)}">
              <span>${escapeHtml(option.label)}</span>
              <b>${votes} votes</b>
              <i style="width:${width}%"></i>
            </button>
          `;
        })
        .join("")}
    </div>
  `;
}

function assistantPanel() {
  return `
    <span class="status-pill">Trip helper</span>
    <h2>Make the plan easier</h2>
    <p>Quick actions inspired by modern travel sites: reduce friction, surface next steps, and keep the group aligned.</p>
    <div class="assistant-actions">
      <button class="primary-button" data-assistant-action="packing">Finish packing</button>
      <button class="secondary-button" data-assistant-action="budget">Review budget</button>
      <button class="secondary-button" data-assistant-action="share">Copy share link</button>
    </div>
  `;
}

function featuredTrip(trip) {
  const remaining = Math.max(0, Math.ceil((new Date(trip.startDate) - new Date()) / 86400000));
  const percent = trip.budget ? Math.min(100, Math.round((trip.spent / trip.budget) * 100)) : 0;
  return `
    <span class="status-pill">Next upcoming trip</span>
    <h2>${escapeHtml(trip.name)}</h2>
    <p>${escapeHtml(trip.route)}</p>
    <div class="featured-meta">
      <span>Starts in ${remaining} days</span>
      <span>${escapeHtml(trip.dates)}</span>
      <span>${escapeHtml(trip.people)}</span>
    </div>
    <div class="progress-label"><span>Budget planned</span><b>${percent}%</b></div>
    <div class="progress-track"><span style="width:${percent}%"></span></div>
    <button class="primary-button" data-route="itinerary">Continue planning</button>
  `;
}

function dashboardMetrics() {
  const packed = store.packing.filter((item) => item.done).length;
  const packedPercent = store.packing.length ? Math.round((packed / store.packing.length) * 100) : 0;
  return [
    { value: store.mapPins.length, label: "Cities on route" },
    { value: store.activities.length, label: "Suggested activities" },
    { value: `${packedPercent}%`, label: "Packed" },
    { value: `$${(store.budget?.planned || 0).toLocaleString()}`, label: "Budget tracked" }
  ];
}

function metricCard(metric) {
  return `<article><strong>${escapeHtml(metric.value)}</strong><span>${escapeHtml(metric.label)}</span></article>`;
}

function cityCard(city) {
  return `
    <article class="city-card">
      <img src="${escapeHtml(city.image)}" alt="${escapeHtml(city.city)}" loading="lazy" />
      <div>
        <span>${escapeHtml(city.countryCode)}</span>
        <h3>${escapeHtml(city.city)}</h3>
        <p>${escapeHtml(city.country)}</p>
      </div>
    </article>
  `;
}

function activityLog(entry) {
  return `
    <div class="activity-log">
      <span class="log-dot"></span>
      <div>
        <strong>${escapeHtml(entry.label)}</strong>
        <p>${escapeHtml(entry.detail)}</p>
      </div>
      <small>${escapeHtml(entry.time)}</small>
    </div>
  `;
}

function renderTrips() {
  const trips = store.trips.filter(matchesTripSearch);
  document.querySelector(".trip-list").innerHTML = trips.length
    ? trips.map(tripCard).join("")
    : emptyState("No trips match your search. Create your first trip.");
}

function tripCard(trip) {
  const isFlash = flashId === trip.id ? " flash-success" : "";
  const percent = trip.budget ? Math.min(100, Math.round((trip.spent / trip.budget) * 100)) : 0;
  const cover = trip.coverPhoto || tripCoverImage(trip);
  return `
    <article class="trip-card${isFlash}">
      <img class="trip-cover" src="${escapeHtml(cover)}" alt="${escapeHtml(trip.name)} cover" loading="lazy" />
      <div>
        <span class="status-pill">${escapeHtml(trip.status)}</span>
        <strong>${escapeHtml(trip.name)}</strong>
        <p>${escapeHtml(trip.route)}</p>
      </div>
      <div class="trip-meta">
        <span>${escapeHtml(trip.dates)}</span>
        <span>${escapeHtml(trip.people)}</span>
        <span>${escapeHtml(trip.visibility)}</span>
      </div>
      <div class="progress-track"><span style="width:${percent}%"></span></div>
      <div class="trip-actions">
        <button class="secondary-button" data-route="itinerary">View</button>
        <button class="secondary-button" data-trip-gallery="${escapeHtml(trip.id)}">Gallery</button>
        <button class="secondary-button" data-edit-trip="${escapeHtml(trip.id)}">Edit</button>
        <button class="danger-button" data-delete-trip="${escapeHtml(trip.id)}">Delete</button>
      </div>
    </article>
  `;
}

function tripCoverImage(trip) {
  const text = `${trip.name} ${trip.route}`.toLowerCase();
  const covers = [
    {
      test: ["barcelona", "nice", "rome", "mediterranean"],
      image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1000&q=80"
    },
    {
      test: ["japan", "tokyo", "kyoto", "osaka"],
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80"
    },
    {
      test: ["kerala", "kochi", "munnar", "alleppey"],
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80"
    },
    {
      test: ["nordic", "copenhagen", "stockholm", "oslo"],
      image: "https://images.unsplash.com/photo-1508189860359-777d945909ef?auto=format&fit=crop&w=1000&q=80"
    },
    {
      test: ["paris", "lyon", "france"],
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80"
    }
  ];
  return covers.find((cover) => cover.test.some((word) => text.includes(word)))?.image ||
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80";
}

function renderItinerary() {
  const days = groupByDay(store.itinerary);
  document.querySelectorAll("[data-itinerary-view]").forEach((button) => {
    button.classList.toggle("active", button.dataset.itineraryView === selectedItineraryView);
  });
  document.getElementById("dayTabs").innerHTML = days
    .map(([day]) => `<button class="${Number(day) === selectedDay ? "active" : ""}" data-day="${day}">Day ${day}</button>`)
    .join("");

  document.getElementById("itineraryItems").innerHTML = days
    .map(([day, entries]) => {
      const collapsed = collapsedDays.has(Number(day));
      return `
        <section class="day-group ${selectedItineraryView === "calendar" ? "calendar-mode" : ""}">
          <button class="day-heading" data-toggle-day="${day}" aria-expanded="${!collapsed}">
            <span>Day ${day}</span>
            <small>${escapeHtml(entries[0]?.date || "Flexible date")} - ${entries.length} plans</small>
          </button>
          <div class="day-items ${collapsed ? "collapsed" : ""}">
            ${entries.map(itineraryEntry).join("")}
          </div>
        </section>
      `;
    })
    .join("");
}

function itineraryEntry(entry) {
  const isFlash = flashId === entry.id ? " flash-success" : "";
  return `
    <article class="timeline-item${isFlash}">
      <b>${escapeHtml(entry.time)}</b>
      <div>
        <strong>${escapeHtml(entry.item)}</strong>
        <span>${escapeHtml(entry.city || "Flexible location")} ${entry.cost ? `- $${entry.cost}` : ""}</span>
      </div>
      <div class="row-actions">
        <button class="icon-button" aria-label="Move itinerary item up" data-move-itinerary="${escapeHtml(entry.id)}" data-direction="up">Up</button>
        <button class="icon-button" aria-label="Move itinerary item down" data-move-itinerary="${escapeHtml(entry.id)}" data-direction="down">Dn</button>
        <button class="icon-button" aria-label="Remove itinerary item" data-remove-itinerary="${escapeHtml(entry.id)}">x</button>
      </div>
    </article>
  `;
}

function renderCities() {
  const cities = store.popularCities.filter((city) => {
    const query = citySearchTerm || searchTerm;
    const matchesQuery = !query || `${city.city} ${city.country}`.toLowerCase().includes(query);
    const matchesRegion = selectedRegion === "all" || city.region === selectedRegion;
    return matchesQuery && matchesRegion;
  });
  document.getElementById("cityResults").innerHTML = cities.length
    ? cities.map(cityResultCard).join("")
    : emptyState("No cities match those filters.");
}

function cityResultCard(city) {
  return `
    <article class="city-result-card">
      <img src="${escapeHtml(city.image)}" alt="${escapeHtml(city.city)}" loading="lazy" />
      <div>
        <strong>${escapeHtml(city.city)}, ${escapeHtml(city.country)}</strong>
        <span>${escapeHtml(city.region || "Global")} - ${escapeHtml(city.costIndex || "$$")} - ${Number(city.popularity || 80)}% popularity</span>
      </div>
      <button class="secondary-button" data-add-city="${escapeHtml(city.city)}">Add to trip</button>
    </article>
  `;
}

function renderActivities() {
  const activities = store.activities.filter(matchesActivitySearch).filter(matchesActivityFilters);
  document.getElementById("activityCards").innerHTML = activities.length
    ? activities.map(activityCard).join("")
    : emptyState("No activities match these filters.");
}

function activityCard(activity, index) {
  const art = activity.image
    ? `<img class="activity-image" src="${escapeHtml(activity.image)}" alt="${escapeHtml(activity.title)}" loading="lazy" />`
    : `<div class="activity-art" style="background: ${activityGradient(index)}"></div>`;
  return `
    <article class="activity-card">
      ${art}
      <strong>${escapeHtml(activity.title)}</strong>
      <p>${escapeHtml(activity.city)}</p>
      <p>${escapeHtml(activity.detail)}</p>
      <div class="trip-meta">${activity.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
      <button class="secondary-button" data-add-activity="${escapeHtml(activity.id)}">Add to Day ${selectedDay}</button>
    </article>
  `;
}

function renderBudget() {
  if (!store.budget) return;
  const remaining = store.budget.limit - store.budget.planned;
  const spentPercent = store.budget.limit ? Math.min(100, Math.round((store.budget.planned / store.budget.limit) * 100)) : 0;
  document.getElementById("budgetLimitInput").value = Math.round(store.budget.limit || 0);
  document.getElementById("budgetOverview").innerHTML = `
    <span class="status-pill ${remaining >= 0 ? "success" : "warning"}">${remaining >= 0 ? "Under budget" : "Over budget"}</span>
    <h2>$${store.budget.planned.toLocaleString()} planned</h2>
    <p>${store.budget.tip}</p>
    <div class="budget-accountability">
      <span><b>$${Math.round(Math.max(0, remaining)).toLocaleString()}</b> remaining</span>
      <span><b>${spentPercent}%</b> of limit</span>
      <span><b>$${Math.round(store.budget.perPerson || 0).toLocaleString()}</b> est. per person</span>
    </div>
    <div class="stacked-bar">
      ${store.budget.categories
        .map((category) => {
          const width = store.budget.planned ? Math.round((category.amount / store.budget.planned) * 100) : 0;
          return `<span style="width:${width}%; background:${category.color}" title="${escapeHtml(category.name)}"></span>`;
        })
        .join("")}
    </div>
    <div class="progress-label"><span>Trip limit</span><b>$${store.budget.limit.toLocaleString()}</b></div>
  `;

  document.getElementById("budgetCategories").innerHTML = `
    <h2>Cost breakdown</h2>
    ${store.budget.categories.map(budgetCategory).join("")}
  `;
  document.getElementById("budgetLedger").innerHTML = budgetLedger();

  const maxDaily = Math.max(1, ...store.budget.daily.map((day) => day.amount));
  document.getElementById("dailyBars").innerHTML = store.budget.daily
    .map((day) => `
      <div>
        <span style="height:${Math.max(16, (day.amount / maxDaily) * 100)}%"></span>
        <b>$${day.amount}</b>
        <small>${escapeHtml(day.day)}</small>
      </div>
    `)
    .join("");
}

function budgetCategory(category) {
  const width = store.budget?.planned ? Math.round((category.amount / store.budget.planned) * 100) : 0;
  return `
    <div class="cost-row">
      <span><i style="background:${category.color}"></i>${escapeHtml(category.name)}</span>
      <b>$${category.amount.toLocaleString()} <small>${width}%</small></b>
    </div>
  `;
}

function budgetLedger() {
  const expenses = store.budget.expenses || [];
  if (!expenses.length) return emptyState("No expenses yet. Add one above to make the budget accountable.");
  return `
    <div class="payer-summary">
      ${(store.budget.payers || [])
        .map((payer) => `<span><b>${escapeHtml(payer.payer)}</b>$${Math.round(payer.amount).toLocaleString()}</span>`)
        .join("")}
    </div>
    <div class="ledger-list">
      ${expenses.map(budgetExpenseRow).join("")}
    </div>
  `;
}

function budgetExpenseRow(expense) {
  const split = Math.round(expense.amount / Math.max(1, expense.splitCount || 1));
  return `
    <div class="ledger-row">
      <div>
        <strong>${escapeHtml(expense.title)}</strong>
        <span>${escapeHtml(expense.category)} - Day ${escapeHtml(expense.day)} - paid by ${escapeHtml(expense.payer)}</span>
      </div>
      <div>
        <b>$${expense.amount.toLocaleString()}</b>
        <small>$${split.toLocaleString()} each</small>
      </div>
      <button class="icon-button" aria-label="Remove expense" data-remove-expense="${escapeHtml(expense.id)}">x</button>
    </div>
  `;
}

function renderPacking() {
  const packed = store.packing.filter((item) => item.done).length;
  const percent = store.packing.length ? Math.round((packed / store.packing.length) * 100) : 0;
  document.getElementById("packingSummary").innerHTML = `
    <div>
      <span class="status-pill">${packed} of ${store.packing.length} packed</span>
      <h2>${percent}% ready</h2>
      <p>Last template: ${escapeHtml(store.packingTemplate?.name || "No template saved")}</p>
    </div>
    <div class="progress-track"><span style="width:${percent}%"></span></div>
  `;

  const groups = groupBy(store.packing, "category");
  document.getElementById("packingList").innerHTML = Object.entries(groups)
    .map(([category, items]) => packingGroup(category, items))
    .join("");

  document.querySelectorAll("[data-packing-id]").forEach((input) => {
    input.addEventListener("change", async () => {
      const updated = await api(`/api/packing/${input.dataset.packingId}`, {
        method: "PATCH",
        body: JSON.stringify({ done: input.checked })
      });
      const item = store.packing.find((entry) => entry.id === updated.id);
      if (item) item.done = updated.done;
      renderPacking();
      showToast(`${updated.item} updated.`);
    });
  });
}

function packingGroup(category, items) {
  const collapsed = collapsedPacking.has(category);
  const completed = items.filter((item) => item.done).length;
  return `
    <article class="panel packing-group">
      <button class="packing-heading" data-toggle-packing="${escapeHtml(category)}">
        <span>${escapeHtml(category)}</span>
        <small>${completed}/${items.length} packed</small>
      </button>
      <div class="packing-actions">
        <button class="text-button" data-category="${escapeHtml(category)}" data-bulk-pack="check">Check all</button>
        <button class="text-button" data-category="${escapeHtml(category)}" data-bulk-pack="uncheck">Uncheck all</button>
      </div>
      <div class="checklist ${collapsed ? "collapsed" : ""}">
        ${items.map(packingItem).join("")}
      </div>
    </article>
  `;
}

function packingItem(entry) {
  const isFlash = flashId === entry.id ? " flash-success" : "";
  return `
    <div class="check-item${isFlash}">
      <label>
        <input type="checkbox" data-packing-id="${escapeHtml(entry.id)}" ${entry.done ? "checked" : ""} />
        <span>${escapeHtml(entry.item)}</span>
      </label>
      <button class="icon-button" aria-label="Remove ${escapeHtml(entry.item)}" data-remove-packing="${escapeHtml(entry.id)}">x</button>
    </div>
  `;
}

function renderMap() {
  const canvas = document.getElementById("mapCanvas");
  const details = document.getElementById("mapDetails");
  const pins = store.mapPins || [];
  const selected = pins.find((pin) => pin.id === selectedMapPin) || pins[0];
  if (window.L) {
    renderLeafletMap(pins);
  } else {
    canvas.innerHTML = pins.map(mapPinButton).join("");
  }

  details.innerHTML = selected
    ? `
      <span class="status-pill">Day ${selected.day}</span>
      <h2>${escapeHtml(selected.city)}</h2>
      <p>${escapeHtml(selected.countryCode)} - ${escapeHtml(selected.country)}</p>
      <p>${escapeHtml(selected.summary)}</p>
      <div class="coordinate-row">
        <span>${selected.lat.toFixed(4)}</span>
        <span>${selected.lng.toFixed(4)}</span>
      </div>
      <button class="secondary-button wide" data-route="itinerary">View day plan</button>
      <button class="danger-button wide" data-remove-pin="${escapeHtml(selected.id)}">Remove pin</button>
    `
    : emptyState("No map pins available.");
}

function renderGallery() {
  const select = document.getElementById("galleryTripSelect");
  if (!select) return;
  const tripIds = new Set(store.trips.map((trip) => trip.id));
  if (selectedGalleryTripId !== "all" && !tripIds.has(selectedGalleryTripId)) selectedGalleryTripId = "all";
  select.innerHTML = [
    '<option value="all">All tours</option>',
    ...store.trips.map((trip) => `<option value="${escapeHtml(trip.id)}">${escapeHtml(trip.name)}</option>`)
  ].join("");
  select.value = selectedGalleryTripId;

  const photos = filteredGalleryPhotos();
  const featured = photos[0] || store.galleryPhotos[0];
  const selectedTrip = store.trips.find((trip) => trip.id === selectedGalleryTripId);
  document.getElementById("galleryStats").innerHTML = `
    <div>
      <span class="status-pill">${photos.length} photos</span>
      <h2>${escapeHtml(selectedTrip?.name || "All tour memories")}</h2>
      <p>${featured ? escapeHtml(featured.caption || "Your saved travel images appear here.") : "Upload the first photo from a tour to start building a memory board."}</p>
    </div>
    ${featured ? `<img src="${escapeHtml(featured.image)}" alt="${escapeHtml(featured.caption || featured.tripName)}" loading="lazy" />` : ""}
  `;
  document.getElementById("galleryGrid").innerHTML = photos.length
    ? photos.map(galleryPhotoCard).join("")
    : emptyState("No gallery photos match this tour yet.");
}

function filteredGalleryPhotos() {
  return (store.galleryPhotos || []).filter((photo) => {
    const matchesTrip = selectedGalleryTripId === "all" || photo.tripId === selectedGalleryTripId;
    const matchesSearch = !searchTerm || `${photo.caption} ${photo.location} ${photo.tripName}`.toLowerCase().includes(searchTerm);
    return matchesTrip && matchesSearch;
  });
}

function galleryPhotoCard(photo) {
  const isFlash = flashId === photo.id ? " flash-success" : "";
  return `
    <article class="gallery-card${isFlash}">
      <img src="${escapeHtml(photo.image)}" alt="${escapeHtml(photo.caption || photo.tripName || "Tour photo")}" loading="lazy" />
      <div>
        <span class="status-pill">${escapeHtml(photo.tripName || "Tour")}</span>
        <h2>${escapeHtml(photo.caption || "Untitled memory")}</h2>
        <p>${escapeHtml(photo.location || "Location not added")}</p>
        <small>${photo.capturedAt ? escapeHtml(photo.capturedAt) : `Saved ${formatDateTime(photo.createdAt)}`}</small>
      </div>
      <button class="icon-button" aria-label="Remove gallery photo" data-remove-gallery-photo="${escapeHtml(photo.id)}">x</button>
    </article>
  `;
}

function renderLeafletMap(pins) {
  const canvas = document.getElementById("mapCanvas");
  if (!leafletMap) {
    leafletMap = L.map(canvas, { scrollWheelZoom: true, zoomControl: true });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(leafletMap);
  }
  if (leafletRouteLayer) leafletRouteLayer.remove();
  leafletRouteLayer = L.layerGroup().addTo(leafletMap);

  const latLngs = pins.map((pin) => [Number(pin.lat), Number(pin.lng)]);
  pins.forEach((pin) => {
    const marker = L.marker([pin.lat, pin.lng], {
      icon: L.divIcon({
        className: `traveloop-marker ${pin.id === selectedMapPin ? "active" : ""}`,
        html: `<span>${escapeHtml(pin.city)}</span>`,
        iconSize: [118, 38],
        iconAnchor: [59, 19]
      })
    }).addTo(leafletRouteLayer);
    marker.bindPopup(`<strong>${escapeHtml(pin.city)}</strong><br>Day ${escapeHtml(pin.day)}<br>${escapeHtml(pin.summary)}`);
    marker.on("click", () => {
      selectedMapPin = pin.id;
      renderMap();
    });
    if (pin.id === selectedMapPin) marker.openPopup();
  });
  if (latLngs.length > 1) {
    L.polyline(latLngs, { color: "#0f766e", weight: 4, opacity: 0.78, dashArray: "8 8" }).addTo(leafletRouteLayer);
    leafletMap.fitBounds(latLngs, { padding: [36, 36] });
  } else if (latLngs.length === 1) {
    leafletMap.setView(latLngs[0], 8);
  } else {
    leafletMap.setView([41.9028, 12.4964], 4);
  }
}

function mapPinButton(pin) {
  const point = projectPin(pin);
  const active = pin.id === selectedMapPin ? " active" : "";
  return `
    <button class="map-pin${active}" style="left:${point.x}%; top:${point.y}%;" data-map-pin="${escapeHtml(pin.id)}">
      <span>${escapeHtml(pin.city)}</span>
    </button>
  `;
}

function renderPublicPlan() {
  document.getElementById("publicPlan").innerHTML = groupByDay(store.itinerary)
    .slice(0, 3)
    .map(([day, entries]) => `<div><strong>Day ${day}</strong><span>${entries.map((entry) => escapeHtml(entry.item)).join(", ")}</span></div>`)
    .join("");
}

function renderNotes() {
  document.querySelector(".journal-grid").innerHTML = store.notes
    .map((note) => `
      <article class="panel note-card ${flashId === note.id ? "flash-success" : ""}">
        <div class="panel-heading">
          <h2>${escapeHtml(note.title)}</h2>
          <div class="row-actions">
            <button class="icon-button" aria-label="Edit note" data-edit-note="${escapeHtml(note.id)}">Edit</button>
            <button class="icon-button" aria-label="Remove note" data-remove-note="${escapeHtml(note.id)}">x</button>
          </div>
        </div>
        <span class="status-pill">Day ${escapeHtml(note.day || 1)}</span>
        <p>${escapeHtml(note.body)}</p>
        <small>Updated ${formatDateTime(note.updatedAt || note.createdAt)}</small>
      </article>
    `)
    .join("");
}

function renderProfile() {
  if (!store.user) return;
  const stats = store.user.stats || {};
  document.getElementById("privacyToggle").checked = store.user.privacy === "public";
  document.getElementById("profileName").value = store.user.name || "";
  document.getElementById("profileEmail").value = store.user.email || "";
  document.getElementById("profileLanguage").value = store.user.language || "English";
  const avatarMarkup = store.user.avatar
    ? `<img class="avatar-image" src="${store.user.avatar}" alt="${escapeHtml(store.user.name)} avatar" />`
    : `<span class="avatar avatar-large">${escapeHtml(store.user.initials)}</span>`;
  document.getElementById("profileOverview").innerHTML = `
    <div class="profile-hero">
      ${avatarMarkup}
      <div>
        <h2>${escapeHtml(store.user.name)}</h2>
        <p>${escapeHtml(store.user.email)}</p>
        <span class="status-pill">${escapeHtml(store.user.language || "English")}</span>
      </div>
    </div>
    <div class="metrics-grid profile-stats">
      ${metricCard({ value: stats.totalTrips || 0, label: "Total trips" })}
      ${metricCard({ value: stats.totalDays || 0, label: "Days traveled" })}
      ${metricCard({ value: stats.totalActivities || 0, label: "Activities" })}
      ${metricCard({ value: stats.countries || 0, label: "Countries" })}
    </div>
  `;
  document.getElementById("savedDestinations").innerHTML = `
    <h2>Saved destinations</h2>
    <div class="saved-list">
      ${(store.savedDestinations || [])
        .map((destination) => `<span>${escapeHtml(destination.city)}, ${escapeHtml(destination.country)}</span>`)
        .join("") || "<p>No saved destinations yet.</p>"}
    </div>
  `;
}

function renderAdmin() {
  const analytics = store.analytics;
  if (!analytics) return;
  const metrics = [
    { value: analytics.tripsCreated, label: "Trips created" },
    { value: analytics.sharedPublicly, label: "Shared publicly" },
    { value: analytics.averageCities, label: "Avg cities/trip" },
    { value: analytics.averageBuildTime, label: "Avg build time" }
  ];
  document.getElementById("adminAnalytics").innerHTML = `
    <article class="panel admin-metrics">
      <h2>Usage overview</h2>
      <div class="metrics-grid">${metrics.map(metricCard).join("")}</div>
    </article>
    <article class="panel">
      <h2>Feature engagement</h2>
      <div class="admin-bars">
        ${(analytics.usage || [])
          .map((entry) => `<div><span style="height:${entry.height}%"></span><b>${escapeHtml(entry.label)}</b></div>`)
          .join("")}
      </div>
    </article>
    <article class="panel">
      <h2>Top cities</h2>
      <div class="admin-table">
        ${(analytics.topCities || [])
          .map((city) => `<div><strong>${escapeHtml(city.city)}</strong><span>${escapeHtml(city.country)}</span><b>${city.popularity}%</b></div>`)
          .join("")}
      </div>
    </article>
    <article class="panel">
      <h2>User management</h2>
      <div class="admin-table">
        <div><strong>${escapeHtml(store.user?.name || "Demo user")}</strong><span>${escapeHtml(store.user?.email || "")}</span><b>${escapeHtml(store.user?.privacy || "private")}</b></div>
      </div>
    </article>
  `;
}

function groupByDay(entries) {
  return Object.entries(groupBy(entries, "day")).sort((a, b) => Number(a[0]) - Number(b[0]));
}

function groupBy(items, key) {
  return items.reduce((acc, item) => {
    const value = item[key] || "Other";
    acc[value] ||= [];
    acc[value].push(item);
    return acc;
  }, {});
}

function getUpcomingTrip() {
  const now = new Date();
  return [...store.trips]
    .filter((trip) => trip.startDate)
    .sort((a, b) => Math.abs(new Date(a.startDate) - now) - Math.abs(new Date(b.startDate) - now))[0];
}

function matchesTripSearch(trip) {
  if (!searchTerm) return true;
  return `${trip.name} ${trip.route} ${trip.status}`.toLowerCase().includes(searchTerm);
}

function matchesActivitySearch(activity) {
  if (!searchTerm) return true;
  return `${activity.title} ${activity.city} ${activity.detail} ${activity.tags.join(" ")}`.toLowerCase().includes(searchTerm);
}

function matchesActivityFilters(activity) {
  const active = new Set(
    [...document.querySelectorAll("[data-activity-filter]:checked")].map((input) => input.dataset.activityFilter)
  );
  const text = `${activity.title} ${activity.city} ${activity.detail} ${activity.tags.join(" ")}`.toLowerCase();
  const amount = Number(activity.cost || 0);
  if (active.has("under50") && amount > 50) return false;
  if (active.has("rain") && !text.includes("rain")) return false;
  if (active.has("transit") && !text.includes("transit") && !text.includes("near")) return false;
  if (active.has("family") && text.includes("night")) return false;
  return true;
}

function projectPin(pin) {
  const pins = store.mapPins || [];
  const lats = pins.map((entry) => entry.lat);
  const lngs = pins.map((entry) => entry.lng);
  const minLat = Math.min(...lats) - 0.8;
  const maxLat = Math.max(...lats) + 0.8;
  const minLng = Math.min(...lngs) - 1;
  const maxLng = Math.max(...lngs) + 1;
  return {
    x: 8 + ((pin.lng - minLng) / (maxLng - minLng)) * 84,
    y: 84 - ((pin.lat - minLat) / (maxLat - minLat)) * 68
  };
}

function activityGradient(index) {
  const gradients = [
    "linear-gradient(135deg, #0F766E, #67E8F9)",
    "linear-gradient(135deg, #115E59, #FBBF24)",
    "linear-gradient(135deg, #60A5FA, #F97316)",
    "linear-gradient(135deg, #134E4A, #14B8A6)",
    "linear-gradient(135deg, #F8FAFC, #CBD5E1)",
    "linear-gradient(135deg, #0F766E, #F97316)"
  ];
  return gradients[index % gradients.length];
}

function markInvalidFields() {
  document.querySelectorAll("[data-trip-field]").forEach((input) => {
    input.classList.toggle("invalid", input.value.trim().length < 3 && input.dataset.tripField !== "budget");
  });
}

function toggleSet(set, value) {
  if (set.has(value)) set.delete(value);
  else set.add(value);
}

function clearFlashSoon() {
  window.setTimeout(() => {
    flashId = "";
    renderAll();
  }, 1200);
}

function emptyState(message) {
  return `<div class="empty-state"><strong>No data yet</strong><p>${escapeHtml(message)}</p><button class="primary-button" data-route="create">Create your first trip</button></div>`;
}

function formatDateTime(value) {
  if (!value) return "just now";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(value));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("visible"), 2400);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

window.addEventListener("hashchange", () => setRoute(location.hash.slice(1) || "dashboard"));

async function startApp() {
  const hasSession = await checkSession();
  if (!hasSession) {
    setRoute("login");
    return;
  }
  await loadData();
  setRoute(location.hash.slice(1) || "dashboard");
}

startApp().catch((error) => {
  console.error(error);
  document.body.insertAdjacentHTML("afterbegin", `<div class="app-error">Could not load Traveloop data.</div>`);
});