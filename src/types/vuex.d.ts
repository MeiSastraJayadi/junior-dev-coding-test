declare module 'vuex' {
    export function createStore<S>(options: StoreOptions<S>): Store<S>;
    export function useStore(): Store<State>;
}