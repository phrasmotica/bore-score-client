export const replaceDuplicates = (source: number[], index: number, replacements: number[]) => {
    let target = source[index]

    if (source.filter(v => v === target).length > 1) {
        let deduplicated = [...source]

        for (let i = 0, j = 0; i < deduplicated.length && j < replacements.length; i++) {
            // replace the duplicates elsewhere in the list with values from the replacements list
            if (i !== index && deduplicated[i] === target) {
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

export const getPlayerIdsToUse = (playerIds: number[], minCount: number) => {
    if (minCount > playerIds.length) {
        // pad out remaining space with zeroes, i.e. no player selected
        return playerIds.concat(new Array(minCount - playerIds.length).fill(0))
    }

    // restrict to effectiveCount at most
    return playerIds.slice(0, minCount)
}
