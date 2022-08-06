import { Link } from "react-router-dom"
import { Image } from "semantic-ui-react"

interface GameImageProps {
    imageSrc: string
    link?: string
}

export const GameImage = (props: GameImageProps) => {
    let content = <Image src={props.imageSrc} />
    if (props.link) {
        content = <Link to={props.link}>{content}</Link>
    }

    return (
        <div className="game-image">
            {content}
        </div>
    )
}
