const frequencies = [
  {
    id: "1",
    label: "Once a day",
    // icon: "capsule" as const,
    icon: "sunny-outline" as const,
    times: ["09:00"],
  },
  {
    id: "2",
    label: "Twice a day",
    icon: "sync-outline" as const,
    times: ["09:00", "21:00"],
  },
  {
    id: "3",
    label: "Thrice a day",
    icon: "time-outline" as const,
    times: ["09:00", "15:00", "21:00"],
  },
  {
    id: "4",
    label: "Four times a day",
    icon: "repeat-outline" as const,
    times: ["09:00", "13:00", "17:00", "21:00"],
  },
  { id: "5", label: "As needed", icon: "calendar-outline" as const, times: [] },
];

// const durations = [
//   { id: "1", label: "7 days", value: 7 },
//   { id: "2", label: "14 days", value: 14 },
//   { id: "3", label: "30 days", value: 30 },
//   { id: "4", label: "90 days", value: 90 },
//   { id: "5", label: "Ongoing", value: -1 },
// ];

const boxColor = "#DAEBDF";
const boxColor2 = "#DAEBDF";
// const boxColor = "#E8F3EB";
// const boxColor2 = "#E8F3EB";

const actions = [
  {
    icon: "add-circle-outline" as const,
    label: "Add Medications",
    // label: "Add\nMedications",
    route: "/medications/add" as const,
    color: "#2e7d32",
    gradient: [boxColor, boxColor2] as [string, string],
    // gradient: ["#4caf50", "#2e7d32"] as [string, string],
  },
  {
    icon: "calendar-outline" as const,
    label: "Calendar View",
    // label: "Calendar\nView",
    route: "/calendar" as const,
    color: "#1976d2",
    gradient: [boxColor, boxColor2] as [string, string],
    // gradient: ["#2196f3", "#1976d2"] as [string, string],
  },
  // {
  //   icon: "time-outline" as const,
  //   label: "History Log",
  //   // label: "History\nLog",
  //   route: "/history" as const,
  //   color: "#c21858",
  //   gradient: [boxColor, boxColor2] as [string, string],
  //   // gradient: ["#e91e63", "#c21858"] as [string, string],
  // },
  // {
  //   icon: "medical-outline" as const,
  //   label: "Refill Tracker",
  //   // label: "Refill\nTracker",
  //   route: "/refill" as const,
  //   color: "#e64a19",
  //   gradient: [boxColor, boxColor2] as [string, string],
  //   // gradient: ["#ff5722", "#e64a19"] as [string, string],
  // },
];

const homeActions = [
  {
    icon: "add-circle" as const,
    label: "Add Med",
    // label: "Add\nMedications",
    route: "/medications/add" as const,
    color: "#2e7d32",
    gradient: [boxColor, boxColor2] as [string, string],
    // gradient: ["#4caf50", "#2e7d32"] as [string, string],
  },
  {
    icon: "medical" as const,
    label: "All Meds",
    // label: "Add\nMedications",
    route: "/medications/display" as const,
    color: "#2e7d32",
    gradient: [boxColor, boxColor2] as [string, string],
    // gradient: ["#4caf50", "#2e7d32"] as [string, string],
  },
  {
    // icon: "calendar" as const,
    // icon: "calendar-clear" as const,
    icon: "today" as const,
    label: "Calendar",
    // label: "Calendar\nView",
    route: "/medications/calendar" as const,
    color: "#1976d2",
    gradient: [boxColor, boxColor2] as [string, string],
    // gradient: ["#2196f3", "#1976d2"] as [string, string],
  },
  {
    icon: "time" as const,
    label: "Med Logs",
    // label: "Calendar\nView",
    route: "/medications/history" as const,
    color: "#1976d2",
    gradient: [boxColor, boxColor2] as [string, string],
    // gradient: ["#2196f3", "#1976d2"] as [string, string],
  },
];

const units = [
  {
    id: 1,
    unitValue: "mg",
  },
  {
    id: 2,
    unitValue: "mcg",
  },
  {
    id: 3,
    unitValue: "g",
  },
  {
    id: 4,
    unitValue: "mL",
  },
  {
    id: 5,
    unitValue: "%",
  },
];

const medTypes = [
  // Common Forms (index 0-3)
  { id: 1, name: "Tablet", icon: "tablets", iconPackage: "FontAwesome6" },
  { id: 2, name: "Capsule", icon: "capsules", iconPackage: "FontAwesome6" },
  {
    id: 3,
    name: "Liquid",
    icon: "prescription-bottle-medical",
    iconPackage: "FontAwesome6",
  },
  { id: 4, name: "Drops", icon: "droplet", iconPackage: "FontAwesome6" },

  // Other Forms (index 4+)
  {
    id: 5,
    name: "Inhaler",
    icon: "spray-can-sparkles",
    iconPackage: "FontAwesome6",
  },
  {
    id: 6,
    name: "Ointment",
    icon: "hand-holding-droplet",
    iconPackage: "FontAwesome6",
  },

  {
    id: 7,
    name: "Injection",
    icon: "injection-syringe",
    iconPackage: "Fontisto",
  },
  {
    id: 8,
    name: "Foam",
    icon: "liquid-spot",
    iconPackage: "MaterialCommunityIcons",
  },
  // {
  //   id: 9,
  //   name: "Spray",
  //   icon: "spray",
  //   iconPackage: "MaterialCommunityIcons",
  // },
  { id: 9, name: "Spray", icon: "spray-can", iconPackage: "FontAwesome6" },
  { id: 10, name: "Suppository", icon: "egg", iconPackage: "FontAwesome5" },

  {
    id: 11,
    name: "Other",
    icon: "dots-horizontal",
    iconPackage: "MaterialCommunityIcons",
  },
];

