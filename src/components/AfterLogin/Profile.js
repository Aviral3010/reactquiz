import React, { useState,useContext } from 'react'
import userContext from '../../context/user/usercontext'
import axios from 'axios';


function Profile() {
    const { auth, setauth } = useContext(userContext)
    const [data, setData] = useState('')

    const getdata =async () => {
        try {

            const config = {
                method: 'post',
                url: 'http://localhost:5000/auth/getuser',
                headers: {
                    'User-Agent': 'Axios - console app',
                    'Content-Type': ' application/json',
                    'auth-token': auth
                },

            }

            let res = await axios(config)

            console.log(res);
            // if ()
            if (res.status === 200) {
                setData(res.data)
             
            }


        } catch (error) {
            console.log(error);
            console.log(error.response.data)
            { alert(error.response.data.error) }

        }
    }
   
    return (
        <div >
        <button className='btn' onClick={getdata}>hello</button>

            <h3>User Details</h3><br />
            <center>

                <table style={{ width: "50" }} border="1 | 1" >
                    <tr>
                        <th>User Name</th>
                        <td>
                                {data}
                        </td>
                    </tr>
                    <tr>
                        <th>Contact</th>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>
                        </td>

                    </tr>
                    <tr>
                        <th>Date of Birth</th>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <th>Address</th>
                        <td>
                        </td>
                    </tr>


                </table><br /><br />


            </center>
        </div>
    )
}

export default Profile
