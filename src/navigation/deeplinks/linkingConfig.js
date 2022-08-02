const config = {
    screens: {
        AuthStack: {
            screens: {
                ContinueWith: 'continuewith'
            }
        },
        HomeStack:{
            screens: {
                Invoice: 'invoice'
            }
        }
    }
};
const linking = {
    prefixes: ['iconn://iconn/'],
    config,
};
export default linking;

