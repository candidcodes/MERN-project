import { InputField, SubmitBtn } from "@/components"
import http from "@/http"
import { handleValidationError } from "@/lib"
import { useFormik } from "formik"
import { Col, Container, Form, Row } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import * as Yup from 'yup'
import YupPassword from 'yup-password'

YupPassword(Yup)

export const Register = () => {
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues : {
            name: '',
            phone: '',
            password: '',
            confirmPassword: '',
            address: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            email: Yup.string().required().email(),
            password: Yup.string().required().minLowercase(1).minUppercase(1).min(6).minNumbers(1),
            confirmPassword: Yup.string().required().oneOf([Yup.ref('password')], 'password doesnt match'),
            phone: Yup.string().required().max(30),
            address: Yup.string().required()
        }),  
        onSubmit: (values, { setSubmitting }) => {
          http.post('/auth/register', values)
            .then(() => navigate('/login'))

            .catch( ({ response }) => {
                handleValidationError(formik, response.data)
            })

            .finally(() => setSubmitting(false))
        }
    })

    return <Container>
        <Row>
            <Col lg="4" className="bg-white my-3 py-3 mx-auto rounded-2 shadow-sm">
                <Row>
                    <Col className="text-center ">
                        <h1>Register</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form onSubmit={formik.handleSubmit}>
                            <InputField formik={formik} name="name" label="Name" />
                            <InputField formik={formik} name="email" label="Email" type="email" />
                            <InputField formik={formik} name="password" label="Password" type="password" />
                            <InputField formik={formik} name="confirmPassword" label="Confirm Password" type="password" />
                            <InputField formik={formik} name="phone" label="Phone" />
                            <InputField as="textarea" formik={formik} name="address" label="Address" />

                           <div className="mb-3 d-grid">
                            <SubmitBtn icon="fa-user-plus" loading={formik.isSubmitting} label="Register" />
                            
                           </div>
                           

                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>
}