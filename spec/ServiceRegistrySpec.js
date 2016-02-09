'use strict';

var ServiceRegistry = require('../lib/ServiceRegistry').ServiceRegistry;

describe('ServiceRegistry', () => {
    let serviceRegistry,
        simpleService;

    beforeEach(() => {
        serviceRegistry = new ServiceRegistry();
        simpleService = {
            name: 'simple',
            instance: {foo: () => {}},
            factory: () => {return simpleService.instance;}
        };
    });

    it('should be instantiable', () => {
        expect(serviceRegistry).toEqual(jasmine.any(ServiceRegistry));
    });

    it('should allow to register new service', () => {
        expect(serviceRegistry.register).toBeDefined();
        expect(() => {serviceRegistry.register(simpleService.name, simpleService.factory)}).not.toThrow();
    });

    it('should allow to get service instance immediately after register', () => {
        serviceRegistry.register(simpleService.name, simpleService.factory);
        expect(serviceRegistry.get(simpleService.name)).toBe(simpleService.instance);
    });

    it('should pass itself to factory function allowing to resolve dependencies', () => {
        let passedRegistry;
        serviceRegistry.register('aaa', (sr) => {passedRegistry = sr;});
        serviceRegistry.get('aaa');
        expect(passedRegistry).toBe(serviceRegistry);
    });

    it('should create service instances lazily', () => {
        let factoryCalled = false;
        serviceRegistry.register('aaa', () => {factoryCalled = true;});
        expect(factoryCalled).toBe(false);
        serviceRegistry.get('aaa');
        expect(factoryCalled).toBe(true);
    });

    it('should throw error when there is no registered service under given name', () => {
        const missingServiceName = 'aaa';
        const getMissingService = () => {return serviceRegistry.get(missingServiceName)};

        expect(getMissingService).toThrow();
        try {
            getMissingService();
        } catch (e) {
            expect(e.serviceName).toBe(missingServiceName);
        }
    });
});