interface DomainsInterface {
    domain: string;
    paidDate: string | null;
    domainUrl: string | null;
    domainLogin: string | null;
    domainPass: string | null;
    hostUrl: string | null;
    hostLogin: string | null;
    hostPass: string | null;
    price: string | null;
    serviceHost: boolean;
    serviceDomain: boolean;
    active: boolean;
}
export default DomainsInterface