import { DropdownItemProps, Form } from "semantic-ui-react"

import { Link } from "../models/Game"
import { LinkTypeName } from "../models/LinkType"

interface LinkInputProps {
    link: Link
    setLink: (type: LinkTypeName, link: string) => void
    linkTypeOptions: DropdownItemProps[]
}

export const LinkInput = (props: LinkInputProps) => {
    return (
        <Form.Group widths="equal">
            <Form.Dropdown
                selection
                label="Type"
                options={props.linkTypeOptions}
                value={props.link.type}
                onChange={(e, { value }) => props.setLink(value as LinkTypeName, props.link.link)} />

            <Form.Input
                label="Link"
                placeholder="Link"
                value={props.link.link}
                onChange={(e, { value }) => props.setLink(props.link.type, String(value))} />
        </Form.Group>
    )
}
