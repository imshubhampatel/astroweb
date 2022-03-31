import { useState } from "react";

function Filter(props) {
    let styles = props.cssmodule;
    const [status,setstatus] = useState([]);
    return (
    <details className={styles.dropdown}>
        <summary>Status</summary>
        <nav>
            <ul className={styles.list}>
                <li>
                    <input type="checkbox" name="status" id="status1" onChange={} />
                    <label for="status1">Online</label>
                </li>
                <li>
                    <input type="checkbox" name="status" id="status2" />
                    <label for="status2">Busy</label>
                </li>
                <li>
                    <input type="checkbox" name="status" id="status3" />
                    <label for="status3">Offline</label>
                </li>
            </ul> 
        </nav>
    </details>
);
}

export default Filter;