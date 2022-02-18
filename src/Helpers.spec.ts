import { getPlayersToUse, replaceDuplicates } from "./Helpers"

const replaceDuplicatesParams = [
    {
        name: "replaces a duplicate at the start of the list",
        source: ["c", "b", "c", "d"],
        index: 2,
        replacements: ["a"],
        expected: ["a", "b", "c", "d"],
    },
    {
        name: "replaces a duplicate mid-list",
        source: ["c", "b", "c", "d"],
        index: 0,
        replacements: ["a"],
        expected: ["c", "b", "a", "d"],
    },
    {
        name: "replaces a duplicate at the end of the list",
        source: ["c", "b", "d", "c"],
        index: 0,
        replacements: ["a"],
        expected: ["c", "b", "d", "a"],
    },
    {
        name: "replaces duplicates at the start of the list",
        source: ["c", "c", "d", "c"],
        index: 3,
        replacements: ["b", "a"],
        expected: ["b", "a", "d", "c"],
    },
    {
        name: "replaces duplicates mid-list",
        source: ["c", "c", "c", "d"],
        index: 0,
        replacements: ["a", "b"],
        expected: ["c", "a", "b", "d"],
    },
    {
        name: "replaces duplicates at the end of the list",
        source: ["c", "d", "c", "c"],
        index: 0,
        replacements: ["b", "a"],
        expected: ["c", "d", "b", "a"],
    },
]

describe("replaceDuplicates", () => {
    replaceDuplicatesParams.forEach(p => {
        it(p.name, () => {
            expect(replaceDuplicates(p.source, p.index, p.replacements)).toEqual(p.expected)
        })
    })
})

const getPlayersToUseParams = [
    {
        name: "returns players list truncated to the min count",
        usernames: ["a", "b", "c", "d"],
        minCount: 2,
        expected: ["a", "b"],
    },
    {
        name: "returns all players when the list is equal in length to the min count",
        usernames: ["a", "b"],
        minCount: 2,
        expected: ["a", "b"],
    },
    {
        name: "returns players padded with empty strings when the list is shorter than the min count",
        usernames: ["a", "b"],
        minCount: 3,
        expected: ["a", "b", ""],
    },
]

describe("getPlayerIdsToUse", () => {
    getPlayersToUseParams.forEach(p => {
        it(p.name, () => {
            expect(getPlayersToUse(p.usernames, p.minCount)).toEqual(p.expected)
        })
    })
})
