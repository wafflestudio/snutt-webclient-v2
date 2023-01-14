import { FullTimetable, Timetable } from '@/entities/timetable';

export const mockTimeTables: Timetable[] = [
  {
    _id: '123',
    year: 1001,
    semester: 1,
    title: '나의 시간표',
    updated_at: '2022-10-16T05:17:41.499Z',
    total_credit: 0,
  },
  {
    _id: '456',
    year: 1001,
    semester: 1,
    title: '나무의 시간표',
    updated_at: '2022-11-26T14:18:05.110Z',
    total_credit: 3,
  },
  {
    _id: '789',
    year: 2001,
    semester: 2,
    title: '나비의 시간표',
    updated_at: '2022-10-16T05:25:43.381Z',
    total_credit: 0,
  },
  {
    _id: '101112',
    year: 3001,
    semester: 4,
    title: '나무꾼의 시간표',
    updated_at: '2022-10-16T05:25:43.381Z',
    total_credit: 0,
  },
];

export const mockTimeTable123: FullTimetable = {
  _id: '123',
  user_id: '5c59377722ac5f0f310df48b',
  year: 2019,
  semester: 3,
  title: '왜 벌써 짜래 진짜 귀찮게',
  lecture_list: [
    {
      _id: '5d1a0132db261b554d5d0078',
      classification: '교양',
      department: '수리과학부',
      academic_year: '1학년',
      course_title: '고급수학 2',
      credit: 2,
      class_time: '월(3-1)/수(3-1)',
      real_class_time: '월(11:00~11:50)/수(11:00~11:50)',
      class_time_json: [
        {
          _id: '5d19f6370342fd1f4074843a',
          day: 0,
          start: 3,
          len: 1,
          place: '025-101',
          start_time: '11:00',
          end_time: '11:50',
        },
        {
          _id: '5d19f6370342fd1f40748439',
          day: 2,
          start: 3,
          len: 1,
          place: '025-101',
          start_time: '11:00',
          end_time: '11:50',
        },
      ],
      class_time_mask: [12582912, 0, 12582912, 0, 0, 0, 0],
      instructor: '김우찬',
      quota: 50,
      remark:
        '고급수학 1 수강생, 수학 1 및 수학연습 1 학점이 A+인 학생 (초안지는 http://www.math.snu.ac.kr/board/portal 참조)',
      category: '수량적 분석과 추론',
      course_number: 'L0442.000700',
      lecture_number: '001',
      created_at: '2019-07-01T12:48:50.164Z',
      updated_at: '2019-07-01T12:48:50.164Z',
      color: {},
      colorIndex: 7,
    },
    {
      _id: '5d1decbddb261b554d609dcc',
      classification: '전필',
      department: '컴퓨터공학부',
      academic_year: '2학년',
      course_title: '컴퓨터프로그래밍',
      credit: 4,
      class_time: '화(3-1.5)/수(10.5-2)/수(10.5-2)/목(3-1.5)',
      real_class_time: '화(11:00~12:15)/수(18:30~20:20)/목(11:00~12:15)',
      class_time_json: [
        {
          _id: '5d1dea9d681fc03728c46e30',
          day: 1,
          start: 3,
          len: 1.5,
          place: '302-208',
          start_time: '11:00',
          end_time: '12:15',
        },
        {
          _id: '5d1dea9d681fc03728c46e2f',
          day: 2,
          start: 10.5,
          len: 2,
          place: '044-1-206/044-1-207',
          start_time: '18:30',
          end_time: '20:20',
        },
        {
          _id: '5d1dea9d681fc03728c46e2e',
          day: 3,
          start: 3,
          len: 1.5,
          place: '302-208',
          start_time: '11:00',
          end_time: '12:15',
        },
      ],
      class_time_mask: [0, 14680064, 480, 14680064, 0, 0, 0],
      instructor: '이영기',
      quota: 100,
      remark:
        'ⓔ®(수강신청 1~2일) 컴퓨터공학부 주전공, 자유전공학부 주전공 신청가능, (수강신청 3일차부터) 컴퓨터공학부 주전공, 자유전공학부 주전공, 컴퓨터공학부 복수&부전공 신청가능',
      category: '',
      course_number: 'M1522.000600',
      lecture_number: '001',
      created_at: '2019-07-04T12:10:37.269Z',
      updated_at: '2019-09-11T12:00:34.291Z',
      color: {},
      colorIndex: 2,
    },
    {
      _id: '5d214a39a165ad381464b4e0',
      classification: '교양',
      department: '수리과학부',
      academic_year: '1학년',
      course_title: '고급수학연습 2',
      credit: 1,
      class_time: '수(7.5-2)',
      real_class_time: '수(15:30~17:20)',
      class_time_json: [
        {
          _id: '5d1f3c3ca18d4012f64773a8',
          day: 2,
          start: 7.5,
          len: 2,
          place: '024-112',
          start_time: '15:30',
          end_time: '17:20',
        },
      ],
      class_time_mask: [0, 0, 30720, 0, 0, 0, 0],
      instructor: '김우찬',
      quota: 25,
      remark: '초안지는 http://www.math.snu.ac.kr/board/portal 참조',
      category: '수량적 분석과 추론',
      course_number: 'L0442.000800',
      lecture_number: '001',
      created_at: '2019-07-07T01:26:17.966Z',
      updated_at: '2019-07-07T01:26:17.966Z',
      color: {},
      colorIndex: 6,
    },
    {
      _id: '5d214cfca165ad381464b5bf',
      classification: '교양',
      department: '생명과학부',
      academic_year: '1학년',
      course_title: '생물학실험 2',
      credit: 1,
      class_time: '월(7-2)',
      real_class_time: '월(15:00~16:50)',
      class_time_json: [
        {
          _id: '5d1f3c3ca18d4012f64775b9',
          day: 0,
          start: 7,
          len: 2,
          place: '026-403',
          start_time: '15:00',
          end_time: '16:50',
        },
      ],
      class_time_mask: [61440, 0, 0, 0, 0, 0, 0],
      instructor: '이수연',
      quota: 18,
      remark: '담당교수 문의 사절, 문의(jiaepark@snu.ac.kr)',
      category: '과학적 사고와 실험',
      course_number: '034.032',
      lecture_number: '007',
      created_at: '2019-07-07T01:38:04.598Z',
      updated_at: '2019-08-22T12:00:26.720Z',
      color: {},
      colorIndex: 1,
    },
    {
      _id: '5d43e9fb3c46177d58a540b5',
      classification: '교양',
      department: '불어불문학과(불어불문학전공)',
      academic_year: '1학년',
      course_title: '상상력과 문화',
      credit: 3,
      class_time: '월(4.5-1.5)/수(4.5-1.5)',
      real_class_time: '화(12:30~13:45)/목(12:30~13:45)',
      class_time_json: [
        {
          _id: '5d6e55fcad5ab46079bafccb',
          day: 1,
          start: 4.5,
          len: 1.5,
          place: '014-203',
          start_time: '12:30',
          end_time: '13:45',
        },
        {
          _id: '5d6e55fcad5ab46079bafcca',
          day: 3,
          start: 4.5,
          len: 1.5,
          place: '014-203',
          start_time: '12:30',
          end_time: '13:45',
        },
      ],
      class_time_mask: [0, 1835008, 0, 1835008, 0, 0, 0],
      instructor: '유치정',
      quota: 60,
      remark: '*(권장과목)',
      category: '문화와 예술',
      course_number: '042.009',
      lecture_number: '001',
      created_at: '2019-08-02T07:44:59.401Z',
      updated_at: '2019-09-03T12:01:00.907Z',
      color: {},
      colorIndex: 4,
    },
    {
      _id: '5d6e07c63c46177d58ad11f0',
      classification: '교양',
      department: '인류학과',
      academic_year: '1학년',
      course_title: '진화와 인간사회',
      credit: 3,
      class_time: '화(6-1.5)/목(6-1.5)',
      real_class_time: '화(14:00~15:15)/목(14:00~15:15)',
      class_time_json: [
        {
          _id: '5d2fd9ef9ee6ed1f1654c1ab',
          day: 1,
          start: 6,
          len: 1.5,
          place: '083-506',
          start_time: '14:00',
          end_time: '15:15',
        },
        {
          _id: '5d2fd9ef9ee6ed1f1654c1aa',
          day: 3,
          start: 6,
          len: 1.5,
          place: '083-506',
          start_time: '14:00',
          end_time: '15:15',
        },
      ],
      class_time_mask: [0, 229376, 0, 229376, 0, 0, 0],
      instructor: '박한선',
      quota: 150,
      remark: '',
      category: '인간과 사회',
      course_number: '045.006',
      lecture_number: '003',
      created_at: '2019-09-03T06:27:18.790Z',
      updated_at: '2019-09-03T06:27:18.790Z',
      color: {},
      colorIndex: 3,
    },
    {
      _id: '5d6fbcf33c46177d58adff73',
      classification: '교양',
      department: '통계학과',
      academic_year: '1학년',
      course_title: '통계학실험',
      credit: 1,
      class_time: '월(5-2)',
      real_class_time: '월(13:00~14:50)',
      class_time_json: [
        {
          _id: '5d2fd9ef9ee6ed1f1654bd78',
          day: 0,
          start: 5,
          len: 2,
          place: '026-102',
          start_time: '13:00',
          end_time: '14:50',
        },
      ],
      class_time_mask: [983040, 0, 0, 0, 0, 0, 0],
      instructor: '정성규',
      quota: 35,
      remark:
        '®R 활용 강좌 / 사범대,생활대,자유전공학부 수강가능  (수강신청 변경기간에는 통계학과생을 제외한 모든 학생 수강신청 가능)',
      category: '수량적 분석과 추론',
      course_number: '033.020',
      lecture_number: '017',
      created_at: '2019-09-04T13:32:35.643Z',
      updated_at: '2019-09-04T13:32:35.643Z',
      color: {},
      colorIndex: 6,
    },
    {
      _id: '5d70696c3c46177d58ae23d5',
      classification: '교양',
      department: '중어중문학과',
      academic_year: '1학년',
      course_title: '초급중국어 1',
      credit: 3,
      class_time: '화(7.5-1.5)/화(9-1)/화(9-1)/목(7.5-1.5)',
      real_class_time: '화(15:30~16:45)/화(17:00~17:50)/목(15:30~16:45)',
      class_time_json: [
        {
          _id: '5d821c6f03c812275101bc7c',
          day: 1,
          start: 7.5,
          len: 1.5,
          place: '003-104',
          start_time: '15:30',
          end_time: '16:45',
        },
        {
          _id: '5d821c6f03c812275101bc7b',
          day: 1,
          start: 9,
          len: 1,
          place: '003-105/003-102',
          start_time: '17:00',
          end_time: '17:50',
        },
        {
          _id: '5d821c6f03c812275101bc7a',
          day: 3,
          start: 7.5,
          len: 1.5,
          place: '003-104',
          start_time: '15:30',
          end_time: '16:45',
        },
      ],
      class_time_mask: [0, 31744, 0, 28672, 0, 0, 0],
      instructor: '박지현',
      quota: 20,
      remark: '수강제한 관련 수강편람 필독, 랩수업 있음(주당 1시간)',
      category: '외국어',
      course_number: '032.010',
      lecture_number: '013',
      created_at: '2019-09-05T01:48:28.769Z',
      updated_at: '2019-09-18T12:00:47.844Z',
      color: {},
      colorIndex: 8,
    },
    {
      _id: '5d7f26bc3c46177d58afa02e',
      course_title: '복싱',
      credit: 0,
      real_class_time: '월(17:30~20:00)/목(17:30~20:00)',
      class_time_json: [
        {
          _id: '5dc2ca043c46177d58b4e410',
          day: 0,
          len: 2.5,
          place: '',
          start: 9.5,
          start_time: '17:30',
          end_time: '20:00',
        },
        {
          _id: '5dc2ca043c46177d58b4e40f',
          day: 3,
          len: 2.5,
          place: '',
          start: 9.5,
          start_time: '17:30',
          end_time: '20:00',
        },
      ],
      class_time_mask: [1984, 0, 0, 1984, 0, 0, 0],
      instructor: '',
      quota: 0,
      remark: '',
      created_at: '2019-09-16T06:07:56.927Z',
      updated_at: '2019-11-06T13:26:28.604Z',
      color: { bg: '#E0E0E0', fg: '#333333' },
      colorIndex: 0,
    },
    {
      _id: '5da442da3c46177d58b123f9',
      course_title: '단풍 가을합주',
      credit: 0,
      real_class_time: '목(21:30~22:00)',
      class_time_json: [
        {
          _id: '5da442da3c46177d58b123fa',
          day: 3,
          len: 0.5,
          place: '',
          start: 13.5,
          start_time: '21:30',
          end_time: '22:00',
        },
      ],
      class_time_mask: [0, 0, 0, 4, 0, 0, 0],
      instructor: '',
      quota: 0,
      remark: '',
      created_at: '2019-10-14T09:41:46.919Z',
      updated_at: '2019-10-14T09:41:46.919Z',
      color: { bg: '#E0E0E0', fg: '#333333' },
      colorIndex: 0,
    },
  ],
  theme: 0,
  updated_at: '2020-02-21T10:14:59.802Z',
};

