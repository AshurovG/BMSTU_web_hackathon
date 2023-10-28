import QueryParamsStore from "./QueryParamsStore";
import PreviousUrlStore from "./PreviousUrlStore";
import ThemeStore from "./ThemeStore";
import SatelliteStore from "./SatelliteStore";

export default class RootStore {
  readonly query = new QueryParamsStore();
  prevUrl = new PreviousUrlStore();
  satellite = new SatelliteStore();
  theme = new ThemeStore();
}
