import { useState, useEffect } from 'react';

// Custom Hook to find out whether we had and HTTP request error or not
// then in the component we can decide what to do (show modal etc)
// httpClient is axios instance
export default httpClient => {
    const [error, setError] = useState(null);

    const reqInterceptor = httpClient.interceptors.request.use(req => {
        setError(null);
        return req;
    });

    const resInterceptor = httpClient.interceptors.response.use(res => res, err => {
        setError(err);            
    });

    useEffect(() => {
        //clean up function
        return () => {
            // remove old interceptors
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.response.eject(resInterceptor);
        };
    }, [reqInterceptor, resInterceptor]);


    const errorConfirmedHandler = () => {
        setError(null);
    };

    // return error and a function to clear the error
    return [error, errorConfirmedHandler];
};