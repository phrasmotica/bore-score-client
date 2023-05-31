import { Label } from "semantic-ui-react"

import { Group, GroupVisibilityName } from "./models/Group"

interface GroupVisibilityLabelProps {
    group: Group
}

export const GroupVisibilityLabel = (props: GroupVisibilityLabelProps) => {
    const colour = props.group.visibility === GroupVisibilityName.Private ? "purple" : "green"

    return (
        <Label className="group-visibility-label" color={colour}>
            {props.group.visibility}
        </Label>
    )
}