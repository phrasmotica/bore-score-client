import { Image } from "semantic-ui-react"

interface PlayerImageProps {
    imageSrc: string
}

export const PlayerImage = (props: PlayerImageProps) => (
    <div className="player-image">
        <Image src={props.imageSrc} />
    </div>
)
