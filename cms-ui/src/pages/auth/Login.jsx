import { InputField, SubmitBtn } from "@/components"
import http from "@/http"
import { handleValidationError, inStorage } from "@/lib"
import { setUser } from "@/store"
import { useFormik } from "formik"
import { useState } from "react"
import { Container, Row, Col , Form, Button} from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"

export const Login = () => {
    const [remember, setRemember] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const formik = useFormik({
        initialValues : {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
           email: Yup.string().required(`Please enter your email`).email(),
            password: Yup.string().required()
        }),  
        onSubmit: (values, { setSubmitting }) => {
          http.post('/auth/login', values)
            .then(({ data }) => {
                inStorage('430cmstoken', data.token, remember)

                return http.get('/profile/detail')
            })
            .then(({ data }) => {
                dispatch(setUser(data))
                navigate('/')
            })

            .catch( ({ response }) => {
                handleValidationError(formik, response.data)
            })

            .finally(() => setSubmitting(false))
        }
    })

    return <Container>
        <Row className="vh-100 justify-content-center align-items-center">
            <Col lg="4" className="bg-white py-3 my-3 mx-auto rounded-2 shadow-sm">
                <Row>
                    <Col className="text-center ">
                        <h1>Login</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form onSubmit={formik.handleSubmit}>
                            <InputField formik={formik} name="email" label="Email" type="email"  />
                            <InputField formik={formik} name="password" label="Password" type="password"  />
                           
                           <Form.Check className="mb-3">
                                <Form.Check.Input name="remember" id="remember" checked={remember} onChange={() => {setRemember(!remember)}} />
                                <Form.Check.Label htmlFor="remember">Remeber Me</Form.Check.Label>
                           </Form.Check>

                           <div className="mb-3 d-grid">
                            <SubmitBtn icon="fa-arrow-right-to-bracket" loading={formik.isSubmitting} label="Log In" />
                            
                           </div>
                           

                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>
}