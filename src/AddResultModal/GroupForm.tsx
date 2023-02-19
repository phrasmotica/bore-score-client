import { Form } from "semantic-ui-react"

import { NoAttachedGroupWarning } from "./NoAttachedGroupWarning"

import { Group } from "../models/Group"

interface CommonFormProps {
    groups: Group[]
    useGroup: boolean
    setUseGroup: (useGroup: boolean) => void
    group: string
    setGroup: (group: string) => void
}

export const GroupForm = (props: CommonFormProps) => {
    let groupOptions = props.groups.map(gr => ({
        key: gr.name,
        text: `${gr.displayName} (${gr.type})`,
        value: gr.name,
    }))

    return (
        <Form className="common-form">
            <Form.Group widths="equal" className="setting-container">
                <Form.Checkbox
                    label="Attach to a group?"
                    checked={props.useGroup}
                    onChange={(e, { checked }) => props.setUseGroup(checked ?? false)} />

                <Form.Dropdown
                    className="group-picker"
                    search
                    selection
                    label="Group"
                    placeholder="Select group..."
                    options={groupOptions}
                    value={props.group}
                    disabled={!props.useGroup}
                    onChange={(e, { value }) => props.setGroup(String(value))} />
            </Form.Group>

            {!props.useGroup && <NoAttachedGroupWarning />}
        </Form>
    )
}
