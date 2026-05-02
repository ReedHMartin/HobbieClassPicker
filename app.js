const MONTHS = ["May 2026","June 2026","July 2026","August 2026","September 2026"];
const DAY_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const DAY_TO_INDEX = {Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};

const fmtMoney = n => new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(n);
const fmtLongDate = d => new Intl.DateTimeFormat("en-US",{weekday:"short",month:"short",day:"numeric"}).format(d);
const fmtShortDate = d => new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"}).format(d);
const parseDate = s => new Date(s + "T00:00:00");
const addDays = (d,n) => { const x = new Date(d); x.setDate(x.getDate()+n); return x; };
const isoDate = d => d.toISOString().slice(0,10);
const timeToMinutes = t => { const m = t.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i); let h = Number(m[1]), min = Number(m[2] || 0); if (m[3].toUpperCase() === "PM" && h !== 12) h += 12; if (m[3].toUpperCase() === "AM" && h === 12) h = 0; return h * 60 + min; };
const buildDateTime = (date, time) => { const m = time.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i); let h = Number(m[1]), min = Number(m[2] || 0); if (m[3].toUpperCase() === "PM" && h !== 12) h += 12; if (m[3].toUpperCase() === "AM" && h === 12) h = 0; const dt = new Date(date); dt.setHours(h, min, 0, 0); return dt; };
const weekdayIndex = day => DAY_TO_INDEX[day];
const generateRecurringSessions = ({start,end,weekday,startTime,endTime}) => {
  const out = []; let cursor = parseDate(start), stop = parseDate(end), target = weekdayIndex(weekday);
  while (cursor <= stop) { if (cursor.getDay() === target) out.push({date: isoDate(cursor), startTime, endTime}); cursor = addDays(cursor, 1); }
  return out;
};
const explicitSessions = items => items.map(x => ({...x}));

