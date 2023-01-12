import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postCategory } from '../../redux/actions/productsActions';
import { getCategories } from '../../redux/actions/productsActions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './CreateCategory.module.css';

//import Container from "@mui/material/Container";
import { Table, TableBody, TableContainer, TableRow, TableCell, TableHead, Button } from '@mui/material';
import Paper from '@mui/material/Paper';

export default function CreateCategory () {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories);
    const history = useHistory();

    const [input, setInput] = useState({
        name: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);
    // console.log(categories);

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

    function validate(inputToValidate) {
        let errors = {};
        if (inputToValidate.name === '') {
            errors.name ?
            errors.name = errors.name + " Category name must not be empty," :
            errors.name = " Category name must not be empty,";
        }
        if (/^\d+$/.test(inputToValidate.name)) {
            errors.name ?
            errors.name = errors.name + " Category name must not contain only numbers," :
            errors.name = " Category name must not contain only numbers,";
        }
        
        return errors;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (Object.keys(errors).length > 0) {
            alert('Please, verify the provided information');
        } else if (!input.name) {
            alert('Please, complete the name input before submitting');
        } else {
            console.log(`Categoría a agregar: ${input.name}`);
            let category = {};
            category.name = input.name;
            dispatch(postCategory(category));
            setInput({
                name:''
            });
            dispatch(getCategories());

            //history.push('/Home');
        }
    }

    return (
        <div className={styles.fullDiv}>
            <Link className={styles.volverAtras} to='/home'>Go Back...</Link>
            <div className={styles.mainDiv}>
                <h1 className={styles.h1}>Category Creation:</h1>
                <div className={styles.divFormTable}>
                    
                    <form className={styles.categoryForm}>
                        <div className={styles.labelInput}>
                            <label className={styles.labelName} htmlFor="">Name:</label>
                            <input className={styles.input} placeholder="Category Name..." value={input.name} name="name" type="text" onChange={(e) => handleInputChange(e)} />
                        </div>
                        <div className={styles.spanButton}>
                            {errors.name && <span className={styles.errorSpan}>*{errors.name}</span>}
                            <Button disabled={(input.name === '' || errors.name) && "disabled"} onClick={(e) => { handleSubmit(e) }} color="success" variant="contained" size="small">Create Category</Button>
                        </div>
                    </form>
                    
                    <div className={styles.divTable}>
                        <h3 className={styles.h3}>Existing Categories:</h3>
                        {/* <table>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                    {categories?.map((category, index) => {
                        return (
                            <tr key={index}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table> */}
                        <TableContainer>
                            <Table sx={{ maxWidth: 350 }} size="small" aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{color: '#e7ebf0'}}>ID</TableCell>
                                        <TableCell sx={{color: '#e7ebf0'}}>Name</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {categories?.map((category, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell sx={{color: '#e7ebf0'}}>{category.id}</TableCell>
                                                <TableCell sx={{color: '#e7ebf0'}}>{category.name}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}