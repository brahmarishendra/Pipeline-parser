// outputNode.js
import { useState } from "react";
import { BaseNode } from "./BaseNode";
import { Handle, Position } from "reactflow";

export const OutputNode = ({ id, data }) => {
    const [currName, setCurrName] = useState(
        data?.outputName || id.replace("customOutput-", "output_"),
    );
    const [outputType, setOutputType] = useState(data.outputType || "Text");

    const handleNameChange = (e) => {
        setCurrName(e.target.value);
    };

    const handleTypeChange = (e) => {
        setOutputType(e.target.value);
    };

    return (
        <BaseNode
            id={id}
            title="Output"
            description="The results of your workflow"
            className="node-output-type"
            inputHandles={[{ id: "value" }]}
            outputHandles={[{ id: "output" }]}
        >
            <label className="node-label" htmlFor={`${id}-name`}>
                Name
                <input
                    id={`${id}-name`}
                    name={`${id}-name`}
                    type="text"
                    className="node-input"
                    value={currName}
                    onChange={handleNameChange}
                />
            </label>
            <label className="node-label" htmlFor={`${id}-type`}>
                Type
                <select
                    id={`${id}-type`}
                    name={`${id}-type`}
                    className="node-select"
                    value={outputType}
                    onChange={handleTypeChange}
                >
                    <option value="Text">Text</option>
                    <option value="Image">Image</option>
                </select>
            </label>
        </BaseNode>
    );
};
