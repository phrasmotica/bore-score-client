import { Image } from "semantic-ui-react"

interface GameImageProps {
    imageSrc: string
}

export const GameImage = (props: GameImageProps) => (
    <div className="game-image">
        <Image src={props.imageSrc} />
    </div>
)
