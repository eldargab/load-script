type Callback = (errorOrNull: Error | null, script: HTMLScriptElement) => void;

type AllowedAttributes = 'type' | 'charset' | 'async' | 'text';

type Options = Partial<Pick<HTMLScriptElement, AllowedAttributes>> & {
  attrs?: Record<string, string>;
}

declare function load (src: HTMLScriptElement['src'], opts: Callback): void;
declare function load (src: HTMLScriptElement['src'], opts: Options, cb: Callback): void;

export default load;
