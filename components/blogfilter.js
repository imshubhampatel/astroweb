import { useState } from "react";

function Filter(props) {
    let styles = props.cssmodule;
    let heading = props.heading;
    const [status,setstatus] = useState([]);
    return (
    <details className={styles.dropdown}>
        <summary>{heading}</summary>
    </details>
);
}

export default Filter;