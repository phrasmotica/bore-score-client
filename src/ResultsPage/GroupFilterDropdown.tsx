import { Dropdown } from "semantic-ui-react"

import { Group } from "../models/Group"
import { Result } from "../models/Result"

interface GroupFilterDropdownProps {
    groups: Group[]
    results: Result[]
    selectedGroups: string[]
    setSelectedGroups: (names: string[]) => void
}

export const GroupFilterDropdown = (props: GroupFilterDropdownProps) => {
    const getCount = (id: string) => props.results.filter(r => r.groupId === id).length

    const options = props.groups.map(g => ({
        key: g.id,
        text: g.displayName + ` (${getCount(g.id)})`,
        value: g.id,
        disabled: getCount(g.id) <= 0,
    }))

    return (
        <div className="group-filter-dropdown">
            <Dropdown
                fluid
                multiple
                clearable
                selection
                search
                placeholder="Filter by group"
                value={props.selectedGroups}
                onChange={(_, data) => props.setSelectedGroups(data.value as string[])}
                options={options}
                disabled={options.every(o => o.disabled)} />
        </div>
    )
}
