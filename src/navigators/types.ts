export type TabParamList = {
  Home: undefined;
  Cart: undefined;
  Favorites: undefined;
  History: undefined;
}

export type MainParamList = {
  Tab: TabParamList;
  Details: { id: string };
}