export const mockTimeTable456: FullTimetable = {
  _id: '456',
  user_id: '5c59377722ac5f0f310df48b',
  year: 2019,
  semester: 1,
  title: '18학점',
  lecture_list: [
    {
      _id: '5c59396a22ac5f0f310df4ba',
      classification: '교양',
      department: '컴퓨터공학부',
      academic_year: '1학년',
      course_title: '컴퓨터의 개념 및 실습',
      credit: 3,
      class_time: '월(6.5-2)/수(6.5-2)',
      real_class_time: '월(14:30~16:20)/수(14:30~16:20)',
      class_time_json: [
        {
          _id: '5c5434e5fe0abe35a3473748',
          day: 0,
          start: 6.5,
          len: 2,
          place: '301-203',
          start_time: '14:30',
          end_time: '16:20',
        },
        {
          _id: '5c5434e5fe0abe35a3473747',
          day: 2,
          start: 6.5,
          len: 2,
          place: '301-203',
          start_time: '14:30',
          end_time: '16:20',
        },
      ],
      class_time_mask: [122880, 0, 122880, 0, 0, 0, 0],
      instructor: '김석준',
      quota: 60,
      remark: '®컴퓨터공학부 2019학번 학생만 수강가능',
      category: '컴퓨터와 정보 활용',
      course_number: '035.001',
      lecture_number: '018',
      created_at: '2019-02-05T07:21:14.259Z',
      updated_at: '2019-03-04T12:01:17.593Z',
      color: {},
      colorIndex: 8,
    },
    {
      _id: '5c682d8f22ac5f0f31120efe',
      classification: '교양',
      department: '수리과학부',
      academic_year: '1학년',
      course_title: '수학 1',
      credit: 2,
      class_time: '월(5-1)/수(5-1)',
      real_class_time: '월(13:00~13:50)/수(13:00~13:50)',
      class_time_json: [
        {
          _id: '5c676ec0fa19e84583db6ec5',
          day: 0,
          start: 5,
          len: 1,
          place: '025-109',
          start_time: '13:00',
          end_time: '13:50',
        },
        {
          _id: '5c676ec0fa19e84583db6ec4',
          day: 2,
          start: 5,
          len: 1,
          place: '025-109',
          start_time: '13:00',
          end_time: '13:50',
        },
      ],
      class_time_mask: [786432, 0, 786432, 0, 0, 0, 0],
      instructor: '김영득',
      quota: 50,
      remark: '초안지는 http://www.math.snu.ac.kr/board/portal 참조',
      category: '수량적 분석과 추론',
      course_number: 'L0442.000100',
      lecture_number: '018',
      created_at: '2019-02-16T15:34:39.188Z',
      updated_at: '2019-02-28T12:01:58.770Z',
      color: {},
      colorIndex: 1,
    },
    {
      _id: '5c94a003539b982ccabbdb5e',
      classification: '교양',
      department: '국어국문학과',
      academic_year: '1학년',
      course_title: '대학 글쓰기 1',
      credit: 2,
      class_time: '화(6-1.5)/목(6-1.5)',
      real_class_time: '화(14:00~15:15)/목(14:00~15:15)',
      class_time_json: [
        {
          _id: '5c9441c84a58e371b1b82313',
          day: 1,
          start: 6,
          len: 1.5,
          place: '001-210',
          start_time: '14:00',
          end_time: '15:15',
        },
        {
          _id: '5c9441c84a58e371b1b82312',
          day: 3,
          start: 6,
          len: 1.5,
          place: '001-210',
          start_time: '14:00',
          end_time: '15:15',
        },
      ],
      class_time_mask: [0, 229376, 0, 229376, 0, 0, 0],
      instructor: '김명운',
      quota: 25,
      remark: '®',
      category: '사고와 표현',
      course_number: 'L0440.000600',
      lecture_number: '065',
      created_at: '2019-03-22T08:42:43.061Z',
      updated_at: '2019-03-22T08:42:43.061Z',
      color: {},
      colorIndex: 7,
    },
    {
      _id: '5c94a044539b982ccabbdb6e',
      classification: '교양',
      department: '영어영문학과',
      academic_year: '1학년',
      course_title: '대학영어 1',
      credit: 2,
      class_time: '월(3-1.5)/수(3-1.5)/금(3-1)',
      real_class_time: '월(11:00~12:15)/수(11:00~12:15)/금(11:00~11:50)',
      class_time_json: [
        {
          _id: '5c9441c84a58e371b1b824fa',
          day: 0,
          start: 3,
          len: 1.5,
          place: '002-104-1',
          start_time: '11:00',
          end_time: '12:15',
        },
        {
          _id: '5c9441c84a58e371b1b824f9',
          day: 2,
          start: 3,
          len: 1.5,
          place: '002-104-1',
          start_time: '11:00',
          end_time: '12:15',
        },
        {
          _id: '5c9441c84a58e371b1b824f8',
          day: 4,
          start: 3,
          len: 1,
          place: '002-104-1',
          start_time: '11:00',
          end_time: '11:50',
        },
      ],
      class_time_mask: [14680064, 0, 14680064, 0, 12582912, 0, 0],
      instructor: '조희연',
      quota: 20,
      remark: 'ⓔ수강기준에 맞지않을시 F("TEPS 및 기초영어·대학영어1·대학영어2·고급영어 이수안내" 반드시 확인후 신청)',
      category: '외국어',
      course_number: '032.017',
      lecture_number: '011',
      created_at: '2019-03-22T08:43:48.724Z',
      updated_at: '2019-03-22T08:43:48.724Z',
      color: {},
      colorIndex: 3,
    },
    {
      _id: '5c94a04b539b982ccabbdb75',
      classification: '교양',
      department: '철학과',
      academic_year: '1학년',
      course_title: '논리와 비판적 사고',
      credit: 3,
      class_time: '금(6-3)',
      real_class_time: '금(14:00~16:50)',
      class_time_json: [
        {
          _id: '5c9441c84a58e371b1b823c4',
          day: 4,
          start: 6,
          len: 3,
          place: '006-105',
          start_time: '14:00',
          end_time: '16:50',
        },
      ],
      class_time_mask: [0, 0, 0, 0, 258048, 0, 0],
      instructor: '이주한',
      quota: 40,
      remark: '',
      category: '사고와 표현',
      course_number: '031.033',
      lecture_number: '001',
      created_at: '2019-03-22T08:43:55.745Z',
      updated_at: '2019-03-22T08:43:55.745Z',
      color: {},
      colorIndex: 5,
    },
    {
      _id: '5c94a059539b982ccabbdb79',
      classification: '교양',
      department: '수리과학부',
      academic_year: '1학년',
      course_title: '수학연습 1',
      credit: 1,
      class_time: '목(7.5-2)',
      real_class_time: '목(15:30~17:20)',
      class_time_json: [
        {
          _id: '5c9441c94a58e371b1b8283c',
          day: 3,
          start: 7.5,
          len: 2,
          place: '043-1-302',
          start_time: '15:30',
          end_time: '17:20',
        },
      ],
      class_time_mask: [0, 0, 0, 30720, 0, 0, 0],
      instructor: '박정필',
      quota: 25,
      remark: '초안지는 http://www.math.snu.ac.kr/board/portal 참조',
      category: '수량적 분석과 추론',
      course_number: 'L0442.000200',
      lecture_number: '053',
      created_at: '2019-03-22T08:44:09.707Z',
      updated_at: '2019-03-22T08:44:09.707Z',
      color: {},
      colorIndex: 2,
    },
    {
      _id: '5c94a0b4539b982ccabbdb83',
      classification: '교양',
      department: '통계학과',
      academic_year: '1학년',
      course_title: '통계학',
      credit: 3,
      class_time: '화(3-1.5)/목(3-1.5)',
      real_class_time: '화(11:00~12:15)/목(11:00~12:15)',
      class_time_json: [
        {
          _id: '5c9441c94a58e371b1b82914',
          day: 1,
          start: 3,
          len: 1.5,
          place: '028-101',
          start_time: '11:00',
          end_time: '12:15',
        },
        {
          _id: '5c9441c94a58e371b1b82913',
          day: 3,
          start: 3,
          len: 1.5,
          place: '028-101',
          start_time: '11:00',
          end_time: '12:15',
        },
      ],
      class_time_mask: [0, 14680064, 0, 14680064, 0, 0, 0],
      instructor: '정혜영',
      quota: 70,
      remark:
        '®공대 수강가능, 단, 건축학과생 수강불가 (수강신청 변경기간에는 통계학과생을 제외한 모든 학생 수강신청 가능)',
      category: '수량적 분석과 추론',
      course_number: '033.019',
      lecture_number: '007',
      created_at: '2019-03-22T08:45:40.140Z',
      updated_at: '2019-03-22T08:45:40.140Z',
      color: {},
      colorIndex: 6,
    },
    {
      _id: '5ce62274db261b554d559fad',
      course_title: '베이스 과외',
      credit: 0,
      real_class_time: '월(16:30~17:30)',
      class_time_json: [
        {
          _id: '5ce62274db261b554d559fae',
          day: 0,
          len: 1,
          place: '두레문예관',
          start: 8.5,
          start_time: '16:30',
          end_time: '17:30',
        },
      ],
      class_time_mask: [6144, 0, 0, 0, 0, 0, 0],
      instructor: '최성일',
      quota: 0,
      remark: '',
      created_at: '2019-05-23T04:32:52.411Z',
      updated_at: '2019-05-23T04:32:52.411Z',
      color: { bg: '#E0E0E0', fg: '#333333' },
      colorIndex: 0,
    },
    {
      _id: '5ce62299db261b554d559fb1',
      course_title: '베이스세미나',
      credit: 0,
      real_class_time: '월(18:00~19:00)',
      class_time_json: [
        {
          _id: '5ce622abdb261b554d559fb5',
          day: 0,
          len: 1,
          place: '36동합주실',
          start: 10,
          start_time: '18:00',
          end_time: '19:00',
        },
      ],
      class_time_mask: [768, 0, 0, 0, 0, 0, 0],
      instructor: '이성렬',
      quota: 0,
      remark: '',
      created_at: '2019-05-23T04:33:29.111Z',
      updated_at: '2019-05-23T04:33:47.888Z',
      color: { bg: '#E0E0E0', fg: '#333333' },
      colorIndex: 0,
    },
    {
      _id: '5ce622d1db261b554d559fbc',
      course_title: '가디언세미나',
      credit: 0,
      real_class_time: '목(18:30~20:00)',
      class_time_json: [
        {
          _id: '5ce622d1db261b554d559fbd',
          day: 3,
          len: 1.5,
          place: '301동203호',
          start: 10.5,
          start_time: '18:30',
          end_time: '20:00',
        },
      ],
      class_time_mask: [0, 0, 0, 448, 0, 0, 0],
      instructor: '이성찬',
      quota: 0,
      remark: '',
      created_at: '2019-05-23T04:34:25.870Z',
      updated_at: '2019-05-23T04:34:25.870Z',
      color: { bg: '#E0E0E0', fg: '#333333' },
      colorIndex: 0,
    },
  ],
  theme: 0,
  updated_at: '2022-04-06T06:18:11.260Z',
};

