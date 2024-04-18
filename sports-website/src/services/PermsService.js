import AuthService from '@/services/AuthService';

export default {
    getUserPerms() {
        let token;
        try {
            token = localStorage.getItem('token')
            token = AuthService.decodeToken(token)
            console.log(token);
            return token.permissions
        } catch (error) {
            token = { permissions: 0 }
            return token.permissions
        }   
    }
}