export type User = {
    id: number
    login: string
    password: string
    surname: string
    firstname: string
    secondname: string
}

export type Place = {
    id: number
    number: string
    address: string
    to: To[]
    defect: Defect[]

}
export type To = {
    id: number
    placeNumber: string
    address: string
    placeTo: Place
    createdAt: Date
    updatedAt: Date
    protocol: any
    fio: string
}

export type Defect = {
    id: number
    placeNumber: string
    content: string
    createdAt: Date
    updatedAt: Date
    placeDefect: Place
}