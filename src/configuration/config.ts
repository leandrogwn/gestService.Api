export default {
    secretyKey: process.env.SECRETYKEY || 'f46ac441-f887-4951-9052-f76be0b5782b',
    publicRoutes: process.env.PUBLICROUTES || [
        '/users/create',
        '/users/auth'
    ]
}