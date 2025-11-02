import React from "react";
import "../App.css";

export default function ContentCard({ title, link }) {
    return (
        <div
            className="content-card"
            onClick={() => link && window.open(link, "_blank")}
        >
            {title}
        </div>
    );
}
