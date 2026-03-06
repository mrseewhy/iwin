export type ReachCategory =
    | "1-10"
    | "11-100"
    | "101-1000"
    | "1001-10000"
    | "10001-100000"
    | "100001-1000000"

export const REACH_TO_STARS: Record<ReachCategory, number> = {
    "1-10": 1,
    "11-100": 2,
    "101-1000": 3,
    "1001-10000": 4,
    "10001-100000": 5,
    "100001-1000000": 6,
}

export const REACH_OPTIONS: { value: ReachCategory; label: string }[] = [
    { value: "1-10", label: "1 – 10 people" },
    { value: "11-100", label: "11 – 100 people" },
    { value: "101-1000", label: "101 – 1,000 people" },
    { value: "1001-10000", label: "1,001 – 10,000 people" },
    { value: "10001-100000", label: "10,001 – 100,000 people" },
    { value: "100001-1000000", label: "100,001 – 1,000,000 people" },
]

export const NIGERIAN_STATES: string[] = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa",
    "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo",
    "Ekiti", "Enugu", "FCT - Abuja", "Gombe", "Imo", "Jigawa",
    "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
    "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun",
    "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
]

export type PledgeFormData = {
    name: string
    email: string
    phone: string
    state: string
    committedToVote: boolean
    willEngage: boolean
    reachCategory: ReachCategory
    starCount: number
    photoDataUrl: string | null   // base64 image string from file upload
}