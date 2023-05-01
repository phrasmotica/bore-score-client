import { Link } from "react-router-dom"
import { Image } from "semantic-ui-react"

interface GameImageProps {
    imageSrc: string
    link?: string
}

const DEFAULT_IMAGE = "https://e.snmc.io/i/300/w/ec75af668e03ef4f843cc70a87b58a2a/5662600"

export const GameImage = (props: GameImageProps) => {
    let content = <Image src={props.imageSrc || DEFAULT_IMAGE} />
    if (props.link) {
        content = <Link to={props.link}>{content}</Link>
    }

    return (
        <div className="game-image">
            {content}
        </div>
    )
}
