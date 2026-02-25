// navbar.js
import React from "react";
import {Search} from "lucide-react";
import {useStore} from "./store";

export const PipelineNavbar = () => {
    const activeCategory = useStore((state) => state.activeCategory);
    const setActiveCategory = useStore((state) => state.setActiveCategory);
    const searchQuery = useStore((state) => state.searchQuery);
    const setSearchQuery = useStore((state) => state.setSearchQuery);

    const categories = ["General", "LLMs", "Integrations", "Logic"];

    return (
        <nav className="pipeline-navbar">
            <div className="navbar-search-container">
                <div className="search-input-wrapper">
                    <Search size={16} className="navbar-search-icon" />
                    <input
                        id="navbar-search"
                        name="navbar-search"
                        type="text"
                        placeholder="Search Nodes"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="navbar-search-input"
                    />
                </div>
            </div>

            <div className="navbar-categories">
                {categories.map((cat) => (
                    <div
                        key={cat}
                        className={`navbar-category ${activeCategory === cat ? "active" : ""}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </div>
                ))}
            </div>
        </nav>
    );
};
