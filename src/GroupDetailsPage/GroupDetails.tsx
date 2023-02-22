import { useState } from "react"
import moment from "moment"
import { Button, Icon } from "semantic-ui-react"

import { AddResultModal } from "../AddResultModal/AddResultModal"
import { GameImage } from "../GameImage"

import { displayDateValue } from "../MomentHelpers"

import { Group } from "../models/Group"

import "./GroupDetails.css"

interface GroupDetailsProps {
    group: Group
}

export const GroupDetails = (props: GroupDetailsProps) => {
    const [showAddResultModal, setShowAddResultModal] = useState(false)

    let imageSrc = props.group.profilePicture || "https://e.snmc.io/i/600/s/9f6d3d17acac6ce20993eb158c203e4b/5662600/godspeed-you-black-emperor-lift-yr-skinny-fists-like-antennas-to-heaven-cover-art.jpg"

    return (
        <div className="group-details">
            <AddResultModal group={props.group.name} open={showAddResultModal} setOpen={setShowAddResultModal} />

            <div className="content">
                <div className="left">
                    <GameImage imageSrc={imageSrc} />

                    <Button
                        icon
                        fluid
                        color="teal"
                        onClick={() => setShowAddResultModal(true)}>
                        <span>Submit Result&nbsp;</span>
                        <Icon name="edit" />
                    </Button>
                </div>

                <div>
                    <h3 className="display-name-header">
                        {props.group.displayName}
                    </h3>

                    <p className="description">
                        {props.group.description}
                    </p>

                    <p className="time-created">
                        <em>Added: {displayDateValue(moment.unix(props.group.timeCreated))}</em>
                    </p>
                </div>
            </div>
        </div>
    )
}
