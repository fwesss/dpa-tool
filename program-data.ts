export const filters = {
  firstTimeBuyer: {
    message: "All borrowers must be first time home buyers",
  },
  allOccupying: {
    message:
      "All borrowers must occupy the property as their primary residence",
  },
  "620Fico": {
    message: "The minimum FICO score for this program is 620",
  },
  "640Fico": {
    message: "The minimum FICO score for this program is 640",
  },
  "660Fico": {
    message: "The minimum FICO score for this program is 660",
  },
  "680Fico": {
    message: "The minimum FICO score for this program is 680",
  },
  "45Dti": {
    message: "The maximum DTI for this program is 45%",
  },
  "50Dti": {
    message: "The maximum DTI for this program is 50%",
  },
  "55Dti": {
    message: "The maximum DTI for this program is 55%",
  },
}

export type FilterName =
  | "firstTimeBuyer"
  | "allOccupying"
  | "620Fico"
  | "640Fico"
  | "660Fico"
  | "680Fico"
  | "45Dti"
  | "50Dti"
  | "55Dti"

export type Filter = {
  [key in FilterName]: {
    message: string
  }
}

export interface Program {
  name:
    | "CalHFA FHA"
    | "CalHFA Conventional"
    | "CalPLUS FHA"
    | "CalPLUS Conventional"
    | "Platinum FHA"
    | "Platinum Conventional"
    | "Open Doors FHA"
    | "Open Doors Conventional"
    | "Expanded Open Doors FHA"
    | "Expanded Open Doors Conventional"
  agency: "CalHFA" | "GSFA"
  type: readonly ("1st" | "2nd" | "3rd" | "Forgivable 2nd" | "Grant")[]
  filters: readonly FilterName[]
}

const programs: readonly Program[] = [
  {
    name: "CalHFA FHA",
    agency: "CalHFA",
    type: ["1st", "2nd"],
    filters: ["firstTimeBuyer", "allOccupying", "660Fico", "45Dti"],
  },
  {
    name: "CalHFA Conventional",
    agency: "CalHFA",
    type: ["1st", "2nd"],
    filters: ["firstTimeBuyer", "allOccupying", "680Fico", "45Dti"],
  },
  {
    name: "CalPLUS FHA",
    agency: "CalHFA",
    type: ["1st", "2nd", "3rd"],
    filters: ["firstTimeBuyer", "allOccupying", "660Fico", "45Dti"],
  },
  {
    name: "CalPLUS Conventional",
    agency: "CalHFA",
    type: ["1st", "2nd", "3rd"],
    filters: ["firstTimeBuyer", "allOccupying", "680Fico", "45Dti"],
  },
  {
    name: "Platinum FHA",
    agency: "GSFA",
    type: ["1st", "Forgivable 2nd"],
    filters: ["660Fico", "45Dti"],
  },
  {
    name: "Platinum Conventional",
    agency: "GSFA",
    type: ["1st", "Forgivable 2nd"],
    filters: ["allOccupying", "640Fico", "45Dti"],
  },
  {
    name: "Open Doors FHA",
    agency: "GSFA",
    type: ["1st", "2nd", "Grant"],
    filters: ["660Fico", "45Dti"],
  },
  {
    name: "Open Doors Conventional",
    agency: "GSFA",
    type: ["1st", "2nd", "Grant"],
    filters: ["allOccupying", "680Fico", "50Dti"],
  },
  {
    name: "Expanded Open Doors FHA",
    agency: "GSFA",
    type: ["1st", "2nd", "Grant"],
    filters: ["620Fico", "55Dti"],
  },
  {
    name: "Expanded Open Doors Conventional",
    agency: "GSFA",
    type: ["1st", "2nd", "Grant"],
    filters: ["allOccupying", "680Fico", "50Dti"],
  },
] as const

type Name = Program["name"]
const slug = (name: Name) => name.toLowerCase().replace(" ", "-")

const sluggedPrograms = Object.fromEntries(
  programs.map(program => [slug(program.name), program])
)

export type Programs = typeof sluggedPrograms

export default sluggedPrograms
