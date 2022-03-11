import { Image } from "semantic-ui-react"

interface GameImageProps {
    imageSrc: string
    link?: string
}

export const GameImage = (props: GameImageProps) => {
    let content = <Image src={props.imageSrc} />
    if (props.link) {
        content = <a href={props.link}>{content}</a>
    }

    return (
        <div className="game-image">
            {content}
        </div>
    )
}
