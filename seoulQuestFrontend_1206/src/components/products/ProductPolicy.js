import React from "react";
import {
  CalendarOutlined,
  CreditCardOutlined,
  ClockCircleOutlined,
  SafetyOutlined,
  UserSwitchOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const ProductPolicy = () => {
  const details = [
    {
      icon: <CalendarOutlined className="text-2xl text-blue-500" />,
      title: "30-Day Refund Policy",
      description:
        "Enjoy a hassle-free refund if you're unsatisfied within 30 days of purchase.",
    },
    {
      icon: <SafetyOutlined className="text-2xl text-blue-500" />,
      title: "100% Satisfaction Guarantee",
      description:
        "We stand behind our product quality. If you're not satisfied, we'll make it right.",
    },
    {
      icon: <CreditCardOutlined className="text-2xl text-blue-500" />,
      title: "Secure Payment",
      description: "Your transactions are encrypted and safe with us.",
    },
    {
      icon: <CheckCircleOutlined className="text-2xl text-blue-500" />,
      title: "Quality Assurance",
      description: "Every product is inspected to meet the highest standards.",
    },
    {
      icon: <UserSwitchOutlined className="text-2xl text-blue-500" />,
      title: "Dedicated Support Team",
      description:
        "Reach out to our customer service team for any questions or concerns.",
    },
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

export default ProductPolicy;
