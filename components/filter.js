import { useState,useEffect } from "react";

function Filter(props) {
    let styles = props.cssmodule;
    const [status,setstatus] = useState({
        "Online" : true,
        "Busy" : true,
        "Offline" : true
    });
    useEffect(()=>{
        props.filterHandler(status);
    },[status]);
    

    return (
    <details className={styles.dropdown}>
        <summary>Status</summary>
        <nav>
            <ul className={styles.list}>
                <li>
                    <input type="checkbox" name="status" id="status1" onChange={(e)=>{
                        setstatus({...status,"Online":e.target.checked})
                    }} defaultChecked />
                    <label htmlFor="status1">Online</label>
                </li>
                <li>
                    <input type="checkbox" name="status" id="status2"  onChange={(e)=>{
                        setstatus({...status,"Busy":e.target.checked})
                    }} defaultChecked />
                    <label htmlFor="status2">Busy</label>
                </li>
                <li>
                    <input type="checkbox" name="status" id="status3"   onChange={(e)=>{
                        setstatus({...status,"Offline":e.target.checked})
                    }} defaultChecked/>
                    <label htmlFor="status3">Offline</label>
                </li>
            </ul> 
        </nav>
    </details>
);
}

export default Filter;