export const handleValidationError = (formik, data) => {
    if('errors' in data){
        for(let k in data.errors){
            console.log(data)
            formik.setFieldError(k, data.errors[k])
        }
    }
}