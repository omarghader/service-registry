# Service Registry

It's a very simple dependency injection container. It's tested in production apps on both browser and node.

## Usage

Services are created only once on demand. You can override service using `register` every time you want. 

```js
    var ServiceRegistry = require('sg-service-registry').ServiceRegistry;
    
    var registry = new ServiceRegistry();
    
    registry.register('serviceName', (registry) => {
        return serviceInstance;
    });
    
    var service = registry.get('serviceName');
```