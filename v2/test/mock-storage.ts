export function create(logger?: (s:any) => any) : Storage {

    var map = Object.create(null),
        log = (s:any) => {
            if (logger) { logger(s); }
        };

    Object.defineProperties(map, {
        length: {
            get: () : number => {
                log('Storage::keys');
                return Object.keys(map).length;
            },
        },
        clear: {
            value: () : void => {
                log('Storage::clear()');
                Object.keys(map).forEach(k => delete map[k]);
            },
        },
        getItem: {
            // in practice this will have type 'string',
            // however TS_LIB defines it as 'any', probably because
            // you can also use index to get/set
            value: (key: string) : any => {
                log(`Storage::getItem(${key})`);
                return map[key];
            },
        },
        setItem: {
            value: (key: string, value: string) : void => {
                log(`Storage::setItem(${key}, ${value})`);
                map[key] = value;
            },
        },
        removeItem: {
            value: (key: string) : void => {
                log(`Storage::removeItem(${key})`);
                delete map[key];
            },
        },
        key: {
            value: (index: number) : string => {
                log(`Storage::key(${index})`);
                return Object.keys(map)[index];
            },
        },
        remainingSpace: {
            get: () : number => {
                log('Storage::remainingSpace');
                return 99999;
            },
        },
    });

    return map;
}
