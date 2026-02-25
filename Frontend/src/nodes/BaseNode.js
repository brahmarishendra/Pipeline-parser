// BaseNode.js
import React from "react";
import {Handle, Position} from "reactflow";
import {X, Maximize2, Minimize2} from "lucide-react";
import {useStore} from "../store";
import {useState} from "react";
{
    /* import { shallow } from 'zustand/shallow'; */
}
export const BaseNode = ({
    id,
    title,
    description,
    icon: Icon,
    children,
    inputHandles = [],
    outputHandles = [],
    style = {},
    className = "",
}) => {
    const deleteNode = useStore((state) => state.deleteNode);
    const isConnected = useStore((state) =>
        state.edges.some((edge) => edge.source === id || edge.target === id),
    );

    const [isMinimized, setIsMinimized] = useState(false);

    const toggleMinimize = (e) => {
        e.stopPropagation();
        setIsMinimized(!isMinimized);
    };

    return (
        <div
            className={`base-node ${className} ${isConnected ? "connected-node" : ""}`}
            style={{...style, borderRadius: "6px"}}
        >
            {/* Input Handles */}
            {inputHandles.map((handle, index) => (
                <Handle
                    key={`${id}-input-${handle.id || index}`}
                    type="target"
                    position={handle.position || Position.Left}
                    id={`${id}-${handle.id}`}
                    style={{
                        top: handle.top || `${(index + 1) * (100 / (inputHandles.length + 1))}%`,
                        ...handle.style,
                    }}
                />
            ))}

            <div className="node-header">
                <div className="node-header-left">
                    <span className="node-title">{title}</span>
                </div>
                <div className="node-header-actions">
                    {isMinimized ? (
                        <Maximize2 size={12} style={{cursor: "pointer"}} onClick={toggleMinimize} />
                    ) : (
                        <Minimize2 size={12} style={{cursor: "pointer"}} onClick={toggleMinimize} />
                    )}
                    <X size={12} style={{cursor: "pointer"}} onClick={() => deleteNode(id)} />
                </div>
            </div>

            {!isMinimized && (
                <>
                    {description && <div className="node-description">{description}</div>}

                    <div className="node-content">{children}</div>
                </>
            )}

            {/* Output Handles */}
            {outputHandles.map((handle, index) => (
                <Handle
                    key={`${id}-output-${handle.id || index}`}
                    type="source"
                    position={handle.position || Position.Right}
                    id={`${id}-${handle.id}`}
                    style={{
                        top: handle.top || `${(index + 1) * (100 / (outputHandles.length + 1))}%`,
                        ...handle.style,
                    }}
                />
            ))}
        </div>
    );
};
