import React from "react";
import BasicLayout from "../layouts/BasicLayout";
import AboutSeoulCultureQuest from "../components/aboutPage/AboutSeoulCultureQuest";
import AnimatedPhotoGrid from "../components/aboutPage/AnimatedPhotoGrid";

const AboutSCQ = () => {
  return (
    <div className="p-4 w-full" style={{ backgroundColor: "#E0DCD0" }}>
      <BasicLayout>
        {/* <AnimatedPhotoGrid /> */}
        <AboutSeoulCultureQuest />
      </BasicLayout>
    </div>
  );
};

export default AboutSCQ;