const offerings = [
  { id:"adult-adirondack-chair", title:"Adult Adirondack Chair", group:"Woodworking", area:"Wildwood", category:"woodworking", age:"16+", location:"Wildwood Craft Room", instructor:"Don Jedlicka", description:"Build a top-quality full-size Adirondack chair in a five-week woodworking course.", fullDescription:"Anyone who's ever sat in an Adirondack chair and sunk into the curve of the fanned back knows there's not a more comfortable cushion-less seat out there. Now you can make your very own top-quality full size Adirondack chair. All skill levels welcome. You will have a completed chair on the last day of this five-week course!", residentFee:100, nonResidentFee:120, extraLabel:null, extraResident:0, extraNonResident:0, sessions:generateRecurringSessions({start:"2026-08-25",end:"2026-09-15",weekday:"Tue",startTime:"6:00 PM",endTime:"8:30 PM"}) },
  { id:"cutting-board-workshop", title:"Cutting Board Workshop", group:"Woodworking", area:"Wildwood", category:"woodworking", age:"16+", location:"Wildwood Craft Room", instructor:"Don Jedlicka", description:"Three-week workshop to craft a unique butcher block board for your holiday table.", residentFee:35, nonResidentFee:42, extraLabel:"Supply fee due in cash", extraResident:30, extraNonResident:30, sessions:generateRecurringSessions({start:"2026-05-26",end:"2026-06-09",weekday:"Tue",startTime:"6:00 PM",endTime:"8:00 PM"}) },
  { id:"watercolor-headlands-lighthouse", title:'Watercolor Workshop: "Headlands Lighthouse"', group:"Watercolor", area:"Wildwood", category:"watercolor", age:"16+", location:"Wildwood Cultural Center", instructor:"Jacki Wroblewski", description:"Two-class watercolor course focused on Lake County's historic Headlands Lighthouse.", residentFee:58, nonResidentFee:68, extraLabel:"Supply fee due to instructor", extraResident:10, extraNonResident:10, sessions:explicitSessions([{date:"2026-05-11",startTime:"6:00 PM",endTime:"9:30 PM"},{date:"2026-05-18",startTime:"6:00 PM",endTime:"9:30 PM"}]) },
  { id:"watercolor-birch-cardinals", title:"Watercolor: Standing Birch and Cardinals Perched", group:"Watercolor", area:"Wildwood", category:"watercolor", age:"16+", location:"Wildwood Cultural Center", instructor:"Jacki Wroblewski", description:"Intermediate/advanced watercolor class with birches and perched red cardinals.", residentFee:42, nonResidentFee:52, extraLabel:"Supply fee due to instructor", extraResident:7, extraNonResident:7, sessions:explicitSessions([{date:"2026-07-13",startTime:"6:00 PM",endTime:"9:30 PM"}]) },
  { id:"watercolor-beach-painting", title:"Watercolor for Beginners: Beautiful Beach Painting", group:"Watercolor", area:"Wildwood", category:"watercolor", age:"16+", location:"Wildwood Cultural Center", instructor:"Jacki Wroblewski", description:"Beginner watercolor course creating a finished beach scene ready for framing.", residentFee:36, nonResidentFee:42, extraLabel:"Supply fee due to instructor", extraResident:5, extraNonResident:5, sessions:explicitSessions([{date:"2026-06-15",startTime:"6:00 PM",endTime:"9:30 PM"}]) },
  { id:"painting-with-me", title:"Painting with M.E.", group:"Mixed Media", area:"Wildwood", category:"painting", age:"21+", location:"Wildwood Cultural Center", instructor:"M.E. Kuzma", description:"Hand-color butterfly prints while exploring a variety of media.", residentFee:40, nonResidentFee:48, extraLabel:null, extraResident:0, extraNonResident:0, sessions:explicitSessions([{date:"2026-06-10",startTime:"6:30 PM",endTime:"8:30 PM"}]) },
  { id:"stained-glass-hummingbird", title:"Stained Glass: Easy Humming Bird", group:"Glass", area:"Wildwood", category:"glass", age:"21+", location:"Wildwood Cultural Center", instructor:"Vicki Vesel", description:"Create a stained glass humming bird sun catcher in a four-class series.", residentFee:100, nonResidentFee:120, extraLabel:"Supply fee in cash", extraResident:35, extraNonResident:35, sessions:generateRecurringSessions({start:"2026-06-10",end:"2026-07-01",weekday:"Wed",startTime:"6:30 PM",endTime:"9:00 PM"}) },
  { id:"intro-to-sewing", title:"Intro to Sewing", group:"Sewing", area:"Wildwood", category:"sewing", age:"12+", location:"Wildwood South Wing", instructor:"April Koch", description:"Learn threading, basic stitches, and finish a pillow to take home.", residentFee:30, nonResidentFee:36, extraLabel:"Additional fee due to instructor", extraResident:15, extraNonResident:15, sessions:explicitSessions([{date:"2026-06-11",startTime:"6:00 PM",endTime:"8:00 PM"}]) },
  { id:"food-salad-dressings", title:"Food in the Kitchen: Salad Dressings and Marinades", group:"Cooking", area:"Wildwood", category:"cooking", age:"16+", location:"Wildwood Kitchen", instructor:"Judi Strauss", description:"Interactive cooking class focused on salad dressings and marinades.", residentFee:20, nonResidentFee:24, extraLabel:"Food fee payable in cash", extraResident:10, extraNonResident:10, sessions:explicitSessions([{date:"2026-05-05",startTime:"7:00 PM",endTime:"9:00 PM"}]) },
  { id:"food-pierogies", title:"Food in the Kitchen: Pierogies", group:"Cooking", area:"Wildwood", category:"cooking", age:"16+", location:"Wildwood Kitchen", instructor:"Judi Strauss", description:"Interactive cooking class focused on pierogies.", residentFee:20, nonResidentFee:24, extraLabel:"Food fee payable in cash", extraResident:10, extraNonResident:10, sessions:explicitSessions([{date:"2026-05-12",startTime:"7:00 PM",endTime:"9:00 PM"}]) },
  { id:"food-soy-wonderful", title:"Food in the Kitchen: It's Soy Wonderful", group:"Cooking", area:"Wildwood", category:"cooking", age:"16+", location:"Wildwood Kitchen", instructor:"Judi Strauss", description:"Interactive cooking class focused on soy-based recipes.", residentFee:20, nonResidentFee:24, extraLabel:"Food fee payable in cash", extraResident:10, extraNonResident:10, sessions:explicitSessions([{date:"2026-05-19",startTime:"7:00 PM",endTime:"9:00 PM"}]) },
  { id:"food-edible-flowers", title:"Food in the Kitchen: Edible Flowers", group:"Cooking", area:"Wildwood", category:"cooking", age:"16+", location:"Wildwood Kitchen", instructor:"Judi Strauss", description:"Interactive cooking class focused on edible flowers.", residentFee:20, nonResidentFee:24, extraLabel:"Food fee payable in cash", extraResident:10, extraNonResident:10, sessions:explicitSessions([{date:"2026-05-26",startTime:"7:00 PM",endTime:"9:00 PM"}]) },
  { id:"food-jams-jellies", title:"Food in the Kitchen: Jams and Jellies", group:"Cooking", area:"Wildwood", category:"cooking", age:"16+", location:"Wildwood Kitchen", instructor:"Judi Strauss", description:"Interactive cooking class focused on jams and jellies.", residentFee:20, nonResidentFee:24, extraLabel:"Food fee payable in cash", extraResident:10, extraNonResident:10, sessions:explicitSessions([{date:"2026-06-02",startTime:"7:00 PM",endTime:"9:00 PM"}]) },
  { id:"food-plant-based", title:"Food in the Kitchen: Plant Based Cooking", group:"Cooking", area:"Wildwood", category:"cooking", age:"16+", location:"Wildwood Kitchen", instructor:"Judi Strauss", description:"Interactive cooking class focused on plant-based recipes.", residentFee:20, nonResidentFee:24, extraLabel:"Food fee payable in cash", extraResident:10, extraNonResident:10, sessions:explicitSessions([{date:"2026-06-09",startTime:"7:00 PM",endTime:"9:00 PM"}]) },
  { id:"food-strawberries-blueberries", title:"Food in the Kitchen: Strawberries and Blueberries", group:"Cooking", area:"Wildwood", category:"cooking", age:"16+", location:"Wildwood Kitchen", instructor:"Judi Strauss", description:"Interactive cooking class focused on berries.", residentFee:20, nonResidentFee:24, extraLabel:"Food fee payable in cash", extraResident:10, extraNonResident:10, sessions:explicitSessions([{date:"2026-06-16",startTime:"7:00 PM",endTime:"9:00 PM"}]) },
  { id:"food-dinner-salads", title:"Food in the Kitchen: Dinner Salads", group:"Cooking", area:"Wildwood", category:"cooking", age:"16+", location:"Wildwood Kitchen", instructor:"Judi Strauss", description:"Interactive cooking class focused on dinner salads.", residentFee:20, nonResidentFee:24, extraLabel:"Food fee payable in cash", extraResident:10, extraNonResident:10, sessions:explicitSessions([{date:"2026-06-23",startTime:"7:00 PM",endTime:"9:00 PM"}]) },
  { id:"food-herbs", title:"Food in the Kitchen: Cooking with Herbs", group:"Cooking", area:"Wildwood", category:"cooking", age:"16+", location:"Wildwood Kitchen", instructor:"Judi Strauss", description:"Interactive cooking class focused on cooking with herbs.", residentFee:20, nonResidentFee:24, extraLabel:"Food fee payable in cash", extraResident:10, extraNonResident:10, sessions:explicitSessions([{date:"2026-06-30",startTime:"7:00 PM",endTime:"9:00 PM"}]) },
  { id:"food-ice-cream", title:"Food in the Kitchen: Ice Cream and Frozen Desserts", group:"Cooking", area:"Wildwood", category:"cooking", age:"16+", location:"Wildwood Kitchen", instructor:"Judi Strauss", description:"Interactive cooking class focused on frozen desserts.", residentFee:20, nonResidentFee:24, extraLabel:"Food fee payable in cash", extraResident:10, extraNonResident:10, sessions:explicitSessions([{date:"2026-08-04",startTime:"7:00 PM",endTime:"9:00 PM"}]) },
  { id:"food-cheesecakes", title:"Food in the Kitchen: Cheesecakes", group:"Cooking", area:"Wildwood", category:"cooking", age:"16+", location:"Wildwood Kitchen", instructor:"Judi Strauss", description:"Interactive cooking class focused on cheesecakes.", residentFee:20, nonResidentFee:24, extraLabel:"Food fee payable in cash", extraResident:10, extraNonResident:10, sessions:explicitSessions([{date:"2026-08-11",startTime:"7:00 PM",endTime:"9:00 PM"}]) },
  { id:"food-canning-101", title:"Food in the Kitchen: Canning 101", group:"Cooking", area:"Wildwood", category:"cooking", age:"16+", location:"Wildwood Kitchen", instructor:"Judi Strauss", description:"Interactive cooking class focused on home canning basics.", residentFee:20, nonResidentFee:24, extraLabel:"Food fee payable in cash", extraResident:10, extraNonResident:10, sessions:explicitSessions([{date:"2026-08-18",startTime:"7:00 PM",endTime:"9:00 PM"}]) },
  { id:"food-own-mixes", title:"Food in the Kitchen: Make your Own Mixes!", group:"Cooking", area:"Wildwood", category:"cooking", age:"16+", location:"Wildwood Kitchen", instructor:"Judi Strauss", description:"Interactive cooking class focused on pantry mix-making.", residentFee:20, nonResidentFee:24, extraLabel:"Food fee payable in cash", extraResident:10, extraNonResident:10, sessions:explicitSessions([{date:"2026-08-25",startTime:"7:00 PM",endTime:"9:00 PM"}]) },
  { id:"creative-ceramics", title:"Creative Ceramics", group:"Ceramics", area:"Senior", category:"ceramics", age:"Senior Center", location:"Senior Center Cultural Arts Room", instructor:"Sharon Williams", description:"Decorate pre-made ceramic pieces. Wheel throwing and wet clay are not part of this class.", residentFee:50, nonResidentFee:60, extraLabel:"Supply fee included in registration", extraResident:0, extraNonResident:0, sessions:[...generateRecurringSessions({start:"2026-05-06",end:"2026-06-17",weekday:"Wed",startTime:"10:00 AM",endTime:"12:00 PM"}),...generateRecurringSessions({start:"2026-07-01",end:"2026-08-19",weekday:"Wed",startTime:"10:00 AM",endTime:"12:00 PM"})] },
  { id:"arts-and-crafts-all-media", title:"Arts & Crafts All Media Painting", group:"Painting", area:"Senior", category:"painting", age:"Senior Center", location:"Senior Center Cultural Arts Room", instructor:"Ginny Mancini", description:"Learn art fundamentals in composition, design, and color using the media of your choice.", residentFee:40, nonResidentFee:50, extraLabel:null, extraResident:0, extraNonResident:0, sessions:generateRecurringSessions({start:"2026-05-07",end:"2026-06-18",weekday:"Thu",startTime:"10:00 AM",endTime:"12:00 PM"}) },
  { id:"faa-adult-ceramics-session-1", title:"Adult Ceramics - Session 1", group:"FAA Visual Arts", area:"Fine Arts Association", category:"ceramics", age:"18+", location:"Fine Arts Association", instructor:"Connor Costanzo, MA, ATR, LPC", description:"Studio-based ceramics covering handbuilding, wheel-throwing, and glaze application.", residentFee:264, nonResidentFee:264, extraLabel:"Adults must purchase their own clay from FAA", extraResident:15, extraNonResident:15, sessions:explicitSessions([{date:"2026-06-15",startTime:"6:00 PM",endTime:"8:00 PM"},{date:"2026-06-22",startTime:"6:00 PM",endTime:"8:00 PM"},{date:"2026-06-29",startTime:"6:00 PM",endTime:"8:00 PM"},{date:"2026-07-06",startTime:"6:00 PM",endTime:"8:00 PM"},{date:"2026-07-13",startTime:"6:00 PM",endTime:"8:00 PM"},{date:"2026-07-20",startTime:"6:00 PM",endTime:"8:00 PM"}]) },
  { id:"faa-adult-ceramics-session-2", title:"Adult Ceramics - Session 2", group:"FAA Visual Arts", area:"Fine Arts Association", category:"ceramics", age:"18+", location:"Fine Arts Association", instructor:"Connor Costanzo, MA, ATR, LPC", description:"Studio-based ceramics covering handbuilding, wheel-throwing, and glaze application.", residentFee:264, nonResidentFee:264, extraLabel:"Adults must purchase their own clay from FAA", extraResident:15, extraNonResident:15, sessions:explicitSessions([{date:"2026-06-17",startTime:"6:00 PM",endTime:"8:00 PM"},{date:"2026-06-24",startTime:"6:00 PM",endTime:"8:00 PM"},{date:"2026-07-01",startTime:"6:00 PM",endTime:"8:00 PM"},{date:"2026-07-08",startTime:"6:00 PM",endTime:"8:00 PM"},{date:"2026-07-15",startTime:"6:00 PM",endTime:"8:00 PM"},{date:"2026-07-22",startTime:"6:00 PM",endTime:"8:00 PM"}]) },
  { id:"faa-adult-clay-studio", title:"Adult Clay Studio", group:"FAA Visual Arts", area:"Fine Arts Association", category:"ceramics", age:"18+", location:"Fine Arts Association", instructor:"Connor Costanzo, MA, ATR, LPC", description:"Extended studio time for advanced handbuilding, wheel-throwing, and glaze application.", residentFee:330, nonResidentFee:330, extraLabel:"Adults must purchase their own clay from FAA", extraResident:15, extraNonResident:15, sessions:generateRecurringSessions({start:"2026-06-19",end:"2026-07-31",weekday:"Fri",startTime:"10:30 AM",endTime:"1:00 PM"}) },
  { id:"faa-painting-coffee", title:"Painting and Coffee", group:"FAA Visual Arts", area:"Fine Arts Association", category:"painting", age:"18+", location:"Fine Arts Association", instructor:"Kathy Mercer", description:"Morning acrylic painting with coffee and a relaxed studio atmosphere.", residentFee:153, nonResidentFee:153, extraLabel:"Students provide their own supplies", extraResident:0, extraNonResident:0, sessions:generateRecurringSessions({start:"2026-06-19",end:"2026-07-31",weekday:"Fri",startTime:"9:30 AM",endTime:"11:00 AM"}) },
  { id:"faa-craft-sip-paper-dahlia", title:'"Craft & Sip" Paper Dahlia Wall Hanging', group:"FAA Visual Arts", area:"Fine Arts Association", category:"painting", age:"21+", location:"Fine Arts Association", instructor:"Melissa Nickerson", description:"Create a layered paper dahlia wall hanging in a social craft-and-sip workshop.", residentFee:30, nonResidentFee:30, extraLabel:"All supplies included", extraResident:0, extraNonResident:0, sessions:explicitSessions([{date:"2026-06-19",startTime:"7:00 PM",endTime:"8:30 PM"}]) },
  { id:"faa-hand-tied-rose-bouquet", title:"Create Your Own Hand-Tied Rose Bouquet", group:"FAA Visual Arts", area:"Fine Arts Association", category:"painting", age:"21+", location:"Fine Arts Association", instructor:"Melissa Nickerson", description:"Learn to create a simple hand-tied rose bouquet for displays or special events.", residentFee:30, nonResidentFee:30, extraLabel:"All supplies included", extraResident:0, extraNonResident:0, sessions:explicitSessions([{date:"2026-06-27",startTime:"10:00 AM",endTime:"11:30 AM"}]) },
  { id:"faa-cat-ceramics", title:"CAT Ceramics Summer Fun Social Group", group:"FAA Visual Arts", area:"Fine Arts Association", category:"ceramics", age:"60+", location:"Fine Arts Association", instructor:"Connor Costanzo, MA, ATR, LPC", description:"Social art group for older adults to explore multiple mediums in a relaxed creative setting.", residentFee:180, nonResidentFee:180, extraLabel:null, extraResident:0, extraNonResident:0, sessions:generateRecurringSessions({start:"2026-06-15",end:"2026-07-20",weekday:"Mon",startTime:"3:15 PM",endTime:"4:45 PM"}) }
];

