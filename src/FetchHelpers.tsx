import { useEffect, useState } from "react"

import { Game } from "./models/Game"
import { Group } from "./models/Group"
import { LinkType } from "./models/LinkType"
import { Player } from "./models/Player"
import { Result } from "./models/Result"
import { Summary } from "./models/Summary"
import { WinMethod } from "./models/WinMethod"

export const useSummary = () => {
    let fetch = useFetch<Summary | undefined>(`${process.env.REACT_APP_API_URL}/summary`, undefined)

    return {
        isLoadingSummary: fetch.isLoading,
        summary: fetch.data,
    }
}

export const usePlayers = () => {
    let fetch = useFetch<Player[]>(`${process.env.REACT_APP_API_URL}/players`, [])

    return {
        isLoadingPlayers: fetch.isLoading,
        players: fetch.data,
    }
}

export const useGames = () => {
    let fetch = useFetch<Game[]>(`${process.env.REACT_APP_API_URL}/games`, [])

    return {
        isLoadingGames: fetch.isLoading,
        games: fetch.data,
    }
}

export const useGame = (name: string | undefined) => {
    let endpoint = ""
    if (name !== undefined && name.length > 0) {
        endpoint = `${process.env.REACT_APP_API_URL}/games/${name}`
    }

    let fetch = useFetch<Game | undefined>(endpoint, undefined)

    return {
        isLoadingGame: fetch.isLoading,
        game: fetch.data,
    }
}

export const useAllGroups = () => {
    let fetch = useFetch<Group[]>(`${process.env.REACT_APP_API_URL}/groups-all`, [])

    return {
        isLoadingGroups: fetch.isLoading,
        groups: fetch.data,
    }
}

export const useGroups = () => {
    let fetch = useFetch<Group[]>(`${process.env.REACT_APP_API_URL}/groups`, [])

    return {
        isLoadingGroups: fetch.isLoading,
        groups: fetch.data,
    }
}

export const useGroup = (name: string | undefined) => {
    let endpoint = ""
    if (name !== undefined && name.length > 0) {
        endpoint = `${process.env.REACT_APP_API_URL}/groups/${name}`
    }

    let fetch = useFetch<Group | undefined>(endpoint, undefined)

    return {
        isLoadingGroup: fetch.isLoading,
        group: fetch.data,
    }
}

export const useLinkTypes = () => {
    let fetch = useFetch<LinkType[]>(`${process.env.REACT_APP_API_URL}/linkTypes`, [])

    return {
        isLoadingLinkTypes: fetch.isLoading,
        linkTypes: fetch.data,
    }
}

export const useWinMethods = () => {
    let fetch = useFetch<WinMethod[]>(`${process.env.REACT_APP_API_URL}/winMethods`, [])

    return {
        isLoadingWinMethods: fetch.isLoading,
        winMethods: fetch.data,
    }
}

export const useResults = () => {
    let fetch = useFetch<Result[]>(`${process.env.REACT_APP_API_URL}/results`, [])

    return {
        isLoadingResults: fetch.isLoading,
        results: fetch.data,
    }
}

// adapted from https://www.smashingmagazine.com/2020/07/custom-react-hook-fetch-cache-data/
const useFetch = <T,>(url: string, initial: T) => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(initial)

    useEffect(() => {
        if (url.length <= 0) {
            return
        }

        const fetchData = () => {
            setIsLoading(true)

            fetchWithResilience<T>(url)
                .then(setData)
                .then(() => setIsLoading(false))
        }

        fetchData()
    }, [url])

    return { isLoading, data }
}

const fetchWithResilience = <T,>(url: string) => {
    return fetch(url)
        .then(res => res.json())
        .catch(err => console.error(err))
        .then((data: T) => data)
}
