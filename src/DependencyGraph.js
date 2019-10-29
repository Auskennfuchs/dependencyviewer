import React, { Component } from 'react'
import NeoVis from 'neovis.js'

export default class DependencyGraph extends Component {

    visualizer = null

    vizRef = React.createRef()

    async componentDidMount() {
        const config = {
            container_id: this.vizRef.current.id,
            server_url: "bolt://localhost:7687",
            server_user: "neo4j",
            server_password: "yxcvb",
            initial_cypher: "MATCH (t:Service),(n:Service)-[r:dependency]->(m:Service) RETURN *",
            labels: {
                "Service": {
                    caption: "name",
                    community: "community",
                }
            },
            relationships: {
                "dependency": {
                    caption: false,
                    thickness: "1px"
                }
            },
            visjs: {
                nodes: {
                    font: {
                        size: "10px",
                    },
                },
            },
            arrows: true,
        }
        this.visualizer = new NeoVis(config)
        this.visualizer.render()
    }

    onClick = ()=>{
        this.visualizer.stabilize()
//        this.visualizer.renderWithCypher("MATCH (t:Service),(n:Service)-[r:dependency]->(m:Service) WHERE NOT m.name IN [\"de.afb.core.servicecore\",\"de.afb.core.hibernate\"] AND NOT t.name in [\"de.afb.core.servicecore\"] RETURN *")
    }

    render() {
        return (
            <div ref={this.vizRef} id="viz"
                style={{
                    width: "100%",
                    height: "100vh"
                }} onClick={this.onClick}>

            </div>
        )
    }
}