const STORAGE_KEY = "mentor-summer-art-planner-state";
const SHARE_PARAM = "picks";
const EMAIL_TO = "reedhmartin@gmail.com";
const GOOGLE_SHEET_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwWnItUGZrBwrGZWveWt0xplJk31U0oj8yE9MOIJ_-eDLEdRBfYaderEGt96Rd4Ruja/exec";

const selected = new Set();
let pricingMode = "resident";
let activeItemId = null;
let importedShare = false;
let activeCalendarMonth = 4;

const bindTap = (element, handler, { stopPropagation = false } = {}) => {
  let lastTouch = 0;
  element.addEventListener("touchend", event => {
    lastTouch = Date.now();
    if (stopPropagation) event.stopPropagation();
    event.preventDefault();
    handler(event);
  }, { passive:false });
  element.addEventListener("click", event => {
    if (Date.now() - lastTouch < 700) {
      if (stopPropagation) event.stopPropagation();
      return;
    }
    handler(event);
  });
};

const validIds = () => new Set(offerings.map(item => item.id));

const updateLocationCounts = () => {
  const counts = offerings.reduce((totals, item) => {
    totals.all += 1;
    if (item.area === "Wildwood") totals.wildwood += 1;
    if (item.area === "Senior") totals.senior += 1;
    if (item.area === "Fine Arts Association") totals.faa += 1;
    return totals;
  }, { all:0, wildwood:0, senior:0, faa:0 });
  const labels = {
    all: "All locations",
    wildwood: "Wildwood",
    senior: "Senior Center",
    faa: "Fine Arts Association"
  };
  Object.entries(labels).forEach(([value, label]) => {
    const option = document.querySelector(`#areaFilter option[value='${value}']`);
    if (option) option.textContent = `${label} (${counts[value]})`;
  });
};

