import React, {useState} from "react";
import {Handle, Position} from "reactflow";
import {X, GripVertical, Minimize2, Maximize2} from "lucide-react";
import {useStore} from "../store";

// simple note without a toolbar
export const NoteNode = ({id}) => {
    const deleteNode = useStore((state) => state.deleteNode);
    const isConnected = useStore((state) =>
        state.edges.some((edge) => edge.source === id || edge.target === id),
    );

    const [isMinimized, setIsMinimized] = useState(false);

    return (
        <div
            className={`note-container ${isConnected ? "connected-node" : ""}`}
            onClick={(e) => e.stopPropagation()}
            style={{minHeight: isMinimized ? "auto" : "150px"}}
        >
            {/* typing area starts here */}
            {!isMinimized && (
                <div
                    className="note-content-area nodrag"
                    contentEditable
                    onKeyDown={(e) => e.stopPropagation()}
                    suppressContentEditableWarning={true}
                    placeholder="Type your note here..."
                >
                    Final output to be displayed
                </div>
            )}

            {/* buttons on the side */}
            <div className="note-side-actions">
                <div className="note-action" onClick={() => deleteNode(id)}>
                    <X size={14} />
                </div>
                <div className="note-action" onClick={() => setIsMinimized(!isMinimized)}>
                    {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                </div>
                <div className="note-action">
                    <GripVertical size={14} />
                </div>
            </div>
        </div>
    );
};
