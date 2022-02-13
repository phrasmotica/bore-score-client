import { useEffect, useState } from "react"
import { List } from "semantic-ui-react"

interface Player {
    id: number
    username: string
    displayName: string
}

interface PlayersListProps {

}

export const PlayersList = (props: PlayersListProps) => {
    const [players, setPlayers] = useState<Player[]>([])

    useEffect(() => {
        fetch("http://localhost:8000/players")
            .then(res => res.json())
            .then((players: Player[]) => setPlayers(players))
            .catch(err => console.error(err))
    }, [])

    return (
        <div>
            <h2>Players</h2>

            <List>
                {players.map(p => (
                    <List.Item>
                        <a href={`/players/${p.username}`}>{p.displayName}</a>
                    </List.Item>
                ))}
            </List>
        </div>
    )
}
