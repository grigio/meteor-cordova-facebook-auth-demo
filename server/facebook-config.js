ServiceConfiguration.configurations.remove({
    service: 'facebook'
});

// prod keys
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '',
    secret: ''
});

console.log('FB reset')
