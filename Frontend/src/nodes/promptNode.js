// promptNode.js
import { BaseNode } from "./BaseNode";
import { Variable } from "lucide-react";
import { Handle, Position } from "reactflow";

// This file defines a PromptNode component for creating reusable prompts for LLMs.
export const PromptNode = ({ id, data }) => {
    return (
        <BaseNode
            id={id}
            title="Prompt"
            icon={Variable}
            description="Create reusable prompts for your LLMs"
            className="node-prompt-type"
            inputHandles={[{ id: "input" }]}
            outputHandles={[{ id: "prompt" }]}
        >
            <div className="node-content">
                <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                    Prompt template configuration goes here.
                </div>
            </div>
        </BaseNode>
    );
};
