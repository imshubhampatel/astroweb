import {BsSearch} from 'react-icons/bs'

function SearchBar(props) {
    let styles = props.cssmodule;
    return (
        <div id={styles.search}>
            <input type="text" placeholder="Let's find a blog for you" onChange={props.searchHandler} />
            {/* <BsGrid3X3GapFill /> */}
            <BsSearch size="20"  />
        </div>
    );
}


// export default SortBy;
export {SearchBar};