const getShareState = () => {
  const params = new URLSearchParams(window.location.search);
  const picks = params.get(SHARE_PARAM);
  if (!picks) return false;
  const ids = validIds();
  selected.clear();
  picks.split(",").map(id => id.trim()).filter(Boolean).forEach(id => {
    if (ids.has(id)) selected.add(id);
  });
  importedShare = true;
  return true;
};

const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const state = JSON.parse(raw);
    if (Array.isArray(state.selected)) {
      state.selected.forEach(id => {
        if (getItemById(id)) selected.add(id);
      });
    }
  } catch {
    // Ignore invalid stored state and fall back to the defaults.
  }
};

const loadInitialState = () => {
  if (getShareState()) {
    saveState();
    return;
  }
  loadState();
};

const saveState = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      selected: [...selected]
    }));
  } catch {
    // Storage can fail in private mode or if quota is exceeded.
  }
};

const cardText = item => item.sessions.length === 1
  ? `${fmtLongDate(parseDate(item.sessions[0].date))} | ${item.sessions[0].startTime} - ${item.sessions[0].endTime}`
  : `${fmtLongDate(parseDate(item.sessions[0].date))} to ${fmtLongDate(parseDate(item.sessions[item.sessions.length - 1].date))} | ${item.sessions.length} sessions`;

