import { Button, ButtonGroup, Dropdown } from "semantic-ui-react"

import { AttachedGroupMessage } from "./AttachedGroupMessage"
import { NoAttachedGroupWarning } from "./NoAttachedGroupWarning"

import { Group } from "../models/Group"

interface GroupFormProps {
    groups: Group[]
    useGroup: boolean
    setUseGroup: (useGroup: boolean) => void
    group: string
    setGroup: (group: string) => void
}

export const GroupForm = (props: GroupFormProps) => {
    let groupOptions = props.groups.map(gr => ({
        key: gr.name,
        text: `${gr.displayName} (${gr.type})`,
        value: gr.name,
    }))

    return (
        <div>
            <ButtonGroup fluid widths={2}>
                <Button
                    positive={!props.useGroup}
                    onClick={() => props.setUseGroup(false)}>
                    Standalone
                </Button>

                <Button.Or />

                <Button
                    positive={props.useGroup}
                    onClick={() => props.setUseGroup(true)}>
                    Attached to a group
                </Button>
            </ButtonGroup>

            <div className="group-container">
                <Dropdown
                    className="group-picker"
                    search
                    selection
                    placeholder="Select group..."
                    options={groupOptions}
                    value={props.group}
                    disabled={!props.useGroup}
                    onChange={(e, { value }) => props.setGroup(String(value))} />

                {!props.useGroup && <NoAttachedGroupWarning />}
                {props.useGroup && <AttachedGroupMessage />}
            </div>
        </div>
    )
}
