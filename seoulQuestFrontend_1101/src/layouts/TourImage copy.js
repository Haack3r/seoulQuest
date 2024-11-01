import React from "react";
import BannerAnim, { Element } from "rc-banner-anim";
import TweenOne from "rc-tween-one";
import "../About.css";

const BgElement = Element.BgElement;

const TourImage = () => {
  return (
    <>
          <div className="h-[65vh] font-sans mb-40 -mt-10">
              
        <section className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="w-full h-[65vh] rounded-lg overflow-hidden">
              <BannerAnim autoPlay style={{ height: "100%" }}>
                <Element
                  prefixCls="banner-user-elem"
                  key="0"
                  style={{ height: "100%" }}
                >
                  <BgElement
                    key="bg"
                    className="bg "
                    style={{
                      background: "#364D79",
                    }}
                  />
                  <TweenOne
                    animation={{ y: 30, opacity: 0, type: "from", delay: 100 }}
                    className="relative w-full h-full "
                  >
                    <video
                      className="hover-video object-cover w-full h-full"
                      src="https://videos.pexels.com/video-files/28982709/12536329_2560_1440_24fps.mp4"
                      muted
                      loop
                      playsInline
                      autoPlay
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
                      <h1 className="text-5xl font-bold text-white tracking-wide text-center">
                        Discover Seoul's Soul
                      </h1>
                    </div>
                  </TweenOne>
                </Element>
                <Element
                  prefixCls="banner-user-elem"
                  key="1"
                  style={{ height: "100%" }}
                >
                  <BgElement
                    key="bg"
                    className="bg"
                    style={{
                      background: "#64CBCC",
                    }}
                  />
                  <TweenOne
                    animation={{ y: 30, opacity: 0, type: "from", delay: 100 }}
                    className="relative w-full h-full"
                  >
                    <video
                      className="hover-video object-cover w-full h-full"
                      src="https://videos.pexels.com/video-files/12263824/12263824-hd_1280_720_30fps.mp4"
                      muted
                      loop
                      playsInline
                      autoPlay
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
                      <h1 className="text-5xl font-bold text-white tracking-wide text-center">
                        Experience Seoul's Culture
                      </h1>
                    </div>
                  </TweenOne>
                </Element>
                <Element
                  prefixCls="banner-user-elem"
                  key="1"
                  style={{ height: "100%" }}
                >
                  <BgElement
                    key="bg"
                    className="bg"
                    style={{
                      background: "#64CBCC",
                    }}
                  />
                  <TweenOne
                    animation={{ y: 30, opacity: 0, type: "from", delay: 100 }}
                    className="relative w-full h-full"
                  >
                    <video
                      className="hover-video object-cover w-full h-full"
                      src="https://videos.pexels.com/video-files/13193366/13193366-hd_1920_1080_30fps.mp4"
                      muted
                      loop
                      playsInline
                      autoPlay
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
                      <h1 className="text-5xl font-bold text-white tracking-wide text-center">
                        Embrace Modern Korea
                      </h1>
                    </div>
                  </TweenOne>
                </Element>
              </BannerAnim>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TourImage;
