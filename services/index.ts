import Router from "next/router";
// constructor(configuration: IConfig, baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
//     super(configuration);
//     this.http = http ? http : window as any;
//     this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "http://localhost:8090";
// }
export class IConfig {
    private token: string;

    constructor(token?: string) {
        this.token = token ? token : "";
    }

    setAuthorization = (token: string) => {
        this.token = "Bearer " + token;
    };

    getAuthorization = () => {
        return this.token;
    };
}

export class AuthorizedApiBase {
    private readonly config: IConfig;

    protected constructor(config: IConfig) {
        this.config = config;
    }

    protected transformOptions = (options: RequestInit): Promise<RequestInit> => {
        const newOptions = options as any;
        newOptions.headers = {
            ...options.headers,
            "Accept-Encoding": "*",
            Authorization: this.config.getAuthorization()
            // "Content-Type": "application/json"
        };
        return Promise.resolve(options);
    };

    protected transformResult = (
        url: string,
        response: Response,
        handleResponse: (Response: any) => Promise<any>
    ) => {
        const status = response.status;
        if (status === 401 || status === 403) {
            Router.push('/?returnUrl=' + Router.asPath);

            //
        }
        return handleResponse(response);
    };
}

export const apiConfig = new IConfig();
