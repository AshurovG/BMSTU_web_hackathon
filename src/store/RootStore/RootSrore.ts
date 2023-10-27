import QueryParamsStore from "./QueryParamsStore";
import PreviousUrlStore from "./PreviousUrlStore";
import ThemeStore from "./ThemeStore";

export default class RootStore {
  readonly query = new QueryParamsStore();
  prevUrl = new PreviousUrlStore();
  userAuth = new UserAuthStore();
  theme = new ThemeStore();
}