const cardDateText = item => item.sessions.map(session => fmtShortDate(parseDate(session.date))).join(", ");

const getItemById = id => offerings.find(item => item.id === id);

const FAA_CODES = {
  "faa-adult-ceramics-session-1": "VAS2624A",
  "faa-adult-ceramics-session-2": "VAS2624B",
  "faa-adult-clay-studio": "VAS2625",
  "faa-painting-coffee": "VAS2631",
  "faa-craft-sip-paper-dahlia": "VAS2651A",
  "faa-hand-tied-rose-bouquet": "VAS2651B"
};

const signupDetails = item => {
  if (item.area === "Fine Arts Association") {
    return {
      source: "Fine Arts Association",
      code: FAA_CODES[item.id] || "Code not listed in source PDF",
      register: "https://www.fineartsassociation.org/visual-arts/",
      phone: "440-951-7500",
      notes: "Use the FAA visual arts registration page. For ceramics/clay studio, expect the listed clay supply note."
    };
  }
  if (item.area === "Senior") {
    return {
      source: "Mentor Senior Center / Mentor Parks & Recreation",
      code: "No activity code listed in source PDF",
      register: "https://cityofmentor.com",
      phone: "Senior Center 440-974-5725",
      notes: "Senior Center membership is required for Senior Center activities. Resident registration began April 6, 2026; non-resident registration began April 7, 2026."
    };
  }
  return {
    source: "Mentor Parks & Recreation / Wildwood Cultural Center",
    code: "No activity code listed in source PDF",
    register: "https://cityofmentor.com",
    phone: "Wildwood 440-974-5735 or Recreation 440-974-5720",
    notes: "Resident registration began April 6, 2026; non-resident registration began April 7, 2026."
  };
};

const formatSessionLine = session => {
  const date = parseDate(session.date);
  return `${fmtLongDate(date)} | ${session.startTime} - ${session.endTime}`;
};

const syncModalSelection = item => {
  const toggle = document.getElementById("modalToggle");
  const status = document.getElementById("modalSelection");
  const selectedNow = selected.has(item.id);
  toggle.textContent = selectedNow ? "Remove from calendar" : "Add to calendar";
  status.textContent = selectedNow ? "Selected" : "Not selected";
};

const openModal = item => {
  activeItemId = item.id;
  document.getElementById("modalKicker").textContent = item.group;
  document.getElementById("modalTitle").textContent = item.title;
  document.getElementById("modalDesc").textContent = item.fullDescription || item.description;
  document.getElementById("modalAge").textContent = item.age;
  document.getElementById("modalLocation").textContent = item.location;
  document.getElementById("modalInstructor").textContent = item.instructor;
  document.getElementById("modalNotes").textContent = item.extraLabel
    ? `${item.extraLabel}. Cost is summarized at the end of the planner.`
    : "Cost is summarized at the end of the planner.";
  const sessionsRoot = document.getElementById("modalSessions");
  sessionsRoot.innerHTML = "";
  item.sessions.forEach(session => {
    const row = document.createElement("div");
    row.className = "modal-session";
    row.innerHTML = `<strong>${formatSessionLine(session)}</strong><span>${item.category === "cooking" ? "Cooking / hobby" : item.category.charAt(0).toUpperCase() + item.category.slice(1)}</span>`;
    sessionsRoot.appendChild(row);
  });
  syncModalSelection(item);
  const modal = document.getElementById("eventModal");
  const modalCard = modal.querySelector(".modal-card");
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  if (modalCard) modalCard.scrollTop = 0;
  requestAnimationFrame(() => {
    if (modalCard) modalCard.scrollTop = 0;
    document.getElementById("modalClose").focus({ preventScroll:true });
  });
};

