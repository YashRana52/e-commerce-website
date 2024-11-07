import React from 'react'
import BestSeller from '../components/BestSeller'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import NewsLatterBox from '../components/NewsLatterBox'
import OurPolicy from '../components/OurPolicy'

function Home() {
    return (
        <div>
            <Hero/>
            <LatestCollection/>
            <BestSeller/>
            <OurPolicy/>
            <NewsLatterBox/>
        </div>
    )
}

export default Home
