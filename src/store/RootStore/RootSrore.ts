import QueryParamsStore from "./QueryParamsStore";
import PreviousUrlStore from "./PreviousUrlStore";
import UserAuthStore from "./UserAuthStore";

export default class RootStore {
    readonly query = new QueryParamsStore();
    prevUrl = new PreviousUrlStore();
    userAuth = new UserAuthStore();
}