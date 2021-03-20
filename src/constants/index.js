let url;

//개발 운영 api 주소 분기
if (process.env.NODE_ENV === 'production') {
    url = 'https://dalgonatest3.cafe24.com';
} else {
    url = 'https://dalgonabackend.com';
}

export const API_BASE_URL = url;
