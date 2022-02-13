import { useParams } from "react-router"

export const PlayerSummary = () => {
    const { username } = useParams()

    return (
        <div>
            <h2>{username}</h2>

            <a href="/"><h2>back</h2></a>
        </div>
    )
}
