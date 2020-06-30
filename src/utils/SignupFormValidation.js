export const validateForm = (fields) => {
    let errors = {};
    let isFormValid = true;

    if (!fields["firstname"]) {
        isFormValid = false;
        errors["firstname"] = "*Please enter your firstname.";
    }

    if (typeof fields["firstname"] !== undefined) {
        if (!fields["firstname"].match(/^[a-zA-Z ]*$/)) {
            isFormValid = false;
            errors["firstname"] = "*Please enter alphabet characters only.";
        }
    }


    if (!fields["lastname"]) {
        isFormValid = false;
        errors["lastname"] = "*Please enter your lastname.";
    }

    if (typeof fields["lastname"] !== undefined) {
        if (!fields["lastname"].match(/^[a-zA-Z ]*$/)) {
            isFormValid = false;
            errors["lastname"] = "*Please enter alphabet characters only.";
        }
    }

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

    // if (!fields["mobileno"]) {
    //     isFormValid = false;
    //     errors["mobileno"] = "*Please enter your mobile no.";
    // }
    // if (typeof fields["mobileno"] !== undefined) {
    //     if (!fields["mobileno"].match(/^[0-9]{10}$/)) {
    //         isFormValid = false;
    //         errors["mobileno"] = "*Please enter valid mobile no.";
    //     }
    // }

    if (!fields["password"]) {
        isFormValid = false;
        errors["password"] = "*Please enter your password.";
    }
    if (typeof fields["password"] !== undefined) {
        //match(/^.*(?=.{6,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)
        if (!(fields["password"].length > 5)) {
            isFormValid = false;
            errors["password"] = "*Password must be at least 6 characters.";
        }
    }

    if (!fields["cpassword"]) {
        isFormValid = false;
        errors["cpassword"] = "*Please enter your confirm password.";
    }
    // if (typeof fields["cpassword"] !== undefined) {
    //     if (!fields["cpassword"].match(/^.*(?=.{6,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
    //         isFormValid = false;
    //         errors["cpassword"] = "*Please enter secure and strong confirm password.";
    //     }
    // }

    if (fields['password'] !== fields['cpassword'] && fields['cpassword'].length > 0) {
        isFormValid = false;
        errors['cpassword'] = "Password doesn't match";
    }

    return { isFormValid, errors };
}