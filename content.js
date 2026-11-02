// 공개할 콘텐츠만 입력하세요. 이 파일 전체가 방문자에게 전달됩니다.
// 한국어는 ko, 영어는 en 영역에서 수정합니다.
const portfolioAwards = [
  {
    category: 'internal',
    period: { ko: '2026-1학기', en: 'Spring 2026' },
    title: {
      ko: 'AI·SW기초 교과목 포트폴리오 경진대회',
      en: 'AI & SW Fundamentals Course Portfolio Competition',
    },
    prize: { ko: '대상', en: 'Grand Prize' },
  },
];

const portfolioCertificates = [
  {
    name: { ko: 'GTQ 그래픽기술자격', en: 'Graphic Technology Qualification (GTQ)' },
    grade: { ko: '1급', en: 'Level 1' },
    issuer: { ko: '한국생산성본부', en: 'Korea Productivity Center' },
    acquired: '2024-01-12',
    expires: '2029-01-12',
    documents: [
      {
        label: { ko: '취득 내역서', en: 'Certificate record (Korean)' },
        path: 'assets/certificates/gtq-level1.pdf',
      },
    ],
  },
  {
    name: {
      ko: 'ITQ 정보기술자격 · 아래한글',
      en: 'Information Technology Qualification · Hangul',
    },
    grade: { ko: 'A등급', en: 'Grade A' },
    issuer: { ko: '한국생산성본부', en: 'Korea Productivity Center' },
    acquired: '2023-07-27',
    expires: '2028-07-27',
    documents: [
      {
        label: { ko: '취득 내역서', en: 'Certificate record (Korean)' },
        path: 'assets/certificates/itq-hangul-a.pdf',
      },
    ],
  },
  {
    name: { ko: '컴퓨터그래픽스운용기능사', en: 'Craftsman Computer Graphic' },
    grade: { ko: '기능사', en: 'Craftsman' },
    issuer: { ko: '한국산업인력공단', en: 'Human Resources Development Service of Korea' },
    acquired: '2025-07-25',
    expires: null,
    documents: [
      {
        label: { ko: '취득 확인서 · 한글', en: 'Certificate · Korean' },
        path: 'assets/certificates/computer-graphics-ko.pdf',
      },
      {
        label: { ko: '취득 확인서 · 영어', en: 'Certificate · English' },
        path: 'assets/certificates/computer-graphics-en.pdf',
      },
    ],
  },
];

const portfolioContent = {
  ko: {
    nav: ['홈', '활동', '자격증', '프로필'],
    name: '이하람',
    student: '대학생 · Undergraduate student',
    school: '청주대학교 재학 · 자유전공학부',
    intro: '활동과 학습, 자격을 정리한 개인 포트폴리오입니다.',
    email: 'haramlee.helen@gmail.com',
    contactNote: '',
    draft: 'portfolio',
    activities: '활동 · 프로젝트 · 대외활동',
    credentials: '자격증 · 수상 · 교육 이수',
    profile: '간단한 소개와 공개 프로필',
    date: '기간 입력',
    categories: ['자격증', '수상', '교육 이수'],
    credentialDates: ['취득일 입력', '수상일 입력', '이수일 입력'],
    notFound: '페이지를 찾을 수 없습니다',
    notFoundDescription: '주소를 확인하거나 홈으로 돌아가 주세요.',
    backHome: '홈으로 돌아가기',
    items: [
      {
        title: '2026 충청지부 정보보호 학술대회 (KIISCCC)',
        date: '2026.09.22',
        role: '포스터 세션 발표',
        description: '논문 포스터 제작 및 포스터 세션 발표. 논문 「K-PQC 디코더의 정규 인코딩 검증 및 별칭 취약점 분석」 · 제2저자',
      },
      {
        title: '2026 해킹 캠프',
        date: '2026.09.05 – 09.06',
        role: '스태프',
        description: '학생 인솔·관리·지원, 발표 자료(PPT) 및 수료증 제작',
      },
      {
        title: '2026 Summer School Austria',
        date: '2026.07.06 – 07.10',
        role: '참가 및 수료',
        description: '오스트리아 St. Pölten의 University of Applied Sciences St. Pölten에서 International Summer School on Cyber Security and Resilience 과정을 수료했습니다.',
      },
    ],
    certs: [
      ['자격증명을 입력하세요', '발급 기관 · 자격 구분 · 필요한 공개 정보만 표시합니다.'],
      ['수상 내역을 입력하세요', '주관 기관 · 수상 내용'],
      ['교육 이수 내역', '교육 기관 · 과정명 · 학습 내용'],
    ],
    labels: ['이름', '학력', '2026년', '2027년 예정', '이메일'],
    values: [
      '이하람',
      '청주대학교 재학',
      '자유전공학부',
      'AI·SW융합대학 디지털 보안 학과',
      'haramlee.helen@gmail.com',
    ],
  },
  en: {
    nav: ['Home', 'Activities', 'Credentials', 'Profile'],
    name: 'Haram Lee · Helen Lee',
    student: 'Undergraduate student',
    school: 'Cheongju University · Division of Liberal Studies',
    intro: 'A personal portfolio of activities, learning, and qualifications.',
    email: 'haramlee.helen@gmail.com',
    contactNote: '',
    draft: 'Layout draft · All records are placeholders',
    activities: 'Activities · Projects · Engagement',
    credentials: 'Certifications · Awards · Education',
    profile: 'A brief introduction and public profile',
    date: 'Add period',
    categories: ['Certifications', 'Awards', 'Education'],
    credentialDates: ['Add issue date', 'Add award date', 'Add completion date'],
    notFound: 'Page not found',
    notFoundDescription: 'Please check the address or return to the home page.',
    backHome: 'Back to home',
    items: [
      {
        title: '2026 Chungcheong Chapter Information Security Conference (KIISCCC)',
        date: '2026.09.22',
        role: 'Poster presenter',
        description: 'Prepared a research poster and presented at the poster session. Paper: “K-PQC 디코더의 정규 인코딩 검증 및 별칭 취약점 분석” · Second author.',
      },
      {
        title: '2026 Hacking Camp',
        date: '2026.09.05 – 09.06',
        role: 'Staff',
        description: 'Supervised and supported students; created presentation slides and completion certificates.',
      },
      {
        title: '2026 Summer School Austria',
        date: '2026.07.06 – 07.10',
        role: 'Participant · Completed',
        description: 'Completed the International Summer School on Cyber Security and Resilience at the University of Applied Sciences St. Pölten in Austria.',
      },
    ],
    certs: [
      ['Add a certification', 'Issuer · qualification · selected public information.'],
      ['Add an award', 'Awarding organization · award details.'],
      ['Add a course', 'Institution · course title · learning outcomes.'],
    ],
    labels: ['Name', 'Education', '2026', '2027 (planned)', 'Email'],
    values: [
      'Haram Lee · Helen Lee',
      'Cheongju University · Currently enrolled',
      'Division of Liberal Studies',
      'Department of Digital Security, College of AI & SW Convergence',
      'haramlee.helen@gmail.com',
    ],
  },
};
