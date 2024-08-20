import { InputField, Loading, SelectField, SubmitBtn } from "@/components"
import http from "@/http"
import { handleValidationError } from "@/lib"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import * as Yup from 'yup'
import YupPassword from 'yup-password'

YupPassword(Yup)

export const Create = () => {
    const [categories, setCategories] = useState({})
    const [brands, setBrands] = useState({})
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            name: '',
            summary: '',
            description: '',
            price: '',
            discopuntedPrice: '0',
            categoryId: '',
            brandId: '',
            status: true,
            featured: false,
            images: []
        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            summary: Yup.string().required(),
            description: Yup.string().required(),
            price: Yup.number().required(),
            discountedPrice: Yup.number().nullable(),
            categoryId: Yup.string().required(),
            brandId: Yup.string().required(),
            status: Yup.bool().required(),
            featured: Yup.bool().required(),
        }),
        onSubmit: (data, { setSubmitting }) => {
            http.post('/cms/product', data)
                .then(() => navigate('/products'))
                .catch(({ response }) => handleValidationError(formik, response.data))
                .finally(() => setSubmitting(false))
        }
    })

    useEffect(() => {
        Promise.all([
            http.get('/cms/category'),
            http.get('/cms/brand')
        ])
        .then(([{ data: catData }, { data: branData }]) => {
            let temp = {}
            for (let category of catData)
                temp[category.name] = category._id
            setCategories(temp)
            temp = {}
            for (let brand of branData)
                temp[brand.name] = brand._id
            setBrands(temp)


        })
        .catch(() => {})
        .finally(() => {})
    }, [])
    return <Container className="bg-white py-3 my-3 rounded-2 shadow-sm">
        {loading ? <Loading /> : <>
            <Row>
                <Col>
                    <h1>Add Product</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={formik.handleSubmit}>
                        <InputField formik={formik} name="name" label="Name" />
                        <InputField formik={formik} name="summary" label="Summary" as="textarea"/>
                        <InputField formik={formik} name="description" label="Description" as="textarea"/>
                        <InputField formik={formik} name="price" label="Price" />
                        <InputField formik={formik} name="discountedPrice" label="Discounted Price" />

                        <SelectField 
                            formik={formik} 
                            name="categoryId" 
                            label="Category" 
                            options={categories} 
                        />
                        <SelectField 
                            formik={formik} 
                            name="brandId" 
                            label="Brand" 
                            options={brands} 
                        />
                        <SelectField 
                            formik={formik} 
                            name="status" 
                            label="Status" 
                            options={{ 'Active': true, 'Inactive': false}} 
                            onChange={({ target }) => formik.setFieldValue('status', target.value == 'true') }
                        />
                        <SelectField 
                            formik={formik} 
                            name="featured" 
                            label="Featured" 
                            options={{ 'Yes': true, 'No': false}} 
                            onChange={({ target }) => formik.setFieldValue('status', target.value == 'true') }
                        />

                        <SubmitBtn loading={formik.isSubmitting} ></SubmitBtn>
                    </Form>
                </Col>
            </Row>
        </>}
    </Container>
}