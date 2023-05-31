export const setTitle = (title: string) => document.title = title

export const resetTitle = () => setTitle("BoreScore")

/**
 * Groups elements of the given array by the given key function, and returns the
 * grouping as a Map<string, T[]>.
 * Taken from https://stackoverflow.com/a/47752730
 */
export const groupBy = <T>(arr: T[], func: (x: T) => string) => arr.reduce(
    (entryMap, e) => entryMap.set(func(e), [...entryMap.get(func(e)) || [], e]),
    new Map<string, T[]>()
)

export const replaceDuplicates = <T>(source: T[], index: number, replacements: T[]) => {
    return replaceDuplicatesWithComparator(source, index, replacements, (first, second) => first === second)
}

export const replaceDuplicatesWithComparator = <T>(source: T[], index: number, replacements: T[], eq: (first: T, second: T) => boolean) => {
    let target = source[index]

    if (source.filter(v => eq(v, target)).length > 1) {
        let deduplicated = [...source]

        for (let i = 0, j = 0; i < deduplicated.length && j < replacements.length; i++) {
            // replace the duplicates elsewhere in the list with values from the replacements list
            if (i !== index && eq(deduplicated[i], target)) {
                deduplicated[i] = replacements[j++]
            }
        }

        // By this point we might still have duplicates that haven't been replaced because there
        // aren't enough replacements, but assume this is not the case. We don't want to be
        // truncating the array

        return deduplicated
    }

    return source
}

export const getPlayersToUse = (players: string[], minCount: number) => {
    if (minCount > players.length) {
        // pad out remaining space with placeholder usernames
        let padding = new Array(minCount - players.length).map((_, i) => "player" + i)
        return players.concat(padding)
    }

    // restrict to effectiveCount at most
    return players.slice(0, minCount)
}
