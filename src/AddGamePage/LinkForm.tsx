import { Input } from "semantic-ui-react"

import { Link } from "../models/Game"
import { LinkType } from "../models/LinkType"

interface LinkFormProps {
    linkTypes: LinkType[]
    links: Link[]
    setLinks: (links: Link[]) => void
}

export const LinkForm = (props: LinkFormProps) => {
    const setLink = (link: string, index: number) => {
        props.setLinks(props.links.map((l, i) => {
            if (i === index) {
                return {
                    type: l.type,
                    link: link
                }
            }

            return l
        }))
    }

    return (
        <div className="link-form">
            {props.links.map((l, i) => {
                let labelContent = props.linkTypes.find(lt => lt.name === l.type)?.displayName ?? l.type
                return (
                    <Input
                        key={l.type}
                        fluid
                        label={{ color: "yellow", content: labelContent }}
                        placeholder="URL"
                        value={props.links[i].link}
                        onChange={(e, { value }) => setLink(value, i)} />
                )
            })}
        </div>
    )
}
