export type Address = {
    street: string,
    zipcode: string,
    city: string,
    state: string,
    country: string
}

export type Status = "waiting" | "valid" | "blocked" | "deleted";