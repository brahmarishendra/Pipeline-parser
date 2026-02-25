// integrationNode.js
import { BaseNode } from "./BaseNode";
import { Database } from "lucide-react";
import { Handle, Position } from "reactflow";

export const IntegrationNode = ({ id, data }) => {
    // this is the integration node implementation
    return (
        <BaseNode
            id={id}
            title="Integration"
            icon={Database}
            description="Connect to external databases and services"
            className="node-integration-type"
            inputHandles={[{ id: "request" }]}
            outputHandles={[{ id: "response" }]}
        >
            <div className="node-content">
                <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                    Select an integration to get started.
                </div>
                <select
                    id={`${id}-integration-type`}
                    name={`${id}-integration-type`}
                    className="node-select"
                >
                    <option value="postgres">PostgreSQL</option>
                    <option value="slack">Slack</option>
                    <option value="google_drive">Google Drive</option>
                </select>
            </div>
        </BaseNode>
    );
};
