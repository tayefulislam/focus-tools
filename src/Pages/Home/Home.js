import React from 'react';
import Banner from './Banner';

import Products from './Products/Products';
import Reviews from './Reviews';
import Summary from './Summary/Summary';
import TrackItem from './TrackItem/TrackItem';

const Home = () => {
    return (
        <div>
            <Banner></Banner>

            <TrackItem></TrackItem>

            <Products></Products>

            <Summary></Summary>

            <Reviews></Reviews>





        </div>
    );
};

export default Home;