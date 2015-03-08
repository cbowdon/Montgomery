export function create(logger?: (s:any) => any) : Storage {

    var map = Object.create(null),
        log = (s:any) => {
            if (logger) { logger(s); }
        };

    Object.defineProperties(map, {
        length: {
            get: () => {
                log('Storage::keys');
                Object.keys(map);
            },
        },
        clear: {
            value: () => {
                log('Storage::clear()');
                map =Object.create(null);
            },
        },
        getItem: {
            value: (key: string) => {
                log(`Storage::getItem(${key})`);
                map[key];
            },
        },
        setItem: {
            value: (key: string, value: any) => {
                log(`Storage::setItem(${key}, ${value})`);
                map[key] = JSON.stringify(value);
            },
        },
        removeItem: {
            value: (key: string) => {
                log(`Storage::removeItem(${key})`);
                delete map[key];
            },
        },
        key: {
            value: (index: number) => {
                log(`Storage::key(${index})`);
                Object.keys(map)[index];
            },
        },
        remainingSpace: {
            get: () => {
                log('Storage::remainingSpace');
                return 99999;
            },
        },
    });

    return map;
}
