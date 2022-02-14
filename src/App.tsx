import { Tab } from "semantic-ui-react"

import { PlayersPage } from "./PlayersPage"

import "./App.css"

const App = () => {
    const panes = [
        {
            menuItem: "Players",
            render: () => (
                <Tab.Pane attached={false}>
                    <PlayersPage />
                </Tab.Pane>
            )
        },
    ]

    return (
        <div className="App">
            <header className="App-header">
                <Tab menu={{ pointing: true }} panes={panes} />
            </header>
        </div>
    )
}

export default App
