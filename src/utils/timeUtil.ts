import moment from 'moment';

export const timeUtils = {
    // 날짜 포맷 변경
    timeFormat: (date: string) => {
        return moment(date).format('YYYY-MM-DD');
    },

    // 요일 반환
    getDay: (date: string) => {
        const day = new Date(date).getDay();
        const dayList = ['일', '월', '화', '수', '목', '금', '토'];
        return dayList[day];
    },

    // 날짜 1일 증가
    addDate: (date: string) => {
        return moment(date).add(1, 'days').format('YYYY-MM-DD');
    },

    // 날짜 1일 감소
    subtractDate: (date: string) => {
        return moment(date).subtract(1, 'days').format('YYYY-MM-DD');
    },
};
