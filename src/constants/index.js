let url;

//  개발 운영 api 주소 분기
if (process.env.NODE_ENV === 'production') {
  url = 'https://dalgonabackend.shop';
} else {
  url = 'https://dalgonabackend.shop';
}

export const BOARD_DIVISION = {
  0: 'dalgona',
  1: 'free',
  2: 'luna',
};

export const API_BASE_URL = url;

export const termsCommunity = `엔터테인먼트 커뮤니티 DALGONA 이용약관`;

export const termsPrivate = `엔터테인먼트 커뮤니티 DALGONA (dalgona.me) 개인정보처리방침`;
