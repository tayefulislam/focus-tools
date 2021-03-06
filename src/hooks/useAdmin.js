
import { useState, useEffect } from 'react';

const useAdmin = (user) => {
    const [admin, setAdmin] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true)


    useEffect(() => {

        const email = user?.email


        if (email) {
            const url = `https://vast-springs-92836.herokuapp.com/admin/${email}`;
            fetch(url, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {

                    setAdmin(data?.isAdmin)
                    setAdminLoading(false)
                })
        }

    }, [user])
    return [admin, adminLoading]

}

export default useAdmin;