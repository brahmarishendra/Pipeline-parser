import React from "react";
import {getBezierPath, EdgeLabelRenderer, BaseEdge} from "reactflow";
import {useStore} from "../store";
import {X} from "lucide-react";

export default function ButtonEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
}) {
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    const onEdgeDelete = useStore((state) => state.onEdgeDelete);

    return (
        <>
            <BaseEdge
                path={edgePath}
                markerEnd={markerEnd}
                style={{...style, stroke: "#10b981", strokeWidth: 2}}
            />
            <EdgeLabelRenderer>
                <div
                    style={{
                        position: "absolute",
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        fontSize: 12,
                        // everything inside EdgeLabelRenderer has no pointer events by default
                        // if you have an interactive element, set pointer-events: all
                        pointerEvents: "all",
                    }}
                    className="nodrag nopan"
                >
                    <button
                        className="edge-button"
                        onClick={(event) => {
                            event.stopPropagation();
                            onEdgeDelete(id);
                        }}
                    >
                        <X size={10} />
                    </button>
                </div>
            </EdgeLabelRenderer>
        </>
    );
}
