export type Address = {
    street: string,
    zipcode: string,
    city: string,
    country: string
}

export type Status = "waiting" | "valid" | "blocked" | "deleted";
export type View = "dashboard" | "search" | "missions" | "ranking" | "stats" | "shop";