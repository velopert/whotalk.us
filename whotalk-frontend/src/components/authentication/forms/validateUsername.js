import auth from 'services/auth';
const validateUsername = values => {
    auth.checkUsername(values.username)
    .then((response) => {
        console.log(response);
    });
};

export default validateUsername;