import { Button, ButtonGroup, Dropdown } from "semantic-ui-react"

import { AttachedGroupMessage } from "./AttachedGroupMessage"
import { NoAttachedGroupWarning } from "./NoAttachedGroupWarning"

import { Group } from "../models/Group"

interface GroupFormProps {
    groups: Group[]
    useGroup: boolean
    setUseGroup: (useGroup: boolean) => void
    group: string
    setGroup: (id: string) => void
}

export const GroupForm = (props: GroupFormProps) => {
    // TODO: disable groups with no members
    let groupOptions = props.groups.map(gr => ({
        key: gr.id,
        text: `${gr.displayName} (${gr.visibility})`,
        value: gr.id,
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
                <div style={{ display: "flex", }}>
                    <Dropdown
                        className="group-picker"
                        search
                        selection
                        placeholder="Select group..."
                        options={groupOptions}
                        value={props.group}
                        disabled={!props.useGroup}
                        onChange={(e, { value }) => props.setGroup(String(value))} />
                </div>

                {!props.useGroup && <NoAttachedGroupWarning />}
                {props.useGroup && <AttachedGroupMessage />}
            </div>
        </div>
    )
}