export const mockTimeTable789: FullTimetable = {
  _id: '789',
  user_id: '5c59377722ac5f0f310df48b',
  year: 2019,
  semester: 2,
  title: '도전',
  lecture_list: [
    {
      _id: '5cd24770db261b554d530d8a',
      classification: '교양',
      department: '물리·천문학부(물리학전공)',
      academic_year: '1학년',
      course_title: '물리학실험',
      credit: 1,
      class_time: '',
      real_class_time: '수(13:00~14:50)',
      class_time_json: [
        {
          _id: '5d136a2edb261b554d57ea33',
          day: 2,
          len: 2,
          place: '',
          start: 5,
          start_time: '13:00',
          end_time: '14:50',
        },
      ],
      class_time_mask: [0, 0, 983040, 0, 0, 0, 0],
      instructor: '김선기',
      quota: 0,
      remark: '실험강좌 편성은 마이스누 학생공지 게시판 참고',
      category: '과학적 사고와 실험',
      course_number: '034.009',
      lecture_number: '001',
      created_at: '2019-05-08T03:05:20.743Z',
      updated_at: '2019-06-26T12:50:54.147Z',
      color: {},
      colorIndex: 6,
    },
    {
      _id: '5d0ca53fdb261b554d576640',
      classification: '교양',
      department: '생명과학부',
      academic_year: '1학년',
      course_title: '생물학 2',
      credit: 3,
      class_time: '월(7-3)/수(7-3)/금(7-3)',
      real_class_time: '월(15:00~17:50)/수(15:00~17:50)/금(15:00~17:50)',
      class_time_json: [
        {
          _id: '5d0ca6dcdb261b554d576662',
          day: 0,
          len: 3,
          place: '024-101',
          start: 7,
          start_time: '15:00',
          end_time: '17:50',
        },
        {
          _id: '5d0ca6dcdb261b554d576661',
          day: 2,
          len: 3,
          place: '024-101',
          start: 7,
          start_time: '15:00',
          end_time: '17:50',
        },
        {
          _id: '5d0ca6dcdb261b554d576660',
          day: 4,
          len: 3,
          place: '024-101',
          start: 7,
          start_time: '15:00',
          end_time: '17:50',
        },
      ],
      class_time_mask: [64512, 0, 64512, 0, 64512, 0, 0],
      instructor: '조대식',
      quota: 0,
      remark: '®생명과학부 주전공 및 복수전공 수강 불가',
      category: '과학적 사고와 실험',
      course_number: '034.028',
      lecture_number: '001',
      created_at: '2019-06-21T09:37:03.544Z',
      updated_at: '2019-06-21T09:43:56.678Z',
      color: {},
      colorIndex: 8,
    },
    {
      _id: '5d0ca606db261b554d57664e',
      course_title: '단풍 여합',
      credit: 0,
      real_class_time: '화(18:00~21:00)/금(18:00~21:00)',
      class_time_json: [
        {
          _id: '5d0ca606db261b554d576650',
          day: 1,
          len: 3,
          place: '',
          start: 10,
          start_time: '18:00',
          end_time: '21:00',
        },
        {
          _id: '5d0ca606db261b554d57664f',
          day: 4,
          len: 3,
          place: '',
          start: 10,
          start_time: '18:00',
          end_time: '21:00',
        },
      ],
      class_time_mask: [0, 1008, 0, 0, 1008, 0, 0],
      instructor: '',
      quota: 0,
      remark: '',
      created_at: '2019-06-21T09:40:22.596Z',
      updated_at: '2019-06-21T09:40:22.596Z',
      color: {},
      colorIndex: 4,
    },
    {
      _id: '5d0ca653db261b554d576652',
      course_title: '프로네시스',
      credit: 0,
      real_class_time: '수(19:00~21:00)',
      class_time_json: [
        {
          _id: '5d141e9fdb261b554d57f245',
          day: 2,
          len: 2,
          place: '',
          start: 11,
          start_time: '19:00',
          end_time: '21:00',
        },
      ],
      class_time_mask: [0, 0, 240, 0, 0, 0, 0],
      instructor: '',
      quota: 0,
      remark: '',
      created_at: '2019-06-21T09:41:39.005Z',
      updated_at: '2019-06-27T01:40:47.631Z',
      color: {},
      colorIndex: 3,
    },
    {
      _id: '5d0ca722db261b554d576663',
      course_title: '헬스',
      credit: 0,
      real_class_time:
        '월(8:30~9:30)/화(8:30~9:30)/수(8:30~9:30)/목(8:30~9:30)/금(8:30~9:30)/토(8:30~9:30)/일(8:30~9:30)',
      class_time_json: [
        {
          _id: '5d0ca77adb261b554d576673',
          day: 0,
          len: 1,
          place: '',
          start: 0.5,
          start_time: '8:30',
          end_time: '9:30',
        },
        {
          _id: '5d0ca77adb261b554d576672',
          day: 1,
          len: 1,
          place: '',
          start: 0.5,
          start_time: '8:30',
          end_time: '9:30',
        },
        {
          _id: '5d0ca77adb261b554d576671',
          day: 2,
          len: 1,
          place: '',
          start: 0.5,
          start_time: '8:30',
          end_time: '9:30',
        },
        {
          _id: '5d0ca77adb261b554d576670',
          day: 3,
          len: 1,
          place: '',
          start: 0.5,
          start_time: '8:30',
          end_time: '9:30',
        },
        {
          _id: '5d0ca77adb261b554d57666f',
          day: 4,
          len: 1,
          place: '',
          start: 0.5,
          start_time: '8:30',
          end_time: '9:30',
        },
        {
          _id: '5d0ca77adb261b554d57666e',
          day: 5,
          len: 1,
          place: '',
          start: 0.5,
          start_time: '8:30',
          end_time: '9:30',
        },
        {
          _id: '5d0ca77adb261b554d57666d',
          day: 6,
          len: 1,
          place: '',
          start: 0.5,
          start_time: '8:30',
          end_time: '9:30',
        },
      ],
      class_time_mask: [402653184, 402653184, 402653184, 402653184, 402653184, 402653184, 402653184],
      instructor: '',
      quota: 0,
      remark: '',
      created_at: '2019-06-21T09:45:06.749Z',
      updated_at: '2019-06-21T09:46:34.482Z',
      color: { bg: '#E07A3D', fg: '#333333' },
      colorIndex: 0,
    },
    {
      _id: '5d141e75db261b554d57f23b',
      course_title: '골든벨 회의',
      credit: 0,
      real_class_time: '목(15:00~17:00)',
      class_time_json: [
        {
          _id: '5d2ef74f76b85419827190f5',
          day: 3,
          len: 2,
          place: '',
          start: 7,
          start_time: '15:00',
          end_time: '17:00',
        },
      ],
      class_time_mask: [0, 0, 0, 61440, 0, 0, 0],
      instructor: '',
      quota: 0,
      remark: '',
      created_at: '2019-06-27T01:40:05.386Z',
      updated_at: '2019-07-17T10:24:15.754Z',
      color: {},
      colorIndex: 3,
    },
    {
      _id: '5d14bd96db261b554d5814ed',
      course_title: '면접 회의',
      credit: 0,
      real_class_time: '목(10:00~12:00)',
      class_time_json: [
        {
          _id: '5d2ef76576b8541982719111',
          day: 3,
          len: 2,
          place: '',
          start: 2,
          start_time: '10:00',
          end_time: '12:00',
        },
      ],
      class_time_mask: [0, 0, 0, 62914560, 0, 0, 0],
      instructor: '',
      quota: 0,
      remark: '',
      created_at: '2019-06-27T12:59:02.024Z',
      updated_at: '2019-07-17T10:24:37.007Z',
      color: {},
      colorIndex: 3,
    },
    {
      _id: '5d14bdd0db261b554d5814f7',
      course_title: '수학 회의',
      credit: 0,
      real_class_time: '금(12:00~14:00)',
      class_time_json: [
        {
          _id: '5d14bdd0db261b554d5814f8',
          day: 4,
          len: 2,
          place: '',
          start: 4,
          start_time: '12:00',
          end_time: '14:00',
        },
      ],
      class_time_mask: [0, 0, 0, 0, 3932160, 0, 0],
      instructor: '',
      quota: 0,
      remark: '',
      created_at: '2019-06-27T13:00:00.061Z',
      updated_at: '2019-06-27T13:00:00.061Z',
      color: {},
      colorIndex: 3,
    },
  ],
  theme: 0,
  updated_at: '2019-07-17T10:25:50.990Z',
};

