export interface LinkType {
    links: LinkUserType
}

export interface LinkUserType {
    users: string
}

export default class Links {
    static getLinks(path = '/'): LinkType {
        return {
            links: {
                users: `${path}`
            }
        }
    }
}