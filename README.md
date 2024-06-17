# BLANKCIL - THE PODCAST SOCIAL MEDIA PLATFORM
You can view backend project or mobile project by below link!
### [Backend Project](https://github.com/K0l4s/blankcilapi)
### [Mobile Project](https://github.com/K0l4s/blankcil_android)

## CONTENT
1. [Short Description](#description)
2. [Team Member](#teammember)
3. [Product Features](#productfeatures)

   3.1. [Security](#springsecu)
   
     3.1.1. [JWT Token](#jwt)
   
     3.1.2. [Email Vertify](#emailauth)
   
   
## Short description <a name="description"></a>
Blankcil is created and developed by a student team from Ho Chi Minh City University of Technology and Education. It's a basic social media platform but focuses on podcast content.
## Team member <a name="teammember"></a>
| STT | Fullname                | STUDENT ID | Username        | Status   |
|-----|--------------------------|-----------------|-----------------|--------------|
| 1   | HUỲNH TRUNG KIÊN         | 21110223        | [K0l4s](https://github.com/K0l4s)          | Developing   |
| 2   | NGÔ MINH THUẬN           | 21110314        | [nauht1](https://github.com/nauht1)          | Developing   |
| 3   | NGUYỄN HOÀNG PHƯƠNG NGÂN | 21110254        | [PhuongNgan2304](https://github.com/nauht1)  | Stopped      |
| 4   | NGUYỄN THẾ THÀNH         | 21110300        | [thanhnt932](https://github.com/thanhnt932)      | Stopped      |

Initially, the project was developed by four contributors and submitted for the 'Object-Oriented Software Technology' subject. However, the team split into two groups. The project is now being developed by HUỲNH TRUNG KIÊN and NGÔ MINH THUẬN and will be submitted for the 'Graduation Thesis Project'.
## Product Features <a name="productfeatures"></a>
### 1. Security <a name="authen"></a>
With authentication and authorization, we use Spring Security to protect the project with JWT Token. To verify real users, we utilize email to send a pin number. Users are required to input this pin, obtained from the email, into the Verification Page in order to use our website.
#### 1.1. Spring Security <a name="springsecu"></a>
![Spring Security Explain](https://i0.wp.com/s3.ap-southeast-1.amazonaws.com/techover.storage/wp-content/uploads/2023/01/02215334/Bie%CC%82%CC%89u-do%CC%82%CC%80-kho%CC%82ng-co%CC%81-tie%CC%82u-de%CC%82%CC%80.drawio-4.png?resize=764%2C358&ssl=1)
#### 1.2. JWT Token <a name="jwt"></a>
![JWT Token Usecase](https://www.vaadata.com/blog/wp-content/uploads/2016/12/JWT_tokens_EN.png)
#### 1.3. Email Vertify <a name="emailauth"></a>
We use email to verify users when they complete the registration process. The server will send an email notification to verify the user. This email will include a 6-digit PIN.

The format of the EMAIL:

![Image](https://github.com/K0l4s/blankcilUI/assets/87256083/e60b70f1-d418-48d5-b7ca-05fbb80f5324)

The Vetify Page:

![image](https://github.com/K0l4s/blankcilUI/assets/87256083/df94dbc2-6146-4494-9079-8d444e2d2b5e)

### 2. Podcast action <a name="podcastact"></a>

#### 2.1. Create Podcast <a name="createpod"></a>

#### 2.2. View podcast <a name="viewpod"></a>

#### 2.3. Reaction <a name="react"></a>

### 3. User Action <a name="uacti"></a>

### 4. Management System (Inprogress) <a name="management"></a>
