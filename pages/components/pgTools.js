import  styles from '../../styles/components/astrologerlisitng/astrologer.module.css';
function PGLocationBreadCrumb() {
    return (
        <nav aria-label="Breadcrumb" className={`${styles.breadcrumb}`}>
            <ol>
                <li><a href=""> Home </a></li>
                <li><a href=""> Astrologers </a></li>
            </ol>
        </nav>
    )
}

function SortBy(params) {
    return (
        <details className={`${styles.sortby}`}>
                    <summary class="radios">
                        <input type="radio" name="item" id="default" title="Sort By" checked />
                        <input type="radio" name="item" id="item1" title="Item 1" />
                        <input type="radio" name="item" id="item2" title="Item 2" />
                        <input type="radio" name="item" id="item3" title="Item 3" />
                        <input type="radio" name="item" id="item4" title="Item 4" />
                    </summary>
                    <nav>
                       <ul class="list">
                        <li>
                            <label for="item1">Item 1</label>
                        </li>
                        <li>
                            <label for="item2">Item 2</label>
                        </li>
                        <li>
                            <label for="item3">Item 3</label>
                        </li>
                        <li>
                            <label for="item4">Item 4</label>
                        </li>
                    </ul> 
                    </nav>
                </details>
    );
}

function SearchBar() {
    return (
        <div className={`${styles.pgtoolscontainer.search}`}>
            <input type="text" placeholder="Search your Astrologer" />
            <i class="fas fa-search"></i>
        </div>
    );
}

export default SortBy;
export {PGLocationBreadCrumb, SearchBar};