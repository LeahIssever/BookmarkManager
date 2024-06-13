import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookmarkRow from "../components/BookmarkRow";
import axios from "axios";
import { produce } from "immer";

const Bookmarks = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const [isBeingEdited, setIsBeingEdited] = useState(false);
    const [originalTitle, setOriginalTitle] = useState('');

    const loadBookmarks = async () => {
        console.log('reloading data...')
        const { data } = await axios.get('api/bookmark/getbookmarks');
        setBookmarks(data);
    }

    useEffect(() => {
        loadBookmarks();
    }, []);

    const onEditClick = (id) => {
        setIsBeingEdited(true);
        const bookmark = bookmarks.find(b => b.id === id);
        setOriginalTitle(bookmark.title);
    }

    const onUpdateClick = async (title, bookmarkId) => {
        console.log(`updating title of bookmark id ${bookmarkId} to ${title}...`)
        await axios.post('/api/bookmark/update', {title, bookmarkId});
        await loadBookmarks();
        setIsBeingEdited(false);
    }

    const onTextChange = (e, id) => {
        const nextState = produce(bookmarks, draftBookmarks => {
            const bookmark = draftBookmarks.find(b => b.id === id);
            bookmark.title = e.target.value;
        });
        setBookmarks(nextState);
    }

    const onCancelClick = (bookmarkId) => {
        const nextState = produce(bookmarks, draftBookmarks => {
            const bookmark = draftBookmarks.find(b => b.id === bookmarkId);
            bookmark.title = originalTitle;
        });
        setBookmarks(nextState);
        setIsBeingEdited(false);
    }

    const onDeleteClick = async (bookmarkId) => {
        await axios.post('/api/bookmark/delete', { bookmarkId });
        await loadBookmarks();
    }

    return (
        <div style={{ marginTop: 20 }}>
            <div className="row">
                <div className="col-md-12">
                    <h1>Welcome back </h1>
                    <Link to='/addbookmark' className="btn btn-primary btn-block">
                        Add Bookmark
                    </Link>
                </div>
            </div>
            <div className="row" style={{ marginTop: 20 }}>
                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Url</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookmarks.map(b => <BookmarkRow 
                        key={b.id}
                        bookmark={b}
                        onEditClick={() => onEditClick(b.id)} 
                        isBeingEdited={isBeingEdited} 
                        onTextChange={e => onTextChange(e, b.id)}
                        onUpdateClick={() => onUpdateClick(b.title, b.id)}
                        onCancelClick={() => onCancelClick(b.id)}
                        onDeleteClick={() => onDeleteClick(b.id)}
                        />)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Bookmarks;