'use strict';
const NULL_INSTANCE = {};

class Service {
    constructor (name, factory) {
        this.name = name;
        this.factory = factory;
        this.instance = NULL_INSTANCE;
    }

    getInstance () {
        if(this.instance == NULL_INSTANCE) {
            this.instance = this.factory();
        }

        return this.instance;
    }
}

export class ServiceRegistry {
    constructor () {
        this.servicesMap = new Map();
    }

    register (name, factory) {
        this.servicesMap.set(name, new Service(name, () => {return factory(this); }));
    }

    get (name) {
        if(this.servicesMap.has(name)) {
            return this.servicesMap.get(name).getInstance();
        } else {
            const err = new Error(`${name} is not registered service`);
            err.serviceName = name;

            throw err;
        }
    }
}