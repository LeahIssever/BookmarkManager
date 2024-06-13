import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBookmark = () => {

    const [formData, setFormData] = useState({
        title: '',
        url: '',
    });

    const navigate = useNavigate();

    const onTextChange = (e) => {
        const copy = {...formData};
        copy[e.target.name] = e.target.value;
        setFormData(copy);
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/api/bookmark/addbookmark', formData);
        navigate("/bookmarks");
    }
    
    return (
        <div className="row" style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}>
            <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                <h3>Add Bookmark</h3>
                <form onSubmit={onFormSubmit}>
                    <input type="text" onChange={onTextChange} value={formData.title} name="title" placeholder="Title" className="form-control" />
                    <br />
                    <input type="text" onChange={onTextChange} value={formData.url} name="url" placeholder="Url" className="form-control" />
                    <br />
                    <button className="btn btn-primary">Add</button>
                </form>
            </div>
        </div>
    );
}

export default AddBookmark;