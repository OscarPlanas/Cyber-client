import { environment } from "src/environments/environment";

const navOptions = [
    /*{
        name: 'Home',
        path: '/',
        icon: '../assets/home.png',
        exact: true,
		auth: true
    },*/
    {
        name: 'Encrypt/Decrypt',
        path: '/',
        icon: '../assets/encrypt.png',
        exact: true,
        auth: true,
    },
    {
        name: 'Sign/Verify',
        path: '/sign-verify',
        icon: '../assets/sign.png',
        exact: true,
        auth: true,
    }
    /*{
        name: 'Create Event',
        path: '/create-event',
        icon: '../assets/EventArrow.png',
        exact: true,
    }*/
];

export default navOptions;