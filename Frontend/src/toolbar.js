// toolbar.js
import React from "react";
import {DraggableNode} from "./draggableNode";
import {useStore} from "./store";
import {
    MessageSquare,
    Type,
    HardDrive,
    Variable,
    Database,
    LogIn,
    LogOut,
    ArrowRightLeft,
    ScrollText,
} from "lucide-react";

export const PipelineToolbar = () => {
    const {activeCategory, searchQuery} = useStore();

    // Reverting node-to-category mapping to previous content
    const allNodes = [
        {type: "customInput", label: "Input", icon: LogIn, category: "General"},
        {type: "customOutput", label: "Output", icon: LogOut, category: "General"},
        {type: "text", label: "Text", icon: Type, category: "General"},
        {type: "file", label: "File", icon: HardDrive, category: "General"},
        {type: "note", label: "Note", icon: ScrollText, category: "General"},
        {type: "llm", label: "LLM", icon: MessageSquare, category: "LLMs"},
        {type: "prompt", label: "Prompt", icon: Variable, category: "LLMs"},
        {type: "logic", label: "Logic", icon: ArrowRightLeft, category: "Logic"},
        {type: "integration", label: "Integration", icon: Database, category: "Integrations"},
    ];

    let displayedNodes = allNodes;
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        displayedNodes = allNodes.filter((n) => n.label.toLowerCase().includes(query));
    } else {
        displayedNodes = allNodes.filter((n) => n.category === activeCategory);
    }

    return (
        <aside className="pipeline-toolbar">
            {displayedNodes.length > 0 ? (
                displayedNodes.map((node) => (
                    <DraggableNode
                        key={node.type}
                        type={node.type}
                        label={node.label}
                        icon={node.icon}
                    />
                ))
            ) : (
                <div className="toolbar-empty-state">No nodes found.</div>
            )}
        </aside>
    );
};
