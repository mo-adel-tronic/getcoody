export class ApiRouteName {
    static user : string = '/users'
}

export class RoutesName {
    /********************* AnyOne ********************** */
    static home : string = '/';
    static instructions : string = '/instructions';
    static targets : string = '/targets';
    static useful : string = '/useful-links';
    static login : string = '/login';


    static classroom : string = '/classroom';
    static profile : string = '/profile';
    static editProfile : string = '/editprofile';
    static community : string = '/community';
    static preExam : string = '/pre1';
    static preServey : string = '/pre2';
    static course1 : string = '/courses/1';
    static course2 : string = '/courses/2';
    static course3 : string = '/courses/3';
    static course4 : string = '/courses/4';
    static course5 : string = '/courses/5';

    // ************* Lessons Course 1 ****************
    static c1Lesson1 : string = RoutesName.course1 + '/lessons/1'
    static c1Lesson2 : string = RoutesName.course1 + '/lessons/2'
    static c1Lesson3 : string = RoutesName.course1 + '/lessons/3'
    static c1Lesson4 : string = RoutesName.course1 + '/lessons/4'
}

export class ImageSrc {
    /********************* PNG ********************** */
    static logo : string = '/images/png/logo.png'
    static logoLG : string = '/images/png/logo-lg.png'

    /********************* Json ********************** */
    static lottieHeader : string = "images/lottie/header.json"
    static lottieAbout : string = "images/lottie/about.json"

    /********************* SVG ********************** */
    static svgService : string = "images/svg/service.svg"
    static svgPattern : string = "images/svg/pattern.svg"
    static blogPost1 : string = 'images/svg/blog/1.svg'
    static blogPost2 : string = 'images/svg/blog/2.svg'
    static blogPost3 : string = 'images/svg/blog/3.svg'

    /********************* JPG ********************** */
    static researcher : string = "/images/jpg/researcher.jpg"

    /********************* WEBP ********************** */
    static teacher1 : string = "/images/webp/1.webp"
    static teacher2 : string = "/images/webp/2.webp"
    static teacher3 : string = "/images/webp/3.webp"


    static courseBg1 : string = '/webp/courses/1.webp'
    static courseBg2 : string = '/webp/courses/2.webp'
    static courseBg3 : string = '/webp/courses/3.webp'
    static courseBg4 : string = '/webp/courses/4.webp'
}