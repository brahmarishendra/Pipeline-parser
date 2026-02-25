// fileNode.js
import { BaseNode } from "./BaseNode";
import { HardDrive } from "lucide-react";
import { Handle, Position } from "reactflow";

export const FileNode = ({ id, data }) => {
    return (
        <BaseNode
            id={id}
            title="File"
            icon={HardDrive}
            description="Handle file inputs and outputs"
            className="node-file-type"
            inputHandles={[{ id: "input" }]}
            outputHandles={[{ id: "file" }]}
        >
            <div className="node-content">
                <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                    File processing configuration goes here.
                </div>
            </div>
        </BaseNode>
    );
};
