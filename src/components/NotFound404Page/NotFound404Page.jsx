import { Link } from "react-router-dom"
import "./NotFound404Page.css"

function NotFound404Page() {
    return (
        <article id="not-found">
            <h1>Error 404</h1>
            <h2>Lost your way?</h2>
            <p>It seems you've drifted off course and landed in uncharted waters. The elusive page you seek has vanished like a ghost ship in the night. We apologise for this unexpected detour.</p>
            <img src="../../../Null_Map.png" class="center" alt="404 Not Found Null Map" />
            <p>While your compass may be spinning and your map lost to the depths, fear not! The crew at MentorShip is working diligently to chart a new course and bring the missing treasure back to shore.</p>
            <p>In the meantime, we suggest you navigate back to safer waters by returning <Link to="/">Home</Link> or using the navigation bar to seek a new adventures.</p>
        </article>
    )
}

export default NotFound404Page