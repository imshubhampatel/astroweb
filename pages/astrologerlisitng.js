import React, { useState, useEffect } from "react";
import Card from './components/Card';
import Filter from './components/filter';
import SortBy, {PGLocationBreadCrumb, SearchBar} from './components/pgTools';
import  styles from '../styles/components/astrologerlisitng/astrologer.module.css';
import router from "next/router";

function MainStructure() {
    return (
        <main>
            <section className= {`${styles.pgtoolscontainer}`}>
                <h2>Our Astrologers</h2>
                <PGLocationBreadCrumb />
                <SortBy />
                <SearchBar />
            </section>
            <section className={`${styles.filtercontainer}`}>
                <span class="title">Filter By</span>
                <Filter />
                <Filter />
                <Filter />
                <Filter />
            </section>
            <section className={`${styles.cardscontainer}`}>
                <div class="title" data-status-color="green">Astrologers online - 2331</div>
                <section class="cards">
                    <Card />
                </section>
            </section>
            
        </main>
    );
}

export default MainStructure;
