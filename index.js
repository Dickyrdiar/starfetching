'use strict';

var React = require('react');
var axios = require('axios');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const createAxiosInstance = (baseURL) => {
    return axios.create({
        baseURL
    });
};

const useFetch = (url, method, body = null) => {
    const [response, setResponse] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null); // Updated error state type
    React.useEffect(() => {
        let isMounted = true; // Guard to prevent state updates if unmounted
        let cancelTokenSource;
        const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
            setLoading(true);
            try {
                // Create an axios instance with cancel token
                const axiosInstance = createAxiosInstance(url);
                cancelTokenSource = axios.CancelToken.source();
                const config = {
                    url,
                    method,
                    data: body,
                    cancelToken: cancelTokenSource.token,
                };
                const response = yield axiosInstance.request(config);
                if (isMounted) {
                    setResponse(response.data);
                }
            }
            catch (error) {
                if (isMounted) {
                    if (axios.isCancel(error)) {
                        console.log("Request canceled", error.message);
                    }
                    else if (error instanceof Error) {
                        setError(error.message); // Assign error message
                    }
                    else {
                        setError("An unknown error occurred."); // Assign default error message
                    }
                }
            }
            finally {
                if (isMounted)
                    setLoading(false);
            }
        });
        fetchData();
        // Cleanup function to cancel request and prevent state updates if unmounted
        return () => {
            isMounted = false;
            if (cancelTokenSource) {
                cancelTokenSource.cancel("Request canceled due to component unmounting.");
            }
        };
    }, [url, method, body]);
    return { response, loading, error };
};

const useFetchIf = (url, method, body, startFetching) => {
    const [response, setResponse] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    React.useEffect(() => {
        if (startFetching) {
            setLoading(true);
            const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const axiosInstace = createAxiosInstance(url);
                    const result = yield axiosInstace.request({
                        url,
                        method,
                        data: body,
                        cancelToken: new axios.CancelToken(c => {
                            // cancel = c;
                        })
                    });
                    setResponse(result.data);
                }
                catch (error) {
                    setError(error.message);
                }
                finally {
                    setLoading(false);
                }
            });
            fetchData();
        }
    }, [url, method, body, startFetching]);
    return { url, method, body, startFetching, response, loading, error };
};

const ApiContainer = React.createContext(undefined);
const useApiContainer = () => {
    const context = React.useContext(ApiContainer);
    if (!context) {
        throw new Error('useApiContext must be used within a ApiProvider');
    }
    return context;
};
const ApiProvider = ({ children }) => {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const startFetching = (urlRequest, methodRequest, bodyRequest) => __awaiter(void 0, void 0, void 0, function* () {
        const { response, loading, error } = useFetch(urlRequest, methodRequest, bodyRequest);
        setData(response);
        setLoading(loading);
        setError(error);
    });
    const startFetchingIf = (urlRequest, methodRequest, bodyRequest, startFetchingReq) => __awaiter(void 0, void 0, void 0, function* () {
        const { response, loading, error, startFetching: startFetch } = useFetchIf(urlRequest, methodRequest, bodyRequest, !!startFetchingReq);
        if (startFetch) {
            setData(response);
            setLoading(loading);
            setError(error);
        }
    });
    return (React.createElement(ApiContainer.Provider, { value: { startFetching, startFetchingIf } },
        children,
        loading && React.createElement("div", null, "Loading..."),
        error && React.createElement("div", null,
            "Error: ",
            error),
        data && React.createElement("pre", null, JSON.stringify(data, null, 2))));
};

const WrappingComponent = ({ children }) => {
    return (React.createElement("div", { className: "wrapping-component" },
        React.createElement(ApiProvider, null, children)));
};

// export { default as WrappingComponent } from './Wrapping';
// Ensure all imports are correctly defined and exported
var index = {
    useFetch,
    useApiContainer,
    useFetchIf,
    WrappingComponent
};

module.exports = index;
//# sourceMappingURL=index.js.map
