# ReactNative/Expo/Firebase

ReactNative Boilerplate:

 * redux
 * react-navigation
 * firebase Authentication(email, facebook, google)

### 소개
    expo, firebase 인증과 redux를 통한 애플리케이션의 기본틀을 쉽게 이해하고
    로그인 인증 구축의 시간을 줄이고 빠르게 앱을 제작가능하도록 만드는 것이 목표입니다.
    사용하기 전에 redux, react-navigation, firebase에 대한 기초적인 학습이 필요합니다.

## Set Up
 ```
 npm install
 ```

 ### Firebase 설정
 ---

 ##### Firebase Project 생성 후 Authentication > 웹 설정

 ~/App.js 20:3
 ```javascript
// Add user firebase project config
  const config: Object = {
    apiKey: '<your_firebase_apiKey>',
    authDomain: '<your_firebase_authDomain>',
    databaseURL: '<your_firebase_databaseURL>',
    projectId: '<your_firebase_projectId>',
    storageBucket: '<your_firebase_storageBucket>',
    messagingSenderId: '<your_firebase_messagingSenderId>'
  };

  firebase.initializeApp(config);
```

##### 파이어베이스 인증 로그인 방법 체크해주세요!

- 이메일/비밀번호
- Google
- Facebook

### 페이스북 로그인 설정하기
---
[Expo facebook Docs 참고](https://docs.expo.io/versions/v19.0.0/sdk/facebook.html)

  #### 1. [facebook for developers](https://developers.facebook.com) 페이스북 디벨로퍼 등록
  #### 2. 새 앱 ID 만들기

  #### 3. [facebookScheme 찾기](https://developers.facebook.com/docs/facebook-login/ios)
  ![Image of Facebook](https://firebasestorage.googleapis.com/v0/b/rnexpoboilerplate.appspot.com/o/facebook_id.png?alt=media&token=993d2523-5a9b-462f-9388-452ff1cf1204)

  ![Image of Facebook](https://firebasestorage.googleapis.com/v0/b/rnexpoboilerplate.appspot.com/o/facebook_fbID.png?alt=media&token=7933bd6d-ab99-4478-b620-02ee2627da5f)

  #### 4. ~/App.json에 fbScheme 추가
  ```javascript
  {
    "expo": {
      "name": "RNExpoBoilerplate",
      "icon": "./app-icon.png",
      "version": "1.0.0",
      "sdkVersion": "19.0.0",
      "facebookScheme": "<your_FB12412321313>",
      "ios": {
        "bundleIdentifier": "com.yourcompany.yourappname"
      },
      "android": {
        "package": "com.yourcompany.yourappname"
      }
    }
  }

  ```

   #### 5. Firebase Authentication FaceBook 설정
   페이스북 앱 ID, 앱 시크릿 코드 등록 후 저장

   ![Image of Facebook](https://firebasestorage.googleapis.com/v0/b/rnexpoboilerplate.appspot.com/o/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202017-07-26%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%206.24.24.png?alt=media&token=83e672f2-5685-4b74-ac21-d9bb23028c52)

   페이스북 앱 관리 > 제품 > Facebook 로그인 > 설정  
   OAuth 리디렉션 URI 추가

   ![Image of Facebook](https://firebasestorage.googleapis.com/v0/b/rnexpoboilerplate.appspot.com/o/Oauth.png?alt=media&token=3481d202-d8cb-45fc-b885-c4f9a1756e18)

   #### 6. 페이스북 앱 관리 > 플랫폼 추가 > ios, android
   ![Image of Facebook](https://firebasestorage.googleapis.com/v0/b/rnexpoboilerplate.appspot.com/o/facebook_ios.png?alt=media&token=310721d3-990a-44cc-8567-d00e460210c2)
   ![Image of Facebook](https://firebasestorage.googleapis.com/v0/b/rnexpoboilerplate.appspot.com/o/facebook_android.png?alt=media&token=a9e8202b-980b-4df3-ab75-de769e14bdfb)

   ```
   안드로이드 키 해시는 오류 디버깅을 통해서 얻을 수 있습니다.
   ```

   ![Image of Facebook](https://firebasestorage.googleapis.com/v0/b/rnexpoboilerplate.appspot.com/o/android_key_hash.png?alt=media&token=48103159-bec4-427f-8ce9-a06c975217f2)

   #### 6. 페이스북 앱 아이디 입력
 ~/src/login/config.js 11:1
 ```javascript
 const FACEBOOK_APP_ID = 'YOUR_FACEBOOK_APPID';
 ```

### 구글 로그인 설정하기
---
[Expo Google Docs 참고](https://docs.expo.io/versions/v19.0.0/sdk/google.html)

   #### 1. Google Developer Console 설정하기
   https://console.developers.google.com/apis/credentials  
   프로젝트 선택 -> 사용할 Firebase Project 선택

   ![Image of Google](https://firebasestorage.googleapis.com/v0/b/rnexpoboilerplate.appspot.com/o/create_OAuth.png?alt=media&token=c560912c-c109-4724-901c-3cb20a91ce22)

   iOS 클라이언트 ID 추가


   ![Image of Google](https://firebasestorage.googleapis.com/v0/b/rnexpoboilerplate.appspot.com/o/ios_id_add.png?alt=media&token=e564b783-7585-46e2-9c21-6a4cdbadc7a3)

   Android 클라이언트 ID 추가  
   터미널에서 `openssl rand -base64  32 | openssl sha1 -c` 입력 -> 해쉬 키 복사 후 서명 인증서 지문에 붙여넣기합니다.

   ![Image of Google](https://firebasestorage.googleapis.com/v0/b/rnexpoboilerplate.appspot.com/o/bash_openssl.png?alt=media&token=fd14446a-56f1-4de0-b4b7-6839763fe46f)
   ![Image of Google](https://firebasestorage.googleapis.com/v0/b/rnexpoboilerplate.appspot.com/o/android_id_add.png?alt=media&token=bf2345fe-9a18-4332-8928-8c6d94271acf)

   #### 2. 클라이언트 아이디 입력
 ~/src/login/config.js 14:1
 ```javascript
 const ANDROID_CLIENT_ID = 'YOUR_ANDROID_CLIENTID';  
 const IOS_CLIENT_ID = 'YOUR_IOS_CLIENTID';
 ```
