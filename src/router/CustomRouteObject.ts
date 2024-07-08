import { RouteObject } from 'react-router-dom';


export type CustomRouteObject = RouteObject & {
  headerVisible?: boolean;
  footerVisible?: boolean;
}

