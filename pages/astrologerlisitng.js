// import React, { useState, useEffect } from "react";
// import Card from './components/Card';
// import Filter from './components/filter';
// import SortBy, {PGLocationBreadCrumb, SearchBar} from './components/pgTools';
// import  styles from '../styles/components/astrologerlisitng/astrologer.module.css';
// import router from "next/router";


// function MainStructure() {
//     return (
//         <main>
//             <section className= {`${styles.pgtoolscontainer}`}>
//                 <h2>Our Astrologers</h2>
//                 <PGLocationBreadCrumb />
//                 <SortBy />
//                 <SearchBar />
//             </section>
//             <section className={`${styles.filtercontainer}`}>
//                 <span class="title">Filter By</span>
//                 <Filter />
//                 <Filter />
//                 <Filter />
//                 <Filter />
//             </section>
//             <section className={`${styles.cardscontainer}`}>
//                 <div class="title" data-status-color="green">Astrologers online - 2331</div>
//                 <section class="cards">
//                     <Card />
//                 </section>
//             </section>
            
//         </main>
//     );
// }

// export default MainStructure;



import React from 'react'
import { makeStyles } from '@material-ui/core'
import LeftBox from './components/leftbox';
import RightBox from './components/rightbox';
import router from "next/router";

const Usestyles=makeStyles({
    container:{
        display:'flex'
        // backgroundColor:'yellow'
    },
    left:{
        display:'flex',
        flex:'3',
        alignItems:'center',
        justifyContent:'center',
        //backgroundColor:'yellow'
    },
    right:{
        display:'flex',
        flex:'9',
        alignItems:'center',
        justifyContent:'center',
        //backgroundColor:'pink'
    }
});

const index = () => {
    const classes=Usestyles();
  return (
    <div className={classes.container}>
        <div className={classes.left}><LeftBox/></div>
        <div className={classes.right}><RightBox/></div>
    </div>
  )
}

export default index;