import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {UtilService} from './util.service';

@Injectable()
export class RouteConfigLoaderService {
    constructor(private util: UtilService) {
    }

    setRouteConfig(route: string): Promise<any> {
        const promise = this.util.getHttpClient().get(environment.ROUTE_CONFIG_API + route)
            .toPromise()
            .then(settings => {
                console.log(`Settings from API: `, settings);
                var config = settings['routeconfig'];
                environment.ROUTE_CONFIG = config;
                console.log('route-configration', config);
                // this.util.setAuthAppRouteDataInStorage(config);

                return settings;
            });

        return promise;

    }
}
