export interface Chainr {
    [key: string]: Chainr;
}

export declare type ChainrDispatch = (this: any, keys: PropertyKey[], args: any[]) => any;

export declare function createInstance(dispatch: ChainrDispatch): Chainr;

export default createInstance
