// textNode.js
import { useState, useEffect, useRef } from "react";
import { Handle, Position } from "reactflow";
import { useStore } from "../store";
import { BaseNode } from "./BaseNode";
import { message } from "antd";
import { Type } from "lucide-react";

export const TextNode = ({ id, data }) => {
    const [currText, setCurrText] = useState(data?.text || "{{input}}");
    const [variables, setVariables] = useState([]);
    const textareaRef = useRef(null);

    const updateNodeField = useStore((state) => state.updateNodeField);

    useEffect(() => {
        // Variable detection: look for {{variable_name}}
        const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
        const matches = [...currText.matchAll(regex)];
        const uniqueVars = [...new Set(matches.map((m) => m[1]))];
        setVariables(uniqueVars);
        updateNodeField(id, "text", currText);

        // Auto-resize
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [currText, id, updateNodeField]);

    const handleTextChange = (e) => {
        const newText = e.target.value;
        setCurrText(newText);

        if (newText.trim() === "") {
            message.error("Text cannot be empty");
        }
    };

    const inputHandles = [
        { id: "default", position: Position.Left },
        ...variables.map((v) => ({ id: v, position: Position.Left })),
    ];

    return (
        <BaseNode
            id={id}
            title="Text"
            icon={Type}
            description="Write text or use variables with {{}}"
            style={{ minWidth: "220px" }}
            className="node-text-type"
            inputHandles={inputHandles}
            outputHandles={[{ id: "output" }]}
        >
            <label className="node-label" htmlFor={`${id}-text`}>
                Text
                <textarea
                    id={`${id}-text`}
                    name={`${id}-text`}
                    ref={textareaRef}
                    className="node-textarea"
                    value={currText}
                    onChange={handleTextChange}
                    rows={1}
                    style={{ resize: "none", overflow: "hidden" }}
                />
            </label>
        </BaseNode>
    );
};
