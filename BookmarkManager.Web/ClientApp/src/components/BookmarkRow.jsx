import React, { useState } from "react";

const BookmarkRow = ({ bookmark , onTextChange, isBeingEdited, onEditClick, onUpdateClick, onCancelClick, onDeleteClick}) => {

    const {title, url, userId} = bookmark;

    return (
        <tr>
            <td>
                {!isBeingEdited ? title :
                <input type="text"
                    onChange={onTextChange} value={bookmark.title} className="form-control"
                    placeholder="Title" />
                }
            </td>
            <td>
                <a href={url} target="_blank">{url}</a>
            </td>
            <td>
                {!isBeingEdited ? 
                <button onClick={onEditClick} className="btn btn-success">Edit Title</button> :
                <>
                <button onClick={onUpdateClick} className="btn btn-warning" style={{ marginLeft: 10 }}>Update</button>
                <button onClick={onCancelClick} className="btn btn-info" style={{ marginLeft: 10 }}>Cancel</button>
                </>
                }
                <button onClick={onDeleteClick} className="btn btn-danger" style={{ marginLeft: 10 }}>Delete</button>
            </td>
        </tr>
    );
}

export default BookmarkRow;