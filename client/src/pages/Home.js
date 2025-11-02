import React, { useEffect, useState } from "react";
import ContentCard from "../components/ContentCard";
import "../App.css";

export default function Home() {
    const [content, setContent] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5001/api/content")
            .then((res) => res.json())
            .then(setContent)
            .catch(() => setContent([]));
    }, []);

    const handouts = content.filter((item) => item.type === "Handout");
    const notes = content.filter((item) => item.type === "Note");

    return (
        <div className="home-container">
            <div className="content-section">
                <h2>Handouts</h2>
                {handouts.map((item) => (
                    <ContentCard
                        key={item._id}
                        title={item.title}
                        link={item.link}
                    />
                ))}
            </div>
            <div className="content-section">
                <h2>One Pager Notes</h2>
                {notes.map((item) => (
                    <ContentCard
                        key={item._id}
                        title={item.title}
                        link={item.link}
                    />
                ))}
            </div>
        </div>
    );
}
