import React, { useState } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import { postAdd } from '../api/ContactApi';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        inquiry: ''
    });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);      // 오류 여부를 추적하는 상태
    const [openIndex, setOpenIndex] = useState(null);   // 어떤 입력 필드가 열려있는지 추적하는 상태

    // 임시 데이터
    const faqData = [
        {
            question: "투어는 어떻게 예약하나요?",
            answer: "Tours 페이지에서 원하시는 투어를 선택하신 후 예약 버튼을 클릭하시면 예약이 가능합니다. 예약 시 날짜와 인원수를 선택하실 수 있습니다."
        },
        {
            question: "환불 정책은 어떻게 되나요?",
            answer: "투어 시작 7일 전까지 취소 시 100% 환불, 3일 전까지 취소 시 50% 환불이 가능합니다. 그 이후 취소 시에는 환불이 불가능합니다."
        },
        {
            question: "단체 예약도 가능한가요?",
            answer: "10인 이상 단체 예약의 경우 별도의 할인이 적용됩니다. 자세한 사항은 이메일로 문의해 주시기 바랍니다."
        },
        {
            question: "투어 소요 시간은 얼마나 되나요?",
            answer: "일반 투어는 약 2-3시간 정도 소요되며, 프리미엄 투어의 경우 4-5시간 정도 소요됩니다. 각 투어별 상세 소요시간은 투어 상세페이지에서 확인하실 수 있습니다."
        },
        {
            question: "준비물은 무엇이 필요한가요?",
            answer: "편한 복장과 걷기 좋은 신발을 준비해 주시면 됩니다. 여름철에는 모자와 선크림, 겨울철에는 따뜻한 외투를 준비해주세요. 카메라는 선택사항입니다."
        },
        {
            question: "우천시에도 투어가 진행되나요?",
            answer: "가벼운 비의 경우 우산을 제공해드리며 정상적으로 투어가 진행됩니다. 단, 폭우나 폭설 등 극심한 기상악화 시에는 안전을 위해 투어가 취소될 수 있으며, 이 경우 전액 환불해드립니다."
        },
        {
            question: "외국어 가이드도 가능한가요?",
            answer: "네, 영어, 일본어, 중국어 가이드 투어를 제공하고 있습니다. 예약 시 원하시는 언어를 선택해 주시면 됩니다."
        },
        {
            question: "투어 집합 장소는 어디인가요?",
            answer: "대부분의 투어는 지하철역 근처에서 시작됩니다. 예약 확정 후 상세한 집합 장소와 지도를 이메일로 보내드립니다."
        },
        {
            question: "결제는 어떤 방식으로 가능한가요?",
            answer: "신용카드, 계좌이체, 페이팔 등 다양한 결제 방식을 지원하고 있습니다. 모든 결제는 안전한 보안 시스템을 통해 처리됩니다."
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

        // 로그인 체크
        // const token = localStorage.getItem('token');
        // if (!token) {
        //     setMessage('로그인이 필요한 서비스입니다.');
        //     setIsError(true);
        //     return;
        // }

        try {
            // ContactRequestDTO 구조에 맞게 데이터 구성
            const contactData = {
                name: formData.name,
                email: formData.email,
                inquiry: formData.inquiry
            };

            console.log("Submitting contact:", contactData);

            const result = await postAdd(contactData);
            console.log("Submit result:", result);

            setMessage('문의가 성공적으로 전송되었습니다.');
            setIsError(false);
            setFormData({ name: '', email: '', inquiry: '' });

        } catch (error) {
            console.error("Submit error:", error);
            if (error.response?.status === 401) {
                setMessage('로그인이 만료되었습니다. 다시 로그인해주세요.');
            } else if (error.response?.status === 400) {
                setMessage('입력 정보를 확인해주세요.');
            } else {
                setMessage('문의 전송에 실패했습니다. 다시 시도해주세요.');
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
                    <h1 className="text-5xl text-gray-800 text-center mb-10 mt-5">
                        Customer Support Center
                    </h1>

                    <div className="max-w-[1200px] mx-auto grid grid-cols-2 gap-10 items-start">

                        {/* FAQ 섹션 */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg h-full">
                            <h2 className="text-3xl text-gray-800 mb-8 text-center">
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
                                            className={`w-full px-5 py-4 text-left ${openIndex === index ? 'bg-blue-500 text-white' : 'bg-gray-50 text-gray-800'}
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
                            <h2 className="text-3xl text-gray-800 mb-8 text-center">
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
                                        className="w-full px-3 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500"
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
                                        className="w-full px-3 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500"
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
                                        rows="5"
                                        className="w-full px-3 py-3 border border-gray-200 rounded-lg text-sm resize-y min-h-[120px] outline-none focus:border-blue-500"
                                    />

                                    {/* 현재 폼에서 사용자가 입력한 문의사항을 나타내는 값 */}
                                    <div className="text-right text-sm text-gray-600 mt-1">
                                        {formData.inquiry.length}/1000
                                    </div>

                                </div>

                                {message && (
                                    <div className={`mb-5 p-3 rounded-lg text-center ${isError
                                        ? 'bg-red-50 text-red-500 border border-red-500'
                                        : 'bg-green-50 text-green-500 border border-green-500'
                                        }`}>
                                        {message}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-blue-500 text-white rounded-lg font-semibold cursor-pointer hover:bg-blue-600">
                                    Contact us
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