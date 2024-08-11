import { Form } from "react-bootstrap"

export const InputField = ({formik, name, label, type = 'text', as}) => {
    return <div className="mb-3">
        <Form.Label htmlFor={name}>{label}</Form.Label>
        <Form.Control 
            type={type}
            as={as}
            name={name}
            id={name} 
            value={type != 'password' ? formik.values[name] : undefined} 
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur} 
            isInvalid={formik.touched[name] && formik.errors[name]}
            isValid={formik.values[name] && !formik.errors[name]}
            required 
        />
        {formik.touched[name] && formik.errors[name] && <Form.Control.Feedback type="invalid">
            {formik.errors[name]}
        </Form.Control.Feedback> }
    </div>
}