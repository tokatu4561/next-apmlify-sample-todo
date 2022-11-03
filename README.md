amplifyを使ってみるだけ

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy 
```bash
$ amplify init
Note: It is recommended to run this command from the root of your app directory
? Enter a name for the project nextsampleapp
? Initialize the project with the above configuration? No <- おすすめのままではだめ
? Enter a name for the environment dev
? Choose your default editor: Visual Studio Code
? Choose the type of app that you're building javascript
Please tell us about your project
? What javascript framework are you using react
? Source Directory Path:  src
? Distribution Directory Path: .next  // <- 重要
? Build Command:  npm run-script build
? Start Command: npm run-script start
Using default provider  awscloudformation
? Select the authentication method you want to use: AWS profile // <- 自身の環境に合わせて調整
```