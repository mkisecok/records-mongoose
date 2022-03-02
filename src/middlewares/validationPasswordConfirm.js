
const passwordConfirm = (value, { req }) =>
{
    if(value !== req.body.password )
    {
        throw new Error('Confirmpassword is not equal with your password');

    }
    return true;
};

module.exports = passwordConfirm;
