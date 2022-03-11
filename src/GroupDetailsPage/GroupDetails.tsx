import moment from "moment"
import { useNavigate } from "react-router"
import { Button, Icon } from "semantic-ui-react"

import { GameImage } from "../GameImage"

import { displayDateValue } from "../MomentHelpers"

import { Group } from "../models/Group"

interface GroupDetailsProps {
    group: Group
}

export const GroupDetails = (props: GroupDetailsProps) => {
    let navigate = useNavigate()

    let group = props.group

    const submitResult = () => navigate(`/add-result?group=${group.name}`)

    let imageSrc = "https://e.snmc.io/i/600/s/9f6d3d17acac6ce20993eb158c203e4b/5662600/godspeed-you-black-emperor-lift-yr-skinny-fists-like-antennas-to-heaven-cover-art.jpg"

    return (
        <div className="group-details">
            <div className="content">
                <div className="left">
                    <GameImage imageSrc={imageSrc} />

                    <Button
                        icon
                        fluid
                        color="teal"
                        onClick={submitResult}>
                        <span>Submit Result&nbsp;</span>
                        <Icon name="edit" />
                    </Button>
                </div>

                <div>
                    <h3 className="display-name-header">
                        {group.displayName}
                    </h3>

                    <p className="description">
                        {group.description}
                    </p>

                    <p className="time-created">
                        <em>Added: {displayDateValue(moment.unix(group.timeCreated))}</em>
                    </p>
                </div>
            </div>
        </div>
    )
}
