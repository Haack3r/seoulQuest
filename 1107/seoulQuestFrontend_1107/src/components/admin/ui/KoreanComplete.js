// 초성(19개)
const CHO_KOREAN = [
    'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ',
    'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
    'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ',
    'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
];
// 중성(21개)
const JUNG_KOREAN = [
    'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ',
    'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ',
    'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ',
    'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ',
];
// 종성(28개)
const JONG_KOREAN = [
    '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ',
    'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ',
    'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ',
    'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
];

const CHO_PERIOD = Math.floor('까'.charCodeAt(0) - '가'.charCodeAt(0)); // 588 ( 28 * 21 )
const JUNG_PERIOD = Math.floor('개'.charCodeAt(0) - '가'.charCodeAt(0)); // 28

const KOREAN_START_CHARCODE = '가'.charCodeAt(0);
const KOREAN_END_CHARCODE = '힣'.charCodeAt(0);

/**
 * 주어진 문자가 한글 음절인지 확인
 * @param {number} charCode 문자의 유니코드
 * @returns {boolean} 한글 음절 여부
 */

// 조합 된 글자인지 체크 (가 ~ 힣 사이)
function isKorean(charCode) {
    return KOREAN_START_CHARCODE <= charCode && charCode <= KOREAN_END_CHARCODE;
}

/**
 * 한글 음절을 자모음으로 분해
 * @param {string} letter 분해할 한글 문자
 * @returns {string|Object} 분해된 자모음 객체 또는 원본 문자
 */

function divideKorean(letter) {
    const letterCode = letter.charCodeAt(0);

    if (!isKorean(letterCode)) {
        return letter;
    }

    const charCode = letterCode - KOREAN_START_CHARCODE;

    const choIndex = Math.floor(charCode / CHO_PERIOD);
    const jungIndex = Math.floor((charCode % CHO_PERIOD) / JUNG_PERIOD);
    const jongIndex = charCode % JUNG_PERIOD;

    return {
        cho: CHO_KOREAN[choIndex],
        jung: JUNG_KOREAN[jungIndex],
        jong: JONG_KOREAN[jongIndex],
    };
}

console.log(divideKorean("김"));
// { "cho": "ㄱ", "jung": "ㅣ", "jong": "ㅁ" }

console.log(divideKorean("ㄱ"));
// ㄱ

// 44032(가) + ((초성 × 21) + 중성) × 28 + 종성
function combine(cho, jung, jong) {
    const koreanCode = KOREAN_START_CHARCODE + cho * CHO_PERIOD + jung * JUNG_PERIOD + jong;

    if (!isKorean(koreanCode)) {
        return '';
    }

    return String.fromCharCode(koreanCode);
}

/**
 * 자모음 문자로 한글 음절 조합
 * @param {string} cho 초성 문자
 * @param {string} jung 중성 문자
 * @param {string} jong 종성 문자
 * @returns {string} 조합된 한글 문자
 */

console.log(combine(0, 20, 16));
// 김

console.log(combine(-1, 20, 16));
// ''

function combineKorean(cho = '', jung = '', jong = '') {
    const choIndex = CHO_KOREAN.indexOf(cho);
    const jungIndex = JUNG_KOREAN.indexOf(jung);
    const jongIndex = JONG_KOREAN.indexOf(jong);

    return combine(choIndex, jungIndex, jongIndex);
}

/**
 * 입력 이벤트 처리기
 * @param {HTMLElement} target 입력 요소
 */

function handleInput(target) {
    const value = String(target.value);

    document.querySelector('.docs span').innerHTML = value
        .split('')
        .map(divideKorean)
        .reduce((acc, v) => {
            return acc + (v.cho
                ? (v.cho || '') + (v.jung || '') + (v.jong || '')
                : v || '');
        }, '');
}

const korean = { cho: 'ㄱ', jung: 'ㅣ', jong: 'ㅁ' };
// const korean = divideKorean('김');

console.log(combineKorean(korean.cho, korean.jung, korean.jong));
// 김

// 단어 분해
const divideLetter = "수박"
    .split("")
    .map((letter) => divideKorean(letter));

console.log(divideLetter);
/* 
  [ 
    { "cho": "ㅅ", "jung": "ㅜ", "jong": "" },
    { "cho": "ㅂ", "jung": "ㅏ", "jong": "ㄱ" }
  ]
*/

// 단어 결합
const combineLetter = divideLetter
    .map((korean) => combineKorean(korean.cho, korean.jung, korean.jong))
    .join("");

console.log(combineLetter);
// 수박

export {
    divideKorean,
    combineKorean,
    handleInput,
    isKorean,
    CHO_KOREAN,
    JUNG_KOREAN,
    JONG_KOREAN
};