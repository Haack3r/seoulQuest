import React from "react";
import BasicLayout from "../layouts/BasicLayout";
import AboutSeoulhwa from "../components/aboutPage/AboutSeoulhwa";

const AboutSCQ = () => {
  return (
    <div className="p-4 w-full" style={{ backgroundColor: "#E0DCD0" }}>
      <BasicLayout>
        {/* <AnimatedPhotoGrid /> */}
        <AboutSeoulhwa />
      </BasicLayout>
    </div>
  );
};

export default AboutSCQ;
