import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [data, setData] = useState({
        companyName: "",
        ownerName: "",
        rollNo: "",
        ownerEmail: "",
        accessCode: ""
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://20.244.56.144/train/register', data);
            console.log("Respon:", response.data);

            if (response && response.data && response.data.clientID) {
                const data1 = {
                    companyName: data.companyName,
                    clientID: response.data.clientID ,
                    clientSecret:response.data.clientSecret
                };

                // Make the second POST request
                try{
                const res = await axios.post('http://20.244.56.144/train/auth/', data1);
                console.log("Second Response:", res.data);
                }
                catch(er)
                {
                    console.log("auth error ",er)
                }
            }
        } catch (err) {
            if (err.response) {
                console.log("Error Status:", err.response.status);
                console.log("Error Data:", err.response.data);
            } else {
                console.log("Error:", err.message);
            }
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <form onSubmit={submitHandler}>
                <input type='text' name='companyName' value={data.companyName} onChange={handleChange} placeholder='companyName' />
                <input type='text' name='ownerName' value={data.ownerName} onChange={handleChange} placeholder='ownerName' />
                <input type='text' name='rollNo' value={data.rollNo} onChange={handleChange} placeholder='rollNo' />
                <input type="text" name='ownerEmail' value={data.ownerEmail} onChange={handleChange} placeholder='ownerEmail' />
                <input type="text" name='accessCode' value={data.accessCode} onChange={handleChange} placeholder='accessCode' />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default Register;
