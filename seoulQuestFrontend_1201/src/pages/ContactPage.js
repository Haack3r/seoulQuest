import React, { useState } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import { postAdd } from '../api/ContactApi';

const ContactPage = () => {
    window.scrollTo(0, 0);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        inquiry: ''
    });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);      // 오류 여부를 추적하는 상태, `false`로 초기화하여 기본적으로 오류가 없음
    const [openIndex, setOpenIndex] = useState(null);   // 어떤 입력 필드가 열려있는지 추적, 초기값은 `null`로 설정하여 아무 필드도 활성화되어 있지 않음

    // Frequently Asked Questions 섹션
    const faqData = [
        {
            question: "How can I book a tour?",
            answer: "You can book a tour by selecting your desired tour on the Tours page and clicking the 'Book Now' button. During the booking process, you can choose the date and number of participants."
        },
        {
            question: "What is your refund policy?",
            answer: "Cancellations made up to 7 days before the tour start date are eligible for a 100% refund. Cancellations up to 3 days before the start date are eligible for a 50% refund. No refunds are available for cancellations made less than 3 days before the tour."
        },
        {
            question: "Is group booking available?",
            answer: "Yes, group bookings for 10 or more participants are eligible for special discounts. For more details, please contact us via email."
        },
        {
            question: "How long do tours take?",
            answer: "Standard tours typically last about 2-3 hours, while premium tours may take 4-5 hours. Detailed durations for each tour can be found on the tour detail page."
        },
        {
            question: "What should I bring?",
            answer: "Please wear comfortable clothing and walking shoes. In summer, bring a hat and sunscreen. In winter, prepare a warm coat. A camera is optional."
        },
        {
            question: "Do tours proceed in rainy weather?",
            answer: "In light rain, we provide umbrellas and proceed with the tour as scheduled. However, in cases of severe weather such as heavy rain or snowstorms, tours may be canceled for safety reasons, and a full refund will be provided."
        },
        {
            question: "Are foreign language guides available?",
            answer: "Yes, we offer guided tours in English, Japanese, and Chinese. If you prefer a specific language, please contact us after booking."
        },
        {
            question: "Where is the meeting point for tours?",
            answer: "Most tours start near subway stations. After your booking is confirmed, we will send you the exact meeting location and a map via email."
        },
        {
            question: "What payment methods are available?",
            answer: "We accept various payment methods, including credit cards and bank transfers. All payments are processed through a secure system."
        }
    ];

    // 사용자가 입력 필드를 변경할 때 호출 되는 함수
    const handleChange = (e) => {
        const { name, value } = e.target;

        // 기존 상태인 formData 객체를 그대로 복사하는 상태 업데이트 함수
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // 폼 제출 시 호출되는 비동기 함수
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // ContactRequestDTO 구조에 맞게 데이터 구성
            const contactData = {
                name: formData.name,
                email: formData.email,
                inquiry: formData.inquiry
            };

            // 디버깅을 위한 로그 출력
            console.log("Submitting contact:", contactData);

            // postAdd는 서버에 데이터를 보내는 비동기 함수 (API 호출)
            const result = await postAdd(contactData);
            console.log("Submit result:", result);

            setMessage('Your inquiry sent successfully.');
            setIsError(false);  // 오류 상태를 false로 설정
            setFormData({ name: '', email: '', inquiry: '' });

        } catch (error) {

            // 예시 출력: Submit error: Error: Request failed with status code 401
            console.error("Submit error:", error);

            if (error.response?.status === 401) {
                setMessage('Please login to send inquiry.');
            } else if (error.response?.status === 400) {
                setMessage('Please check your info.');
            } else {
                setMessage('Failed to send your inquiry. Please try again.');
            }
            setIsError(true);
        }
    };

    // 특정 FAQ 항목을 열거나 닫는 함수
    const toggleFaq = (index) => {

        // openIndex가 현재 열려 있는 FAQ 항목의 인덱스라면, 해당 항목을 닫고,
        // 그렇지 않으면 새로운 FAQ 항목을 열도록 상태를 설정
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <BasicLayout>
            {/* 최소 높이를 100vh에서 200px를 뺀 값 */}
            <div className="min-h-[calc(100vh-200px)] bg-gray-50 px-5 py-16 relative overflow-hidden">
                <div
                    className="absolute inset-0"    // 위치를 절대적으로 설정하여 상, 하, 좌, 우 모든 방향에서 0px의 간격 설정
                    style={{ backgroundColor: "#E0DCD0" }}>
                </div>

                {/* 메인 섹션 */}
                <div className="relative z-10">
                    <h1 className="text-3xl font-semibold text-gray-900 text-center mb-10 mt-10">
                        Customer Support Center
                    </h1>

                    <div className="max-w-[1200px] mx-auto grid grid-cols-2 gap-10 items-start">

                        {/* FAQ 섹션 */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg h-full">
                            <h2 className="text-2xl text-gray-800 mb-8 text-center">
                                Frequently Asked Questions
                            </h2>

                            <div className="rounded-lg overflow-hidden">

                                {/* faqData 배열을 순회하며 각 FAQ 항목을 렌더링 */}
                                {faqData.map((faq, index) => (
                                    <div
                                        key={index}

                                        // 현재 항목이 마지막 항목일 때만 mb-0을 적용 마지막 FAQ 항목에는 아래쪽 마진(mb-2.5)을 제거
                                        className={`mb-2.5 bg-gray-50 rounded-lg overflow-hidden ${index === faqData.length - 1 ? 'mb-0' : ''}`}
                                    >
                                        <button
                                            onClick={() => toggleFaq(index)}
                                            className={`w-full px-5 py-4 text-left ${openIndex === index ? 'bg-stone-500 text-white' : 'bg-gray-50 text-gray-800'}
                                             border-none cursor-pointer flex justify-between items-center text-base font-medium`}>
                                            {faq.question}

                                            <span className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}>
                                                ▼
                                            </span>
                                        </button>

                                        {/* transition-all duration-300: 전환 효과가 300ms 동안 부드럽게 애니메이션이 적용 */}
                                        <div className={`transition-all duration-300 bg-white text-gray-600 ${openIndex === index ? 'p-5 max-h-[200px]' : 'px-5 max-h-0'
                                            } overflow-hidden`}>
                                            {faq.answer}
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 문의하기 섹션 */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg h-full">
                            <h2 className="text-2xl text-gray-800 mb-8 text-center">
                                Contact us
                            </h2>

                            <p className="text-gray-600 text-base text-center mb-8">
                                If you have any questions or inquiries, please leave us and we will respond quickly
                            </p>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-5">
                                    <label htmlFor="name" className="block mb-2 text-gray-800 font-medium">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required maxLength="100"
                                        placeholder="Please enter your name"
                                        className="w-full px-3 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-stone-500"
                                    />
                                </div>

                                <div className="mb-5">
                                    <label htmlFor="email" className="block mb-2 text-gray-800 font-medium">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required maxLength="200"
                                        placeholder="Please enter your email"
                                        className="w-full px-3 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-stone-500"
                                    />
                                </div>

                                <div className="mb-5">
                                    <label htmlFor="inquiry" className="block mb-2 text-gray-800 font-medium">
                                        Inquiry details
                                    </label>
                                    <textarea
                                        id="inquiry"
                                        name="inquiry"
                                        value={formData.inquiry}
                                        onChange={handleChange}
                                        required maxLength="1000"
                                        placeholder="Please enter your inquiry information"
                                        rows="5"     // textarea의 높이를 5줄로 설정 (세로 크기)
                                        className="w-full px-3 py-3 border border-gray-200 rounded-lg text-sm resize-y min-h-[120px] outline-none focus:border-stone-500"
                                    />

                                    {/* 현재 폼에서 사용자가 입력한 문의사항을 나타내는 값 */}
                                    <div className="text-right text-sm text-gray-600 mt-1">
                                        {formData.inquiry.length}/1000
                                    </div>

                                </div>

                                {message && (
                                    <div className={`mb-5 p-3 rounded-lg text-center ${isError
                                        ? 'bg-red-50 text-red-500 border border-red-500'    // 오류 메시지일 때의 스타일
                                        : 'bg-green-50 text-green-500 border border-green-500'  // 성공 메시지일 때의 스타일
                                        }`}>
                                        {message}
                                    </div>
                                )}

                                {/* Submit inquiry 버튼 섹션 */}
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-stone-400 text-white rounded-lg font-semibold cursor-pointer hover:bg-stone-500">
                                    Submit Inquiry
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </BasicLayout>
    );
};

export default ContactPage;