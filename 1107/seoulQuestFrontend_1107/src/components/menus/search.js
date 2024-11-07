const dataList = ["빨간색", "주황색", "노랑색", "초록색", "파란색"]

const $search = document.querySelector("#search")
const $autoComplete = document.querySelector("#autoComplete")

let index = 0

$search.onkeyup = (e) => {
    // 검색어
    const value = $search.value.trim()

    // 자동완성 필터링
    const matchList = value ? dataList.filter((label) => label.includes(value)) : []

    switch (e, keyCode) {
        // up key
        case 38:
            index = Math.max(index - 1, 0)
            break
        // down key
        case 40:
            index = Math.min(index + 1, matchList.length - 1)
            break

        // enter key
        case 13:
            document.querySelector("#search").value = matchList[index] || ""

            // 초기화
            index = 0
            matchList.length = 0
            break

        // 그 외 초기화
        default:
            index = 0
            break
    }

    // 리스트 띄우기
    showList(matchList, value, index)
}

const showList = (data, value, index) => {
    const regex = new RegExp(`${value}`, "g")

    $autoComplete.innerHTML = data.map(
        (label, index) => `
            <div class= '${nowIndex === index ? "active" : ""}'>
            ${label.replace(regex, "<mark>$1</mark>")}
            </div>
        `
    ).join("")
}