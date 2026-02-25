// inputNode.js
import { useState } from "react";
import { BaseNode } from "./BaseNode";
import { Handle, Position } from "reactflow";

export const InputNode = ({ id, data }) => {
    const [currName, setCurrName] = useState(
        data?.inputName || id.replace("customInput-", "input_"),
    );
    const [inputType, setInputType] = useState(data.inputType || "Text");

    const handleNameChange = (e) => {
        setCurrName(e.target.value);
    };

    const handleTypeChange = (e) => {
        setInputType(e.target.value);
    };

    return (
        <BaseNode
            id={id}
            title="Input"
            description="Pass data of different types into your workflow"
            className="node-input-type"
            inputHandles={[{ id: "input", position: Position.Left }]}
            outputHandles={[{ id: "value", position: Position.Right }]}
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
                    value={inputType}
                    onChange={handleTypeChange}
                >
                    <option value="Text">Text</option>
                    <option value="File">File</option>
                </select>
            </label>
        </BaseNode>
    );
};
