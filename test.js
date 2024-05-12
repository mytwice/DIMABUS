let myKey = "1iMPbNin0C5v9oIqEQm0aM4OCg9IwDswemDxdEW0Ati8"; // 스프레드시트 KEY

function formatTime(hours, minutes, seconds) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
function updateTime() {
    const currentTimeElement = document.getElementById('currentTime');
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    // 초가 0이 아닐 때에만 초를 표시
    const formattedTime = formatTime(hours, minutes, seconds);
    currentTimeElement.innerText = `현재 시간: ${formattedTime}`;
}
function calculateTimeRemaining(busTimes) {
    const currentTime = new Date();
    let nextBusTime = null;
    for (const time of busTimes) {
    const [hours, minutes] = time.split(':');
    const busTime = new Date();
    busTime.setHours(hours);
    busTime.setMinutes(minutes);
    if (busTime > currentTime) {
        nextBusTime = busTime;
        break;
    }
    }
    if (nextBusTime) {
    const timeDiff = nextBusTime - currentTime;
    const hoursRemaining = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutesRemaining = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hoursRemaining > 0) {
        return `${hoursRemaining}시간 ${minutesRemaining}분`;
    } else {
        return `${minutesRemaining}분`;
    }
    } else {
    const tomorrowFirstBusTime = new Date();
    tomorrowFirstBusTime.setDate(currentTime.getDate() + 1);
    tomorrowFirstBusTime.setHours(busTimes[0].split(':')[0]);
    tomorrowFirstBusTime.setMinutes(busTimes[0].split(':')[1]);
    const timeDiff = tomorrowFirstBusTime - currentTime;
    const hoursRemaining = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutesRemaining = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    return `운행 종료`;
    }
}
//, 다음 첫 차까지 : ${hoursRemaining}시간 ${minutesRemaining}분 (일요일에 제거 전까지 제거함)

function updateBusTimes() {
    const busTimesA1 = [
    '8:20', '8:40', '8:50', '8:55', '9:30', '9:40', '9:50', '9:55', '10:30', '10:40',
    '10:50', '11:30', '11:40', '11:50', '12:30', '12:40', '12:50', '13:40', '13:50', '14:40',
    '14:50', '15:40', '15:50', '16:40', '16:50', '17:40', '17:50', '18:00'
    ];
    const busTimesA2 = [
    '8:45', '9:35', '9:45', '10:35', '10:45', '11:35', '11:45', '12:35', '12:45', '13:45',
    '14:45', '15:45', '16:45', '17:45'
    ];
    const busTimesB1 = [
    '8:25', '8:35', '8:45', '8:55', '9:35', '9:45', '9:55', '10:35', '10:45', '10:55',
    '11:35', '11:45', '11:55', '12:35', '12:45', '12:55', '13:45', '13:55', '14:45', '14:55',
    '15:45', '15:55', '16:45', '16:55', '17:45', '17:55'
    ];
    const busTimesB2 = [
    '8:30', '8:40', '8:50', '9:00', '9:40', '9:50', '10:00', '10:40', '10:50', '11:00',
    '11:40', '11:50', '12:00', '12:40', '12:50', '13:00', '13:50', '14:00', '14:50', '15:00',
    '15:50', '16:00', '16:40', '17:00', '17:50', '18:10'
    ];
    const busTimesC1 = [
    '17:00', '18:00', '19:00', '20:00', '21:00'
    ];
    const busTimesC2 = [
    '17:10', '18:10', '19:10', '20:10', '21:10'
    ];
    const busTimesLate1 = ['18:50', '19:20', '19:45', '20:45', '21:25', '21:45'];
    const busTimesLate2 = ['18:55', '19:25', '19:50', '20:50', '21:30', '21:50'];
    const busTimesLate3 = ['18:40', '19:00', '19:30', '19:55', '20:55', '21:35', '21:55'];  
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    // 현재 요일에 따라 노선 활성화 여부 결정
    const currentDay = new Date().getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
    if (currentDay === 0) {
        document.querySelectorAll('.container tr.inactive.black').forEach(el => el.classList.remove('inactive', 'black'));
        document.getElementById('busTimeC1').innerText = calculateTimeRemaining(busTimesC1);
        document.getElementById('busTimeC2').innerText = calculateTimeRemaining(busTimesC2);
    } else {
        document.querySelectorAll('.container tr.inactive').forEach(el => el.classList.add('inactive', 'black'));
        document.getElementById('busTimeC1').innerText = '운행요일이 아닙니다.';
        document.getElementById('busTimeC2').innerText = '운행요일이 아닙니다.';
    }
    // 토요일과 일요일을 제외한 모든 날에 A, B 노선 활성화
    if (currentDay !== 0 && currentDay !== 6) {
        document.querySelectorAll('.container tr.inactive').forEach(el => el.classList.remove('inactive'));
        document.getElementById('busTimeA1').innerText = calculateTimeRemaining(busTimesA1);
        document.getElementById('busTimeA2').innerText = calculateTimeRemaining(busTimesA2);
        document.getElementById('busTimeB1').innerText = calculateTimeRemaining(busTimesB1);
        document.getElementById('busTimeB2').innerText = calculateTimeRemaining(busTimesB2);
        document.getElementById('busTimeLate1').innerText = calculateTimeRemaining(busTimesLate1);
        document.getElementById('busTimeLate2').innerText = calculateTimeRemaining(busTimesLate2);
        document.getElementById('busTimeLate3').innerText = calculateTimeRemaining(busTimesLate3);
    } else {
        document.getElementById('busTimeA1').innerText = '운행요일이 아닙니다.';
        document.getElementById('busTimeA2').innerText = '운행요일이 아닙니다.';
        document.getElementById('busTimeB1').innerText = '운행요일이 아닙니다.';
        document.getElementById('busTimeB2').innerText = '운행요일이 아닙니다.';
        document.getElementById('busTimeLate1').innerText = '운행요일이 아닙니다.';
        document.getElementById('busTimeLate2').innerText = '운행요일이 아닙니다.';
        document.getElementById('busTimeLate3').innerText = '운행요일이 아닙니다.';
    }
}

setInterval(updateTime, 1000);
setInterval(updateBusTimes, 1000);

google.charts.load("current", { packages: ["corechart"] }).then(() => {
    let query = new google.visualization.Query(
        `http://spreadsheets.google.com/tq?key=${myKey}&pub=1`
    );

    query.send((response) => {
        if (response.isError()) {
            console.error(
                "Error in query: " +
                response.getMessage() +
                " " +
                response.getDetailedMessage()
        );
        return;
        }

        let dataTable = response.getDataTable().toJSON();
        let jsonData = JSON.parse(dataTable);
        let cols = jsonData.cols.map((col) => col.label);
        let rows = jsonData.rows.map((row) => {
        let newRow;

        row.c.forEach((obj, index) => {
            if (obj == null || obj == undefined) return; //빈값이 경우 정지
            obj[cols[index]] = "f" in obj ? obj["f"] : obj["v"];
            ["f", "v"].forEach((each) => delete obj[each]);
            newRow = { ...newRow, ...obj };
        });

        return newRow;
        });

        var arr = [];

        for (var i in rows) {
            if (rows[i]['공지 ON/OFF'] === "TRUE") {
                document.getElementById('success').style.display = "flow-root";
                arr.push(rows[i]['공지사항']);
            }
        };
        
        document.getElementById('success').innerText = arr.join('\n');
    });
});