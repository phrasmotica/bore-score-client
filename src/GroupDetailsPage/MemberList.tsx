import { Link } from "react-router-dom"

import { Player } from "../models/Player"

interface MemberListProps {
    members: Player[]
    creatorUsername: string
}

export const MemberList = (props: MemberListProps) => {
    return (
        <div>
            <strong>Members</strong>
            {props.members.map(m => (
                <div key={m.id}>
                    <span>
                        <Link to={`/players/${m.username}`}>
                            {m.displayName}
                        </Link>
                        {(m.username === props.creatorUsername ? " (creator)" : "")}
                    </span>
                </div>
            ))}
        </div>
    )
}
