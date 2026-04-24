export const SECTIONS = {
  exterior: {
    label: "Exterior",
    items: [
      "Roof Covering",
      "Gutters & Downspouts",
      "Siding / Cladding",
      "Foundation (Visible)",
      "Driveway & Walkways",
      "Deck / Porch / Patio",
      "Garage Door & Opener",
      "Grading & Drainage",
    ],
  },
  interior: {
    label: "Interior",
    items: [
      "Walls & Ceilings",
      "Floors",
      "Windows & Doors",
      "Stairways & Railings",
      "Attic Access & Insulation",
      "Basement / Crawlspace",
      "Fireplace & Chimney",
    ],
  },
  systems: {
    label: "Systems",
    items: [
      "Electrical Panel & Wiring",
      "Outlets & Switches",
      "HVAC – Heating",
      "HVAC – Cooling",
      "Water Heater",
      "Plumbing Supply Lines",
      "Plumbing Drain Lines",
      "Sump Pump",
    ],
  },
  kitchen: {
    label: "Kitchen & Baths",
    items: [
      "Kitchen Cabinets & Counters",
      "Kitchen Appliances",
      "Kitchen Plumbing",
      "Bathroom #1",
      "Bathroom #2",
      "Bathroom #3",
    ],
  },
} as const;

export type SectionKey = keyof typeof SECTIONS;

export const STATUS_OPTIONS = [
  { key: "pass", label: "✓" },
  { key: "warn", label: "△" },
  { key: "fail", label: "✗" },
  { key: "na", label: "N/A" },
] as const;
