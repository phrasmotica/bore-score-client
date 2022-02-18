import { getPlayerIdsToUse, replaceDuplicates } from "./Helpers"

const replaceDuplicatesParams = [
    {
        name: "replaces a duplicate at the start of the list",
        source: [3, 2, 3, 4],
        index: 2,
        replacements: [1],
        expected: [1, 2, 3, 4],
    },
    {
        name: "replaces a duplicate mid-list",
        source: [3, 2, 3, 4],
        index: 0,
        replacements: [1],
        expected: [3, 2, 1, 4],
    },
    {
        name: "replaces a duplicate at the end of the list",
        source: [3, 2, 4, 3],
        index: 0,
        replacements: [1],
        expected: [3, 2, 4, 1],
    },
    {
        name: "replaces duplicates at the start of the list",
        source: [3, 3, 4, 3],
        index: 3,
        replacements: [2, 1],
        expected: [2, 1, 4, 3],
    },
    {
        name: "replaces duplicates mid-list",
        source: [3, 3, 3, 4],
        index: 0,
        replacements: [1, 2],
        expected: [3, 1, 2, 4],
    },
    {
        name: "replaces duplicates at the end of the list",
        source: [3, 4, 3, 3],
        index: 0,
        replacements: [2, 1],
        expected: [3, 4, 2, 1],
    },
]

describe("replaceDuplicates", () => {
    replaceDuplicatesParams.forEach(p => {
        it(p.name, () => {
            expect(replaceDuplicates(p.source, p.index, p.replacements)).toEqual(p.expected)
        })
    })
})

const getPlayerIdsToUseParams = [
    {
        name: "returns player IDs list truncated to the min count",
        playerIds: [1, 2, 3, 4],
        minCount: 2,
        expected: [1, 2],
    },
    {
        name: "returns all player IDs when the list is equal in length to the min count",
        playerIds: [1, 2],
        minCount: 2,
        expected: [1, 2],
    },
    {
        name: "returns player IDs padded with zeroes when the list is shorter than the min count",
        playerIds: [1, 2],
        minCount: 3,
        expected: [1, 2, 0],
    },
]

describe("getPlayerIdsToUse", () => {
    getPlayerIdsToUseParams.forEach(p => {
        it(p.name, () => {
            expect(getPlayerIdsToUse(p.playerIds, p.minCount)).toEqual(p.expected)
        })
    })
})
