# madcamp_week2_server

![tmt_logo](https://github.com/sgn08050/madcamp_week2/assets/104704651/c931e895-8120-42b7-9845-4c360eaf8362)

# 티모태
친구들과 함께 경쟁하며 돈을 절약할 수 있는 자산 관리 어플

## 

## A. 데이터베이스

![image](https://github.com/sgn08050/madcamp_week2_server/assets/70854569/aca613cd-47d9-4ec5-a606-cc93b3f4e5be)
(출처 : dbdiagram)

- 앱 사용자, 형성된 그룹을 주요 골조로 하여 데이터베이스를 구축, PRIMARY KEY와 FOREIGN KEY를 활용하여 데이터베이스를 구축했습니다.
- 랜덤 키(uuid.v4)를 이용하여 각 멤버를 관리합니다.
- 카카오톡 로그인 및 일반 앱 로그인은 고유 키를 이용하여 구분합니다.

## B. 서버 정보

- 서버 정보 : kcloud VM을 ssh tunneling을 이용하여 사용
- 배포 : kcloudvpn에 접속한 client로부터 80번 포트(http)를 이용하여 소통