const closeModal = () => {
  const modal = document.getElementById("eventModal");
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
  activeItemId = null;
};

const buildEvents = (scope = "selected") => {
  const events = [];
  for (const item of offerings) {
    if (scope !== "all" && !selected.has(item.id)) continue;
    const fee = pricingMode === "resident" ? item.residentFee : item.nonResidentFee;
    const extra = pricingMode === "resident" ? item.extraResident : item.extraNonResident;
    for (const session of item.sessions) {
      const date = parseDate(session.date);
      events.push({
        id: `${item.id}-${session.date}-${session.startTime}`,
        itemId: item.id,
        title: item.title,
        category: item.category,
        date: session.date,
        selected: selected.has(item.id),
        start: buildDateTime(date, session.startTime),
        end: buildDateTime(date, session.endTime),
        location: item.location,
        fee,
        extra,
        total: fee + extra
      });
    }
  }
  events.sort((a,b) => a.start - b.start);
  return events;
};

const renderSelectedSummary = () => {
  const items = offerings.filter(item => selected.has(item.id));
  const eventCount = items.reduce((sum, item) => sum + item.sessions.length, 0);
  document.getElementById("selectedCount").textContent = items.length;
  document.getElementById("selectedEvents").textContent = eventCount;
  document.getElementById("summaryText").textContent = items.length
    ? `${items.length} pick${items.length === 1 ? "" : "s"} selected with ${eventCount} calendar date${eventCount === 1 ? "" : "s"}.`
    : "Select one or more offerings to build a plan.";

  const root = document.getElementById("selectedList");
  root.innerHTML = "";
  items.forEach(item => {
    const total = pricingMode === "resident" ? item.residentFee + item.extraResident : item.nonResidentFee + item.extraNonResident;
    const card = document.createElement("div");
    card.className = "summary-card";
    card.innerHTML = `
      <div class="summary-title">${item.title}</div>
      <div class="summary-meta">${cardText(item)}<br />${item.location} | ${item.instructor}</div>
      <div class="summary-breakdown">
        <div><span>Base fee</span><strong>${fmtMoney(pricingMode === "resident" ? item.residentFee : item.nonResidentFee)}</strong></div>
        <div><span>${item.extraLabel ? item.extraLabel : "No extra fee listed"}</span><strong>${fmtMoney(pricingMode === "resident" ? item.extraResident : item.extraNonResident)}</strong></div>
        <div><span>Total</span><strong>${fmtMoney(total)}</strong></div>
      </div>
    `;
    root.appendChild(card);
  });
};

const renderClassList = () => {
  const query = document.getElementById("searchBox").value.trim().toLowerCase();
  const area = document.getElementById("areaFilter").value;
  const root = document.getElementById("classList");
  root.innerHTML = "";
  offerings
    .filter(item => {
      const hay = [item.title,item.group,item.location,item.instructor,item.description,item.age].join(" ").toLowerCase();
      const matchesQuery = !query || hay.includes(query);
      const matchesArea = area === "all" || (area === "wildwood" && item.area === "Wildwood") || (area === "senior" && item.area === "Senior") || (area === "faa" && item.area === "Fine Arts Association");
      return matchesQuery && matchesArea;
    })
    .forEach(item => {
      const card = document.createElement("article");
      card.className = "class-card" + (selected.has(item.id) ? " selected" : "");
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.innerHTML = `
        <div class="class-head">
          <input type="checkbox" ${selected.has(item.id) ? "checked" : ""} aria-label="Select ${item.title}" />
          <div>
            <h3 class="class-title">${item.title}</h3>
            <div class="card-date">${cardDateText(item)}</div>
            <div class="class-meta"><span class="series-badge">${item.group}</span><span class="meta-badge">${item.age}</span><span class="meta-badge">${item.area}</span></div>
          </div>
        </div>
        <div class="class-desc">${item.description}</div>
        <div class="class-foot">
          <div><strong>Schedule:</strong> ${cardText(item)}</div>
          <div><strong>Location:</strong> ${item.location}</div>
          <div><strong>Instructor:</strong> ${item.instructor}</div>
          <div><strong>Details:</strong> Tap to open the event popup</div>
        </div>
        <div class="card-actions">
          <button class="select-btn" type="button">${selected.has(item.id) ? "Remove pick" : "Pick this event"}</button>
          <button class="details-btn" type="button">Details</button>
        </div>
      `;
      const checkbox = card.querySelector("input");
      const selectBtn = card.querySelector(".select-btn");
      const detailsBtn = card.querySelector(".details-btn");
      checkbox.addEventListener("click", event => event.stopPropagation());
      checkbox.addEventListener("change", () => {
        setItemSelected(item, checkbox.checked);
        if (activeItemId === item.id) syncModalSelection(item);
      });
      bindTap(selectBtn, event => {
        const shouldSelect = !selected.has(item.id);
        setItemSelected(item, shouldSelect);
        if (activeItemId === item.id) syncModalSelection(item);
      }, { stopPropagation:true });
      bindTap(detailsBtn, () => {
        openModal(item);
      }, { stopPropagation:true });
      card.addEventListener("click", event => {
        if (event.target.closest("input,button")) return;
        openModal(item);
      });
      card.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openModal(item);
        }
      });
      root.appendChild(card);
    });
};

