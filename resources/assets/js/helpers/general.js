export function initialize(store, router) {
    router.beforeEach((to, from, next) => {
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        const currentUser = store.state.currentUser;
    
        if(requiresAuth && !currentUser){
            next({
                path: '/login'
              })
        }else if(to.path == '/login' && currentUser){
            next('/');
        }else{
            next();
        }
    })
    
    axios.interceptors.response.use(null, (error) => {
        if(error.response.status == 401){
            store.commit('logout');
            router.push("/login");
        }
        return Promise.reject(error);
    })

}

// for setting header authorization
export function setAuthorization(token) {
    console.log(token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
}