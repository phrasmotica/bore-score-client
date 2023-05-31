import fuzzysort from "fuzzysort"

export const getMatches = <T>(searchTerm: string, data: T[], key: string) => {
    const results = fuzzysort.go(searchTerm, data, {
        key: key,
        threshold: -10000,
    })

    return results.map(r => r.obj)
}
