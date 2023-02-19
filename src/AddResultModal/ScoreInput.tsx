import { Button, ButtonGroup, Input } from "semantic-ui-react"

interface ScoreInputProps {
    score: number
    setScore: (score: number) => void
}

export const ScoreInput = (props: ScoreInputProps) => {
    return (
        <div className="score-input">
            <Input
                type="number"
                value={props.score}
                min={0}
                onChange={(e, { value }) => props.setScore(Number(value))} />

            <ButtonGroup>
                <Button
                    className="inc-button"
                    color="blue"
                    onClick={() => props.setScore(Math.max(0, props.score - 10))}>
                    <span>-10</span>
                </Button>

                <Button
                    className="inc-button"
                    color="teal"
                    onClick={() => props.setScore(props.score + 10)}>
                    <span>+10</span>
                </Button>
            </ButtonGroup>
        </div>
    )
}
