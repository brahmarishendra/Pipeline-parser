// llmNode.js
import { BaseNode } from "./BaseNode";
import { MessageSquare } from "lucide-react";
import { Handle, Position } from "reactflow";

export const LLMNode = ({ id, data }) => {
    return (
        <BaseNode
            id={id}
            title="LLM"
            icon={MessageSquare}
            description="Process data with a Large Language Model"
            className="node-llm-type"
            inputHandles={[
                { id: "system", position: "left", style: { top: "33%" } },
                { id: "prompt", position: "left", style: { top: "66%" } },
            ]}
            outputHandles={[{ id: "response" }]}
        >
            <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                This node takes in a system prompt and a user prompt, and outputs a response
                from the LLM.
            </div>
        </BaseNode>
    );
};
