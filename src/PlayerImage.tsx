import { Image } from "semantic-ui-react"

interface PlayerImageProps {
    imageSrc?: string
}

const DEFAULT_IMAGE = "https://e.snmc.io/i/300/w/ec75af668e03ef4f843cc70a87b58a2a/5662600"

export const PlayerImage = (props: PlayerImageProps) => (
    <div className="player-image">
        <Image src={props.imageSrc || DEFAULT_IMAGE} />
    </div>
)
