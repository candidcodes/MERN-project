import { InputField, SubmitBtn } from "@/components"
import http from "@/http"
import { handleValidationError } from "@/lib"
import { setUser } from "@/store"
import { useFormik } from "formik"
import { Col, Container, Form, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import * as Yup from 'yup'

export const Edit = () => {
    const user = useSelector(state => state.user.value)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            name: user?.name,
            phone: user?.phone,
            address: user?.address
        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            phone: Yup.string().required().max(30),
            address: Yup.string().required(),
        }),
        onSubmit: (data, { setSubmitting }) => {
            http.patch('/profile/update', data)
                .then(() => http.get('/profile/detail'))
                .then(({ data }) => dispatch(setUser(data)))
                .catch(({ response }) => handleValidationError(formik, response.data))
                .finally(() => setSubmitting(false))
        }
    })
    return <Form onSubmit={formik.handleSubmit}>
        <InputField formik={formik} name="name" label="Name" />
        <InputField formik={formik} name="phone" label="Phone" />
        <InputField as="textarea" formik={formik} name="address" label="Address" />

        <SubmitBtn loading={formik.isSubmitting} ></SubmitBtn>
    </Form>
}