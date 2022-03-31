import {BsSearch} from 'react-icons/bs'

// function SortBy(props) {
//     let styles = props.cssmodule;
//     return (
//         <details id={styles.sortBy} className={styles.dropdown}>
//                     <summary className={styles.radios}>
//                         <input type="radio" name="item" id="default" title="Sort By" defaultChecked />
//                         <input type="radio" name="item" id="item1" title="Item 1" />
//                         <input type="radio" name="item" id="item2" title="Item 2" />
//                         <input type="radio" name="item" id="item3" title="Item 3" />
//                         <input type="radio" name="item" id="item4" title="Item 4" />
//                     </summary>
//                     <nav>
//                        <ul className={styles.list}>
//                         <li>
//                             <label for="item1">Item 1</label>
//                         </li>
//                         <li>
//                             <label for="item2">Item 2</label>
//                         </li>
//                         <li>
//                             <label for="item3">Item 3</label>
//                         </li>
//                         <li>
//                             <label for="item4">Item 4</label>
//                         </li>
//                     </ul> 
//                     </nav>
//                 </details>
//     );
// }

function SearchBar(props) {
    let styles = props.cssmodule;
    return (
        <div id={styles.search}>
            <input type="text" placeholder="Search Astrologer" onChange={props.searchHandler} />
            {/* <BsGrid3X3GapFill /> */}
            <BsSearch size="20"  />
        </div>
    );
}


// export default SortBy;
export {SearchBar};