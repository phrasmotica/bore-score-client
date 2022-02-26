import { Dropdown, DropdownItemProps } from "semantic-ui-react"

interface PlayerDropdownProps {
    placeholder: string
    options: DropdownItemProps[]
    player: string
    setPlayer: (player: string) => void
}

export const PlayerDropdown = (props: PlayerDropdownProps) => (
    <Dropdown
        search
        selection
        fluid
        placeholder={props.placeholder}
        options={props.options}
        value={props.player}
        onChange={(e, { value }) => props.setPlayer(String(value))} />
)
