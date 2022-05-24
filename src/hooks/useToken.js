import axios from "axios";
import { useEffect, useState } from "react";



const useToken = (user) => {

    const [token, setToken] = useState('');

    console.log(user)


    useEffect(() => {

        const email = user?.user?.email

        const userInfo = { userEmail: email }

        if (email) {
            const url = `http://localhost:5000/user/${email}`;

            axios.put(url, userInfo)


                .then(function (response) {
                    console.log(response);


                    if (response.status === 200) {

                        const accessToken = response.data.token


                        localStorage.setItem('accessToken', accessToken)
                        setToken(accessToken)


                    }





                })
                .catch(function (error) {
                    console.log(error);
                });

        }




    }, [user])



    return [token];


}

export default useToken;