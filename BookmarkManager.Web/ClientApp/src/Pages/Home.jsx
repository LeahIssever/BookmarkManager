import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import axios from 'axios';

const Home = () => {

    const [topBookmarks, setTopBookmarks] = useState([]);

    useEffect(() => {
        const loadBookmarks = async () => {
            const { data } = await axios.get('/api/bookmark/gettopbookmarks');
            console.log(data);
            setTopBookmarks(data);
        }
        loadBookmarks();
    }, []);

    return (
        <div>
            <h1>Welcome to the React Bookmark Application.</h1>
            <h3>Top 5 most bookmarked links</h3>
            <table className="table table-hover table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Url</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {topBookmarks.map(b =>
                        <tr key={b.Id}>
                            <td>
                                <a href={b.url} target="_blank">{b.url}</a>
                            </td>
                            <td>
                                {b.count}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
};

export default Home;


