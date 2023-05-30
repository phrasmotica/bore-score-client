import { useMemo, useState } from "react"
import moment from "moment"
import { Dropdown, Message } from "semantic-ui-react"

import { GameImage } from "../GameImage"
import { LeaderboardList } from "./LeaderboardList"

import { parseToken } from "../Auth"
import { displayDateValue } from "../MomentHelpers"
import { useGames, useLeaderboardForGroupAndGame, usePlayers } from "../QueryHelpers"

import { GroupResponse } from "../models/Group"
import { WinMethodName } from "../models/WinMethod"

import "./GroupLeaderboard.css"

interface GroupLeaderboardProps {
    group: GroupResponse
}

export const GroupLeaderboard = (props: GroupLeaderboardProps) => {
    const [leaderboardMessage, setLeaderboardMessage] = useState("")
    const [leaderboardErrorMessage, setLeaderboardErrorMessage] = useState("")
    const [gameId, setGameId] = useState("")

    const token = parseToken()

    const { data: games } = useGames()
    const { data: players } = usePlayers(props.group.id) // TODO: disable this query if not a member

    const { data: leaderboard, isLoading } = useLeaderboardForGroupAndGame(
        props.group.id,
        gameId,
        leaderboard => {
            if (leaderboard.leaderboard.length > 0) {
                setLeaderboardMessage("")
                setLeaderboardErrorMessage("")
            }
            else {
                setLeaderboardMessage("No leaderboard is available.")
                setLeaderboardErrorMessage("")
            }
        },
        error => {
            if (error.response.status === 401) {
                if (token) {
                    setLeaderboardMessage("")
                    setLeaderboardErrorMessage("You must be a member to see this group's leaderboards.")
                }
                else {
                    setLeaderboardMessage("")
                    setLeaderboardErrorMessage("You must be logged in to see this group's leaderboards.")
                }
            }
        })

    let imageSrc = props.group.profilePicture

    const gameOptions = (games ?? []).filter(g => g.winMethod === WinMethodName.IndividualScore).map(g => ({
        key: g.id,
        text: g.displayName,
        value: g.id,
    }))

    const gameName = useMemo(
        () => (games ?? []).find(g => g.id === gameId)?.displayName || "(unknown game)",
        [games, gameId])

    return (
        <div className="group-leaderboard">
            <div className="content">
                <div className="left">
                    <GameImage imageSrc={imageSrc} />
                </div>

                <div className="details">
                    <h3 className="display-name-header">
                        {props.group.displayName}
                    </h3>

                    <p className="description">
                        {props.group.description}
                    </p>

                    <p className="time-created">
                        <em>Created on {displayDateValue(moment.unix(props.group.timeCreated))}</em>
                    </p>
                </div>

                <div className="leaderboard">
                    {/* TODO: put game dropdown next to leaderboard on wide screens */}

                    <div>
                        <Dropdown
                            fluid
                            selection
                            search
                            placeholder="Select game"
                            onChange={(_, data) => setGameId(data.value as string)}
                            options={gameOptions} />
                    </div>

                    <div>
                        {!isLoading && !leaderboardErrorMessage && leaderboard && <h3>
                            Leaderboard for {gameName}
                        </h3>}

                        {!isLoading && leaderboardMessage && <Message className="leaderboard-message">
                            {leaderboardMessage}
                        </Message>}

                        {!isLoading && leaderboardErrorMessage && <Message error className="leaderboard-message">
                            {leaderboardErrorMessage}
                        </Message>}

                        {!isLoading && !leaderboardErrorMessage && leaderboard &&
                            <LeaderboardList
                                leaderboard={leaderboard}
                                players={players ?? []} />}
                    </div>
                </div>
            </div>
        </div>
    )
}
