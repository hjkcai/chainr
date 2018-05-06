export interface Chainr {
    [key: string]: Chainr;
}

export declare type ChainrDispatch = (this: any, keys: PropertyKey[], args: any[]) => any;

export declare function createInstance<T = Chainr> (dispatch: ChainrDispatch): T;

export default createInstance
