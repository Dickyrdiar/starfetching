'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

// Cache object to store responses
const cache$1 = {};
const useFetch = (url, method, body = null, token) => {
    const [response, setResponse] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const fetchData = React.useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        let isMounted = true; // Guard to prevent state updates if unmounted
        let cancelTokenSource;
        setLoading(true);
        try {
            // Check if the response is already cached
            if (cache$1[url]) {
                if (isMounted) {
                    setResponse(cache$1[url]);
                }
                return;
            }
            const axiosInstance = createAxiosInstance(url);
            cancelTokenSource = axios.CancelToken.source();
            const config = {
                url,
                method,
                data: body,
                cancelToken: cancelTokenSource.token,
                headers: Object.assign({}, (token ? { Authorization: `Bearer ${token}` } : {})),
            };
            const response = yield axiosInstance.request(config);
            if (isMounted) {
                setResponse(response.data);
                // Cache the response
                cache$1[url] = response.data;
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
        // Cleanup function to cancel request and prevent state updates if unmounted
        return () => {
            isMounted = false;
            if (cancelTokenSource) {
                cancelTokenSource.cancel("Request canceled due to component unmounting.");
            }
        };
    }), [url, method, body]);
    React.useEffect(() => {
        fetchData();
    }, [fetchData]);
    // Function to manually re-fetch data
    const reFetch = React.useCallback(() => {
        // Invalidate the cache for the URL
        delete cache$1[url];
        fetchData();
    }, [fetchData, url]);
    return { response, loading, error, reFetch };
};

const cache = {};
const useFetchIf = (url, method, body, startFetching, token) => {
    const [response, setResponse] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const fetchData = React.useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        let cancelTokenSource;
        setLoading(true);
        if (cache[url]) {
            setResponse(cache[url]);
            setLoading(false);
            return;
        }
        try {
            const axiosInstance = createAxiosInstance(url);
            cancelTokenSource = axios.CancelToken.source();
            const config = {
                url,
                method,
                data: body,
                cancelToken: cancelTokenSource.token,
                headers: Object.assign({}, (token ? { Authorization: `Bearer ${token}` } : {}))
            };
            const result = yield axiosInstance.request(config);
            setResponse(result.data);
            setError(null);
            cache[url] = result.data;
        }
        catch (error) {
            if (axios.isCancel(error)) {
                console.log("Request canceled", error.message);
            }
            else if (error instanceof Error) {
                setError(error.message);
            }
            else {
                setError("An unknown error occurred.");
            }
        }
        finally {
            setLoading(false);
        }
    }), [url, method, body, token]);
    React.useEffect(() => {
        if (startFetching) {
            fetchData();
        }
    }, [fetchData, startFetching]);
    const refetch = React.useCallback(() => {
        delete cache[url];
        fetchData();
    }, [fetchData, url]);
    return { response, loading, error, refetch };
};

const startCallBack = (method, url) => {
    const [response, setResponse] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const fetchData = React.useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        let cancelTokenSource;
        setLoading(true);
        try {
            const axiosInstace = createAxiosInstance(url);
            cancelTokenSource = axios.CancelToken.source();
            const config = {
                method,
                url,
                cancelToken: cancelTokenSource.token
            };
            const response = yield axiosInstace.request(config);
            setResponse(response === null || response === void 0 ? void 0 : response.data);
        }
        catch (err) {
            if (axios.isCancel(err)) {
                console.log("Request candeled", err.message);
            }
            else if (err instanceof Error) {
                setError(err.message);
            }
            else {
                setError("An unknown error occurred.");
            }
        }
        finally {
            setLoading(false);
        }
    }), [url, method]);
    React.useEffect(() => {
        fetchData();
    }, [fetchData]);
    return { response, loading, error };
};

const ApiContainer = React.createContext(undefined);
const ApiProvider = ({ children, }) => {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const startFetching = (urlRequest, methodRequest, bodyRequest) => __awaiter(void 0, void 0, void 0, function* () {
        const { response, loading, error, reFetch } = useFetch(urlRequest, methodRequest, bodyRequest);
        // Update state based on the hook's response
        setData(response);
        setLoading(loading);
        setError(error);
        // Call reFetch function for external use
        reFetch();
    });
    const startFetchingIf = (urlRequest_1, methodRequest_1, bodyRequest_1, ...args_1) => __awaiter(void 0, [urlRequest_1, methodRequest_1, bodyRequest_1, ...args_1], void 0, function* (urlRequest, methodRequest, bodyRequest, startFetchingReq = false) {
        const { response, loading, error, refetch } = useFetchIf(urlRequest, methodRequest || "GET", bodyRequest, startFetchingReq);
        // Update state based on the hook's response
        if (startFetchingReq) {
            setData(response);
            setLoading(loading);
            setError(error);
        }
        // Return refetch function for external use
        refetch();
    });
    const startCallBack$1 = (urlRequest, methodRequest) => __awaiter(void 0, void 0, void 0, function* () {
        const { response, loading, error } = yield startCallBack(urlRequest, methodRequest || 'GET');
        setData(response);
        setLoading(loading);
        setError(error);
    });
    return (React.createElement(ApiContainer.Provider, { value: { startFetching, startFetchingIf, startCallBack: startCallBack$1 } },
        children,
        loading && React.createElement("div", null, "Loading..."),
        error && React.createElement("div", null,
            "Error: ",
            error),
        data && React.createElement("pre", null, JSON.stringify(data, null, 2))));
};

const WrappingComponent = ({ children }) => {
    return (React.createElement("div", { className: 'wrapping-component' },
        React.createElement(ApiProvider, null, children)));
};

// export { default as WrappingComponent } from './Wrapping';
// Ensure all imports are correctly defined and exported
const library = {
    useFetch,
    useFetchIf,
    startCallBack,
    WrappingComponent,
    createAxiosInstance
};

exports.WrappingComponent = WrappingComponent;
exports.default = library;
exports.useFetch = useFetch;
exports.useFetchIf = useFetchIf;
//# sourceMappingURL=index.js.map
