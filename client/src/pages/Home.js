import { NavLink } from 'react-router-dom';

export default function Home() {
    return (
        <div>
            <h1>this is the home page</h1>
            <p><NavLink to={`/restaurant`}>restaurant</NavLink></p>
            <p><NavLink to={`/review`}>review</NavLink></p>
            <p><NavLink to={`/user`}>user</NavLink></p>
        </div>
    );
}