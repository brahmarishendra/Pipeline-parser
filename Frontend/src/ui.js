import {useState, useRef, useCallback} from "react";
import ReactFlow, {Controls, Background, MiniMap} from "reactflow";
import {useStore} from "./store";
import {shallow} from "zustand/shallow";
import {InputNode} from "./nodes/inputNode";
import {LLMNode} from "./nodes/llmNode";
import {OutputNode} from "./nodes/outputNode";
import {TextNode} from "./nodes/textNode";
import {FileNode} from "./nodes/fileNode";
import {NoteNode} from "./nodes/noteNode";
import {PromptNode} from "./nodes/promptNode";
import {LogicNode} from "./nodes/logicNode";
import {IntegrationNode} from "./nodes/integrationNode";
import ButtonEdge from "./edges/ButtonEdge";

import "reactflow/dist/style.css";
const gridSize = 20;
const proOptions = {hideAttribution: true};
const nodeTypes = {
    customInput: InputNode,
    llm: LLMNode,
    customOutput: OutputNode,
    text: TextNode,
    file: FileNode,
    note: NoteNode,
    prompt: PromptNode,
    logic: LogicNode,
    integration: IntegrationNode,
};

const edgeTypes = {
    buttonEdge: ButtonEdge,
};

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
    getNodeID: state.getNodeID,
    addNode: state.addNode,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {nodes, edges, getNodeID, addNode, onNodesChange, onEdgesChange, onConnect} = useStore(
        selector,
        shallow,
    );

    const getInitNodeData = (nodeID, type) => {
        let nodeData = {id: nodeID, nodeType: `${type}`};
        return nodeData;
    };

    const onDrop = useCallback(
        /* 
      The onDrop function is used to handle the drop event of the nodes
      It is a callback function that is used to handle the drop event of the nodes
      callback function that is used to handle the drop event of the nodes
    */
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            if (event?.dataTransfer?.getData("application/reactflow")) {
                const appData = JSON.parse(event.dataTransfer.getData("application/reactflow"));
                const type = appData?.nodeType;

                // check if the dropped element is valid
                if (typeof type === "undefined" || !type) {
                    return;
                }

                const position = reactFlowInstance.project({
                    x: event.clientX - reactFlowBounds.left,
                    y: event.clientY - reactFlowBounds.top,
                });

                const nodeID = getNodeID(type);
                const newNode = {
                    id: nodeID,
                    type,
                    position,
                    data: getInitNodeData(nodeID, type),
                };

                addNode(newNode);
            }
        },
        [reactFlowInstance, addNode, getNodeID],
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    {
        /* 
     The PipelineUI component is the main component of the application
     It is a React component that is used to display the pipeline
     it is a functional component that is used to display the pipeline
     It is a functional component that is used to display the pipeline
  */
    }
    return (
        <>
            <div
                ref={reactFlowWrapper}
                className="pipeline-ui-wrapper"
                style={{width: "100%", height: "100%"}}
            >
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onInit={setReactFlowInstance}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    proOptions={proOptions}
                    snapGrid={[gridSize, gridSize]}
                    connectionLineType="smoothstep"
                >
                    <Background color="#aaa" gap={gridSize} />
                    <Controls />
                    <MiniMap />
                </ReactFlow>
            </div>
        </>
    );
};
