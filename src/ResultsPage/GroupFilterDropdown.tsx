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
    const getCount = (name: string) => props.results.filter(r => r.groupName === name).length

    const options = props.groups.map(g => ({
        key: g.name,
        text: g.displayName + ` (${getCount(g.name)})`,
        value: g.name,
        disabled: getCount(g.name) <= 0,
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
                onChange={(_, data) => props.setSelectedGroups(data.value as string[])}
                options={options} />
        </div>
    )
}