export const mockTimeTable101112: FullTimetable = {
  _id: '101112',
  user_id: '5c59377722ac5f0f310df48b',
  year: 3001,
  semester: 4,
  title: '나무꾼의 시간표',
  lecture_list: [],
  theme: 0,
  updated_at: '2019-07-17T10:25:50.990Z',
};

export const mockTimeTable: FullTimetable = {
  _id: '627f3d8881ce530016abb399',
  user_id: '5c59377722ac5f0f310df48b',
  year: 2022,
  semester: 2,
  title: '나의 시간표',
  lecture_list: [
    {
      _id: '633ae5ba817bbc0010601783',
      classification: '전선',
      department: '혁신공유학부',
      academic_year: '1학년',
      course_title: '(공유)AI입문',
      credit: 3,
      class_time: '월(4-3)/수(4-3)/금(4-3)',
      real_class_time: '월(12:00~14:50)/수(12:00~14:50)/금(12:00~14:50)',
      class_time_json: [
        {
          _id: '627e4849082b910095f76ece',
          day: 0,
          start: 4,
          len: 3,
          place: '301-207',
          start_time: '12:00',
          end_time: '14:50',
        },
        {
          _id: '627e4849082b910095f76ecd',
          day: 2,
          start: 4,
          len: 3,
          place: '301-207',
          start_time: '12:00',
          end_time: '14:50',
        },
        {
          _id: '627e4849082b910095f76ecc',
          day: 4,
          start: 4,
          len: 3,
          place: '301-207',
          start_time: '12:00',
          end_time: '14:50',
        },
      ],
      class_time_mask: [4128768, 0, 4128768, 0, 4128768, 0, 0],
      instructor: '김남준',
      quota: 70,
      remark: '40 (40)',
      category: '',
      course_number: 'M3500.000200',
      lecture_number: '001',
      created_at: '2022-10-03T13:38:02.441Z',
      updated_at: '2022-10-03T13:38:02.441Z',
      color: {},
      colorIndex: 2,
    },
  ],
  theme: 0,
  updated_at: '2022-10-03T13:38:02.449Z',
};