const monthNames = ["May 2026","June 2026","July 2026","August 2026","September 2026"];
const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const renderCalendar = () => {
  const root = document.getElementById("calendarMonths");
  root.innerHTML = "";
  const events = buildEvents("all");
  const byDate = new Map();
  events.forEach(event => { if (!byDate.has(event.date)) byDate.set(event.date, []); byDate.get(event.date).push(event); });
  byDate.forEach(list => list.sort((a,b) => a.start - b.start));

  for (let monthIndex = 4; monthIndex <= 8; monthIndex++) {
    const first = new Date(2026, monthIndex, 1);
    const last = new Date(2026, monthIndex + 1, 0);
    const startGrid = new Date(first); startGrid.setDate(first.getDate() - first.getDay());
    const endGrid = new Date(last); endGrid.setDate(last.getDate() + (6 - last.getDay()));
    const month = document.createElement("section");
    month.className = "month" + (monthIndex === activeCalendarMonth ? " active-month" : "");
    month.dataset.monthIndex = String(monthIndex);
    month.innerHTML = `<h3>${monthNames[monthIndex - 4]}</h3>`;
    const weekdayRow = document.createElement("div");
    weekdayRow.className = "weekday-row";
    dayNames.forEach(d => { const el = document.createElement("div"); el.textContent = d; weekdayRow.appendChild(el); });
    const grid = document.createElement("div");
    grid.className = "month-grid";
    let cursor = new Date(startGrid);
    while (cursor <= endGrid) {
      const cell = document.createElement("div");
      cell.className = "day";
      if (cursor.getMonth() !== monthIndex) cell.classList.add("muted");
      const key = isoDate(cursor);
      const dayEvents = byDate.get(key) || [];
      const num = document.createElement("div");
      num.className = "day-num";
      num.textContent = cursor.getDate();
      cell.appendChild(num);
      dayEvents.slice(0, 3).forEach(event => {
        const btn = document.createElement("button");
        btn.className = `event ${event.category} ${event.selected ? "chosen" : "available"}`;
        btn.title = `${event.title}\n${fmtLongDate(event.start)} ${event.start.toLocaleTimeString([], {hour:"numeric",minute:"2-digit"})} - ${event.end.toLocaleTimeString([], {hour:"numeric",minute:"2-digit"})}`;
        btn.innerHTML = `${event.title}<small>${event.selected ? "Chosen" : "Available"} | ${event.start.toLocaleTimeString([], {hour:"numeric",minute:"2-digit"})}</small>`;
        bindTap(btn, () => {
          const item = getItemById(event.itemId);
          if (item) openModal(item);
        }, { stopPropagation:true });
        cell.appendChild(btn);
      });
      if (dayEvents.length > 3) {
        const more = document.createElement("div");
        more.style.color = "var(--faint)";
        more.style.fontSize = ".77rem";
        more.textContent = `+${dayEvents.length - 3} more`;
        cell.appendChild(more);
      }
      grid.appendChild(cell);
      cursor.setDate(cursor.getDate() + 1);
    }
    month.appendChild(weekdayRow);
    month.appendChild(grid);
    root.appendChild(month);
  }
  const label = document.getElementById("activeMonthLabel");
  if (label) label.textContent = monthNames[activeCalendarMonth - 4];
};

const changeCalendarMonth = delta => {
  activeCalendarMonth = Math.max(4, Math.min(8, activeCalendarMonth + delta));
  renderCalendar();
};

const buildShareUrl = () => {
  const url = new URL(window.location.href);
  url.search = "";
  url.hash = "";
  if (selected.size) url.searchParams.set(SHARE_PARAM, [...selected].sort().join(","));
  return url.toString();
};

const setShareStatus = message => {
  const status = document.getElementById("shareStatus");
  if (status) status.textContent = message;
};

