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

const duration = [
  {
    id: 1,
    day: 1,
    title: 1,
    info: "day",
  },
  {
    id: 2,
    day: 7,
    title: "1",
    info: "week",
  },
  {
    id: 3,
    day: 14,
    title: "2",
    info: "weeks",
  },
  {
    id: 4,
    day: 30,
    title: "1",
    info: "month",
  },
  {
    id: 5,
    day: 180,
    title: "6",
    info: "months",
  },
  {
    id: 6,
    day: -1,
    title: "--",
    info: "Ongoing",
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

export { frequencies, duration, units, medTypes, medColor };
