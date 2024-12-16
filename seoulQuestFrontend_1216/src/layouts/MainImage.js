import React from 'react';
import BannerAnim, { Element } from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import 'rc-banner-anim/assets/index.css';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { SearchIcon } from 'lucide-react';

const BgElement = Element.BgElement;

const MainImage = () => {
  return (
    <div className="h-[60vh] bg-white font-sans">
    <section className="pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full h-[50vh] rounded-lg overflow-hidden">
            <BannerAnim autoPlay style={{ height: '100%' }}>
            <Element prefixCls="banner-user-elem" key="0" style={{ height: '100%' }}>
            <BgElement
              key="bg"
              className="bg "
              style={{
                background: '#364D79',
              }}
            />
            <TweenOne
              animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
              className="relative w-full h-full "
            >
              <img
                src="https://cdn.pixabay.com/photo/2020/12/14/19/40/palace-5831869_1280.jpg"
                alt="Banner 1"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h1 className="text-5xl font-bold text-white tracking-wide text-center">
                  Discover Seoul's Soul
                </h1>
              </div>
            </TweenOne>
            </Element>
            <Element prefixCls="banner-user-elem" key="1" style={{ height: '100%' }}>
            <BgElement
              key="bg"
              className="bg"
              style={{
                background: '#64CBCC',
              }}
            />
            <TweenOne
              animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
              className="relative w-full h-full"
            >
              <img
                src="https://cdn.pixabay.com/photo/2015/05/02/00/57/aluminous-749358_1280.jpg"
                alt="Banner 2"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h1 className="text-5xl font-bold text-white tracking-wide text-center">
                  Experience Seoul's Culture
                </h1>
              </div>
            </TweenOne>
          </Element>
          <Element prefixCls="banner-user-elem" key="1" style={{ height: '100%' }}>
            <BgElement
              key="bg"
              className="bg"
              style={{
                background: '#64CBCC',
              }}
            />
            <TweenOne
              animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
              className="relative w-full h-full"
            >
              <img
                src="https://cdn.pixabay.com/photo/2023/03/12/07/50/samulnori-7846017_1280.jpg"
                alt="Banner 2"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
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

  );
};

export default MainImage;
