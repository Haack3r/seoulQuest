import React from "react";
import { CalendarOutlined, CreditCardOutlined, ClockCircleOutlined, UserOutlined, AudioOutlined, AccessibilityOutlined } from "@ant-design/icons";

const TourDetails = () => {
  
    const details = [
        { icon: <CalendarOutlined className="text-2xl text-blue-500" />, title: "Easy Cancellation", description: "Full refund if canceled up to 24 hours in advance" },
        { icon: <CreditCardOutlined className="text-2xl text-blue-500" />, title: "Reserve Now, Pay Later", description: "Keep your travel plans flexible. Reserve your spot now and pay later." },
        { icon: <ClockCircleOutlined className="text-2xl text-blue-500" />, title: "Duration: 1.5 Hours", description: "Check availability to see start times." },
        { icon: <UserOutlined className="text-2xl text-blue-500" />, title: "Guided Language", description: "English" },
        { icon: <AudioOutlined className="text-2xl text-blue-500" />, title: "Audio Guide Included", description: "Available in Spanish, Thai, Chinese, English, French, German, Indonesian, Italian, Arabic, Japanese, Norwegian" },
        { icon: <UserOutlined className="text-2xl text-blue-500" />, title: "Wheelchair Accessible", description: "" }
    ];
    
  

  return (
    <div className="space-y-4">
      {details.map((detail, index) => (
        <div key={index} className="flex items-start space-x-4">
          {detail.icon}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{detail.title}</h3>
            <p className="text-gray-600">{detail.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TourDetails;
