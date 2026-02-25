// logicNode.js
import { BaseNode } from "./BaseNode";
import { ArrowRightLeft } from "lucide-react";
import { Handle, Position } from "reactflow";

export const LogicNode = ({ id, data }) => {
    // Logic node implementation
    return (
        <BaseNode
            id={id}
            title="Logic"
            icon={ArrowRightLeft}
            description="Add conditional logic to your pipeline"
            className="node-logic-type"
            inputHandles={[{ id: "input" }]}
            outputHandles={[
                { id: "true", position: "right", style: { top: "33%" } },
                { id: "false", position: "right", style: { top: "66%" } },
            ]}
        >
            <div className="node-content">
                <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                    Configurable logic (if/else, switch) goes here.
                </div>
            </div>
        </BaseNode>
    );
};
