let url;

//개발 운영 api 주소 분기
if (process.env.NODE_ENV === 'production') {
    url = 'https://dalgonatest3.cafe24.com';
} else {
    url = 'http://dalgona-test-aqact.run.goorm.io';
}

export const API_BASE_URL = url;
