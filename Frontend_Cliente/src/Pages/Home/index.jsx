import React from "react";
import HomeSlider from "../../components/HomeSlider";
import HomeCatSlider from "../../components/HomeCatSlider";

const Home = () => {
  return (
    <>
      <HomeSlider />
      <HomeCatSlider />

      <section className="!py-5 bg-white !mt-5"></section>
    </>
  );
};

export default Home;