const setPlannerView = view => {
  const showCalendar = view === "calendar";
  document.getElementById("cardsView").classList.toggle("view-hidden", showCalendar);
  document.getElementById("calendarView").classList.toggle("view-hidden", !showCalendar);
  document.querySelectorAll(".view-btn").forEach(button => {
    const active = button.dataset.view === view;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  if (showCalendar) {
    document.getElementById("calendarDrawer").open = true;
    document.getElementById("calendarView").scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const buildEmailBody = () => {
  const items = offerings.filter(item => selected.has(item.id));
  const modeLabel = pricingMode === "resident" ? "Resident" : "Non-resident";
  const lines = [
    "Tifanii's selected hobby classes",
    "",
    `Pricing mode: ${modeLabel}`,
    `Open selected picks: ${buildShareUrl()}`,
    "",
    "Sign-up checklist",
    ""
  ];
  items.forEach((item, index) => {
    const details = signupDetails(item);
    const baseFee = pricingMode === "resident" ? item.residentFee : item.nonResidentFee;
    const extraFee = pricingMode === "resident" ? item.extraResident : item.extraNonResident;
    lines.push(
      `${index + 1}. ${item.title}`,
      `Category: ${item.group}`,
      `Sign-up source: ${details.source}`,
      `Class/activity code: ${details.code}`,
      `Register online: ${details.register}`,
      `Call: ${details.phone}`,
      `Dates/times: ${item.sessions.map(formatSessionLine).join("; ")}`,
      `Location: ${item.location}`,
      `Instructor: ${item.instructor}`,
      `Age: ${item.age}`,
      `Fee: ${modeLabel} ${fmtMoney(baseFee)}`,
      `Extra fee/note: ${item.extraLabel ? `${item.extraLabel} - ${fmtMoney(extraFee)}` : "No extra fee listed"}`,
      `Estimated total: ${fmtMoney(baseFee + extraFee)}`,
      `Sign-up note: ${details.notes}`,
      ""
    );
  });
  lines.push("Generated from HobbieClassPicker.");
  return lines.join("\n");
};

const selectedSnapshot = (action, changedItem) => {
  const items = offerings.filter(item => selected.has(item.id));
  return {
    action,
    changedId: changedItem ? changedItem.id : "",
    changedTitle: changedItem ? changedItem.title : "",
    updatedAt: new Date().toISOString(),
    pricingMode,
    shareUrl: buildShareUrl(),
    selectedCount: items.length,
    selectedEvents: items.reduce((sum, item) => sum + item.sessions.length, 0),
    picks: items.map(item => {
      const details = signupDetails(item);
      const baseFee = pricingMode === "resident" ? item.residentFee : item.nonResidentFee;
      const extraFee = pricingMode === "resident" ? item.extraResident : item.extraNonResident;
      return {
        id: item.id,
        title: item.title,
        group: item.group,
        area: item.area,
        age: item.age,
        location: item.location,
        instructor: item.instructor,
        schedule: item.sessions.map(formatSessionLine).join("; "),
        baseFee,
        extraFee,
        estimatedTotal: baseFee + extraFee,
        extraLabel: item.extraLabel || "No extra fee listed",
        signupSource: details.source,
        signupCode: details.code,
        registerOnline: details.register,
        phone: details.phone,
        signupNotes: details.notes
      };
    })
  };
};

const syncPicksToSheet = (action, changedItem = null) => {
  if (!GOOGLE_SHEET_WEB_APP_URL) {
    setShareStatus("Google Sheet is not connected yet.");
    return false;
  }
  const payload = selectedSnapshot(action, changedItem);
  const body = JSON.stringify(payload);
  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
      if (navigator.sendBeacon(GOOGLE_SHEET_WEB_APP_URL, blob)) {
        setShareStatus("Google Sheet updated.");
        return true;
      }
    }
    fetch(GOOGLE_SHEET_WEB_APP_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body
    });
    setShareStatus("Google Sheet update sent.");
    return true;
  } catch {
    setShareStatus("Could not update Google Sheet from this device.");
    return false;
  }
};

const setItemSelected = (item, shouldSelect, action) => {
  if (shouldSelect) selected.add(item.id); else selected.delete(item.id);
  saveState();
  renderAll();
  syncPicksToSheet(action || (shouldSelect ? "added" : "removed"), item);
};

const sharePicks = () => {
  if (!selected.size) {
    setShareStatus("Pick at least one event first.");
    return alert("Pick at least one event first.");
  }
  const sent = syncPicksToSheet("sent");
  if (sent) {
    setShareStatus("Picks sent to the Google Sheet.");
  } else {
    const url = buildShareUrl();
    try {
      navigator.clipboard.writeText(url);
      setShareStatus("Google Sheet is not connected yet. Picks link copied instead.");
    } catch {
      window.prompt("Google Sheet is not connected yet. Copy this picks link:", url);
    }
  }
};

const renderAll = () => {
  renderClassList();
  renderCalendar();
  renderSelectedSummary();
  if (activeItemId) {
    const activeItem = getItemById(activeItemId);
    if (activeItem) syncModalSelection(activeItem);
  }
};

updateLocationCounts();
loadInitialState();
renderAll();
if (importedShare) setShareStatus("Loaded shared picks on this device.");

document.getElementById("searchBox").addEventListener("input", renderAll);
document.getElementById("areaFilter").addEventListener("change", renderAll);
document.querySelectorAll(".view-btn").forEach(button => {
  bindTap(button, () => setPlannerView(button.dataset.view));
});
bindTap(document.getElementById("prevMonth"), () => changeCalendarMonth(-1));
bindTap(document.getElementById("nextMonth"), () => changeCalendarMonth(1));
bindTap(document.getElementById("sharePicks"), sharePicks);
bindTap(document.getElementById("sharePicksSummary"), sharePicks);
bindTap(document.getElementById("clearAll"), () => { selected.clear(); saveState(); renderAll(); syncPicksToSheet("cleared"); });
bindTap(document.getElementById("modalClose"), closeModal);
bindTap(document.getElementById("modalDone"), closeModal);
const eventModal = document.getElementById("eventModal");
eventModal.addEventListener("click", event => {
  if (event.target.id === "eventModal") closeModal();
});
eventModal.addEventListener("touchend", event => {
  if (event.target.id === "eventModal") {
    event.preventDefault();
    closeModal();
  }
}, { passive:false });
bindTap(document.getElementById("modalToggle"), () => {
  const item = getItemById(activeItemId);
  if (!item) return;
  setItemSelected(item, !selected.has(item.id));
  closeModal();
  setPlannerView("cards");
  document.getElementById("classList").scrollIntoView({ behavior: "smooth", block: "start" });
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModal();
});
