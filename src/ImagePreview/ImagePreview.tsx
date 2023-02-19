import { Icon, Image } from "semantic-ui-react"

import "./ImagePreview.css"

interface ImagePreviewProps {
    imageLink: string
}

// TODO: shrink images that are taller than they are wide
export const ImagePreview = (props: ImagePreviewProps) => {
    let imageLink = props.imageLink

    if (imageLink) {
        return (
            <div className="image-preview filled">
                <Image src={imageLink} />
            </div>
        )
    }

    return (
        <div className="image-preview">
            <Icon fitted name="camera" size="big" />
        </div>
    )
}
