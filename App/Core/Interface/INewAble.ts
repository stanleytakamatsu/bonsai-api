type INewAble<T> = new (...args: any[]) => T;

const INewAble = Symbol.for("INewAble");

export { INewAble };