// const duration = [
//   {
//     id: 1,
//     day: 1,
//     title: 1,
//     info: "day",
//   },
//   {
//     id: 2,
//     day: 7,
//     title: "1",
//     info: "week",
//   },
//   {
//     id: 3,
//     day: 14,
//     title: "2",
//     info: "weeks",
//   },
//   {
//     id: 4,
//     day: 30,
//     title: "1",
//     info: "month",
//   },
//   {
//     id: 5,
//     day: 180,
//     title: "6",
//     info: "months",
//   },
//   {
//     id: 6,
//     day: -1,
//     title: "--",
//     info: "Ongoing",
//   },
// ];
const medFreq = [
  {
    id: 1,
    frequency: "Daily",
  },
  {
    id: 2,
    frequency: "Weekly",
  },
  {
    id: 3,
    frequency: "Monthly",
  },
  {
    id: 4,
    frequency: "Yearly",
  },
  {
    id: 5,
    frequency: "Once",
  },
];

// const medColor = [
//   {
//     id: 1,
//     color: "#FFF3CD", // Teal (good contrast)
//   },
//   {
//     id: 2,
//     color: "#D1E7FF", // Mustard Yellow (less bright, better contrast)
//   },

//   {
//     id: 3,
//     color: "#FFE8E8", // Dark Coffee (replaces light green)
//   },
//   {
//     id: 4,
//     color: "#F0E6FF", // Navy Blue (excellent contrast)
//   },

//   {
//     id: 5,
//     color: "#E8F4F8", // Deep Lavender (replaces CE93D8)
//   },

//   {
//     id: 6,
//     color: "#D4EDDA", // Red (kept)
//   },
// ];
const medColor = [
  {
    id: 1,
    color: "#26A69A", // Teal (good contrast)
  },
  {
    id: 2,
    color: "#D4A017", // Mustard Yellow (less bright, better contrast)
  },

  {
    id: 3,
    color: "#5D4037", // Dark Coffee (replaces light green)
  },
  {
    id: 4,
    color: "#1E3A8A", // Navy Blue (excellent contrast)
  },

  {
    id: 5,
    color: "#7E57C2", // Deep Lavender (replaces CE93D8)
  },

  {
    id: 6,
    color: "#EF5350", // Red (kept)
  },
];

const dummyData = [
  {
    id: "1",
    name: "Aspirin",
    doses: "81mg", // Heart health
    time: "8:00 AM",
    bgColor: "#D4EDDA", // Soft mint
    taken: true,
    icon: "heart-outline", // Ionicons
  },
  {
    id: "2",
    name: "Ibuprofen",
    doses: "200mg", // Pain/fever
    time: "12:00 PM",
    bgColor: "#FFF3CD", // Pale butter
    taken: false,
    icon: "flame-outline",
  },
  {
    id: "3",
    name: "Vitamin D3",
    doses: "1000 IU", // Bone health
    time: "10:00 AM",
    bgColor: "#D1E7FF", // Washed sky blue
    taken: false,
    icon: "sunny-outline",
  },
  {
    id: "4",
    name: "Paracetamol",
    doses: "500mg", // Painkiller
    time: "3:00 PM",
    bgColor: "#FFE8E8", // Blush pink
    taken: false,
    icon: "medkit-outline",
  },
  {
    id: "5",
    name: "Omeprazole",
    doses: "20mg", // Acid reflux
    time: "7:00 AM",
    bgColor: "#E8F4F8", // Frosted teal
    taken: false,
    icon: "shield-checkmark-outline",
  },
  {
    id: "6",
    name: "Metformin",
    doses: "500mg", // Diabetes
    time: "6:00 PM",
    bgColor: "#F0E6FF", // Lavender mist
    taken: false,
    icon: "pulse-outline",
  },
  {
    id: "7",
    name: "Cetirizine",
    doses: "10mg", // Allergies
    time: "9:00 PM",
    bgColor: "#FFEDD5", // Peach cream
    taken: false,
    icon: "flower-outline",
  },
  {
    id: "8",
    name: "Atorvastatin",
    doses: "20mg", // Cholesterol
    time: "8:00 PM",
    bgColor: "#E0F2F1", // Seafoam
    taken: false,
    icon: "water-outline",
  },
  {
    id: "9",
    name: "Levothyroxine",
    doses: "50mcg", // Thyroid
    time: "6:00 AM",
    bgColor: "#F5E6FF", // Lilac haze
    taken: false,
    icon: "git-branch-outline",
  },
  {
    id: "10",
    name: "Amoxicillin",
    doses: "500mg", // Antibiotic
    time: "2:00 PM",
    bgColor: "#FFE5D9", // Barely-there coral
    taken: false,
    icon: "bug-outline",
  },
];

export {
  frequencies,
  actions,
  homeActions,
  medFreq,
  units,
  medTypes,
  medColor,
  dummyData,
};
