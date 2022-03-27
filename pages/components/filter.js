import  styles from '../../styles/components/astrologerlisitng/astrologer.module.css';
function Filter() {
    return (
    <details class="status">
        <summary>Status</summary>
        <nav>
            <ul class="list">
                <li>
                    <input type="checkbox" name="status" id="status1" />
                    <label for="status1">status1</label>
                </li>
                <li>
                    <input type="checkbox" name="status" id="status2" />
                    <label for="status2">status2</label>
                </li>
                <li>
                    <input type="checkbox" name="status" id="status3" />
                    <label for="status3">status3</label>
                </li>
            </ul> 
        </nav>
    </details>
);
}

export default Filter;