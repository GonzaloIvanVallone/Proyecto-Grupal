import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postProduct } from '../../redux/actions/productsActions';
import { getCategories } from '../../redux/actions/productsActions';
import { useDispatch, useSelector } from 'react-redux';

import styles from './CreateProduct.module.css'

import { Button } from '@mui/material';

export default function CreateProduct() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories);
    const history = useHistory();



    const [input, setInput] = useState({
        title: '',
        description: '',
        price: 0,
        rating: 0,
        stock: 0,
        brand: '',
        categories: [],
        thumbnail: '',
        image: '',
        images: [],
        active: true
    });


    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch, errors]);
    console.log(categories);

    function handleInputChange(e) {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }
    function handleImageAddition(e) {
        e.preventDefault();
        let image = input.image;
        setInput({
            ...input,
            image: '',
            images: [...input.images, image]
        });
        console.log(input.images);
    }
    function handleImageDeletion(e) {
        e.preventDefault();
        console.log(input.images);
        console.log(e.target.value);
        setInput({
            ...input,
            images: input.images.filter(imagen => {
                return imagen !== e.target.value;
            })
        })
    }
    function handleCheckBoxChange(e) {
        
        if(e.target.checked) {
            if(!input.categories.includes(e.target.value)) {
                setInput({
                    ...input,
                    categories: [...input.categories, e.target.value]
                });
                setErrors(validate({
                    ...input,
                    categories: [...input.categories, e.target.value]
                }));
            }
        } else if (!e.target.checked) {
            setInput({
                ...input,
                categories: input.categories.filter(category => {
                    return category !== e.target.value
                })
            });
            setErrors(validate({
                ...input,
                categories: input.categories.filter(category => {
                    return category !== e.target.value
                })
            }));
        }
    }


    function validate(inputToValidate) {
        let errors = {};
        if (inputToValidate.title === '') {
            errors.title ?
            errors.title = errors.title + " Product name must not be empty," :
            errors.title = " Product name must not be empty,";
        }
        if (/^\d+$/.test(inputToValidate.title)) {
            errors.title ?
            errors.title = errors.title + " Product name must not contain only numbers," :
            errors.title = " Product name must not contain only numbers,";
        }
        if (inputToValidate.description === '') {
            errors.description ? 
            errors.description = errors.description + " Description must not be empty," :
            errors.description = " Description must not be empty,";
        }
        if (/^\d+$/.test(inputToValidate.description)) {
            errors.description ?
            errors.description = errors.description + " Description must not contain only numbers," :
            errors.description = " Description must not contain only numbers,";
        }
        if (!/^\d+$/.test(inputToValidate.price)) {
            errors.price ? 
            errors.price = errors.price + " Price must contain only numbers," : 
            errors.price = " Price Score must contain only numbers,";
        }
        if (inputToValidate.price < 0) {
            errors.price ?
            errors.price = errors.price + " Price must be a number equal to or above 0," :
            errors.price = " Price must be a number equal to or above 0,";
        }
        if (isNaN(parseFloat(inputToValidate.rating).toFixed(2))) {
            errors.rating ? 
            errors.rating = errors.rating + " Rating must contain only numbers," : 
            errors.rating = " Rating Score must contain only numbers,";
        }
        if (inputToValidate.rating < 0 || inputToValidate.rating * 100 > 500 || inputToValidate.rating > 5) {
            errors.rating ?
            errors.rating = errors.rating + " Rating must be a number equal to or above 0 or equal to or below 5," :
            errors.rating = " Rating must be a number equal to or above 0 or equal to or below 5,";
        }
        if (!/^\d+$/.test(inputToValidate.stock)) {
            errors.stock ? 
            errors.stock = errors.stock + " Stock must contain only numbers," : 
            errors.stock = " Stock Score must contain only numbers,";
        }
        if (inputToValidate.stock < 0) {
            errors.stock ?
            errors.stock = errors.stock + " Stock must be a number equal to or above 0," :
            errors.stock = " Stock must be a number equal to or above 0,";
        }
        if (inputToValidate.brand === '') {
            errors.brand ?
            errors.brand = errors.brand + " Brand must not be empty," : 
            errors.brand = " Brand must not be empty,";
        }
        if (/^\d+$/.test(inputToValidate.brand)) {
            errors.brand ?
            errors.brand = errors.brand + " Brand must not contain only numbers," : 
            errors.brand = " Brand must not contain only numbers,";
        }
        if (inputToValidate.categories.length === 0) {
            errors.categories ? 
            errors.categories = errors.categories + " You must select at least one category," :
            errors.categories = " You must select at least one category,";
        }
        if (inputToValidate.thumbnail === '') {
            errors.thumbnail ?
            errors.thumbnail = errors.thumbnail + " Thumbnail must not be empty," : 
            errors.thumbnail = " Thumbnail must not be empty,";
        }
        if (!/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig.test(inputToValidate.thumbnail)) {
            errors.thumbnail ?
            errors.thumbnail = errors.thumbnail + " Thumbnail must be a valid link," :
            errors.thumbnail = " Thumbnail must be a valid link,";
        }
        if (inputToValidate.image === '') {
            errors.image ?
            errors.image = errors.image + " image must not be empty," : 
            errors.image = " image must not be empty,";
        }
        if (!/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig.test(inputToValidate.image)) {
            errors.image ?
            errors.image = errors.image + " image must be a valid link," :
            errors.image = " image must be a valid link,";
        }
        return errors;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (Object.keys(errors).length > 0) {
            alert('Please, verify the provided information');
        } else if (!input.title || !input.description || input.price === '' || input.rating === '' || input.stock === '' || !input.brand || input.categories.length === 0 || !input.thumbnail || !input.images || input.images.length === 0) {
            alert('Please, complete all fields before submitting');
        } else {
            // console.log(`Producto a agregar:`);
            // console.dir(input);
            dispatch(postProduct(input));
            setInput({
                title: '',
                description: '',
                price: 0,
                rating: 0,
                stock: 0,
                brand: '',
                categories: [],
                thumbnail: '',
                image: '',
                images: [],
                active: true
            });

            history.push('/home');
        }
    }

    return (
        <div className={styles.fullDiv}>
            <Link className={styles.volverAtras} to='/home'>Go Back...</Link>
            <div className={styles.mainDiv}>
                <h1 className={styles.h1}>Product Creation Form</h1>
                <form className={styles.form}>
                    <div className={styles.divInput}>
                        <label className={styles.label} htmlFor="">Title:</label>
                        <input className={styles.input} placeholder="Product Title..." value={input.title} name="title" type="text" onChange={(e) => handleInputChange(e)} />
                        {errors.title && <span className={styles.errorSpan}>*{errors.title}</span>}
                    </div>
                    <div className={styles.divInput}>
                        <label className={styles.label} htmlFor="">Description:</label>
                        <textarea className={styles.inputArea} placeholder="Description..." value={input.description} name="description" onChange={(e) => handleInputChange(e)} />
                        {errors.description && <span className={styles.errorSpan}>*{errors.description}</span>}
                    </div>
                    <div className={styles.divInput}>
                        <label className={styles.label} htmlFor="">Price:</label>
                        <input className={styles.input} placeholder="00" value={input.price} name="price" type="number" min={0} step={1} onChange={(e) => handleInputChange(e)} />
                        {errors.price && <span className={styles.errorSpan}>*{errors.price}</span>}
                    </div>
                    <div className={styles.divInput}>
                        <label className={styles.label} htmlFor="">Rating:</label>
                        <input className={styles.input} placeholder="0,00 to 5,00" value={input.rating} name="rating" type="number" min={0} max={5} step={0.01} onChange={(e) => handleInputChange(e)} />
                        {errors.rating && <span className={styles.errorSpan}>*{errors.rating}</span>}
                    </div>
                    <div className={styles.divInput}>
                        <label className={styles.label} htmlFor="">Stock:</label>
                        <input className={styles.input} placeholder="0" value={input.stock} name="stock" type="number" min={0} step={1} onChange={(e) => handleInputChange(e)} />
                        {errors.stock && <span className={styles.errorSpan}>*{errors.stock}</span>}
                    </div>
                    <div className={styles.divInput}>
                        <label className={styles.label} htmlFor="">Brand:</label>
                        <input className={styles.input} placeholder="Brand..." value={input.brand} name="brand" type="text" onChange={(e) => handleInputChange(e)} />
                        {errors.brand && <span className={styles.errorSpan}>*{errors.brand}</span>}
                    </div>
                    <div className={styles.divCategories}>
                        <div className={styles.divCategoryCreation}>
                        <p className={styles.textAlignLeft}>If you can't find the category you're looking for, you can create the one you need here:</p>
                            <Link className={styles.categoryCreationLinkButton} to={'/createCategory'}>
                                <Button color="success" variant="contained" size="small">Create Category</Button>
                            </Link>
                        </div>
                        <label className={styles.label} htmlFor="">Categories:</label>
                        <div className={styles.divCategoriesList}>
                            {categories?.map((category, index) => {
                                return (
                                    <div className={styles.category} key={index}>
                                        <input className={styles.checkbox} type="checkbox" value={category.name} id={category.name} onChange={(e) => { handleCheckBoxChange(e) }} />
                                        <label htmlFor={category.name}>{category.name}</label>
                                    </div>
                                )
                            })}
                        </div>

                        {errors.categories && <span className={styles.errorSpan}>*{errors.categories}</span>}


                        <p className={styles.textAlignLeft}>Product Categories Selected: {input.categories.map((category) => {
                            return `${category}, `;
                        })}</p>
                    </div>
                    <div className={styles.divInput}>
                        <label className={styles.label} htmlFor="">Thumbnail image link:</label>
                        <input className={styles.input} placeholder="https://..." value={input.thumbnail} name="thumbnail" type="text" onChange={(e) => handleInputChange(e)} />
                        {errors.thumbnail && <span className={styles.errorSpan}>*{errors.thumbnail}</span>}
                    </div>
                    <div className={styles.divInput}>
                        <label className={styles.label} htmlFor="">Product Image:</label>
                        <input className={styles.input} placeholder="https://..." value={input.image} name="image" type="text" onChange={(e) => handleInputChange(e)} />
                        <Button disabled={(input.image === '' || errors.image) && "disabled"} onClick={(e) => { handleImageAddition(e) }} color="success" variant="contained" size="small">Add</Button>
                        {errors.image && <span className={styles.errorSpan}>*{errors.image}</span>}
                        <div><p className={styles.textAlignLeft}>Images to add: </p>{input.images.map((imagen, index) => {
                            
                            return (
                                <div className={styles.imageToAdd} key={index}>
                                    <img className={styles.image} src={imagen} alt="to-add" />
                                    <Button className={styles.eliminar} value={imagen} onClick={(e) => { handleImageDeletion(e) }} color="error" variant="contained" size="small">Delete</Button>
                                </div>
                            )
                        })}</div>
                    </div>
                    <Button onClick={(e) => { handleSubmit(e) }} color="success" variant="contained" size="small">Create Product</Button>

                </form>
            </div>
        </div>
    )
}