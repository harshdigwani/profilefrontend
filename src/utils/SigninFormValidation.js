export const validateForm = (fields) => {
    let errors = {};
    let isFormValid = true;

    if (!fields["email"]) {
        isFormValid = false;
        errors["email"] = "*Please enter your email id";
    }
    if (typeof fields["email"] !== undefined) {
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(fields["email"])) {
            isFormValid = false;
            errors["email"] = "*Please enter valid email id";
        }
    }

    if (!fields["password"]) {
        isFormValid = false;
        errors["password"] = "*Please enter your password.";
    }

    return { isFormValid, errors };

}