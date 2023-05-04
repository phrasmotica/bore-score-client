import { Link } from "react-router-dom"

import { Player } from "../models/Player"

interface MemberListProps {
    members: Player[]
}

export const MemberList = (props: MemberListProps) => {
    return (
        <div>
            <strong>Members</strong>
            {props.members.map(m => (
                <div>
                    <span>
                        <Link to={`/players/${m.username}`}>
                            {m.displayName}
                        </Link>
                    </span>
                </div>
            ))}
        </div>
    )
}
