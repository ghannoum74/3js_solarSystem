export interface BodyInfo {
  name: string;
  type: string;
  description: string;
  diameter: string;
  gravity: string;
  temperature: string;
  orbitalPeriod: string;
  distance: string;
}

const bodyInfo: Record<string, BodyInfo> = {
  Sun: {
    name: "Sun",
    type: "G-type star",
    description:
      "The star at the center of our solar system and the source of nearly all its light and heat.",
    diameter: "1,392,700 km",
    gravity: "274 m/s²",
    temperature: "5,500 °C surface",
    orbitalPeriod: "Solar-system center",
    distance: "0 km",
  },
  Mercury: {
    name: "Mercury",
    type: "Terrestrial planet",
    description:
      "The smallest planet and the closest planet to the Sun, with a heavily cratered surface.",
    diameter: "4,879 km",
    gravity: "3.7 m/s²",
    temperature: "167 °C average",
    orbitalPeriod: "88 Earth days",
    distance: "57.9 million km",
  },
  Moon: {
    name: "Moon",
    type: "Natural satellite",
    description:
      "Earth's only natural satellite. Its gravity drives most of Earth's ocean tides.",
    diameter: "3,475 km",
    gravity: "1.62 m/s²",
    temperature: "-20 °C average",
    orbitalPeriod: "27.3 Earth days",
    distance: "384,400 km from Earth",
  },
  Earth: {
    name: "Earth",
    type: "Terrestrial planet",
    description:
      "Our home world and the only known planet with liquid surface oceans and life.",
    diameter: "12,742 km",
    gravity: "9.81 m/s²",
    temperature: "15 °C average",
    orbitalPeriod: "365.25 Earth days",
    distance: "149.6 million km",
  },
  Mars: {
    name: "Mars",
    type: "Terrestrial planet",
    description:
      "A cold desert world known for its iron-rich red surface, giant volcanoes, and deep canyons.",
    diameter: "6,779 km",
    gravity: "3.71 m/s²",
    temperature: "-63 °C average",
    orbitalPeriod: "687 Earth days",
    distance: "227.9 million km",
  },
  Jupiter: {
    name: "Jupiter",
    type: "Gas giant",
    description:
      "The largest planet, famous for its powerful storms and the centuries-old Great Red Spot.",
    diameter: "139,820 km",
    gravity: "24.79 m/s²",
    temperature: "-110 °C average",
    orbitalPeriod: "11.86 Earth years",
    distance: "778.5 million km",
  },
  Saturn: {
    name: "Saturn",
    type: "Gas giant",
    description:
      "The second-largest planet and the owner of the solar system's most visible ring system.",
    diameter: "116,460 km",
    gravity: "10.44 m/s²",
    temperature: "-140 °C average",
    orbitalPeriod: "29.45 Earth years",
    distance: "1.43 billion km",
  },
  Uranus: {
    name: "Uranus",
    type: "Ice giant",
    description:
      "A pale blue ice giant that rotates on its side, likely because of an ancient collision.",
    diameter: "50,724 km",
    gravity: "8.69 m/s²",
    temperature: "-195 °C average",
    orbitalPeriod: "84 Earth years",
    distance: "2.87 billion km",
  },
  Neptune: {
    name: "Neptune",
    type: "Ice giant",
    description:
      "The outermost major planet, with deep blue clouds and the fastest winds in the solar system.",
    diameter: "49,244 km",
    gravity: "11.15 m/s²",
    temperature: "-200 °C average",
    orbitalPeriod: "164.8 Earth years",
    distance: "4.5 billion km",
  },
  Pluton: {
    name: "Pluto",
    type: "Dwarf planet",
    description:
      "A small icy world in the Kuiper Belt with a large moon named Charon.",
    diameter: "2,377 km",
    gravity: "0.62 m/s²",
    temperature: "-225 °C average",
    orbitalPeriod: "248 Earth years",
    distance: "5.9 billion km",
  },
};

export default bodyInfo;
