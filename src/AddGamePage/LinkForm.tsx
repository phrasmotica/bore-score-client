import { useEffect, useState } from "react"
import { Button, Form, Icon } from "semantic-ui-react"

import { LinkInput } from "./LinkInput"

import { fetchLinkTypes } from "../FetchHelpers"
import { replaceDuplicatesWithComparator } from "../Helpers"

import { Link } from "../models/Game"
import { LinkType, LinkTypeName } from "../models/LinkType"

interface LinkFormProps {
    links: Link[]
    setLinks: (links: Link[]) => void
}

export const LinkForm = (props: LinkFormProps) => {
    const [linkTypes, setLinkTypes] = useState<LinkType[]>([])

    useEffect(() => {
        fetchLinkTypes()
            .then(setLinkTypes)
    }, [])

    const addLink = () => {
        let newLink = {
            // name of first unused link type
            type: linkTypes.find(t => !props.links.map(l => l.type).includes(t.name))!.name,
            link: "",
        }

        props.setLinks([...props.links, newLink])
    }

    const setLink = (type: LinkTypeName, link: string, index: number) => {
        let newLinks = props.links.map((l, i) => {
            if (i === index) {
                return {
                    type: type,
                    link: link
                }
            }

            return l
        })

        // if we have a duplicate of the new link type elsewhere in the list
        // then replace the duplicates with link types from the previous set that are now unused
        let unusedLinks = props.links.filter(l => !newLinks.map(nl => nl.type).includes(l.type))
        let deduplicatedLinks = replaceDuplicatesWithComparator(newLinks, index, unusedLinks, (l, m) => l.type === m.type)

        props.setLinks(deduplicatedLinks)
    }

    const removeLink = (index: number) => {
        let newLinks = [...props.links]
        newLinks.splice(index, 1)
        props.setLinks(newLinks)
    }

    let createLinkTypeOptions = () => linkTypes.map(l => ({
        key: l.name,
        text: l.displayName,
        value: l.name,
    }))

    return (
        <div className="link-form">
            <div className="add-link-button">
                <Button
                    icon
                    fluid
                    color="yellow"
                    onClick={addLink}
                    disabled={props.links.length >= linkTypes.length}>
                    <span>Add Link&nbsp;</span>
                    <Icon name="chain" />
                </Button>
            </div>

            <Form>
                {props.links.map((l, i) => {
                    return (
                        <div key={i} className="link-input-removable">
                            <LinkInput
                                key={i}
                                link={l}
                                setLink={(type, link) => setLink(type, link, i)}
                                linkTypeOptions={createLinkTypeOptions()} />

                            <Button
                                icon
                                inverted
                                color="red"
                                onClick={() => removeLink(i)}>
                                <Icon name="minus" />
                            </Button>
                        </div>
                    )
                })}
            </Form>
        </div>
    )
}
